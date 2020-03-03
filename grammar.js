// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
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
    {"name": "REQUESTS_FILE", "symbols": ["REQUEST", "REQUESTS_FILE$ebnf$1"]},
    {"name": "REQUESTS_FILE$ebnf$2", "symbols": ["REQUEST_SEPARATOR"]},
    {"name": "REQUESTS_FILE$ebnf$2", "symbols": ["REQUESTS_FILE$ebnf$2", "REQUEST_SEPARATOR"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUESTS_FILE$ebnf$3", "symbols": []},
    {"name": "REQUESTS_FILE$ebnf$3", "symbols": ["REQUESTS_FILE$ebnf$3", "NEW_LINE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUESTS_FILE", "symbols": ["REQUESTS_FILE$ebnf$2", "REQUEST", "REQUESTS_FILE$ebnf$3"]},
    {"name": "REQUESTS_FILE$ebnf$4", "symbols": ["REQUEST_SEPARATOR"]},
    {"name": "REQUESTS_FILE$ebnf$4", "symbols": ["REQUESTS_FILE$ebnf$4", "REQUEST_SEPARATOR"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUESTS_FILE$ebnf$5", "symbols": ["NEW_LINE"]},
    {"name": "REQUESTS_FILE$ebnf$5", "symbols": ["REQUESTS_FILE$ebnf$5", "NEW_LINE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUESTS_FILE", "symbols": ["REQUESTS_FILE$ebnf$4", "REQUEST", "REQUESTS_FILE$ebnf$5", "REQUESTS_FILE"]},
    {"name": "REQUEST", "symbols": ["REQUEST_LINE"]},
    {"name": "REQUEST_LINE", "symbols": ["METHOD", "__", "REQUEST_TARGET"]},
    {"name": "REQUEST_LINE", "symbols": ["METHOD", "__", "REQUEST_TARGET", "__", "HTTP_VERSION"]},
    {"name": "METHOD$string$1", "symbols": [{"literal":"G"}, {"literal":"E"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$1"]},
    {"name": "METHOD$string$2", "symbols": [{"literal":"H"}, {"literal":"E"}, {"literal":"A"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$2"]},
    {"name": "METHOD$string$3", "symbols": [{"literal":"P"}, {"literal":"O"}, {"literal":"S"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$3"]},
    {"name": "METHOD$string$4", "symbols": [{"literal":"P"}, {"literal":"U"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$4"]},
    {"name": "METHOD$string$5", "symbols": [{"literal":"D"}, {"literal":"E"}, {"literal":"L"}, {"literal":"E"}, {"literal":"T"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$5"]},
    {"name": "METHOD$string$6", "symbols": [{"literal":"C"}, {"literal":"O"}, {"literal":"N"}, {"literal":"N"}, {"literal":"E"}, {"literal":"C"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$6"]},
    {"name": "METHOD$string$7", "symbols": [{"literal":"P"}, {"literal":"A"}, {"literal":"T"}, {"literal":"C"}, {"literal":"H"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$7"]},
    {"name": "METHOD$string$8", "symbols": [{"literal":"O"}, {"literal":"P"}, {"literal":"T"}, {"literal":"I"}, {"literal":"O"}, {"literal":"N"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$8"]},
    {"name": "METHOD$string$9", "symbols": [{"literal":"T"}, {"literal":"R"}, {"literal":"A"}, {"literal":"C"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "METHOD", "symbols": ["METHOD$string$9"]},
    {"name": "HTTP_VERSION$string$1", "symbols": [{"literal":"H"}, {"literal":"T"}, {"literal":"T"}, {"literal":"P"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "HTTP_VERSION$ebnf$1", "symbols": ["DIGIT"]},
    {"name": "HTTP_VERSION$ebnf$1", "symbols": ["HTTP_VERSION$ebnf$1", "DIGIT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "HTTP_VERSION$ebnf$2", "symbols": ["DIGIT"]},
    {"name": "HTTP_VERSION$ebnf$2", "symbols": ["HTTP_VERSION$ebnf$2", "DIGIT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "HTTP_VERSION", "symbols": ["HTTP_VERSION$string$1", "HTTP_VERSION$ebnf$1", {"literal":"."}, "HTTP_VERSION$ebnf$2"], "postprocess": d => d[1] + "." + d[3]},
    {"name": "REQUEST_TARGET$ebnf$1", "symbols": ["INPUT_CHARACTER"]},
    {"name": "REQUEST_TARGET$ebnf$1", "symbols": ["REQUEST_TARGET$ebnf$1", "INPUT_CHARACTER"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REQUEST_TARGET", "symbols": ["REQUEST_TARGET$ebnf$1"], "postprocess": d => d[0].join('')},
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
    {"name": "WHITESPACE", "symbols": ["SP"]},
    {"name": "WHITESPACE", "symbols": ["HT"]},
    {"name": "WHITESPACE", "symbols": ["FF"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "WHITESPACE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": ["WHITESPACE"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "WHITESPACE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "LINE_COMMENT$ebnf$1", "symbols": []},
    {"name": "LINE_COMMENT$ebnf$1", "symbols": ["LINE_COMMENT$ebnf$1", "INPUT_CHARACTER"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LINE_COMMENT", "symbols": [{"literal":"#"}, "__", "LINE_COMMENT$ebnf$1", "NEW_LINE"], "postprocess": d => d[2].join('')},
    {"name": "LINE_COMMENT$string$1", "symbols": [{"literal":"/"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LINE_COMMENT$ebnf$2", "symbols": []},
    {"name": "LINE_COMMENT$ebnf$2", "symbols": ["LINE_COMMENT$ebnf$2", "INPUT_CHARACTER"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LINE_COMMENT", "symbols": ["LINE_COMMENT$string$1", "__", "LINE_COMMENT$ebnf$2", "NEW_LINE"], "postprocess": d => d[2].join('')},
    {"name": "REQUEST_SEPARATOR$string$1", "symbols": [{"literal":"#"}, {"literal":"#"}, {"literal":"#"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "REQUEST_SEPARATOR", "symbols": ["REQUEST_SEPARATOR$string$1", "NEW_LINE"]},
    {"name": "REQUEST_SEPARATOR$string$2", "symbols": [{"literal":"#"}, {"literal":"#"}, {"literal":"#"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "REQUEST_SEPARATOR", "symbols": ["REQUEST_SEPARATOR$string$2", "LINE_TAIL"]}
]
  , ParserStart: "REQUESTS_FILE"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
