'use strict';

const fs = require('fs');
const path = require('path');
const { assert } = require('chai');

const AxiosVisitor = require('../../../../../src/runtime/runners/axios/AxiosVisitor');
const { parse } = require('../../../../../src/parser');
const { visit } = require('../../../../../src/visitor');

describe('runtime', function () {
  context('runners', function () {
    context('axios', function () {
      context('AxiosVisitor', function () {
        context('given single-request.http', function () {
          let visitor;
          let config;

          beforeEach(async function () {
            const httpFilePath = path.join(
              __dirname,
              'fixtures',
              'single-request.http'
            );
            const httpFileContent = fs.readFileSync(httpFilePath).toString();
            const cstTree = parse(httpFileContent);

            visitor = AxiosVisitor();
            visit(cstTree, visitor);
            [config] = visitor.configs;
          });

          specify(
            'should construct single axios Request Config object',
            function () {
              assert.lengthOf(visitor.configs, 1);
            }
          );

          specify('should construct proper method', function () {
            assert.strictEqual(config.method, 'post');
          });

          specify('should construct proper url', function () {
            assert.strictEqual(config.url, 'http://www.example.com');
          });
        });
      });
    });
  });
});
