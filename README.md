[![Node CI](https://github.com/char0n/http-request-in-editor/workflows/Node.js%20CI/badge.svg)](https://github.com/char0n/http-request-in-editor/actions?query=workflow%3A%22Node.js+CI%22)

# HTTP Request in Editor Implementation

This repo contains reference implementation of [HTTP Request in Editor Spec](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) parser.

The [HTTP Request in Editor Spec](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) is using context-free grammar to present set of production rules.
We're using [nearley](https://nearley.js.org/) to declaratively map this grammar and generate a JavaScript parser from it.

Parser can parse following syntax and creates [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
that can be consumed and executed by various runtime environments. I'll provide a reference implementation
of a reference runtime implementation as soon as the parser is finished.

```http request
### request 1
POST https://httpbin.org/post HTTP/1.1
Authorization: token

request body 1

### request 2
POST https://httpbin.org/post HTTP/2.0
Authorization: token2

{
  "test": 3,
  "a": "b"
}

### request 3
POST https://httpbin.org/post HTTP/3.0
Authorization: token3

{}

```

## Installation

```sh
 $ npm i http-request-in-editor
```

```js
const { parse } = require('http-request-in-editor');


const http = `
POST https://httpbin.org/post

###
`;

const ast = parse(http);
// now process the AST with your favorite http library
```


## AST

Parser is producing JSON serializable [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree). Following [HTTP Request in Editor](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) fragment

```http request
### post request
POST http://www.example.com HTTP/2.0
# comment
Authorization: token

message body

> {% script %}
<> ./file.json

###
```

will produce following AST:

```js
[
  [
    {
      method: 'POST',
      requestTarget: {
        value: 'http://www.example.com',
        meta: {
          protocol: 'http:',
          hostname: 'www.example.com',
          port: '80',
          pathname: '/',
          search: ''
        }
      },
      httpVersion: '2.0',
      headers: [ { name: 'Authorization', value: 'token' } ],
      body: [ 'message body' ],
      responseHandler: ' script ',
      responseRef: '<> ./file.json'
    }
  ]
]
```

AST should be self explanatory. The only detail worth mentioning is that request body will contain
list of message body lines instead of one big multiline string. The reason is that [message-body](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md#323-message-body)
can contain `input-file-ref`(s) which needs to be replaced by file contents that they point to by runtime.

## Development

Fork the repo, clone in and install by

```sh
 $ npm i
```

Edit `src/parser/grammer.ne` and create a grammar that maps to HTTP Request in Editor Spec.

Compiles `src/parser/grammar.ne` file into `src/parser/grammar.js`.
```sh
 $ npm run compile
```

Test parser grammar against predefined fixtures.
```sh
 $ npm test
```

Generate railroad diagrams from `src/parser/grammar.ne` file.
```sh
 $ npm run railroad
```

Generate random strings that satisfy the grammar defined in`src/parser/grammar.ne` file.
```sh
 $ npm run unparse
```

## Missing features

 - No support for multiline `request-target`
