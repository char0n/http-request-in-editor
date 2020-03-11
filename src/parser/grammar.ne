@builtin "number.ne"
@{% const { request, requestLine, messages, messageLine, fieldValue } = require('./postprocessors');  %}

#################
# Requests file #
#################

REQUESTS_FILE -> NEW_LINE:* (REQUEST_SEPARATOR):* REQUEST (REQUEST_WITH_SEPARATOR):* (REQUEST_SEPARATOR):* {% d => [d[2], d[3]].flat(2) %}
REQUEST_WITH_SEPARATOR -> REQUEST_SEPARATOR:+ REQUEST {% d => d[1] %}

###########
# Request #
###########

REQUEST -> REQUEST_LINE NEW_LINE HEADERS NEW_LINE MESSAGES {% d => request(d[0], d[2], d[4]) %}

################
# Request line #
################

REQUEST_LINE -> (METHOD __ {% id %}):? REQUEST_TARGET (__ HTTP_VERSION {% d => d[1] %}):? {% requestLine %}


METHOD ->
    "GET" {% id %}
  | "HEAD" {% id %}
  | "POST" {% id %}
  | "PUT" {% id %}
  | "DELETE" {% id %}
  | "CONNECT" {% id %}
  | "PATCH" {% id %}
  | "OPTIONS" {% id %}
  | "TRACE" {% id %}

HTTP_VERSION -> "HTTP/" DIGIT:+ "." DIGIT:+ {% d => d[1].join('') + "." + d[3].join('') %}

##################
# Request target #
##################

REQUEST_TARGET -> [\S]:+ {% d => d[0].join('') %}

###########
# Headers #
###########

HEADERS -> (HEADER_FIELD NEW_LINE {% id %}):* {% id %}
HEADER_FIELD -> FIELD_NAME ":" _ FIELD_VALUE _ {% d => ({ name: d[0], value: d[3] }) %}
FIELD_NAME -> [^\r\n\:]:+ {% d => d[0].join('') %}
FIELD_VALUE ->
    INPUT_CHARACTER:* {% fieldValue %}
  | NEW_LINE_WITH_INDENT FIELD_VALUE {% d => d[1][0] %}

################
# Message body #
################

MESSAGE_BODY -> MESSAGES {% id %}
MESSAGES -> (MESSAGE_LINE NEW_LINE):* {% messages %}
MESSAGE_LINE ->
    INPUT_CHARACTER:* {% messageLine %}
  | INPUT_FILE_REF {% id %}

INPUT_FILE_REF -> "<" __ FILE_PATH {% d => d[0] + " " + d[2] %}
FILE_PATH -> INPUT_CHARACTER:+ {% d => d[0].join('') %}

################
# Base symbols #
################

INPUT_CHARACTER -> [^\r\n]
ALPHA -> [a-zA-Z]
DIGIT -> unsigned_int
IDENTIFIER_CHARACTER -> [_a-zA-Z0-9-]
IDENTIFIER -> IDENTIFIER_CHARACTER:+

####################
# Line terminators #
####################

CR -> [\r]
LF -> [\n]
CRLF -> CR LF
NEW_LINE ->
    CR
  | LF
  | CRLF
NEW_LINE_WITH_INDENT -> NEW_LINE __
LINE_TAIL -> INPUT_CHARACTER:* NEW_LINE {% d => d[0].join('') %}


###############
# Whitespaces #
###############

SP -> " "
HT -> [\t]
FF -> [\f]
WHITESPACE ->
    SP {% id %}
  | HT {% id %}
  | FF {% id %}
OPTIONAL_WHITESPACE -> WHITESPACE:* {% d => null %}
REQUIRED_WHITESPACE -> WHITESPACE:+ {% d => null %}
_ -> OPTIONAL_WHITESPACE {% d => null %}
__ -> REQUIRED_WHITESPACE {% d => null %}

######################
# Request separators #
######################

REQUEST_SEPARATOR ->
    "###" NEW_LINE:* {% () => null %}
  | "### " LINE_TAIL NEW_LINE:* {% d => null %}
