'use strict';

const requestTargetParser = require('request-target');

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

module.exports = {
  parseRequestTarget,
};
