'use strict';

const { pathEq } = require('ramda');

const isNodeType = pathEq(['type']);

const isMethod = isNodeType('method');

const isRequestTarget = isNodeType('request-target');

const isHttpVersion = isNodeType('http-version');

const isOriginForm = isNodeType('origin-form');

const isLiteral = isNodeType('literal');

const isFilePath = isNodeType('file-path');

const isHeaders = isNodeType('headers');

const isMessageBody = isNodeType('message-body');

const isResponseHandler = isNodeType('response-handler');

const isResponseRef = isNodeType('response-ref');

module.exports = {
  isMethod,
  isRequestTarget,
  isHttpVersion,
  isOriginForm,
  isLiteral,
  isFilePath,
  isHeaders,
  isMessageBody,
  isResponseHandler,
  isResponseRef,
};
