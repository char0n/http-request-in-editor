'use strict';

const requestTargetParser = require('request-target');

// Type definitions:
//     RequestTarget = String | {value: String, meta: {protocol: String, hostname: String, port: String, pathname: String, search: String}}
//     Headers = [HeaderField]
//     HeaderField = {name: String, value: String}
//     Request = {method: String, requestTarget: RequestTarget, httpVersion: String, headers, body}
//     RequestLine = {method: String, requestTarget: RequestTarget | String, httpVersion: String}
//     Data = [*]
//     Reject = Object
//     Body = [String]

/**
 * Helpers
 */

// stripRequestTargetFragment :: String -> String
const stripRequestTargetFragment = requestTarget => {
  try {
    const url = new URL(requestTarget);
    url.hash = '';
    return url.toString();
  } catch (e) {
    return requestTarget;
  }
};

// parseRequestTarget :: (String, Headers, Url) -> RequestTarget
const parseRequestTarget = (method, headers, url) => {
  const nheaders = headers.reduce((acc, header) => {
    acc[header.name.toLowerCase()] = header.value;
    return acc;
  }, {});

  return requestTargetParser({
    method,
    headers: nheaders,
    url: stripRequestTargetFragment(url),
  });
};

/**
 * General postprocessors
 */

// nth :: Number -> [a] -> a | Undefined
const nth = index => list => list[index];

// stubNull :: () -> Null
const stubNull = () => null;

/**
 * Request file
 */

// requestFile :: Data -> Request
const requestFile = data => [data[2], data[3]].flat(2);

/**
 * Request
 */

// request :: (RequestLine, Headers, [String]) -> Request
const request = ([
  requestLine,
  ,
  headers,
  ,
  body,
  responseHandler,
  responseRef,
]) => {
  const { method, requestTarget } = requestLine;

  return {
    ...requestLine,
    requestTarget: {
      value: requestTarget,
      meta: parseRequestTarget(method, headers, requestTarget),
    },
    headers,
    body,
    responseHandler,
    responseRef,
  };
};

// requestLine :: (String, String, String) -> RequestLine
const requestLine = ([method, requestTarget, httpVersion]) => ({
  method: method || 'GET',
  requestTarget,
  httpVersion: httpVersion || '1.1',
});

// requestTarget :: Data -> String
const requestTarget = data => data[0][0];

// originForm :: Data -> String
const originForm = data => data[0] + data[1];

// originFormTail :: Data -> String
const originFormTail = data => data[0].join('');

// originFormTailEnvVar :: Data -> String
const originFormTailEnvVar = d => d[0].join('') + d[1].flat(2).join('');

// absoluteForm :: Data -> String
const absoluteForm = d => d[0] + d[1] + d[2].join('') + (d[3] || '');

// scheme :: Data -> String
const scheme = data => data.flat().join('');

// httpVersion :: Data -> String
const httpVersion = data => `${data[1].join('')}.${data[3].join('')}`;

/**
 * Headers
 */

// headerField :: Data -> HeaderField
const headerField = data => ({ name: data[0], value: data[3] });

// fieldName :: Data -> String
const fieldName = data => data[0].join('');

// fieldValue :: (Data, Number, Reject) -> String | Reject
const fieldValue = (data, location, reject) => {
  const lineTail = data[0].join('');

  if (lineTail.startsWith(' ') || lineTail.endsWith(' ')) {
    return reject;
  }

  return lineTail;
};

/**
 * Message body
 */

// messages :: Data -> Body
const messages = data =>
  data[0]
    .flat(4)
    .join('')
    .trim()
    .split('\n');

// messageLine :: (Data, Number, Reject) -> String | Reject
const messageLine = (data, location, reject) => {
  const lineTail = data[0].join('');

  if (
    lineTail.includes('<') ||
    lineTail.includes('> ') ||
    lineTail.includes('<> ') ||
    lineTail.includes('###')
  ) {
    return reject;
  }

  return lineTail;
};

// inputFileRef :: Data -> String
const inputFileRef = data => `${data[0]} ${data[2]}`;

// filePath
const filePath = data => data[0].join('');

/**
 * Response handler
 */

// responseHandlerFilePath :: (Data, Number, Reject) -> String
const responseHandlerFilePath = (data, location, reject) => {
  const lineTail = data[2];

  if (lineTail.startsWith('{%')) return reject;

  return lineTail;
};

// handlerScript :: (Data, Number, Reject) -> String
const handlerScript = (data, location, reject) => {
  const script = data[1].join('');

  if (script.includes('%}') || script.includes('###')) return reject;

  return script;
};

/**
 * Response reference
 */

// responseRef :: Data -> String
const responseRef = data => `${data[0]} ${data[2]}`;

/**
 * Line Terminators
 */

// lineTail :: Data -> String
const lineTail = data => data[0].join('');

module.exports = {
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
  originFormTail,
  originFormTailEnvVar,
  absoluteForm,
  scheme,
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
  // Response handler
  responseHandlerFilePath,
  handlerScript,
  // Response reference
  responseRef,
  // Line Terminators
  lineTail,
};
