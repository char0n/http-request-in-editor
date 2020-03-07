@builtin "number.ne"

@{%
  const requestTarget = require('request-target');
  const parseRequestTarget = (method, url) => requestTarget({ method, url });
%}


#################
# Requests file #
#################

REQUESTS_FILE ->
    REQUEST  {% id %}
  | REQUEST_WITH_SEPARATOR:+ {% id %}
REQUEST_WITH_SEPARATOR -> REQUEST_SEPARATOR:+ REQUEST

###########
# Request #
###########

REQUEST ->
  REQUEST_LINE NEW_LINE:* {% d => d[0] %}
  | REQUEST_LINE NEW_LINE HEADERS NEW_LINE:* {% d => ({ ...d[0], headers: d[2] }) %}

################
# Request line #
################

REQUEST_LINE ->
    METHOD __ REQUEST_TARGET {% d => ({ method: d[0], requestTarget: parseRequestTarget(d[0], d[2]) }) %}
  | METHOD __ REQUEST_TARGET __ HTTP_VERSION {% d => ({ method: d[0], requestTarget: parseRequestTarget(d[0], d[2]), httpVersion: d[4] }) %}

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

HEADERS -> HEADER_FIELD:* {% d => d[0] %}
HEADER_FIELD -> FIELD_NAME ":" FIELD_VALUE {% d => ({ name: d[0], value: d[2] }) %}
FIELD_NAME -> [^\r\n\:]:+ {% d => d[0].join('') %}
FIELD_VALUE ->
  LINE_TAIL {% d => d[0].trim() %}
 | NEW_LINE_WITH_INDENT FIELD_VALUE {% d => d[1][0] %}

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

############
# Comments #
############
# NOT YET SUPPORTED

LINE_COMMENT ->
    "#" __ INPUT_CHARACTER:* NEW_LINE {% d => d[2].join('') %}
  | "//" __ INPUT_CHARACTER:* NEW_LINE {% d => d[2].join('') %}

######################
# Request separators #
######################

REQUEST_SEPARATOR ->
    "###" NEW_LINE {% () => '' %}
  | "### " LINE_TAIL {% d => d[1] %}
