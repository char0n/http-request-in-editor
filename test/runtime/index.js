'use strict';

const { assert } = require('chai');

const { runSpec } = require('../../src');
const AxiosRunner = require('../../src/runtime/runners/axios');

/**
 * These are e2e tests doing actual requests to `request-target`.
 */

describe('runtime', function () {
  context('runSpec', function () {
    context('given no options provided', function () {
      specify('should run the spec using AxiosRunner', async function () {
        const httpSpec = 'GET https://vladimirgorej.com/\n\n';
        const actual = await runSpec(httpSpec);

        assert.lengthOf(actual, 1);
      });
    });

    context('given AxiosRunner provided as option', function () {
      specify('should run the spec using AxiosRunner', async function () {
        const httpSpec = 'GET https://vladimirgorej.com/\n\n';
        const actual = await runSpec(httpSpec, { runner: AxiosRunner });

        assert.lengthOf(actual, 1);
      });
    });
  });
});
