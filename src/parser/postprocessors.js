'use strict';

const { flatten, nth, join, pipe, last } = require('ramda');
const {
  flattenDepth,
  stubNull,
  isNotNull,
  isString,
} = require('ramda-adjunct');

const cst = require('./cst');
const {
  isHeaders,
  isMessageBody,
  isResponseHandler,
  isResponseRef,
  isHttpVersion,
  isMethod,
  isQuery,
  isFragment,
  isAbsolutePath,
  isEnvVariable,
  isLiteral,
} = require('./cst/predicates');

// Type definitions:
//     Data = [*]
//     Location = Number
//     Reject = Object

/**
 * Helpers
 */

// stringify :: Array -> String
const stringify = join('');

// stringifyId :: Array -> string
const stringifyId = pipe(nth(0), stringify);

/**
 * Requests file
 */

// requestsFile :: (Data, Location) -> Request
const requestsFile = (data, location) => {
  const requests = flattenDepth(2, [data[2], data[3]]);

  return cst.RequestsFile({
    location,
    children: requests,
  });
};

/**
 * Request
 */

// request :: ([RequestLine,,, Headers,, ResponseHandler, ResponseRef], Location) -> Request
const request = (
  [
    requestLineNode,
    ,
    ,
    headersNode,
    ,
    messageBodyNode,
    responseHandlerNode,
    responseRefNode,
  ],
  location
) => {
  const children = [requestLineNode];

  if (isHeaders(headersNode) && headersNode.children.length > 0) {
    children.push(headersNode);
  }
  if (isMessageBody(messageBodyNode) && messageBodyNode.children.length > 0) {
    children.push(messageBodyNode);
  }
  if (
    isResponseHandler(responseHandlerNode) &&
    responseHandlerNode.children.length > 0
  ) {
    children.push(responseHandlerNode);
  }
  if (isResponseRef(responseRefNode) && responseRefNode.children.length > 0) {
    children.push(responseRefNode);
  }

  return cst.Request({ location, children });
};

/**
 * Request line
 */

// requestLine :: ([Method, RequestTarget, HttpVersion]) -> RequestLine
const requestLine = (
  [methodNode, requestTargetNode, httpVersionNode],
  location
) => {
  const children = [];

  if (isMethod(methodNode)) {
    children.push(methodNode);
  }
  children.push(requestTargetNode);
  if (isHttpVersion(httpVersionNode)) {
    children.push(httpVersionNode);
  }

  return cst.RequestLine({
    location,
    children,
  });
};

// method :: (Data, Location) -> Method
const method = ([httpVerb], location) =>
  cst.Method({ location, value: httpVerb });

// httpVersion :: (Data, Location) -> HttpVersion
const httpVersion = (data, location) =>
  cst.HttpVersion({
    location,
    value: `${stringify(data[1])}.${stringify(data[3])}`,
  });

/**
 * Request target
 */

// requestTarget :: (Data, Location) -> RequestTarget
const requestTarget = (data, location) =>
  cst.RequestTarget({ location, children: data[0] });

// originForm :: (Data, Location) -> OriginForm
const originForm = (
  [absolutePathNode, queryMatch, fragmentMatch],
  location
) => {
  const children = [absolutePathNode];

  if (queryMatch !== null) {
    children.push(cst.Literal({ location, value: queryMatch[0] }));
    children.push(queryMatch[1]);
  }
  if (fragmentMatch !== null) {
    children.push(cst.Literal({ location, value: fragmentMatch[0] }));
    children.push(fragmentMatch[1]);
  }

  return cst.OriginForm({
    location,
    children,
  });
};

// absoluteForm :: (Data, Location) -> AbsoluteForm
const absoluteForm = (
  [schemeMatch, hierPartNode, queryMatch, fragmentMatch],
  location
) => {
  const children = [];

  if (schemeMatch !== null) {
    children.push(schemeMatch[0]);
    children.push(cst.Literal({ location, value: schemeMatch[1] }));
  }
  children.push(hierPartNode);
  if (queryMatch !== null) {
    children.push(cst.Literal({ location, value: queryMatch[0] }));
    children.push(queryMatch[1]);
  }
  if (fragmentMatch !== null) {
    children.push(cst.Literal({ location, value: fragmentMatch[0] }));
    children.push(fragmentMatch[1]);
  }

  return cst.AbsoluteForm({
    location,
    children,
  });
};

// asteriskForm :: (Data, Location) -> AsteriskForm
const asteriskForm = (data, location) =>
  cst.AsteriskForm({ location, value: data[0] });

// scheme :: (Data, Location) -> Scheme
const scheme = (data, location) =>
  cst.Scheme({ location, value: stringify(flatten(data)) });

// hierPart :: (Data, Location) -> HierPart
const hierPart = ([authorityNode, absolutePathNode], location) => {
  const children = [authorityNode];

  if (isAbsolutePath(absolutePathNode)) {
    children.push(absolutePathNode);
  }

  return cst.HierPart({
    location,
    children,
  });
};

/**
 * Authority
 */

// authority :: (Data, Location) -> Authority
const authority = (data, location) => {
  const [hostNode] = data;
  const children = [hostNode];

  // optional port
  if (Array.isArray(data[1])) {
    children.push(cst.Literal({ location, value: data[1][0] }));
    children.push(data[1][1]);
  }

  return cst.Authority({ location, children });
};

// port :: (Data, Location) -> Port
const port = (data, location) => {
  if (isEnvVariable(data[0][0])) {
    return cst.Port({ location, children: [data[0][0]] });
  }
  return cst.Port({ location, value: stringifyId(data) });
};

// host :: (Data, Location) -> Host
const host = (data, location) => {
  const children = [];

  if (data[0].length === 3) {
    // ipv6 with brackets
    children.push(cst.Literal({ location, value: data[0][0] }));
    children.push(data[0][1]);
    children.push(cst.Literal({ location, value: data[0][2] }));
  } else {
    // ipv4 or reg name
    children.push(data[0][0]);
  }

  return cst.Host({ location, children });
};

// ipv6Address :: (Data, Location) -> Ipv6Address
const ipv6Address = (data, location) =>
  cst.Ipv6Address({ location, value: stringifyId(data) });

// ipv4-or-reg-name :: (Data, Location) -> Ipv4OrRegName
const ipv4OrRegName = (data, location, reject) => {
  const value = stringifyId(data);

  // asterisk-form takes precedence over ipv4-or-reg-name
  if (value === '*') {
    return reject;
  }
  // env variable takes precedence over ipv4-or-reg-name
  if (value.startsWith('{{') && value.endsWith('}}')) {
    return reject;
  }

  return cst.Ipv4OrRegName({ location, value });
};

/**
 * Resource path
 */

// absolutePath :: (Data, Location) -> AbsolutePath
const absolutePath = (data, location, reject) => {
  const children = flatten(data);
  const absPath = children
    .filter((node) => isString(node.value))
    .reduce((acc, node) => acc + node.value, '');

  // this is here to distinguish line comments from absolute paths
  if (absPath.startsWith('//')) {
    return reject;
  }

  return cst.AbsolutePath({ location, children });
};

// pathSeparator :: (Data, Location) -> PathSeparator
const pathSeparator = (data, location) =>
  cst.PathSeparator({ location, value: data[0] });

// segment :: (Data, Location, Reject) -> Segment | Reject
const segment = (data, location, reject) => {
  const value = stringifyId(data);

  if (value.startsWith('{{') && value.endsWith('}}')) {
    return reject;
  }

  return cst.Segment({ location, value });
};

/**
 * Query and Fragment
 */

// query :: (Data, Location) -> Query
const query = (data, location) => {
  const children = flatten(data)
    .filter(isNotNull)
    .reduce((acc, v) => {
      if (isString(v)) {
        const lastLiteral = last(acc);
        if (isLiteral(lastLiteral)) {
          lastLiteral.value += v;
        } else {
          acc.push(cst.Literal({ value: v, location }));
        }
      } else if (isQuery(v)) {
        const lastLiteral = last(acc);
        if (isLiteral(lastLiteral)) {
          lastLiteral.value += v.value;
        } else {
          acc.push(cst.Literal({ value: v.value, location }));
        }
      } else {
        acc.push(v);
      }

      return acc;
    }, []);

  console.dir(children);

  return cst.Query({ location, children });
};

const querySegment = (data, location, reject) => {
  const value = stringifyId(data);

  if (value.includes('{{')) {
    return reject;
  }

  return cst.Literal({ location, value });
};

// fragment :: (Data, Location) -> Fragment
const fragment = (data, location) => {
  const value = flatten(data)
    .filter(isNotNull)
    .map((v) => {
      if (isFragment(v)) {
        return v.value;
      }
      return v;
    });

  return cst.Fragment({ location, value: flatten(value).join('') });
};

/**
 * Headers
 */

// headers :: (Data, Location) -> Headers
const headers = (data, location) =>
  cst.Headers({ location, children: [...data[0]] });

// headerField :: (Data, Location) -> HeaderField
const headerField = (data, location) =>
  cst.HeaderField({ location, children: [data[0], data[3]] });

// fieldName :: (Data, Location) -> FieldName
const fieldName = (data, location) =>
  cst.FieldName({ location, value: stringifyId(data) });

// fieldValue :: (Data, Location, Reject) -> FieldValue | Reject
const fieldValue = (data, location, reject) => {
  const lineTail = stringifyId(data);

  if (lineTail.startsWith(' ') || lineTail.endsWith(' ')) {
    return reject;
  }

  return cst.FieldValue({ location, value: lineTail });
};

/**
 * Message body
 */

// messageBody :: (Data, Location) -> MessageBody
const messageBody = (data, location) => {
  const children = [];
  const messages = data[0];

  if (messages.children.length > 0) {
    children.push(messages);
  }

  return cst.MessageBody({ location, children });
};

// messages :: (Data, Location) -> Messages
const messages = (data, location) =>
  cst.Messages({ location, children: [...data[0]] });

// messageLine :: (Data, Location, Reject) -> MessageLine | Reject
const messageLine = (data, location, reject) => {
  const lineTail = stringifyId(data);

  if (
    lineTail.includes('<') ||
    lineTail.includes('> ') ||
    lineTail.includes('<> ') ||
    lineTail.includes('###')
  ) {
    return reject;
  }

  return cst.MessageLine({ location, value: lineTail });
};

// inputFileRef :: (Data, Location) -> InputFileRef
const inputFileRef = (data, location) =>
  cst.InputFileRef({ location, children: [data[2]] });

// filePath :: (Data, Location) -> FilePath
const filePath = (data, location) =>
  cst.FilePath({ location, value: stringifyId(data) });

/**
 * Response handler
 */

// responseHandler :: (Data, Location) -> ResponseHandler
const responseHandler = (data, location) =>
  cst.ResponseHandler({ location, children: [data[0]] });

// responseHandlerFilePath :: (Data, Number, Reject) -> String
const responseHandlerFilePath = (data, location, reject) => {
  const filePathNode = data[2];

  if (filePathNode.value.startsWith('{%')) return reject;

  return filePathNode;
};

// handlerScript :: (Data, Number, Reject) -> HandlerScript
const handlerScript = (data, location, reject) => {
  const script = stringify(data[1]);

  if (script.includes('%}') || script.includes('###')) return reject;

  return cst.HandlerScript({ location, value: script });
};

/**
 * Response reference
 */

// responseRef :: (Data, Location) -> ResponseRef
const responseRef = (data, location) =>
  cst.ResponseRef({ location, children: [data[2]] });

/**
 * Line Terminators
 */

// lineTail :: Data -> String
const lineTail = (data) => stringifyId(data);

/**
 * Comments
 */

// lineComment :: (Data, Number, Reject) -> String
const lineComment = (data, location, reject) => {
  if (data[1].includes('##')) return reject;

  return data[1];
};

/**
 * Environment variables
 */

// envVariableStatic :: (Data, Location) -> EnvVariable
const envVariableStatic = (data, location) =>
  cst.EnvVariable({ location, value: stringify(flatten(data[2])) });

// envVariableDynamic :: (Data, Location) -> EnvVariable
const envVariableDynamic = (data, location) =>
  cst.EnvVariable({
    location,
    value: stringify(flatten(data[3])),
    isDynamic: true,
  });

module.exports = {
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
};
