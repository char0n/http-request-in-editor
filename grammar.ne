@builtin "number.ne"

@{%
  const requestTarget = require('request-target');
  const parseRequestTarget = (method, url) => requestTarget({ method, url });
%}


#################
# Requests file #
#################

REQUESTS_FILE -> REQUEST_SEPARATOR:* REQUEST REQUEST_WITH_SEPARATOR:* REQUEST_SEPARATOR:* {% d => [{lineTail: d[0][0], ...d[1]}, d[2][0]] %}

REQUEST_WITH_SEPARATOR -> REQUEST_SEPARATOR:+ REQUEST {% d => ({ lineTail: '', ...d[1]}) %}

###########
# Request #
###########

REQUEST -> REQUEST_LINE NEW_LINE:* {% id %}

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

HTTP_VERSION -> "HTTP/" DIGIT:+ "." DIGIT:+ {% d => d[1] + "." + d[3] %}

##################
# Request target #
##################

REQUEST_TARGET -> [^WHITESPACE]:+ {% d => d[0].join('') %}

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
    SP
  | HT
  | FF
OPTIONAL_WHITESPACE -> WHITESPACE:*
REQUIRED_WHITESPACE -> WHITESPACE:+
_ -> OPTIONAL_WHITESPACE
__ -> REQUIRED_WHITESPACE

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
