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
  httpVersion,
  // Request Target
  requestTarget,
  originForm,
  originFormTail,
  originFormTailEnvVar,
  absoluteForm,
  scheme,
  // Headers
  headerField,
  fieldName,
  fieldValue,
  // Message body
  messages,
  messageLine,
  inputFileRef,
  filePath,
  // Response handler
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
%}

#################
# Requests file #
#################

REQUESTS_FILE -> WHIT? (REQUEST_SEPARATOR):* REQUEST (REQUEST_WITH_SEPARATOR):* (REQUEST_SEPARATOR):* {% requestFile %}
REQUEST_WITH_SEPARATOR -> REQUEST_SEPARATOR:+ REQUEST {% nth(1) %}

###########
# Request #
###########

REQUEST -> REQUEST_LINE NEW_LINE LINE_COMMENT:* HEADERS NEW_LINE MESSAGE_BODY RESPONSE_HANDLER:? RESPONSE_REF:? {% request %}

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

REQUEST_TARGET -> (ORIGIN_FORM | ABSOLUTE_FORM | ASTERISK_FORM | ENV_VARIABLE) {% requestTarget %}


ORIGIN_FORM -> "/" ORIGIN_FORM_TAIL {% originForm %}

ORIGIN_FORM_TAIL -> null
                  | [^{}\s]:+ {% originFormTail %}
                  | [^{\s]:* (ENV_VARIABLE [^}\s]:*):+ {% originFormTailEnvVar %}

ABSOLUTE_FORM -> SCHEME "://" [^/\s]:+ ORIGIN_FORM:? {% absoluteForm %}

ASTERISK_FORM -> "*" {% id %}

SCHEME -> "http" {% id %}
        | "https" {% id %}
        | ENV_VARIABLE {% id %}

ENV_VARIABLE -> "{{" _ "$":? [a-zA-Z0-9_-]:+ _ "}}" {% envVariable %}


###########
# Headers #
###########

HEADERS -> (HEADER_FIELD NEW_LINE WHIT? {% id %}):* {% id %}
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

####################
# Response handler #
####################

RESPONSE_HANDLER -> ">" __ HANDLER_SCRIPT NEW_LINE:+ {% nth(2) %}
                  | ">" __ FILE_PATH NEW_LINE:+ {% responseHandlerFilePath %}

HANDLER_SCRIPT -> "{%" [\S\s]:+ "%}" {% handlerScript %}

######################
# Response reference #
######################

RESPONSE_REF -> "<>" __ FILE_PATH WHIT {% responseRef %}

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

# Whitespace with a comment
WHIT -> WHITRAW
      | WHITRAW? LINE_COMMENT WHIT?

# Optional whitespace with a comment
WHIT? -> null
       | WHIT

# Literally a string of whitespace
WHITRAW -> [\s]
         | WHITRAW [\s]

# A string of whitespace OR the empty string
WHITRAW? -> null
          | WHITRAW

############
# Comments #
############

LINE_COMMENT -> "#" LINE_TAIL {% lineComment %}
              | "//" LINE_TAIL {% lineComment %}

######################
# Request separators #
######################

REQUEST_SEPARATOR -> "###" WHIT? {% stubNull %}
                   | "### " LINE_TAIL WHIT? {% stubNull %}
