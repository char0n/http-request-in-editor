# HTTP Request in Editor Implementation

This repo contains reference implementation of [HTTP Request in Editor Spec](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) parser.

The [HTTP Request in Editor Spec](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) is using context-free grammar to present set of production rules.
We're using [neaarly](https://nearley.js.org/) to declaratively map this grammar and generate a JavaScript parser from it.

Parser can parse following syntax and creates [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
that can be consumed and executed by various runtime environments. I'll provide a reference implementation
of a reference runtime implementation as soon as the parser is finished.

```http
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
 $ npm i
```

## Development

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
