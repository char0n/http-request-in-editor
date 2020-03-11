'use strict';

const { parseRequestTarget } = require('./helpers');

// Type definitions:
//     RequestTarget = String | {value: String, meta: {protocol: String, hostname: String, port: String, pathname: String, search: String}}
//     Headers = [{name: value}]
//     Url = String
//     RequestLine = {method: String, requestTarget: RequestTarget | Url, httpVersion: String}
//     Data = [*]
//     Reject = Object
//     Body = [String]

// request :: (RequestLine, Headers, [String]) -> RequestLine
const request = (requestLine, headers, body) => {
  const { method, requestTarget } = requestLine;

  return {
    ...requestLine,
    requestTarget: {
      value: requestTarget,
      meta: parseRequestTarget(method, headers, requestTarget),
    },
    headers,
    body,
  };
};

// requestLine :: (String, Url, String) -> RequestLine
const requestLine = ([method, requestTarget, httpVersion]) => ({
  method: method || 'GET',
  requestTarget,
  httpVersion: httpVersion || '1.1',
});

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

  if (lineTail.startsWith('<') || lineTail.startsWith('###')) {
    return reject;
  }

  return lineTail;
};

// fieldValue :: (Data, Number, Reject) -> String | Reject
const fieldValue = (data, location, reject) => {
  const lineTail = data[0].join('');

  if (lineTail.startsWith(' ') || lineTail.endsWith(' ')) {
    return reject;
  }

  return lineTail;
};

module.exports = {
  request,
  requestLine,
  messages,
  messageLine,
  fieldValue,
};
