// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
  function id(x) {
    return x[0];
  }

  const {
    // general postprocessors
    nth,
    stubNull,
    stringifyId,
    // Request file
    requestsFile,
    // Request
    request,
    // Request line
    requestLine,
    method,
    httpVersion,
    // Request Target
    requestTarget,
    originForm,
    absoluteForm,
    asteriskForm,
    scheme,
    hierPart,
    // Authority
    authority,
    port,
    host,
    ipv6Address,
    ipv4OrRegName,
    // Resource path
    absolutePath,
    pathSeparator,
    segment,
    // Query and Fragment
    query,
    fragment,
    // Headers
    headers,
    headerField,
    fieldName,
    fieldValue,
    // Message body
    messageBody,
    messages,
    messageLine,
    inputFileRef,
    filePath,
    // Response handler
    responseHandler,
    responseHandlerFilePath,
    handlerScript,
    // Response reference
    responseRef,
    // Line Terminators
    lineTail,
    // Comments
    lineComment,
    // Environment variables
    envVariable,
  } = require('./postprocessors');
  var grammar = {
    Lexer: undefined,
    ParserRules: [
      { name: 'unsigned_int$ebnf$1', symbols: [/[0-9]/] },
      {
        name: 'unsigned_int$ebnf$1',
        symbols: ['unsigned_int$ebnf$1', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'unsigned_int',
        symbols: ['unsigned_int$ebnf$1'],
        postprocess: function (d) {
          return parseInt(d[0].join(''));
        },
      },
      { name: 'int$ebnf$1$subexpression$1', symbols: [{ literal: '-' }] },
      { name: 'int$ebnf$1$subexpression$1', symbols: [{ literal: '+' }] },
      {
        name: 'int$ebnf$1',
        symbols: ['int$ebnf$1$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'int$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      { name: 'int$ebnf$2', symbols: [/[0-9]/] },
      {
        name: 'int$ebnf$2',
        symbols: ['int$ebnf$2', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'int',
        symbols: ['int$ebnf$1', 'int$ebnf$2'],
        postprocess: function (d) {
          if (d[0]) {
            return parseInt(d[0][0] + d[1].join(''));
          } else {
            return parseInt(d[1].join(''));
          }
        },
      },
      { name: 'unsigned_decimal$ebnf$1', symbols: [/[0-9]/] },
      {
        name: 'unsigned_decimal$ebnf$1',
        symbols: ['unsigned_decimal$ebnf$1', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1',
        symbols: [/[0-9]/],
      },
      {
        name: 'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1',
        symbols: ['unsigned_decimal$ebnf$2$subexpression$1$ebnf$1', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'unsigned_decimal$ebnf$2$subexpression$1',
        symbols: [
          { literal: '.' },
          'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1',
        ],
      },
      {
        name: 'unsigned_decimal$ebnf$2',
        symbols: ['unsigned_decimal$ebnf$2$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'unsigned_decimal$ebnf$2',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'unsigned_decimal',
        symbols: ['unsigned_decimal$ebnf$1', 'unsigned_decimal$ebnf$2'],
        postprocess: function (d) {
          return parseFloat(
            d[0].join('') + (d[1] ? '.' + d[1][1].join('') : '')
          );
        },
      },
      { name: 'decimal$ebnf$1', symbols: [{ literal: '-' }], postprocess: id },
      {
        name: 'decimal$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      { name: 'decimal$ebnf$2', symbols: [/[0-9]/] },
      {
        name: 'decimal$ebnf$2',
        symbols: ['decimal$ebnf$2', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: 'decimal$ebnf$3$subexpression$1$ebnf$1', symbols: [/[0-9]/] },
      {
        name: 'decimal$ebnf$3$subexpression$1$ebnf$1',
        symbols: ['decimal$ebnf$3$subexpression$1$ebnf$1', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'decimal$ebnf$3$subexpression$1',
        symbols: [{ literal: '.' }, 'decimal$ebnf$3$subexpression$1$ebnf$1'],
      },
      {
        name: 'decimal$ebnf$3',
        symbols: ['decimal$ebnf$3$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'decimal$ebnf$3',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'decimal',
        symbols: ['decimal$ebnf$1', 'decimal$ebnf$2', 'decimal$ebnf$3'],
        postprocess: function (d) {
          return parseFloat(
            (d[0] || '') + d[1].join('') + (d[2] ? '.' + d[2][1].join('') : '')
          );
        },
      },
      {
        name: 'percentage',
        symbols: ['decimal', { literal: '%' }],
        postprocess: function (d) {
          return d[0] / 100;
        },
      },
      {
        name: 'jsonfloat$ebnf$1',
        symbols: [{ literal: '-' }],
        postprocess: id,
      },
      {
        name: 'jsonfloat$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      { name: 'jsonfloat$ebnf$2', symbols: [/[0-9]/] },
      {
        name: 'jsonfloat$ebnf$2',
        symbols: ['jsonfloat$ebnf$2', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: 'jsonfloat$ebnf$3$subexpression$1$ebnf$1', symbols: [/[0-9]/] },
      {
        name: 'jsonfloat$ebnf$3$subexpression$1$ebnf$1',
        symbols: ['jsonfloat$ebnf$3$subexpression$1$ebnf$1', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'jsonfloat$ebnf$3$subexpression$1',
        symbols: [{ literal: '.' }, 'jsonfloat$ebnf$3$subexpression$1$ebnf$1'],
      },
      {
        name: 'jsonfloat$ebnf$3',
        symbols: ['jsonfloat$ebnf$3$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'jsonfloat$ebnf$3',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$1',
        symbols: [/[+-]/],
        postprocess: id,
      },
      {
        name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      { name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$2', symbols: [/[0-9]/] },
      {
        name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$2',
        symbols: ['jsonfloat$ebnf$4$subexpression$1$ebnf$2', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'jsonfloat$ebnf$4$subexpression$1',
        symbols: [
          /[eE]/,
          'jsonfloat$ebnf$4$subexpression$1$ebnf$1',
          'jsonfloat$ebnf$4$subexpression$1$ebnf$2',
        ],
      },
      {
        name: 'jsonfloat$ebnf$4',
        symbols: ['jsonfloat$ebnf$4$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'jsonfloat$ebnf$4',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'jsonfloat',
        symbols: [
          'jsonfloat$ebnf$1',
          'jsonfloat$ebnf$2',
          'jsonfloat$ebnf$3',
          'jsonfloat$ebnf$4',
        ],
        postprocess: function (d) {
          return parseFloat(
            (d[0] || '') +
              d[1].join('') +
              (d[2] ? '.' + d[2][1].join('') : '') +
              (d[3] ? 'e' + (d[3][1] || '+') + d[3][2].join('') : '')
          );
        },
      },
      { name: 'REQUESTS_FILE$ebnf$1', symbols: [] },
      {
        name: 'REQUESTS_FILE$ebnf$1$subexpression$1',
        symbols: ['REQUEST_SEPARATOR'],
      },
      {
        name: 'REQUESTS_FILE$ebnf$1',
        symbols: [
          'REQUESTS_FILE$ebnf$1',
          'REQUESTS_FILE$ebnf$1$subexpression$1',
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: 'REQUESTS_FILE$ebnf$2', symbols: [] },
      {
        name: 'REQUESTS_FILE$ebnf$2$subexpression$1',
        symbols: ['REQUEST_WITH_SEPARATOR'],
      },
      {
        name: 'REQUESTS_FILE$ebnf$2',
        symbols: [
          'REQUESTS_FILE$ebnf$2',
          'REQUESTS_FILE$ebnf$2$subexpression$1',
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: 'REQUESTS_FILE$ebnf$3', symbols: [] },
      {
        name: 'REQUESTS_FILE$ebnf$3$subexpression$1',
        symbols: ['REQUEST_SEPARATOR'],
      },
      {
        name: 'REQUESTS_FILE$ebnf$3',
        symbols: [
          'REQUESTS_FILE$ebnf$3',
          'REQUESTS_FILE$ebnf$3$subexpression$1',
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'REQUESTS_FILE',
        symbols: [
          'WHIT?',
          'REQUESTS_FILE$ebnf$1',
          'REQUEST',
          'REQUESTS_FILE$ebnf$2',
          'REQUESTS_FILE$ebnf$3',
        ],
        postprocess: requestsFile,
      },
      { name: 'REQUEST_WITH_SEPARATOR$ebnf$1', symbols: ['REQUEST_SEPARATOR'] },
      {
        name: 'REQUEST_WITH_SEPARATOR$ebnf$1',
        symbols: ['REQUEST_WITH_SEPARATOR$ebnf$1', 'REQUEST_SEPARATOR'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'REQUEST_WITH_SEPARATOR',
        symbols: ['REQUEST_WITH_SEPARATOR$ebnf$1', 'REQUEST'],
        postprocess: nth(1),
      },
      { name: 'REQUEST$ebnf$1', symbols: [] },
      {
        name: 'REQUEST$ebnf$1',
        symbols: ['REQUEST$ebnf$1', 'LINE_COMMENT'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'REQUEST$ebnf$2',
        symbols: ['RESPONSE_HANDLER'],
        postprocess: id,
      },
      {
        name: 'REQUEST$ebnf$2',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      { name: 'REQUEST$ebnf$3', symbols: ['RESPONSE_REF'], postprocess: id },
      {
        name: 'REQUEST$ebnf$3',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'REQUEST',
        symbols: [
          'REQUEST_LINE',
          'NEW_LINE',
          'REQUEST$ebnf$1',
          'HEADERS',
          'NEW_LINE',
          'MESSAGE_BODY',
          'REQUEST$ebnf$2',
          'REQUEST$ebnf$3',
        ],
        postprocess: request,
      },
      {
        name: 'REQUEST_LINE$ebnf$1$subexpression$1',
        symbols: ['METHOD', '__'],
        postprocess: method,
      },
      {
        name: 'REQUEST_LINE$ebnf$1',
        symbols: ['REQUEST_LINE$ebnf$1$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'REQUEST_LINE$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'REQUEST_LINE$ebnf$2$subexpression$1',
        symbols: ['__', 'HTTP_VERSION'],
        postprocess: nth(1),
      },
      {
        name: 'REQUEST_LINE$ebnf$2',
        symbols: ['REQUEST_LINE$ebnf$2$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'REQUEST_LINE$ebnf$2',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'REQUEST_LINE',
        symbols: [
          'REQUEST_LINE$ebnf$1',
          'REQUEST_TARGET',
          'REQUEST_LINE$ebnf$2',
        ],
        postprocess: requestLine,
      },
      {
        name: 'METHOD$string$1',
        symbols: [{ literal: 'G' }, { literal: 'E' }, { literal: 'T' }],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'METHOD', symbols: ['METHOD$string$1'], postprocess: id },
      {
        name: 'METHOD$string$2',
        symbols: [
          { literal: 'H' },
          { literal: 'E' },
          { literal: 'A' },
          { literal: 'D' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'METHOD', symbols: ['METHOD$string$2'], postprocess: id },
      {
        name: 'METHOD$string$3',
        symbols: [
          { literal: 'P' },
          { literal: 'O' },
          { literal: 'S' },
          { literal: 'T' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'METHOD', symbols: ['METHOD$string$3'], postprocess: id },
      {
        name: 'METHOD$string$4',
        symbols: [{ literal: 'P' }, { literal: 'U' }, { literal: 'T' }],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'METHOD', symbols: ['METHOD$string$4'], postprocess: id },
      {
        name: 'METHOD$string$5',
        symbols: [
          { literal: 'D' },
          { literal: 'E' },
          { literal: 'L' },
          { literal: 'E' },
          { literal: 'T' },
          { literal: 'E' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'METHOD', symbols: ['METHOD$string$5'], postprocess: id },
      {
        name: 'METHOD$string$6',
        symbols: [
          { literal: 'C' },
          { literal: 'O' },
          { literal: 'N' },
          { literal: 'N' },
          { literal: 'E' },
          { literal: 'C' },
          { literal: 'T' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'METHOD', symbols: ['METHOD$string$6'], postprocess: id },
      {
        name: 'METHOD$string$7',
        symbols: [
          { literal: 'P' },
          { literal: 'A' },
          { literal: 'T' },
          { literal: 'C' },
          { literal: 'H' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'METHOD', symbols: ['METHOD$string$7'], postprocess: id },
      {
        name: 'METHOD$string$8',
        symbols: [
          { literal: 'O' },
          { literal: 'P' },
          { literal: 'T' },
          { literal: 'I' },
          { literal: 'O' },
          { literal: 'N' },
          { literal: 'S' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'METHOD', symbols: ['METHOD$string$8'], postprocess: id },
      {
        name: 'METHOD$string$9',
        symbols: [
          { literal: 'T' },
          { literal: 'R' },
          { literal: 'A' },
          { literal: 'C' },
          { literal: 'E' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'METHOD', symbols: ['METHOD$string$9'], postprocess: id },
      {
        name: 'HTTP_VERSION$string$1',
        symbols: [
          { literal: 'H' },
          { literal: 'T' },
          { literal: 'T' },
          { literal: 'P' },
          { literal: '/' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      {
        name: 'HTTP_VERSION',
        symbols: ['HTTP_VERSION$string$1', 'DIGIT', { literal: '.' }, 'DIGIT'],
        postprocess: httpVersion,
      },
      { name: 'REQUEST_TARGET$subexpression$1', symbols: ['ORIGIN_FORM'] },
      { name: 'REQUEST_TARGET$subexpression$1', symbols: ['ABSOLUTE_FORM'] },
      { name: 'REQUEST_TARGET$subexpression$1', symbols: ['ASTERISK_FORM'] },
      {
        name: 'REQUEST_TARGET',
        symbols: ['REQUEST_TARGET$subexpression$1'],
        postprocess: requestTarget,
      },
      {
        name: 'ORIGIN_FORM$ebnf$1$subexpression$1',
        symbols: [{ literal: '?' }, 'QUERY'],
      },
      {
        name: 'ORIGIN_FORM$ebnf$1',
        symbols: ['ORIGIN_FORM$ebnf$1$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'ORIGIN_FORM$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'ORIGIN_FORM$ebnf$2$subexpression$1',
        symbols: [{ literal: '#' }, 'FRAGMENT'],
      },
      {
        name: 'ORIGIN_FORM$ebnf$2',
        symbols: ['ORIGIN_FORM$ebnf$2$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'ORIGIN_FORM$ebnf$2',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'ORIGIN_FORM',
        symbols: ['ABSOLUTE_PATH', 'ORIGIN_FORM$ebnf$1', 'ORIGIN_FORM$ebnf$2'],
        postprocess: originForm,
      },
      {
        name: 'ABSOLUTE_FORM$ebnf$1$subexpression$1$string$1',
        symbols: [{ literal: ':' }, { literal: '/' }, { literal: '/' }],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      {
        name: 'ABSOLUTE_FORM$ebnf$1$subexpression$1',
        symbols: ['SCHEME', 'ABSOLUTE_FORM$ebnf$1$subexpression$1$string$1'],
      },
      {
        name: 'ABSOLUTE_FORM$ebnf$1',
        symbols: ['ABSOLUTE_FORM$ebnf$1$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'ABSOLUTE_FORM$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'ABSOLUTE_FORM$ebnf$2$subexpression$1',
        symbols: [{ literal: '?' }, 'QUERY'],
      },
      {
        name: 'ABSOLUTE_FORM$ebnf$2',
        symbols: ['ABSOLUTE_FORM$ebnf$2$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'ABSOLUTE_FORM$ebnf$2',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'ABSOLUTE_FORM$ebnf$3$subexpression$1',
        symbols: [{ literal: '#' }, 'FRAGMENT'],
      },
      {
        name: 'ABSOLUTE_FORM$ebnf$3',
        symbols: ['ABSOLUTE_FORM$ebnf$3$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'ABSOLUTE_FORM$ebnf$3',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'ABSOLUTE_FORM',
        symbols: [
          'ABSOLUTE_FORM$ebnf$1',
          'HIER_PART',
          'ABSOLUTE_FORM$ebnf$2',
          'ABSOLUTE_FORM$ebnf$3',
        ],
        postprocess: absoluteForm,
      },
      {
        name: 'SCHEME$string$1',
        symbols: [
          { literal: 'h' },
          { literal: 't' },
          { literal: 't' },
          { literal: 'p' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'SCHEME', symbols: ['SCHEME$string$1'], postprocess: scheme },
      {
        name: 'SCHEME$string$2',
        symbols: [
          { literal: 'h' },
          { literal: 't' },
          { literal: 't' },
          { literal: 'p' },
          { literal: 's' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'SCHEME', symbols: ['SCHEME$string$2'], postprocess: scheme },
      { name: 'HIER_PART$ebnf$1', symbols: ['ABSOLUTE_PATH'], postprocess: id },
      {
        name: 'HIER_PART$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'HIER_PART',
        symbols: ['AUTHORITY', 'HIER_PART$ebnf$1'],
        postprocess: hierPart,
      },
      {
        name: 'ASTERISK_FORM',
        symbols: [{ literal: '*' }],
        postprocess: asteriskForm,
      },
      {
        name: 'AUTHORITY$ebnf$1$subexpression$1',
        symbols: [{ literal: ':' }, 'PORT'],
      },
      {
        name: 'AUTHORITY$ebnf$1',
        symbols: ['AUTHORITY$ebnf$1$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'AUTHORITY$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'AUTHORITY',
        symbols: ['HOST', 'AUTHORITY$ebnf$1'],
        postprocess: authority,
      },
      { name: 'PORT', symbols: ['DIGIT'], postprocess: port },
      {
        name: 'HOST$subexpression$1',
        symbols: [{ literal: '[' }, 'IPV6_ADDRESS', { literal: ']' }],
      },
      { name: 'HOST$subexpression$1', symbols: ['IPV4_OR_REG_NAME'] },
      { name: 'HOST', symbols: ['HOST$subexpression$1'], postprocess: host },
      { name: 'IPV6_ADDRESS$ebnf$1', symbols: [/[^\s/\]]/] },
      {
        name: 'IPV6_ADDRESS$ebnf$1',
        symbols: ['IPV6_ADDRESS$ebnf$1', /[^\s/\]]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'IPV6_ADDRESS',
        symbols: ['IPV6_ADDRESS$ebnf$1'],
        postprocess: ipv6Address,
      },
      { name: 'IPV4_OR_REG_NAME$ebnf$1', symbols: [/[^\s/:?#]/] },
      {
        name: 'IPV4_OR_REG_NAME$ebnf$1',
        symbols: ['IPV4_OR_REG_NAME$ebnf$1', /[^\s/:?#]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'IPV4_OR_REG_NAME',
        symbols: ['IPV4_OR_REG_NAME$ebnf$1'],
        postprocess: ipv4OrRegName,
      },
      {
        name: 'ABSOLUTE_PATH$ebnf$1$subexpression$1',
        symbols: ['PATH_SEPARATOR', 'SEGMENT'],
      },
      {
        name: 'ABSOLUTE_PATH$ebnf$1',
        symbols: ['ABSOLUTE_PATH$ebnf$1$subexpression$1'],
      },
      {
        name: 'ABSOLUTE_PATH$ebnf$1$subexpression$2',
        symbols: ['PATH_SEPARATOR', 'SEGMENT'],
      },
      {
        name: 'ABSOLUTE_PATH$ebnf$1',
        symbols: [
          'ABSOLUTE_PATH$ebnf$1',
          'ABSOLUTE_PATH$ebnf$1$subexpression$2',
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'ABSOLUTE_PATH',
        symbols: ['ABSOLUTE_PATH$ebnf$1'],
        postprocess: absolutePath,
      },
      {
        name: 'PATH_SEPARATOR$subexpression$1',
        symbols: [{ literal: '/' }],
        postprocess: id,
      },
      {
        name: 'PATH_SEPARATOR$subexpression$1',
        symbols: ['NEW_LINE_WITH_INDENT'],
        postprocess: () => '\n',
      },
      {
        name: 'PATH_SEPARATOR',
        symbols: ['PATH_SEPARATOR$subexpression$1'],
        postprocess: pathSeparator,
      },
      { name: 'SEGMENT$ebnf$1', symbols: [] },
      {
        name: 'SEGMENT$ebnf$1',
        symbols: ['SEGMENT$ebnf$1', /[^\r\n/?# ]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: 'SEGMENT', symbols: ['SEGMENT$ebnf$1'], postprocess: segment },
      { name: 'QUERY$ebnf$1', symbols: [] },
      {
        name: 'QUERY$ebnf$1',
        symbols: ['QUERY$ebnf$1', /[^\r\n\s#]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'QUERY$ebnf$2$subexpression$1',
        symbols: ['NEW_LINE_WITH_INDENT', 'QUERY'],
      },
      {
        name: 'QUERY$ebnf$2',
        symbols: ['QUERY$ebnf$2$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'QUERY$ebnf$2',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'QUERY',
        symbols: ['QUERY$ebnf$1', 'QUERY$ebnf$2'],
        postprocess: query,
      },
      { name: 'FRAGMENT$ebnf$1', symbols: [] },
      {
        name: 'FRAGMENT$ebnf$1',
        symbols: ['FRAGMENT$ebnf$1', /[^\r\n\s\?]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'FRAGMENT$ebnf$2$subexpression$1',
        symbols: ['NEW_LINE_WITH_INDENT', 'FRAGMENT'],
      },
      {
        name: 'FRAGMENT$ebnf$2',
        symbols: ['FRAGMENT$ebnf$2$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'FRAGMENT$ebnf$2',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'FRAGMENT',
        symbols: ['FRAGMENT$ebnf$1', 'FRAGMENT$ebnf$2'],
        postprocess: fragment,
      },
      { name: 'HEADERS$ebnf$1', symbols: [] },
      {
        name: 'HEADERS$ebnf$1$subexpression$1',
        symbols: ['HEADER_FIELD', 'NEW_LINE', 'WHIT?'],
        postprocess: id,
      },
      {
        name: 'HEADERS$ebnf$1',
        symbols: ['HEADERS$ebnf$1', 'HEADERS$ebnf$1$subexpression$1'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: 'HEADERS', symbols: ['HEADERS$ebnf$1'], postprocess: headers },
      {
        name: 'HEADER_FIELD',
        symbols: ['FIELD_NAME', { literal: ':' }, '_', 'FIELD_VALUE', '_'],
        postprocess: headerField,
      },
      { name: 'FIELD_NAME$ebnf$1', symbols: [/[^\r\n:]/] },
      {
        name: 'FIELD_NAME$ebnf$1',
        symbols: ['FIELD_NAME$ebnf$1', /[^\r\n:]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'FIELD_NAME',
        symbols: ['FIELD_NAME$ebnf$1'],
        postprocess: fieldName,
      },
      { name: 'FIELD_VALUE$ebnf$1', symbols: [] },
      {
        name: 'FIELD_VALUE$ebnf$1',
        symbols: ['FIELD_VALUE$ebnf$1', 'INPUT_CHARACTER'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'FIELD_VALUE',
        symbols: ['FIELD_VALUE$ebnf$1'],
        postprocess: fieldValue,
      },
      {
        name: 'FIELD_VALUE',
        symbols: ['NEW_LINE_WITH_INDENT', 'FIELD_VALUE'],
        postprocess: nth(1),
      },
      { name: 'MESSAGE_BODY', symbols: ['MESSAGES'], postprocess: messageBody },
      { name: 'MESSAGES$ebnf$1', symbols: [] },
      {
        name: 'MESSAGES$ebnf$1$subexpression$1',
        symbols: ['MESSAGE_LINE', 'NEW_LINE'],
        postprocess: id,
      },
      {
        name: 'MESSAGES$ebnf$1',
        symbols: ['MESSAGES$ebnf$1', 'MESSAGES$ebnf$1$subexpression$1'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: 'MESSAGES', symbols: ['MESSAGES$ebnf$1'], postprocess: messages },
      { name: 'MESSAGE_LINE$ebnf$1', symbols: [] },
      {
        name: 'MESSAGE_LINE$ebnf$1',
        symbols: ['MESSAGE_LINE$ebnf$1', 'INPUT_CHARACTER'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'MESSAGE_LINE',
        symbols: ['MESSAGE_LINE$ebnf$1'],
        postprocess: messageLine,
      },
      { name: 'MESSAGE_LINE', symbols: ['INPUT_FILE_REF'], postprocess: id },
      {
        name: 'INPUT_FILE_REF',
        symbols: [{ literal: '<' }, '__', 'FILE_PATH'],
        postprocess: inputFileRef,
      },
      { name: 'FILE_PATH$ebnf$1', symbols: ['INPUT_CHARACTER'] },
      {
        name: 'FILE_PATH$ebnf$1',
        symbols: ['FILE_PATH$ebnf$1', 'INPUT_CHARACTER'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'FILE_PATH',
        symbols: ['FILE_PATH$ebnf$1'],
        postprocess: filePath,
      },
      {
        name: 'RESPONSE_HANDLER$subexpression$1$ebnf$1',
        symbols: ['NEW_LINE'],
      },
      {
        name: 'RESPONSE_HANDLER$subexpression$1$ebnf$1',
        symbols: ['RESPONSE_HANDLER$subexpression$1$ebnf$1', 'NEW_LINE'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'RESPONSE_HANDLER$subexpression$1',
        symbols: [
          { literal: '>' },
          '__',
          'HANDLER_SCRIPT',
          'RESPONSE_HANDLER$subexpression$1$ebnf$1',
        ],
        postprocess: nth(2),
      },
      {
        name: 'RESPONSE_HANDLER$subexpression$1$ebnf$2',
        symbols: ['NEW_LINE'],
      },
      {
        name: 'RESPONSE_HANDLER$subexpression$1$ebnf$2',
        symbols: ['RESPONSE_HANDLER$subexpression$1$ebnf$2', 'NEW_LINE'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'RESPONSE_HANDLER$subexpression$1',
        symbols: [
          { literal: '>' },
          '__',
          'FILE_PATH',
          'RESPONSE_HANDLER$subexpression$1$ebnf$2',
        ],
        postprocess: responseHandlerFilePath,
      },
      {
        name: 'RESPONSE_HANDLER',
        symbols: ['RESPONSE_HANDLER$subexpression$1'],
        postprocess: responseHandler,
      },
      {
        name: 'HANDLER_SCRIPT$string$1',
        symbols: [{ literal: '{' }, { literal: '%' }],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      { name: 'HANDLER_SCRIPT$ebnf$1', symbols: [/[\S\s]/] },
      {
        name: 'HANDLER_SCRIPT$ebnf$1',
        symbols: ['HANDLER_SCRIPT$ebnf$1', /[\S\s]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'HANDLER_SCRIPT$string$2',
        symbols: [{ literal: '%' }, { literal: '}' }],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      {
        name: 'HANDLER_SCRIPT',
        symbols: [
          'HANDLER_SCRIPT$string$1',
          'HANDLER_SCRIPT$ebnf$1',
          'HANDLER_SCRIPT$string$2',
        ],
        postprocess: handlerScript,
      },
      {
        name: 'RESPONSE_REF$string$1',
        symbols: [{ literal: '<' }, { literal: '>' }],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      {
        name: 'RESPONSE_REF',
        symbols: ['RESPONSE_REF$string$1', '__', 'FILE_PATH', 'WHIT'],
        postprocess: responseRef,
      },
      { name: 'INPUT_CHARACTER', symbols: [/[^\r\n]/] },
      { name: 'ALPHA', symbols: [/[a-zA-Z]/] },
      { name: 'DIGIT', symbols: ['unsigned_int'] },
      { name: 'IDENTIFIER_CHARACTER', symbols: [/[_a-zA-Z0-9-]/] },
      { name: 'IDENTIFIER$ebnf$1', symbols: ['IDENTIFIER_CHARACTER'] },
      {
        name: 'IDENTIFIER$ebnf$1',
        symbols: ['IDENTIFIER$ebnf$1', 'IDENTIFIER_CHARACTER'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: 'IDENTIFIER', symbols: ['IDENTIFIER$ebnf$1'] },
      { name: 'CR', symbols: [/[\r]/] },
      { name: 'LF', symbols: [/[\n]/] },
      { name: 'CRLF', symbols: ['CR', 'LF'] },
      { name: 'NEW_LINE', symbols: ['CR'] },
      { name: 'NEW_LINE', symbols: ['LF'] },
      { name: 'NEW_LINE', symbols: ['CRLF'] },
      {
        name: 'NEW_LINE_WITH_INDENT',
        symbols: ['NEW_LINE', '__'],
        postprocess: stubNull,
      },
      { name: 'LINE_TAIL$ebnf$1', symbols: [] },
      {
        name: 'LINE_TAIL$ebnf$1',
        symbols: ['LINE_TAIL$ebnf$1', 'INPUT_CHARACTER'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'LINE_TAIL',
        symbols: ['LINE_TAIL$ebnf$1', 'NEW_LINE'],
        postprocess: lineTail,
      },
      { name: 'SP', symbols: [{ literal: ' ' }] },
      { name: 'HT', symbols: [/[\t]/] },
      { name: 'FF', symbols: [/[\f]/] },
      { name: 'WHITESPACE', symbols: ['SP'], postprocess: id },
      { name: 'WHITESPACE', symbols: ['HT'], postprocess: id },
      { name: 'WHITESPACE', symbols: ['FF'], postprocess: id },
      { name: 'OPTIONAL_WHITESPACE$ebnf$1', symbols: [] },
      {
        name: 'OPTIONAL_WHITESPACE$ebnf$1',
        symbols: ['OPTIONAL_WHITESPACE$ebnf$1', 'WHITESPACE'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'OPTIONAL_WHITESPACE',
        symbols: ['OPTIONAL_WHITESPACE$ebnf$1'],
        postprocess: stubNull,
      },
      { name: 'REQUIRED_WHITESPACE$ebnf$1', symbols: ['WHITESPACE'] },
      {
        name: 'REQUIRED_WHITESPACE$ebnf$1',
        symbols: ['REQUIRED_WHITESPACE$ebnf$1', 'WHITESPACE'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'REQUIRED_WHITESPACE',
        symbols: ['REQUIRED_WHITESPACE$ebnf$1'],
        postprocess: stubNull,
      },
      { name: '_', symbols: ['OPTIONAL_WHITESPACE'], postprocess: stubNull },
      { name: '__', symbols: ['REQUIRED_WHITESPACE'], postprocess: stubNull },
      { name: 'WHIT', symbols: ['WHITRAW'] },
      { name: 'WHIT', symbols: ['WHITRAW?', 'LINE_COMMENT', 'WHIT?'] },
      { name: 'WHIT?', symbols: [] },
      { name: 'WHIT?', symbols: ['WHIT'] },
      { name: 'WHITRAW', symbols: [/[\s]/] },
      { name: 'WHITRAW', symbols: ['WHITRAW', /[\s]/] },
      { name: 'WHITRAW?', symbols: [] },
      { name: 'WHITRAW?', symbols: ['WHITRAW'] },
      {
        name: 'LINE_COMMENT',
        symbols: [{ literal: '#' }, 'LINE_TAIL'],
        postprocess: lineComment,
      },
      {
        name: 'LINE_COMMENT$string$1',
        symbols: [{ literal: '/' }, { literal: '/' }],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      {
        name: 'LINE_COMMENT',
        symbols: ['LINE_COMMENT$string$1', 'LINE_TAIL'],
        postprocess: lineComment,
      },
      {
        name: 'REQUEST_SEPARATOR$string$1',
        symbols: [{ literal: '#' }, { literal: '#' }, { literal: '#' }],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      {
        name: 'REQUEST_SEPARATOR',
        symbols: ['REQUEST_SEPARATOR$string$1', 'NEW_LINE', 'WHIT?'],
        postprocess: stubNull,
      },
      {
        name: 'REQUEST_SEPARATOR$string$2',
        symbols: [
          { literal: '#' },
          { literal: '#' },
          { literal: '#' },
          { literal: ' ' },
        ],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      {
        name: 'REQUEST_SEPARATOR',
        symbols: ['REQUEST_SEPARATOR$string$2', 'LINE_TAIL', 'WHIT?'],
        postprocess: stubNull,
      },
      {
        name: 'ENV_VARIABLE$string$1',
        symbols: [{ literal: '{' }, { literal: '{' }],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      {
        name: 'ENV_VARIABLE$ebnf$1',
        symbols: [{ literal: '$' }],
        postprocess: id,
      },
      {
        name: 'ENV_VARIABLE$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'ENV_VARIABLE$string$2',
        symbols: [{ literal: '}' }, { literal: '}' }],
        postprocess: function joiner(d) {
          return d.join('');
        },
      },
      {
        name: 'ENV_VARIABLE',
        symbols: [
          'ENV_VARIABLE$string$1',
          '_',
          'ENV_VARIABLE$ebnf$1',
          'IDENTIFIER',
          '_',
          'ENV_VARIABLE$string$2',
        ],
        postprocess: envVariable,
      },
    ],
    ParserStart: 'REQUESTS_FILE',
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
