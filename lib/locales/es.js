"use strict";

/* eslint-disable */
function anonymous() {
  var number = function number(value, offset) {
    if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
    return value - (offset || 0);
  };
  var plural = function plural(value, offset, lcfunc, data, isOrdinal) {
    if ({}.hasOwnProperty.call(data, value)) return data[value]();
    if (offset) value -= offset;
    var key = lcfunc(value, isOrdinal);
    if (key in data) return data[key]();
    return data.other();
  };
  var select = function select(value, data) {
    if ({}.hasOwnProperty.call(data, value)) return data[value]();
    return data.other();
  };
  var pluralFuncs = {
    es: function es(n, ord) {
      if (ord) return 'other';
      return n == 1 ? 'one' : 'other';
    }
  };
  var fmt = {};

  return {
    c29tZUNvbnRleHRfe05VTSwgcGx1cmFsLCBvbmV7MSBoYW1idXJnZXJ9IG90aGVyeyMgaGFtYnVyZ2Vyc319: function c29tZUNvbnRleHRfe05VTSwgcGx1cmFsLCBvbmV7MSBoYW1idXJnZXJ9IG90aGVyeyMgaGFtYnVyZ2Vyc319(d) {
      return plural(d.NUM, 0, pluralFuncs.es, { one: function one() {
          return "1 hamburguesa";
        }, other: function other() {
          return number(d.NUM) + " hamburguesas";
        } });
    },
    "c29tZUNvbnRleHRfSGVsbG8sIHtOQU1FfSE=": function c29tZUNvbnRleHRfSGVsbG8sIHtOQU1FfSE(d) {
      return "Hola, " + d.NAME + "!";
    },
    "c29tZUNvbnRleHRfSGVsbG8ge05BTUV9LCB5b3UgaGF2ZSB7VU5SRUFEX0NPVU5ULCBudW1iZXJ9IHtVTlJFQURfQ09VTlQsIHBsdXJhbCwgb25lIHttZXNzYWdlfSBvdGhlciB7bWVzc2FnZXN9fQ==": function c29tZUNvbnRleHRfSGVsbG8ge05BTUV9LCB5b3UgaGF2ZSB7VU5SRUFEX0NPVU5ULCBudW1iZXJ9IHtVTlJFQURfQ09VTlQsIHBsdXJhbCwgb25lIHttZXNzYWdlfSBvdGhlciB7bWVzc2FnZXN9fQ(d) {
      return "Hola " + d.NAME + ", tienes " + fmt.number(d.UNREAD_COUNT, ["es"]) + " " + plural(d.UNREAD_COUNT, 0, pluralFuncs.es, { one: function one() {
          return "mensaje";
        }, other: function other() {
          return "mensajes";
        } });
    },
    "c29tZUNvbnRleHRfPGk+SGk8L2k+IDxiPntOQU1FfTwvYj4h": function c29tZUNvbnRleHRfPGkSGk8L2kIDxiPntOQU1FfTwvYj4h(d) {
      return "<i>Hola</i> <b>" + d.NAME + "</b>!";
    },
    dG9vbHRpcF9Db252ZXJ0IHRyYW5zbGF0aW9ucyB0byBKYXZhU2NyaXB0IGZpbGVz: function dG9vbHRpcF9Db252ZXJ0IHRyYW5zbGF0aW9ucyB0byBKYXZhU2NyaXB0IGZpbGVz(d) {
      return "Convertir traducciones a ficheros JavaScript";
    },
    YnV0dG9uX0NvcHkga2V5: function YnV0dG9uX0NvcHkga2V5(d) {
      return "";
    },
    "YnV0dG9uX0RlbGV0ZQ==": function YnV0dG9uX0RlbGV0ZQ(d) {
      return "Borrar";
    },
    "YnV0dG9uX1JldmVydA==": function YnV0dG9uX1JldmVydA(d) {
      return "Cancelar cambios";
    },
    dG9vbHRpcF9BZGQgY29sdW1u: function dG9vbHRpcF9BZGQgY29sdW1u(d) {
      return "Añadir columna";
    },
    "dG9vbHRpcF9DaGFuZ2UgbGFuZ3VhZ2U=": function dG9vbHRpcF9DaGFuZ2UgbGFuZ3VhZ2U(d) {
      return "Cambiar idioma";
    },
    dG9vbHRpcF9EZWxldGUgbWVzc2FnZSAoZG9lcyBOT1QgZGVsZXRlIGFueSB0cmFuc2xhdGlvbnMp: function dG9vbHRpcF9EZWxldGUgbWVzc2FnZSAoZG9lcyBOT1QgZGVsZXRlIGFueSB0cmFuc2xhdGlvbnMp(d) {
      return "Borrar mensaje (NO borra ninguna traducción)";
    },
    "dG9vbHRpcF9QYXJzZSBzb3VyY2UgZmlsZXMgdG8gdXBkYXRlIHRoZSBtZXNzYWdlIGxpc3Q=": function dG9vbHRpcF9QYXJzZSBzb3VyY2UgZmlsZXMgdG8gdXBkYXRlIHRoZSBtZXNzYWdlIGxpc3Q(d) {
      return "Analizar los ficheros de código para actualizar la lista de mensajes";
    },
    "dG9vbHRpcF9SZW1vdmUgY29sdW1uIChkb2VzIE5PVCBkZWxldGUgYW55IHRyYW5zbGF0aW9ucyk=": function dG9vbHRpcF9SZW1vdmUgY29sdW1uIChkb2VzIE5PVCBkZWxldGUgYW55IHRyYW5zbGF0aW9ucyk(d) {
      return "Quitar columna (NO borra ninguna traducción)";
    },
    "bXNnRGV0YWlsc1ZpZXdfTm8gbWVzc2FnZSBzZWxlY3RlZA==": function bXNnRGV0YWlsc1ZpZXdfTm8gbWVzc2FnZSBzZWxlY3RlZA(d) {
      return "Ningún mensaje seleccionado";
    },
    "bXNnRGV0YWlsc1ZpZXdfVXNlZCBzaW5jZQ==": function bXNnRGV0YWlsc1ZpZXdfVXNlZCBzaW5jZQ(d) {
      return "En uso desde";
    },
    "YnV0dG9uX0NhbmNlbA==": function YnV0dG9uX0NhbmNlbA(d) {
      return "Cancelar";
    },
    "c2V0dGluZ3NGb3JtX0xhbmd1YWdlcyAoQkNQNDcgY29kZXMpOg==": function c2V0dGluZ3NGb3JtX0xhbmd1YWdlcyAoQkNQNDcgY29kZXMpOg(d) {
      return "Idiomas (códigos BCP47):";
    },
    c2V0dGluZ3NGb3JtX01hZHkgbGFuZ3VhZ2U6: function c2V0dGluZ3NGb3JtX01hZHkgbGFuZ3VhZ2U6(d) {
      return "Idioma de Mady:";
    },
    "c2V0dGluZ3NGb3JtX01pbmlmeSBvdXRwdXQgSmF2YVNjcmlwdA==": function c2V0dGluZ3NGb3JtX01pbmlmeSBvdXRwdXQgSmF2YVNjcmlwdA(d) {
      return "Minificar el JavaScript de salida";
    },
    "c2V0dGluZ3NGb3JtX1NvdXJjZSBleHRlbnNpb25zOg==": function c2V0dGluZ3NGb3JtX1NvdXJjZSBleHRlbnNpb25zOg(d) {
      return "Extensiones de fichero a buscar:";
    },
    "c2V0dGluZ3NGb3JtX1NvdXJjZSBwYXRoczo=": function c2V0dGluZ3NGb3JtX1NvdXJjZSBwYXRoczo(d) {
      return "Carpetas a buscar:";
    },
    "dG9vbHRpcF9Ub3RhbCBtZXNzYWdlcw==": function dG9vbHRpcF9Ub3RhbCBtZXNzYWdlcw(d) {
      return "Total mensajes";
    },
    dG9vbHRpcF9Vc2VkIG1lc3NhZ2Vz: function dG9vbHRpcF9Vc2VkIG1lc3NhZ2Vz(d) {
      return "Mensajes en uso";
    },
    "dG9vbHRpcF9UcmFuc2xhdGlvbnM=": function dG9vbHRpcF9UcmFuc2xhdGlvbnM(d) {
      return "Traducciones";
    },
    "dG9vbHRpcF9Db3B5IG1lc3NhZ2U=": function dG9vbHRpcF9Db3B5IG1lc3NhZ2U(d) {
      return "Copiar mensaje";
    },
    "dG9vbHRpcF9EZWxldGUgdHJhbnNsYXRpb24=": function dG9vbHRpcF9EZWxldGUgdHJhbnNsYXRpb24(d) {
      return "Borrar traducción";
    },
    "dHJhbnNsYXRpb25IZWxwX0NsaWNrIG91dHNpZGUgb3IgVEFCIHRvIHNhdmUuIEVTQyB0byB1bmRvLg==": function dHJhbnNsYXRpb25IZWxwX0NsaWNrIG91dHNpZGUgb3IgVEFCIHRvIHNhdmUuIEVTQyB0byB1bmRvLg(d) {
      return "Haz clic fuera o pulsa TAB para guardar. Pulsa ESC para deshacer.";
    },
    "Y29sdW1uVGl0bGVfTWVzc2FnZXM=": function Y29sdW1uVGl0bGVfTWVzc2FnZXM(d) {
      return "Mensajes";
    },
    "YnV0dG9uX1NhdmU=": function YnV0dG9uX1NhdmU(d) {
      return "Guardar";
    },
    "bXNnRGV0YWlsc1ZpZXdfdW50aWw=": function bXNnRGV0YWlsc1ZpZXdfdW50aWw(d) {
      return "hasta";
    },
    aGludF9BZGQgbGFuZ3VhZ2UgY29sdW1u: function aGludF9BZGQgbGFuZ3VhZ2UgY29sdW1u(d) {
      return "Añadir columna de idioma";
    },
    "aGludF9Db25maWd1cmUgTWFkeQ==": function aGludF9Db25maWd1cmUgTWFkeQ(d) {
      return "Configurar Mady";
    },
    "aGludF9FbmpveSB0cmFuc2xhdGluZyE=": function aGludF9FbmpveSB0cmFuc2xhdGluZyE(d) {
      return "¡Disfruta traduciendo!";
    },
    "dG9vbHRpcF9TZXR0aW5ncw==": function dG9vbHRpcF9TZXR0aW5ncw(d) {
      return "Ajustes";
    },
    dmFsaWRhdGlvbl90aGUgbnVtYmVyIG9mIGxlZnQgYW5kIHJpZ2h0IGJyYWNrZXRzIGRvZXMgbm90IG1hdGNo: function dmFsaWRhdGlvbl90aGUgbnVtYmVyIG9mIGxlZnQgYW5kIHJpZ2h0IGJyYWNrZXRzIGRvZXMgbm90IG1hdGNo(d) {
      return "el número de llaves abiertas y cerradas no coincide";
    },
    "dmFsaWRhdGlvbl9NZXNzYWdlRm9ybWF0IHN5bnRheCBlcnJvcg==": function dmFsaWRhdGlvbl9NZXNzYWdlRm9ybWF0IHN5bnRheCBlcnJvcg(d) {
      return "Error de sintaxis MessageFormat";
    },
    aGludF9Hb3QgaXQh: function aGludF9Hb3QgaXQh(d) {
      return "¡Entendido!";
    },
    "bXNnRGV0YWlsc1ZpZXdfRGV0YWlscw==": function bXNnRGV0YWlsc1ZpZXdfRGV0YWlscw(d) {
      return "Detalles";
    },
    "ZXJyb3JfQ2hhbmdlcyBjb3VsZCBub3QgYmUgc2F2ZWQ=": function ZXJyb3JfQ2hhbmdlcyBjb3VsZCBub3QgYmUgc2F2ZWQ(d) {
      return "No se pudieron guardar los cambios";
    },
    "ZXJyb3JfQ29uZmlndXJhdGlvbiBjb3VsZCBub3QgYmUgc2F2ZWQ=": function ZXJyb3JfQ29uZmlndXJhdGlvbiBjb3VsZCBub3QgYmUgc2F2ZWQ(d) {
      return "No se pudo guardar la configuración";
    },
    "ZXJyb3JfSXMgdGhlIHNlcnZlciBydW5uaW5nPw==": function ZXJyb3JfSXMgdGhlIHNlcnZlciBydW5uaW5nPw(d) {
      return "¿El servidor está funcionando?";
    },
    "c2V0dGluZ3NGb3JtX01lc3NhZ2UgdHJhbnNsYXRpb24gZnVuY3Rpb25zIHRvIGxvb2sgZm9yOg==": function c2V0dGluZ3NGb3JtX01lc3NhZ2UgdHJhbnNsYXRpb24gZnVuY3Rpb25zIHRvIGxvb2sgZm9yOg(d) {
      return "Funciones de traducción de mensajes a buscar:";
    },
    c29tZUNvbnRleHRfTWVzc2FnZSB3aXRoIGVtb2ppOiDwn46J: function c29tZUNvbnRleHRfTWVzc2FnZSB3aXRoIGVtb2ppOiDwn46J(d) {
      return "Mensaje con emoji: 🎉";
    },
    "c29tZUNvbnRleHRfQSB0b29sIGZvciBpbnRlcm5hdGlvbmFsaXphdGlvbg==": function c29tZUNvbnRleHRfQSB0b29sIGZvciBpbnRlcm5hdGlvbmFsaXphdGlvbg(d) {
      return "Una herramienta para la internacionalización";
    },
    "c29tZUNvbnRleHRfPGk+SGk8L2k+IDxiPntuYW1lfTwvYj4h": function c29tZUNvbnRleHRfPGkSGk8L2kIDxiPntuYW1lfTwvYj4h(d) {
      return "<i>Hola</i> <b>" + d.name + "</b>!";
    }
  };
};
module.exports = anonymous();
/* eslint-enable */