@builtin "number.ne"
@{%
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
  querySegment,
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
  envVariableStatic,
  envVariableDynamic,
} = require('./postprocessors');
%}

#################
# Requests file #
#################

REQUESTS_FILE -> WHIT? (REQUEST_SEPARATOR):* REQUEST (REQUEST_WITH_SEPARATOR):* (REQUEST_SEPARATOR):* {% requestsFile %}
REQUEST_WITH_SEPARATOR -> REQUEST_SEPARATOR:+ REQUEST {% nth(1) %}

###########
# Request #
###########

REQUEST -> REQUEST_LINE NEW_LINE LINE_COMMENT:* HEADERS NEW_LINE MESSAGE_BODY RESPONSE_HANDLER:? RESPONSE_REF:? {% request %}

################
# Request line #
################

REQUEST_LINE -> (METHOD __ {% method %}):? REQUEST_TARGET (__ HTTP_VERSION {% nth(1) %}):? {% requestLine %}


METHOD -> "GET" {% id %}
        | "HEAD" {% id %}
        | "POST" {% id %}
        | "PUT" {% id %}
        | "DELETE" {% id %}
        | "CONNECT" {% id %}
        | "PATCH" {% id %}
        | "OPTIONS" {% id %}
        | "TRACE" {% id %}

HTTP_VERSION -> "HTTP/" DIGIT "." DIGIT {% httpVersion %}

##################
# Request target #
##################

REQUEST_TARGET -> (ORIGIN_FORM | ABSOLUTE_FORM | ASTERISK_FORM) {% requestTarget %}


ORIGIN_FORM -> ABSOLUTE_PATH ("?" QUERY):? ("#" FRAGMENT):? {% originForm %}


ABSOLUTE_FORM -> (SCHEME "://"):? HIER_PART ("?" QUERY):? ("#" FRAGMENT):? {% absoluteForm %}

SCHEME -> "http" {% scheme %}
        | "https" {% scheme %}

HIER_PART -> AUTHORITY ABSOLUTE_PATH:? {% hierPart %}


ASTERISK_FORM -> "*" {% asteriskForm %}

#############
# Authority #
#############

AUTHORITY -> HOST (":" PORT):? {% authority %}

PORT -> (ENV_VARIABLE | DIGIT) {% port %}

HOST -> (ENV_VARIABLE | "[" IPV6_ADDRESS "]" | IPV4_OR_REG_NAME) {% host %}

IPV6_ADDRESS -> [^\s/\]]:+ {% ipv6Address %}

IPV4_OR_REG_NAME -> [^\s/:?#]:+ {% ipv4OrRegName %}

#################
# Resource path #
#################

ABSOLUTE_PATH -> (PATH_SEPARATOR (SEGMENT | ENV_VARIABLE)):+ {% absolutePath %}

PATH_SEPARATOR -> ("/" {% id %} | NEW_LINE_WITH_INDENT {% () => '\n' %}) {% pathSeparator %}

SEGMENT -> [^\r\n/?# ]:* {% segment %}


######################
# Query and Fragment #
######################

QUERY -> [^\r\n\s#]:* (NEW_LINE_WITH_INDENT QUERY):? {% query %}
QUERY_SEGMENT -> [^\r\n\s#]:* {% querySegment %}

FRAGMENT -> [^\r\n\s\?]:* (NEW_LINE_WITH_INDENT FRAGMENT):? {% fragment %}

###########
# Headers #
###########

HEADERS -> (HEADER_FIELD NEW_LINE LINE_COMMENT:* {% id %}):* {% headers %}
HEADER_FIELD -> FIELD_NAME ":" _ FIELD_VALUE _ {% headerField %}
FIELD_NAME -> [^\r\n:]:+ {% fieldName %}
FIELD_VALUE -> INPUT_CHARACTER:* (__ ("#" | "//") INPUT_CHARACTER:*):? {% fieldValue %}
             | NEW_LINE_WITH_INDENT FIELD_VALUE {% nth(1) %}

################
# Message body #
################

MESSAGE_BODY -> MESSAGES {% messageBody %}
MESSAGES -> (MESSAGE_LINE NEW_LINE {% id %}):* {% messages %}
MESSAGE_LINE -> INPUT_CHARACTER:* {% messageLine %}
              | INPUT_FILE_REF {% id %}

INPUT_FILE_REF -> "<" __ FILE_PATH {% inputFileRef %}

FILE_PATH -> INPUT_CHARACTER:+ {% filePath %}

####################
# Response handler #
####################

RESPONSE_HANDLER -> (
                      ">" __ HANDLER_SCRIPT NEW_LINE:+ {% nth(2) %}
                      | ">" __ FILE_PATH NEW_LINE:+ {% responseHandlerFilePath %}
                    ) {% responseHandler %}

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
NEW_LINE_WITH_INDENT -> NEW_LINE __ {% stubNull %}
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

REQUEST_SEPARATOR -> "###" NEW_LINE WHIT? {% stubNull %}
                   | "### " LINE_TAIL WHIT? {% stubNull %}


########################
# Environment variable #
########################

ENV_VARIABLE -> ENV_VARIABLE_STATIC  {% id %}
              | ENV_VARIABLE_DYNAMIC {% id %}
ENV_VARIABLE_STATIC -> "{{" _ IDENTIFIER _ "}}" {% envVariableStatic %}
ENV_VARIABLE_DYNAMIC -> "{{" _ "$" IDENTIFIER _ "}}" {% envVariableDynamic %}
