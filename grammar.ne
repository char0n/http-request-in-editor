@builtin "number.ne"

#################
# Requests file #
#################

REQUESTS_FILE ->
    REQUEST NEW_LINE:*
  | REQUEST_SEPARATOR:+ REQUEST NEW_LINE:*
  | REQUEST_SEPARATOR:+ REQUEST NEW_LINE:+ REQUESTS_FILE

###########
# Request #
###########

REQUEST -> REQUEST_LINE

################
# Request line #
################

REQUEST_LINE ->
    METHOD __ REQUEST_TARGET
  | METHOD __ REQUEST_TARGET __ HTTP_VERSION

METHOD ->
    "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "PATCH"
  | "OPTIONS"
  | "TRACE"

HTTP_VERSION -> "HTTP/" DIGIT:+ "." DIGIT:+ {% d => d[1] + "." + d[3] %}

##################
# Request target #
##################

REQUEST_TARGET -> INPUT_CHARACTER:+ {% d => d[0].join('') %}

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
_ -> WHITESPACE:* # optional whitespace
__ -> WHITESPACE:+ # required whitespace

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
    "###" NEW_LINE
  | "###" LINE_TAIL
