// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
 const { request, requestLine, messages, messageLine, fieldValue } = require('./postprocessors');  var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "REQUESTS_FILE$ebnf$1", "symbols": []},
    {"name": "REQUESTS_FILE$ebnf$1", "symbols": ["REQUESTS_FILE$ebnf$1", "NEW_LINE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUESTS_FILE$ebnf$2", "symbols": []},
    {"name": "REQUESTS_FILE$ebnf$2$subexpression$1", "symbols": ["REQUEST_SEPARATOR"]},
    {"name": "REQUESTS_FILE$ebnf$2", "symbols": ["REQUESTS_FILE$ebnf$2", "REQUESTS_FILE$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUESTS_FILE$ebnf$3", "symbols": []},
    {"name": "REQUESTS_FILE$ebnf$3$subexpression$1", "symbols": ["REQUEST_WITH_SEPARATOR"]},
    {"name": "REQUESTS_FILE$ebnf$3", "symbols": ["REQUESTS_FILE$ebnf$3", "REQUESTS_FILE$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUESTS_FILE$ebnf$4", "symbols": []},
    {"name": "REQUESTS_FILE$ebnf$4$subexpression$1", "symbols": ["REQUEST_SEPARATOR"]},
    {"name": "REQUESTS_FILE$ebnf$4", "symbols": ["REQUESTS_FILE$ebnf$4", "REQUESTS_FILE$ebnf$4$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUESTS_FILE", "symbols": ["REQUESTS_FILE$ebnf$1", "REQUESTS_FILE$ebnf$2", "REQUEST", "REQUESTS_FILE$ebnf$3", "REQUESTS_FILE$ebnf$4"], "postprocess": d => [d[2], d[3]].flat(2)},
    {"name": "REQUEST_WITH_SEPARATOR$ebnf$1", "symbols": ["REQUEST_SEPARATOR"]},
    {"name": "REQUEST_WITH_SEPARATOR$ebnf$1", "symbols": ["REQUEST_WITH_SEPARATOR$ebnf$1", "REQUEST_SEPARATOR"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUEST_WITH_SEPARATOR", "symbols": ["REQUEST_WITH_SEPARATOR$ebnf$1", "REQUEST"], "postprocess": d => d[1]},
    {"name": "REQUEST", "symbols": ["REQUEST_LINE", "NEW_LINE", "HEADERS", "NEW_LINE", "MESSAGES"], "postprocess": d => request(d[0], d[2], d[4])},
    {"name": "REQUEST_LINE$ebnf$1$subexpression$1", "symbols": ["METHOD", "__"], "postprocess": id},
    {"name": "REQUEST_LINE$ebnf$1", "symbols": ["REQUEST_LINE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "REQUEST_LINE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "REQUEST_LINE$ebnf$2$subexpression$1", "symbols": ["__", "HTTP_VERSION"], "postprocess": d => d[1]},
    {"name": "REQUEST_LINE$ebnf$2", "symbols": ["REQUEST_LINE$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "REQUEST_LINE$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "REQUEST_LINE", "symbols": ["REQUEST_LINE$ebnf$1", "REQUEST_TARGET", "REQUEST_LINE$ebnf$2"], "postprocess": requestLine},
    {"name": "METHOD$string$1", "symbols": [{"literal":"G"}, {"literal":"E"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$1"], "postprocess": id},
    {"name": "METHOD$string$2", "symbols": [{"literal":"H"}, {"literal":"E"}, {"literal":"A"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$2"], "postprocess": id},
    {"name": "METHOD$string$3", "symbols": [{"literal":"P"}, {"literal":"O"}, {"literal":"S"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$3"], "postprocess": id},
    {"name": "METHOD$string$4", "symbols": [{"literal":"P"}, {"literal":"U"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$4"], "postprocess": id},
    {"name": "METHOD$string$5", "symbols": [{"literal":"D"}, {"literal":"E"}, {"literal":"L"}, {"literal":"E"}, {"literal":"T"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$5"], "postprocess": id},
    {"name": "METHOD$string$6", "symbols": [{"literal":"C"}, {"literal":"O"}, {"literal":"N"}, {"literal":"N"}, {"literal":"E"}, {"literal":"C"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$6"], "postprocess": id},
    {"name": "METHOD$string$7", "symbols": [{"literal":"P"}, {"literal":"A"}, {"literal":"T"}, {"literal":"C"}, {"literal":"H"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$7"], "postprocess": id},
    {"name": "METHOD$string$8", "symbols": [{"literal":"O"}, {"literal":"P"}, {"literal":"T"}, {"literal":"I"}, {"literal":"O"}, {"literal":"N"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$8"], "postprocess": id},
    {"name": "METHOD$string$9", "symbols": [{"literal":"T"}, {"literal":"R"}, {"literal":"A"}, {"literal":"C"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$9"], "postprocess": id},
    {"name": "HTTP_VERSION$string$1", "symbols": [{"literal":"H"}, {"literal":"T"}, {"literal":"T"}, {"literal":"P"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "HTTP_VERSION$ebnf$1", "symbols": ["DIGIT"]},
    {"name": "HTTP_VERSION$ebnf$1", "symbols": ["HTTP_VERSION$ebnf$1", "DIGIT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "HTTP_VERSION$ebnf$2", "symbols": ["DIGIT"]},
    {"name": "HTTP_VERSION$ebnf$2", "symbols": ["HTTP_VERSION$ebnf$2", "DIGIT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "HTTP_VERSION", "symbols": ["HTTP_VERSION$string$1", "HTTP_VERSION$ebnf$1", {"literal":"."}, "HTTP_VERSION$ebnf$2"], "postprocess": d => d[1].join('') + "." + d[3].join('')},
    {"name": "REQUEST_TARGET$ebnf$1", "symbols": [/[\S]/]},
    {"name": "REQUEST_TARGET$ebnf$1", "symbols": ["REQUEST_TARGET$ebnf$1", /[\S]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUEST_TARGET", "symbols": ["REQUEST_TARGET$ebnf$1"], "postprocess": d => d[0].join('')},
    {"name": "HEADERS$ebnf$1", "symbols": []},
    {"name": "HEADERS$ebnf$1$subexpression$1", "symbols": ["HEADER_FIELD", "NEW_LINE"], "postprocess": id},
    {"name": "HEADERS$ebnf$1", "symbols": ["HEADERS$ebnf$1", "HEADERS$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "HEADERS", "symbols": ["HEADERS$ebnf$1"], "postprocess": id},
    {"name": "HEADER_FIELD", "symbols": ["FIELD_NAME", {"literal":":"}, "_", "FIELD_VALUE", "_"], "postprocess": d => ({ name: d[0], value: d[3] })},
    {"name": "FIELD_NAME$ebnf$1", "symbols": [/[^\r\n\:]/]},
    {"name": "FIELD_NAME$ebnf$1", "symbols": ["FIELD_NAME$ebnf$1", /[^\r\n\:]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "FIELD_NAME", "symbols": ["FIELD_NAME$ebnf$1"], "postprocess": d => d[0].join('')},
    {"name": "FIELD_VALUE$ebnf$1", "symbols": []},
    {"name": "FIELD_VALUE$ebnf$1", "symbols": ["FIELD_VALUE$ebnf$1", "INPUT_CHARACTER"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "FIELD_VALUE", "symbols": ["FIELD_VALUE$ebnf$1"], "postprocess": fieldValue},
    {"name": "FIELD_VALUE", "symbols": ["NEW_LINE_WITH_INDENT", "FIELD_VALUE"], "postprocess": d => d[1][0]},
    {"name": "MESSAGE_BODY", "symbols": ["MESSAGES"], "postprocess": id},
    {"name": "MESSAGES$ebnf$1", "symbols": []},
    {"name": "MESSAGES$ebnf$1$subexpression$1", "symbols": ["MESSAGE_LINE", "NEW_LINE"]},
    {"name": "MESSAGES$ebnf$1", "symbols": ["MESSAGES$ebnf$1", "MESSAGES$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "MESSAGES", "symbols": ["MESSAGES$ebnf$1"], "postprocess": messages},
    {"name": "MESSAGE_LINE$ebnf$1", "symbols": []},
    {"name": "MESSAGE_LINE$ebnf$1", "symbols": ["MESSAGE_LINE$ebnf$1", "INPUT_CHARACTER"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "MESSAGE_LINE", "symbols": ["MESSAGE_LINE$ebnf$1"], "postprocess": messageLine},
    {"name": "MESSAGE_LINE", "symbols": ["INPUT_FILE_REF"], "postprocess": id},
    {"name": "INPUT_FILE_REF", "symbols": [{"literal":"<"}, "__", "FILE_PATH"], "postprocess": d => d[0] + " " + d[2]},
    {"name": "FILE_PATH$ebnf$1", "symbols": ["INPUT_CHARACTER"]},
    {"name": "FILE_PATH$ebnf$1", "symbols": ["FILE_PATH$ebnf$1", "INPUT_CHARACTER"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "FILE_PATH", "symbols": ["FILE_PATH$ebnf$1"], "postprocess": d => d[0].join('')},
    {"name": "INPUT_CHARACTER", "symbols": [/[^\r\n]/]},
    {"name": "ALPHA", "symbols": [/[a-zA-Z]/]},
    {"name": "DIGIT", "symbols": ["unsigned_int"]},
    {"name": "IDENTIFIER_CHARACTER", "symbols": [/[_a-zA-Z0-9-]/]},
    {"name": "IDENTIFIER$ebnf$1", "symbols": ["IDENTIFIER_CHARACTER"]},
    {"name": "IDENTIFIER$ebnf$1", "symbols": ["IDENTIFIER$ebnf$1", "IDENTIFIER_CHARACTER"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "IDENTIFIER", "symbols": ["IDENTIFIER$ebnf$1"]},
    {"name": "CR", "symbols": [/[\r]/]},
    {"name": "LF", "symbols": [/[\n]/]},
    {"name": "CRLF", "symbols": ["CR", "LF"]},
    {"name": "NEW_LINE", "symbols": ["CR"]},
    {"name": "NEW_LINE", "symbols": ["LF"]},
    {"name": "NEW_LINE", "symbols": ["CRLF"]},
    {"name": "NEW_LINE_WITH_INDENT", "symbols": ["NEW_LINE", "__"]},
    {"name": "LINE_TAIL$ebnf$1", "symbols": []},
    {"name": "LINE_TAIL$ebnf$1", "symbols": ["LINE_TAIL$ebnf$1", "INPUT_CHARACTER"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LINE_TAIL", "symbols": ["LINE_TAIL$ebnf$1", "NEW_LINE"], "postprocess": d => d[0].join('')},
    {"name": "SP", "symbols": [{"literal":" "}]},
    {"name": "HT", "symbols": [/[\t]/]},
    {"name": "FF", "symbols": [/[\f]/]},
    {"name": "WHITESPACE", "symbols": ["SP"], "postprocess": id},
    {"name": "WHITESPACE", "symbols": ["HT"], "postprocess": id},
    {"name": "WHITESPACE", "symbols": ["FF"], "postprocess": id},
    {"name": "OPTIONAL_WHITESPACE$ebnf$1", "symbols": []},
    {"name": "OPTIONAL_WHITESPACE$ebnf$1", "symbols": ["OPTIONAL_WHITESPACE$ebnf$1", "WHITESPACE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "OPTIONAL_WHITESPACE", "symbols": ["OPTIONAL_WHITESPACE$ebnf$1"], "postprocess": d => null},
    {"name": "REQUIRED_WHITESPACE$ebnf$1", "symbols": ["WHITESPACE"]},
    {"name": "REQUIRED_WHITESPACE$ebnf$1", "symbols": ["REQUIRED_WHITESPACE$ebnf$1", "WHITESPACE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUIRED_WHITESPACE", "symbols": ["REQUIRED_WHITESPACE$ebnf$1"], "postprocess": d => null},
    {"name": "_", "symbols": ["OPTIONAL_WHITESPACE"], "postprocess": d => null},
    {"name": "__", "symbols": ["REQUIRED_WHITESPACE"], "postprocess": d => null},
    {"name": "REQUEST_SEPARATOR$string$1", "symbols": [{"literal":"#"}, {"literal":"#"}, {"literal":"#"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "REQUEST_SEPARATOR$ebnf$1", "symbols": []},
    {"name": "REQUEST_SEPARATOR$ebnf$1", "symbols": ["REQUEST_SEPARATOR$ebnf$1", "NEW_LINE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUEST_SEPARATOR", "symbols": ["REQUEST_SEPARATOR$string$1", "REQUEST_SEPARATOR$ebnf$1"], "postprocess": () => null},
    {"name": "REQUEST_SEPARATOR$string$2", "symbols": [{"literal":"#"}, {"literal":"#"}, {"literal":"#"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "REQUEST_SEPARATOR$ebnf$2", "symbols": []},
    {"name": "REQUEST_SEPARATOR$ebnf$2", "symbols": ["REQUEST_SEPARATOR$ebnf$2", "NEW_LINE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUEST_SEPARATOR", "symbols": ["REQUEST_SEPARATOR$string$2", "LINE_TAIL", "REQUEST_SEPARATOR$ebnf$2"], "postprocess": d => null}
]
  , ParserStart: "REQUESTS_FILE"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
