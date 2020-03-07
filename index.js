'use strict';

const requestTarget = require('request-target');

// Type definitions:
//     RequestTarget = {protocol: String, hostname: String, port: String, pathname: String, search: String}
//     Headers = [{name: value}]
//     Url = String
//     RequestLine = {method: String, requestTarget: RequestTarget | Url, httpVersion: String}

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
    requestTarget: parseRequestTarget(method, headers, requestTarget),
    headers,
  };
};

// requestLine :: (String, Url, String) -> RequestLine
const requestLine = (method, requestTarget, httpVersion) => ({
  method,
  requestTarget,
  httpVersion,
});

module.exports = {
  request,
  requestLine,
};