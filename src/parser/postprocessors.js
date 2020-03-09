'use strict';

const requestTarget = require('request-target');

// Type definitions:
//     RequestTarget = String | {value: String, meta: {protocol: String, hostname: String, port: String, pathname: String, search: String}}
//     Headers = [{name: value}]
//     Url = String
//     RequestLine = {method: String, requestTarget: RequestTarget | Url, httpVersion: String}
//     Data = [*]
//     Reject = Object

// parseRequestTarget :: (String, Headers, Url) -> RequestTarget
const parseRequestTarget = (method, headers, url) => {
  const nheaders = headers.reduce((acc, header) => {
    acc[header.name.toLowerCase()] = header.value;
    return acc;
  }, {});

  return requestTarget({ method, headers: nheaders, url });
};

// request :: (RequestLine, Headers) -> RequestLine
const request = (requestLine, headers) => {
  const { method, requestTarget } = requestLine;

  return {
    ...requestLine,
    requestTarget: {
      value: requestTarget,
      meta: parseRequestTarget(method, headers, requestTarget)
    },
    headers,
  };
};

// requestWithBody :: (RequestLine, Headers, String) -> RequestLine
const requestWithBody = (requestLine, headers, body) => ({
  ...request(requestLine, headers), body: body
});

// requestLine :: (String, Url, String) -> RequestLine
const requestLine = (method, requestTarget, httpVersion) => ({
  method,
  requestTarget,
  httpVersion,
});

// messageLine :: (Data, Number, Reject) -> String | Reject
const messageLine = (data, location, reject) => {
  const lineTail = data[0].join('');
  const newLine = data[1];

  if (lineTail.includes('###')) return reject;

  return `${lineTail}${newLine}`;
};

module.exports = {
  request,
  requestWithBody,
  requestLine,
  messageLine,
};