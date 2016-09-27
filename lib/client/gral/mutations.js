'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteTranslationMutation = exports.CreateTranslationMutation = exports.UpdateTranslationMutation = exports.DeleteKeyMutation = exports.UpdateConfigMutation = exports.CompileTranslationsMutation = exports.ParseSrcFilesMutation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _timm = require('timm');

var _timm2 = _interopRequireDefault(_timm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */

function applySetUnset(item, set) {
  var unset = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  var out = void 0;
  out = _timm2.default.merge({}, item, set);
  // delete out.__dataID__;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = unset[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var unsetAttr = _step.value;

      out = _timm2.default.set(out, unsetAttr, null);
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

  return out;
}

// =======================================================
// ParseSrcFilesMutation
// =======================================================

var ParseSrcFilesMutation = function (_Relay$Mutation) {
  _inherits(ParseSrcFilesMutation, _Relay$Mutation);

  function ParseSrcFilesMutation() {
    _classCallCheck(this, ParseSrcFilesMutation);

    return _possibleConstructorReturn(this, (ParseSrcFilesMutation.__proto__ || Object.getPrototypeOf(ParseSrcFilesMutation)).apply(this, arguments));
  }

  _createClass(ParseSrcFilesMutation, [{
    key: 'getMutation',
    value: function getMutation() {
      return function () {
        return {
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'parseSrcFiles',
            value: {
              kind: 'CallVariable',
              callVariableName: 'input'
            }
          }],
          children: [{
            fieldName: 'clientMutationId',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'String'
          }],
          kind: 'Mutation',
          metadata: {
            inputType: 'ParseSrcFilesInput!'
          },
          name: 'Mutations',
          responseType: 'ParseSrcFilesPayload'
        };
      }();
    }
  }, {
    key: 'getVariables',
    value: function getVariables() {
      return { storyId: this.props.storyId };
    }
  }, {
    key: 'getFatQuery',
    value: function getFatQuery() {
      return function () {
        return {
          children: [{
            children: [{
              fieldName: 'keys',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isConnection: true
              },
              type: 'KeyConnection'
            }, {
              children: [{
                fieldName: 'id',
                kind: 'Field',
                metadata: {
                  isGenerated: true,
                  isRequisite: true
                },
                type: 'ID'
              }, {
                fieldName: '__typename',
                kind: 'Field',
                metadata: {
                  isGenerated: true,
                  isRequisite: true
                },
                type: 'String'
              }],
              fieldName: 'anyNode',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id',
                isAbstract: true
              },
              type: 'Node'
            }, {
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'viewer',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Viewer'
          }],
          id: _reactRelay2.default.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'Mutations_ValueRelayQL',
          type: 'ParseSrcFilesPayload'
        };
      }();
    }
  }, {
    key: 'getConfigs',
    value: function getConfigs() {
      return [{
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          viewer: this.props.viewerId
        }
      }];
    }
  }, {
    key: 'getCollisionKey',
    value: function getCollisionKey() {
      return 'compileTranslations';
    }
  }]);

  return ParseSrcFilesMutation;
}(_reactRelay2.default.Mutation);

// -------------------------------------------------------


ParseSrcFilesMutation.fragments = {};

var CompileTranslationsMutation = function (_Relay$Mutation2) {
  _inherits(CompileTranslationsMutation, _Relay$Mutation2);

  function CompileTranslationsMutation() {
    _classCallCheck(this, CompileTranslationsMutation);

    return _possibleConstructorReturn(this, (CompileTranslationsMutation.__proto__ || Object.getPrototypeOf(CompileTranslationsMutation)).apply(this, arguments));
  }

  _createClass(CompileTranslationsMutation, [{
    key: 'getMutation',
    value: function getMutation() {
      return function () {
        return {
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'compileTranslations',
            value: {
              kind: 'CallVariable',
              callVariableName: 'input'
            }
          }],
          children: [{
            fieldName: 'clientMutationId',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'String'
          }],
          kind: 'Mutation',
          metadata: {
            inputType: 'CompileTranslationsInput!'
          },
          name: 'Mutations',
          responseType: 'CompileTranslationsPayload'
        };
      }();
    }
  }, {
    key: 'getVariables',
    value: function getVariables() {
      return { storyId: this.props.storyId };
    }
  }, {
    key: 'getFatQuery',
    value: function getFatQuery() {
      return function () {
        return {
          children: [{
            fieldName: 'clientMutationId',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }],
          id: _reactRelay2.default.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'Mutations_ValueRelayQL',
          type: 'CompileTranslationsPayload'
        };
      }();
    }
  }, {
    key: 'getConfigs',
    value: function getConfigs() {
      return [];
    }
  }, {
    key: 'getCollisionKey',
    value: function getCollisionKey() {
      return 'compileTranslations';
    }
  }]);

  return CompileTranslationsMutation;
}(_reactRelay2.default.Mutation);

// =======================================================
// UpdateConfigMutation
// =======================================================


CompileTranslationsMutation.fragments = {};

var UpdateConfigMutation = function (_Relay$Mutation3) {
  _inherits(UpdateConfigMutation, _Relay$Mutation3);

  function UpdateConfigMutation() {
    _classCallCheck(this, UpdateConfigMutation);

    return _possibleConstructorReturn(this, (UpdateConfigMutation.__proto__ || Object.getPrototypeOf(UpdateConfigMutation)).apply(this, arguments));
  }

  _createClass(UpdateConfigMutation, [{
    key: 'getMutation',
    value: function getMutation() {
      return function () {
        return {
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'updateConfig',
            value: {
              kind: 'CallVariable',
              callVariableName: 'input'
            }
          }],
          children: [{
            fieldName: 'clientMutationId',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'String'
          }],
          kind: 'Mutation',
          metadata: {
            inputType: 'UpdateConfigInput!'
          },
          name: 'Mutations',
          responseType: 'UpdateConfigPayload'
        };
      }();
    }
  }, {
    key: 'getVariables',
    value: function getVariables() {
      return {
        set: this.props.set,
        unset: this.props.unset,
        storyId: this.props.storyId
      };
    }
  }, {
    key: 'getFatQuery',
    value: function getFatQuery() {
      return function () {
        return {
          children: [{
            children: [{
              children: [{
                fieldName: 'id',
                kind: 'Field',
                metadata: {
                  isGenerated: true,
                  isRequisite: true
                },
                type: 'ID'
              }],
              fieldName: 'config',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id'
              },
              type: 'Config'
            }, {
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'viewer',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Viewer'
          }],
          id: _reactRelay2.default.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'Mutations_ValueRelayQL',
          type: 'UpdateConfigPayload'
        };
      }();
    }
  }, {
    key: 'getConfigs',
    value: function getConfigs() {
      return [{
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          viewer: this.props.viewerId
        }
      }];
    }
  }, {
    key: 'getCollisionKey',
    value: function getCollisionKey() {
      return 'updateConfig';
    }
  }]);

  return UpdateConfigMutation;
}(_reactRelay2.default.Mutation);

// =======================================================
// Key mutations
// =======================================================


UpdateConfigMutation.fragments = {};

var DeleteKeyMutation = function (_Relay$Mutation4) {
  _inherits(DeleteKeyMutation, _Relay$Mutation4);

  function DeleteKeyMutation() {
    _classCallCheck(this, DeleteKeyMutation);

    return _possibleConstructorReturn(this, (DeleteKeyMutation.__proto__ || Object.getPrototypeOf(DeleteKeyMutation)).apply(this, arguments));
  }

  _createClass(DeleteKeyMutation, [{
    key: 'getMutation',
    value: function getMutation() {
      return function () {
        return {
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'deleteKeyInViewerKeys',
            value: {
              kind: 'CallVariable',
              callVariableName: 'input'
            }
          }],
          children: [{
            fieldName: 'clientMutationId',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'String'
          }],
          kind: 'Mutation',
          metadata: {
            inputType: 'DeleteKeyInViewerKeysInput!'
          },
          name: 'Mutations',
          responseType: 'DeleteKeyInViewerKeysPayload'
        };
      }();
    }
  }, {
    key: 'getVariables',
    value: function getVariables() {
      return {
        id: this.props.id,
        parentId: this.props.viewerId,
        storyId: this.props.storyId
      };
    }
  }, {
    key: 'getFatQuery',
    value: function getFatQuery() {
      return function () {
        return {
          children: [{
            children: [{
              fieldName: 'keys',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isConnection: true
              },
              type: 'KeyConnection'
            }, {
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'parent',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Viewer'
          }, {
            fieldName: 'deletedKeyId',
            kind: 'Field',
            metadata: {},
            type: 'ID'
          }],
          id: _reactRelay2.default.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'Mutations_ValueRelayQL',
          type: 'DeleteKeyInViewerKeysPayload'
        };
      }();
    }
  }, {
    key: 'getConfigs',
    value: function getConfigs() {
      return [{
        type: 'NODE_DELETE',
        parentName: 'parent',
        parentID: this.props.viewerId,
        connectionName: 'keys',
        deletedIDFieldName: 'deletedKeyId'
      }];
    }
  }, {
    key: 'getOptimisticResponse',
    value: function getOptimisticResponse() {
      var _props = this.props;
      var viewerId = _props.viewerId;
      var id = _props.id;

      return {
        parent: { id: viewerId },
        deletedKeyId: id
      };
    }
  }, {
    key: 'getCollisionKey',
    value: function getCollisionKey() {
      return this.props.id;
    }
  }]);

  return DeleteKeyMutation;
}(_reactRelay2.default.Mutation);

// =======================================================
// Translation mutations
// =======================================================


DeleteKeyMutation.fragments = {};

var UpdateTranslationMutation = function (_Relay$Mutation5) {
  _inherits(UpdateTranslationMutation, _Relay$Mutation5);

  function UpdateTranslationMutation() {
    _classCallCheck(this, UpdateTranslationMutation);

    return _possibleConstructorReturn(this, (UpdateTranslationMutation.__proto__ || Object.getPrototypeOf(UpdateTranslationMutation)).apply(this, arguments));
  }

  _createClass(UpdateTranslationMutation, [{
    key: 'getMutation',
    value: function getMutation() {
      return function () {
        return {
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'updateTranslation',
            value: {
              kind: 'CallVariable',
              callVariableName: 'input'
            }
          }],
          children: [{
            fieldName: 'clientMutationId',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'String'
          }],
          kind: 'Mutation',
          metadata: {
            inputType: 'UpdateTranslationInput!'
          },
          name: 'Mutations',
          responseType: 'UpdateTranslationPayload'
        };
      }();
    }
  }, {
    key: 'getVariables',
    value: function getVariables() {
      return {
        id: this.props.id,
        set: this.props.set,
        unset: this.props.unset,
        storyId: this.props.storyId
      };
    }
  }, {
    key: 'getFatQuery',
    value: function getFatQuery() {
      return function () {
        return {
          children: [{
            children: [{
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'translation',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Translation'
          }],
          id: _reactRelay2.default.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'Mutations_ValueRelayQL',
          type: 'UpdateTranslationPayload'
        };
      }();
    }
  }, {
    key: 'getConfigs',
    value: function getConfigs() {
      return [{
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          translation: this.props.id
        }
      }];
    }
  }, {
    key: 'getOptimisticResponse',
    value: function getOptimisticResponse() {
      var _props2 = this.props;
      var translation = _props2.translation;
      var set = _props2.set;
      var unset = _props2.unset;

      var nextTranslation = applySetUnset(translation, set, unset);
      return { translation: nextTranslation };
    }
  }, {
    key: 'getCollisionKey',
    value: function getCollisionKey() {
      return this.props.id;
    }
  }]);

  return UpdateTranslationMutation;
}(_reactRelay2.default.Mutation);

// -------------------------------------------------------


UpdateTranslationMutation.fragments = {};

var CreateTranslationMutation = function (_Relay$Mutation6) {
  _inherits(CreateTranslationMutation, _Relay$Mutation6);

  function CreateTranslationMutation() {
    _classCallCheck(this, CreateTranslationMutation);

    return _possibleConstructorReturn(this, (CreateTranslationMutation.__proto__ || Object.getPrototypeOf(CreateTranslationMutation)).apply(this, arguments));
  }

  _createClass(CreateTranslationMutation, [{
    key: 'getMutation',
    value: function getMutation() {
      return function () {
        return {
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'createTranslationInKeyTranslations',
            value: {
              kind: 'CallVariable',
              callVariableName: 'input'
            }
          }],
          children: [{
            fieldName: 'clientMutationId',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'String'
          }],
          kind: 'Mutation',
          metadata: {
            inputType: 'CreateTranslationInKeyTranslationsInput!'
          },
          name: 'Mutations',
          responseType: 'CreateTranslationInKeyTranslationsPayload'
        };
      }();
    }
  }, {
    key: 'getVariables',
    value: function getVariables() {
      return {
        set: this.props.set,
        unset: this.props.unset,
        parentId: this.props.keyId,
        storyId: this.props.storyId
      };
    }
  }, {
    key: 'getFatQuery',
    value: function getFatQuery() {
      return function () {
        return {
          children: [{
            children: [{
              fieldName: 'translations',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isConnection: true
              },
              type: 'TranslationConnection'
            }, {
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'parent',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Key'
          }, {
            children: [{
              fieldName: 'cursor',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'String'
            }, {
              children: [{
                fieldName: 'id',
                kind: 'Field',
                metadata: {
                  isGenerated: true,
                  isRequisite: true
                },
                type: 'ID'
              }],
              fieldName: 'node',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id',
                isGenerated: true,
                isRequisite: true
              },
              type: 'Translation'
            }],
            fieldName: 'createdTranslationEdge',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true
            },
            type: 'TranslationEdge'
          }],
          id: _reactRelay2.default.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'Mutations_ValueRelayQL',
          type: 'CreateTranslationInKeyTranslationsPayload'
        };
      }();
    }
  }, {
    key: 'getConfigs',
    value: function getConfigs() {
      return [{
        type: 'RANGE_ADD',
        parentName: 'parent',
        parentID: this.props.keyId,
        connectionName: 'translations',
        edgeName: 'createdTranslationEdge',
        rangeBehaviors: {
          '': 'append'
        }
      }];
    }
    // Based on facebook/relay/examples/star-wars/js/mutation/AddShipMutation.js

  }, {
    key: 'getOptimisticResponse',
    value: function getOptimisticResponse() {
      var _props3 = this.props;
      var set = _props3.set;
      var unset = _props3.unset;
      var keyId = _props3.keyId;

      var node = applySetUnset(undefined, set, unset);
      return {
        parent: { id: keyId },
        createdTranslationEdge: { node: node }
      };
    }
  }, {
    key: 'getCollisionKey',
    value: function getCollisionKey() {
      return this.props.keyId + '_' + this.props.set.lang;
    }
  }]);

  return CreateTranslationMutation;
}(_reactRelay2.default.Mutation);

// -------------------------------------------------------


CreateTranslationMutation.fragments = {};

var DeleteTranslationMutation = function (_Relay$Mutation7) {
  _inherits(DeleteTranslationMutation, _Relay$Mutation7);

  function DeleteTranslationMutation() {
    _classCallCheck(this, DeleteTranslationMutation);

    return _possibleConstructorReturn(this, (DeleteTranslationMutation.__proto__ || Object.getPrototypeOf(DeleteTranslationMutation)).apply(this, arguments));
  }

  _createClass(DeleteTranslationMutation, [{
    key: 'getMutation',
    value: function getMutation() {
      return function () {
        return {
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'deleteTranslationInKeyTranslations',
            value: {
              kind: 'CallVariable',
              callVariableName: 'input'
            }
          }],
          children: [{
            fieldName: 'clientMutationId',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'String'
          }],
          kind: 'Mutation',
          metadata: {
            inputType: 'DeleteTranslationInKeyTranslationsInput!'
          },
          name: 'Mutations',
          responseType: 'DeleteTranslationInKeyTranslationsPayload'
        };
      }();
    }
  }, {
    key: 'getVariables',
    value: function getVariables() {
      return {
        id: this.props.id,
        parentId: this.props.keyId,
        storyId: this.props.storyId
      };
    }
  }, {
    key: 'getFatQuery',
    value: function getFatQuery() {
      return function () {
        return {
          children: [{
            children: [{
              fieldName: 'translations',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isConnection: true
              },
              type: 'TranslationConnection'
            }, {
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'parent',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Key'
          }, {
            fieldName: 'deletedTranslationId',
            kind: 'Field',
            metadata: {},
            type: 'ID'
          }],
          id: _reactRelay2.default.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'Mutations_ValueRelayQL',
          type: 'DeleteTranslationInKeyTranslationsPayload'
        };
      }();
    }
  }, {
    key: 'getConfigs',
    value: function getConfigs() {
      return [{
        type: 'NODE_DELETE',
        parentName: 'parent',
        parentID: this.props.keyId,
        connectionName: 'translations',
        deletedIDFieldName: 'deletedTranslationId'
      }];
    }
    // Based (indirectly) on facebook/relay/examples/star-wars/js/mutation/AddShipMutation.js

  }, {
    key: 'getOptimisticResponse',
    value: function getOptimisticResponse() {
      var _props4 = this.props;
      var keyId = _props4.keyId;
      var id = _props4.id;
      // const nextEdges = theKey.translations.edges.filter(({ node }) => node.id !== id);
      // const nextKey = timm.setIn(theKey, ['translations', 'edges'], nextEdges);

      return {
        parent: { id: keyId },
        // parent: nextKey,
        deletedTranslationId: id
      };
    }
  }, {
    key: 'getCollisionKey',
    value: function getCollisionKey() {
      return this.props.id;
    }
  }]);

  return DeleteTranslationMutation;
}(_reactRelay2.default.Mutation);

// ==============================================
// Public API
// ==============================================


DeleteTranslationMutation.fragments = {};
exports.ParseSrcFilesMutation = ParseSrcFilesMutation;
exports.CompileTranslationsMutation = CompileTranslationsMutation;
exports.UpdateConfigMutation = UpdateConfigMutation;
exports.DeleteKeyMutation = DeleteKeyMutation;
exports.UpdateTranslationMutation = UpdateTranslationMutation;
exports.CreateTranslationMutation = CreateTranslationMutation;
exports.DeleteTranslationMutation = DeleteTranslationMutation;