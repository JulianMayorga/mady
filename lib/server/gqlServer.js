'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchema = getSchema;
exports.getSchemaShorthand = getSchemaShorthand;
exports.runQuery = runQuery;
exports.runIntrospect = runIntrospect;
exports.init = init;

var _storyboard = require('storyboard');

var _timm = require('timm');

var _timm2 = _interopRequireDefault(_timm);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _graphql = require('graphql');

var _utilities = require('graphql/utilities');

var _graphqlRelay = require('graphql-relay');

var _lodash = require('lodash');

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==============================================
// Private state
// ==============================================
var gqlInterfaces = {};
var gqlTypes = {};
var gqlMutations = {};
var gqlSchema = null;
var viewer = { _type: 'Viewer', id: 'me' };
var viewerRootField = null;

// ==============================================
// Public API
// ==============================================
function getSchema() {
  return gqlSchema;
}
function getSchemaShorthand() {
  return (0, _utilities.printSchema)(gqlSchema);
}
function runQuery(query, operation, rootValue, variables) {
  return (0, _graphql.graphql)(gqlSchema, query, rootValue, null, variables, operation);
}
function runIntrospect() {
  return _bluebird2.default.resolve().then(function () {
    return (0, _graphql.graphql)(gqlSchema, _utilities.introspectionQuery);
  }).then(function (result) {
    if (result.errors) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = result.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var error = _step.value;

          _storyboard.mainStory.error('gql', 'Error introspecting schema:', { attach: error });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    return result;
  });
}

function init() {
  // ==============================================
  // Interfaces
  // ==============================================
  _storyboard.mainStory.debug('gql', 'Creating interfaces...');

  var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(getNodeFromGlobalId, getNodeType);

  var nodeInterface = _nodeDefinitions.nodeInterface;
  var nodeField = _nodeDefinitions.nodeField;

  gqlInterfaces.Node = nodeInterface;
  var nodeRootField = nodeField;

  // ==============================================
  // Types
  // ==============================================
  _storyboard.mainStory.debug('gql', 'Creating types...');

  var configBaseField = null;
  var keysBaseField = null;
  var translationsBaseField = null;

  // ----------------------------------------------
  // Viewer
  // ----------------------------------------------
  gqlTypes.Viewer = new _graphql.GraphQLObjectType({
    name: 'Viewer',
    interfaces: [gqlInterfaces.Node],
    isTypeOf: function isTypeOf(node) {
      return node._type === 'Viewer';
    },
    fields: function fields() {
      return {
        id: (0, _graphqlRelay.globalIdField)('Viewer'),
        config: configBaseField,
        keys: keysBaseField,
        translations: translationsBaseField,
        anyNode: {
          type: gqlInterfaces.Node,
          args: { id: { type: _graphql.GraphQLID } },
          resolve: function resolve(base, args) {
            return getNodeFromGlobalId(args.id);
          }
        }
      };
    }
  });

  viewerRootField = {
    type: gqlTypes.Viewer,
    resolve: function resolve() {
      return viewer;
    }
  };

  // ----------------------------------------------
  // Config
  // ----------------------------------------------
  var configFields = function configFields() {
    return {
      srcPaths: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
      srcExtensions: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
      langs: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
      msgFunctionNames: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
      fMinify: { type: _graphql.GraphQLBoolean }
    };
  };

  gqlTypes.Config = new _graphql.GraphQLObjectType({
    name: 'Config',
    interfaces: [gqlInterfaces.Node],
    isTypeOf: function isTypeOf() {
      return true;
    },
    fields: function fields() {
      return _timm2.default.merge(configFields(), {
        id: (0, _graphqlRelay.globalIdField)('Config')
      });
    }
  });

  gqlTypes.ConfigUpdate = new _graphql.GraphQLInputObjectType({
    name: 'ConfigUpdate',
    fields: function fields() {
      return configFields();
    }
  });

  configBaseField = {
    type: gqlTypes.Config,
    resolve: function resolve() {
      return db.getConfig();
    }
  };

  addMutation('Config', 'UPDATE', { fSingleton: true });

  // ----------------------------------------------
  // Keys
  // ----------------------------------------------
  gqlTypes.Key = new _graphql.GraphQLObjectType({
    name: 'Key',
    interfaces: [gqlInterfaces.Node],
    isTypeOf: function isTypeOf() {
      return true;
    },
    fields: function fields() {
      return {
        id: (0, _graphqlRelay.globalIdField)('Key'),
        context: { type: _graphql.GraphQLString },
        text: { type: _graphql.GraphQLString },
        description: { type: _graphql.GraphQLString },
        firstUsed: { type: _graphql.GraphQLString },
        unusedSince: { type: _graphql.GraphQLString },
        sources: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
        translations: {
          type: gqlTypes.TranslationConnection,
          args: _graphqlRelay.connectionArgs,
          resolve: function resolve(base, args) {
            return (0, _graphqlRelay.connectionFromArray)(db.getKeyTranslations(base.id), args);
          }
        }
      };
    }
  });

  gqlTypes.KeyCreate = new _graphql.GraphQLInputObjectType({
    name: 'KeyCreate',
    fields: function fields() {
      return {
        context: { type: _graphql.GraphQLString },
        text: { type: _graphql.GraphQLString },
        firstUsed: { type: _graphql.GraphQLString },
        unusedSince: { type: _graphql.GraphQLString }
      };
    }
  });

  gqlTypes.KeyUpdate = new _graphql.GraphQLInputObjectType({
    name: 'KeyUpdate',
    fields: function fields() {
      return {
        context: { type: _graphql.GraphQLString },
        text: { type: _graphql.GraphQLString },
        firstUsed: { type: _graphql.GraphQLString },
        unusedSince: { type: _graphql.GraphQLString }
      };
    }
  });

  addConnectionType('Key');

  keysBaseField = {
    type: gqlTypes.KeyConnection,
    args: _graphqlRelay.connectionArgs,
    resolve: function resolve(base, args) {
      return (0, _graphqlRelay.connectionFromArray)(db.getKeys(), args);
    }
  };

  {
    var parent = {
      type: 'Viewer',
      connection: 'keys',
      resolveConnection: function resolveConnection() {
        return db.getKeys();
      }
    };
    addMutation('Key', 'CREATE', { parent: parent });
    addMutation('Key', 'UPDATE');
    addMutation('Key', 'DELETE', { parent: parent });
  }
  gqlMutations.parseSrcFiles = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'ParseSrcFiles',
    inputFields: {
      storyId: { type: _graphql.GraphQLString }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref) {
      var storyId = _ref.storyId;

      var story = _storyboard.mainStory.child({
        src: 'gql',
        title: 'Mutation: parse source files',
        extraParents: storyId
      });
      return db.parseSrcFiles({ story: story }).then(function () {
        return {};
      }) // empty object as a result
      .finally(function () {
        return story.close();
      });
    },
    outputFields: {
      keys: keysBaseField,
      viewer: viewerRootField
    }
  });

  // ----------------------------------------------
  // Translations
  // ----------------------------------------------
  gqlTypes.Translation = new _graphql.GraphQLObjectType({
    name: 'Translation',
    interfaces: [gqlInterfaces.Node],
    isTypeOf: function isTypeOf() {
      return true;
    },
    fields: function fields() {
      return {
        id: (0, _graphqlRelay.globalIdField)('Translation'),
        lang: { type: _graphql.GraphQLString },
        translation: { type: _graphql.GraphQLString },
        keyId: { type: _graphql.GraphQLID, resolve: function resolve(o) {
            return (0, _graphqlRelay.toGlobalId)('Key', o.keyId);
          } }
      };
    }
  });

  gqlTypes.TranslationCreate = new _graphql.GraphQLInputObjectType({
    name: 'TranslationCreate',
    fields: function fields() {
      return {
        lang: { type: _graphql.GraphQLString },
        translation: { type: _graphql.GraphQLString },
        keyId: { type: _graphql.GraphQLID }
      };
    }
  });

  gqlTypes.TranslationUpdate = new _graphql.GraphQLInputObjectType({
    name: 'TranslationUpdate',
    fields: function fields() {
      return {
        translation: { type: _graphql.GraphQLString }
      };
    }
  });

  addConnectionType('Translation');

  translationsBaseField = {
    type: gqlTypes.TranslationConnection,
    args: _graphqlRelay.connectionArgs,
    resolve: function resolve(base, args) {
      return (0, _graphqlRelay.connectionFromArray)(db.getTranslations(), args);
    }
  };

  {
    var globalIds = ['keyId'];
    var _parent = {
      type: 'Key',
      connection: 'translations',
      resolveConnection: function resolveConnection(key) {
        return db.getKeyTranslations(key.id);
      }
    };
    addMutation('Translation', 'CREATE', { globalIds: globalIds, parent: _parent });
    addMutation('Translation', 'UPDATE', { globalIds: globalIds });
    addMutation('Translation', 'DELETE', { globalIds: globalIds, parent: _parent });
  }

  gqlMutations.compileTranslations = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'CompileTranslations',
    inputFields: {
      storyId: { type: _graphql.GraphQLString }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
      var storyId = _ref2.storyId;

      var story = _storyboard.mainStory.child({
        src: 'gql',
        title: 'Mutation: compile translations',
        extraParents: storyId
      });
      return db.compileTranslations({ story: story }).then(function () {
        return {};
      }) // empty object as a result
      .finally(function () {
        return story.close();
      });
    },
    outputFields: {}
  });

  // ==============================================
  // Schema
  // ==============================================
  _storyboard.mainStory.debug('gql', 'Creating schema...');
  gqlSchema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: function fields() {
        return {
          node: nodeRootField,
          viewer: viewerRootField
        };
      }
    }),

    mutation: new _graphql.GraphQLObjectType({
      name: 'Mutation',
      fields: function fields() {
        return (0, _lodash.pick)(gqlMutations, ['updateConfig', 'createKeyInViewerKeys', 'deleteKeyInViewerKeys', 'updateKey', 'parseSrcFiles', 'createTranslationInKeyTranslations', 'deleteTranslationInKeyTranslations', 'updateTranslation', 'compileTranslations']);
      }
    })
  });
}

// ==============================================
// Relay-related helpers
// ==============================================
function getNodeType(node) {
  if (!node) return null;
  return gqlTypes[node._type];
}

function getNodeFromGlobalId(globalId) {
  if (globalId == null) return null;

  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

  var type = _fromGlobalId.type;
  var id = _fromGlobalId.id;

  return getNodeFromTypeAndLocalId(type, id);
}

function getNodeFromTypeAndLocalId(type, localId) {
  var out = void 0;
  switch (type) {
    case 'Viewer':
      out = viewer;
      break;
    case 'Config':
      out = db.getConfig();
      break;
    case 'Key':
      out = db.getKey(localId);
      break;
    case 'Translation':
      out = db.getTranslation(localId);
      break;
    default:
      out = null;
      break;
  }
  return addTypeAttr(out, type);
}

function addTypeAttr(obj, type) {
  return obj ? _timm2.default.set(obj, '_type', type) : obj;
}

function addConnectionType(name) {
  var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
    name: name,
    nodeType: gqlTypes[name]
  });

  var connectionType = _connectionDefinition.connectionType;
  var edgeType = _connectionDefinition.edgeType;

  gqlTypes[name + 'Connection'] = connectionType;
  gqlTypes[name + 'Edge'] = edgeType;
}

function addMutation(type, op) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var parent = options.parent;

  var name = void 0;
  if (parent) {
    name = '' + (0, _lodash.capitalize)(op) + type + 'In' + parent.type + (0, _lodash.upperFirst)(parent.connection);
  } else {
    name = '' + (0, _lodash.capitalize)(op) + type;
  }

  // Input fields
  var inputFields = {};
  if (op !== 'CREATE' && !options.fSingleton) {
    inputFields.id = { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) };
  }
  if (op !== 'DELETE') {
    inputFields.set = { type: gqlTypes['' + type + (0, _lodash.capitalize)(op)] };
    inputFields.unset = { type: new _graphql.GraphQLList(_graphql.GraphQLString) };
  }
  if (parent) {
    inputFields.parentId = { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) };
  }
  inputFields.storyId = { type: _graphql.GraphQLString };

  // The operation
  var mutateAndGetPayload = function mutateAndGetPayload(mutationArgs) {
    var globalId = mutationArgs.id;
    var storyId = mutationArgs.storyId;

    var story = _storyboard.mainStory.child({
      src: 'gql',
      title: 'Mutation: ' + name + ' ' + (globalId || ''),
      extraParents: storyId
    });
    return mutate(type, op, mutationArgs, options, story).finally(function () {
      return story.close();
    });
  };

  // Output fields
  // - `viewer`
  // - `deletedTypeNameId` [DELETE]
  // - `typeName` [non-DELETE]
  // - `parent` [if in args, typically in CREATE/DELETE]
  var outputFields = { viewer: viewerRootField };
  if (op === 'DELETE') {
    outputFields['deleted' + type + 'Id'] = {
      type: _graphql.GraphQLID,
      resolve: function resolve(_ref3) {
        var globalId = _ref3.globalId;
        return globalId;
      }
    };
  } else {
    outputFields[(0, _lodash.lowerFirst)(type)] = {
      type: gqlTypes[type],
      resolve: function resolve(_ref4) {
        var node = _ref4.node;
        return node;
      }
    };
  }
  if (parent) {
    outputFields.parent = {
      type: gqlTypes[parent.type],
      resolve: function resolve(_ref5) {
        var parentNode = _ref5.parentNode;
        return parentNode;
      }
    };
    if (op === 'CREATE') {
      outputFields['created' + type + 'Edge'] = {
        type: gqlTypes[type + 'Edge'],
        resolve: function resolve(_ref6) {
          var node = _ref6.node;
          var parentNode = _ref6.parentNode;

          if (!node) return null;
          var allNodes = parent.resolveConnection(parentNode);
          var idx = allNodes.findIndex(function (o) {
            return o.id === node.id;
          });
          var cursor = idx >= 0 ? (0, _graphqlRelay.offsetToCursor)(idx) : null;
          return { cursor: cursor, node: node };
        }
      };
    }
  }
  var relations = options.relations != null ? options.relations : [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var relation = _step2.value;

      outputFields[relation.name] = {
        type: gqlTypes[relation.type],
        resolve: function resolve(_ref7) {
          var node = _ref7.node;
          return relation.resolve(node);
        }
      };
    };

    for (var _iterator2 = relations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
    }

    // Save mutation
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  gqlMutations[(0, _lodash.lowerFirst)(name)] = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: name,
    inputFields: inputFields,
    mutateAndGetPayload: mutateAndGetPayload,
    outputFields: outputFields
  });
}

function mutate(type, op, mutationArgs, options, story) {
  var globalId = mutationArgs.id;
  var globalParentId = mutationArgs.parentId;
  var set = mutationArgs.set;
  var unset = mutationArgs.unset;

  var localId = op !== 'CREATE' && !options.fSingleton ? (0, _graphqlRelay.fromGlobalId)(globalId).id : null;
  var parentNode = getNodeFromGlobalId(globalParentId);
  var result = { globalId: globalId, localId: localId, globalParentId: globalParentId, parentNode: parentNode };
  var promise = void 0;
  if (op === 'DELETE') {
    promise = db['delete' + type](localId, { story: story }).then(function (node) {
      result.node = node;
    });
  } else {
    var newAttrs = mergeSetUnset(set, unset);
    newAttrs = resolveGlobalIds(newAttrs, options.globalIds);
    if (op === 'CREATE') {
      promise = db['create' + type](newAttrs, { story: story }).then(function (node) {
        result.node = node;
        result.localId = result.node.id;
      });
    } else {
      if (options.fSingleton) {
        promise = db['update' + type](newAttrs, { story: story });
      } else {
        promise = db['update' + type](localId, newAttrs, { story: story });
      }
      promise = promise.then(function (node) {
        result.node = node;
      });
    }
  }
  promise = promise.then(function () {
    result.node = addTypeAttr(result.node, type);
    return result;
  });
  return promise;
}

function mergeSetUnset() {
  var set = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var unset = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var attrs = (0, _lodash.omitBy)(set, _lodash.isUndefined);
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = unset[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var attr = _step3.value;

      attrs[attr] = null;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return attrs;
}

function resolveGlobalIds(prevAttrs) {
  var globalIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var attrs = prevAttrs;
  if (attrs == null || !globalIds.length) return attrs;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = globalIds[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var locatorPath = _step4.value;

      var tokens = locatorPath.split('.');
      var curToken = tokens[0];
      if (tokens.length === 1) {
        var globalId = attrs[curToken];
        if (globalId == null) continue;
        attrs = _timm2.default.set(attrs, curToken, (0, _graphqlRelay.fromGlobalId)(globalId).id);
      } else {
        var subLocatorPath = tokens.slice(1).join('.');
        if (curToken === '*') {
          for (var idx = 0; idx < attrs.length; idx++) {
            attrs = _timm2.default.set(attrs, idx, resolveGlobalIds(attrs[idx], [subLocatorPath]));
          }
        } else {
          attrs = _timm2.default.set(attrs, curToken, resolveGlobalIds(attrs[curToken], [subLocatorPath]));
        }
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return attrs;
}

// function getTypePlural(type) { return `${type}s`; } // obviously, a stub