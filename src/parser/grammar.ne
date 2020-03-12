@builtin "number.ne"
@{%
const {
  // general postprocessors
  nth,
  stubNull,
  // Request file
  requestFile,
  // Request
  request,
  // Request line
  requestLine,
  requestTarget,
  originForm,
  absoluteForm,
  httpVersion,
  // Headers
  headerField,
  fieldName,
  fieldValue,
  // Message body
  messages,
  messageLine,
  inputFileRef,
  filePath,
  // Response reference
  responseRef,
  // Line Terminators
  lineTail,
} = require('./postprocessors');
%}

#################
# Requests file #
#################

REQUESTS_FILE -> NEW_LINE:* (REQUEST_SEPARATOR):* REQUEST (REQUEST_WITH_SEPARATOR):* (REQUEST_SEPARATOR):* {% requestFile %}
REQUEST_WITH_SEPARATOR -> REQUEST_SEPARATOR:+ REQUEST {% nth(1) %}

###########
# Request #
###########

REQUEST -> REQUEST_LINE NEW_LINE HEADERS NEW_LINE MESSAGE_BODY RESPONSE_REF:? {% request %}

################
# Request line #
################

REQUEST_LINE -> (METHOD __ {% id %}):? REQUEST_TARGET (__ HTTP_VERSION {% nth(1) %}):? {% requestLine %}


METHOD -> "GET" {% id %}
        | "HEAD" {% id %}
        | "POST" {% id %}
        | "PUT" {% id %}
        | "DELETE" {% id %}
        | "CONNECT" {% id %}
        | "PATCH" {% id %}
        | "OPTIONS" {% id %}
        | "TRACE" {% id %}

HTTP_VERSION -> "HTTP/" DIGIT:+ "." DIGIT:+ {% httpVersion %}

##################
# Request target #
##################

REQUEST_TARGET -> (ORIGIN_FORM | ABSOLUTE_FORM | ASTERISK_FORM) {% requestTarget %}

ORIGIN_FORM -> "/" [\S]:+ {% originForm %}
ABSOLUTE_FORM -> SCHEME "://" [\S]:+ {% absoluteForm %}
ASTERISK_FORM -> "*" {% id %}
SCHEME -> ("http" | "https") {% id %}


###########
# Headers #
###########

HEADERS -> (HEADER_FIELD NEW_LINE {% id %}):* {% id %}
HEADER_FIELD -> FIELD_NAME ":" _ FIELD_VALUE _ {% headerField %}
FIELD_NAME -> [^\r\n\:]:+ {% fieldName %}
FIELD_VALUE -> INPUT_CHARACTER:* {% fieldValue %}
             | NEW_LINE_WITH_INDENT FIELD_VALUE {% d => d[1][0] %}

################
# Message body #
################

MESSAGE_BODY -> MESSAGES {% id %}
MESSAGES -> (MESSAGE_LINE NEW_LINE):* {% messages %}
MESSAGE_LINE -> INPUT_CHARACTER:* {% messageLine %}
              | INPUT_FILE_REF {% id %}

INPUT_FILE_REF -> "<" __ FILE_PATH {% inputFileRef %}

FILE_PATH -> INPUT_CHARACTER:+ {% filePath %}

######################
# Response reference #
######################

RESPONSE_REF -> "<>" __ FILE_PATH NEW_LINE:+ {% responseRef %}

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
NEW_LINE -> CR
          | LF
          | CRLF
NEW_LINE_WITH_INDENT -> NEW_LINE __
LINE_TAIL -> INPUT_CHARACTER:* NEW_LINE {% lineTail %}


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
OPTIONAL_WHITESPACE -> WHITESPACE:* {% stubNull %}
REQUIRED_WHITESPACE -> WHITESPACE:+ {% stubNull %}
_ -> OPTIONAL_WHITESPACE {% stubNull %}
__ -> REQUIRED_WHITESPACE {% stubNull %}

######################
# Request separators #
######################

REQUEST_SEPARATOR -> "###" NEW_LINE:* {% stubNull %}
                   | "### " LINE_TAIL NEW_LINE:* {% stubNull %}
