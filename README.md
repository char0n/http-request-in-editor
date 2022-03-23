[![Node CI](https://github.com/char0n/http-request-in-editor/workflows/Node.js%20CI/badge.svg)](https://github.com/char0n/http-request-in-editor/actions?query=workflow%3A%22Node.js+CI%22)

# HTTP Request in Editor Implementation

## What is this?

[JetBrains company](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html) has come up with
with very interesting concept called [HTTP Request in Editor Spec](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md).
They implemented this spec into their [IDEs](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html).
You are able to create files with `.http` extensions with nice syntax highlighting and run HTTP requests directly in your editor.
Eventually you can create collection of these `.http` files, check them in as part of your codebase and
share them with the rest of your team. This is really great...but...

<p align="center"><img src="https://resources.jetbrains.com/help/img/idea/2019.3/basic_request.png" /></p>

There is currently no [CLI](https://en.wikipedia.org/wiki/Command-line_interface) runner for `.http` files. From the
moment we checked our `.http` files inside our project we should test if those file reflect reality.
This project provides tool for running `.http` files on your [CI](https://en.wikipedia.org/wiki/Continuous_integration).

**Warning:** Currently we have only implemented the parser which creates documented CST. We're working hard on implementation
of runner compatible with JetBrains one. Stay tuned for the runner!

<hr />

This repo contains reference implementation of [HTTP Request in Editor Spec](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) parser.

The [HTTP Request in Editor Spec](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) is using context-free grammar to present set of production rules.
We're using [nearley](https://nearley.js.org/) to declaratively map this grammar and generate a JavaScript parser from it.

Parser can parse following syntax and creates [CST](https://en.wikipedia.org/wiki/Parse_tree)
that can be consumed and executed by various runtime environments. I'll provide a reference implementation
of a reference runtime implementation as soon as the parser is finished.

```
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

###
```

## Installation

```sh
 $ npm i http-request-in-editor
```

## Parser

```js
const { parse } = require('http-request-in-editor');


const http = `
POST https://httpbin.org/post

###
`;

const cst = parse(http);
// now process the CST with your favorite http library
```


### CST

Parser is producing JSON serializable [CST](https://en.wikipedia.org/wiki/Parse_tree). Following [HTTP Request in Editor](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) fragment

```
### post request
POST http://www.example.com HTTP/2.0
# comment
Authorization: token

message body

> {% script %}
<> ./file.json

###
```

will produce following CST:

```
(requests-file
  (request
    (requests-line
      (method)
      (request-target
        (absolute-form
          (scheme)
          (literal)
          (hier-part
            (authority
              (host
                (ipv4-or-reg-name))))))
      (http-version))
    (headers
      (header-field
        (field-name)
        (field-value)))
    (message-body
      (messages
        (message-line)
        (message-line)))
    (response-handler
      (handler-script))
    (response-ref
      (file-path))))
```

CST should be self-explanatory. For more information checkout our [CST Types](https://github.com/char0n/http-request-in-editor/tree/master/src/parser/cst).

## Runner

```js
const fs = require('fs');
const { runSpec } = require('http-request-in-editor');

const spec = fs.readFileSync('./spec-file.http');
const result = await runSpec(spec); // returns list of response objects
```

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

Regenerates [Corpus file](https://github.com/char0n/http-request-in-editor/tree/master/test/corpus/corpus.txt). Replaces CST S-expression representation with the new one.
```sh
 $ npm run corpus:regenerate
```

Lint the source code.
```sh
 $ npm run lint
```

## Notes


1. `Multipart-form-data` will not be part of resulting CST. It's just a special shape of `message-body` and requires
no special handling even during runtime.

## Missing features

 - Environment variables
