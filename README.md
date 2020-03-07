# HTTP Request in Editor Implementation

This repo contains reference implementation of [HTTP Request in Editor Spec](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) parser.

The [HTTP Request in Editor Spec](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) is using context-free grammar to present set of production rules.
We're using [neaarly](https://nearley.js.org/) to declaratively map this grammar and generate a JavaScript parser from it.

Parser can parse following syntax and creates [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
that can be consumed and executed by various runtime environments. I'll provide a reference implementation
of a reference runtime implementation as soon as the parser is finished.

```http
### TEST1
POST https://httpbin.org/post HTTP/1.1
Authorization: token1
Authorization: token1
Authorization: token1

MESSAGE1
MESSAGE11

### TEST2
POST https://httpbin.org/post HTTP/1.1
Authorization: token2
Authorization: token2
Authorization: token2

{
  "test": 3,
  "a": "b"
}

### TEST2
POST https://httpbin.org/post HTTP/1.1
Authorization: token3
Authorization: token3
Authorization: token3

{
  "test": 3,
  "a": "b"
}

```

# Installation

```sh
 $ npm i
```

# Development

Edit `grammer.ne` and create a grammar that maps to HTTP Request in Editor Spec.

Compiles `grammar.ne` file into `grammar.js`.
```sh 
 $ npm run compile
```

Test `example.http` file agains compiled grammar.
```sh
 $ npm test 
```

Generate railroad diagrams from `grammar.ne` file.
```sh
 $ npm run railroad
```

Generate random strings that satisfy the grammar defined in`grammar.ne` file.
```sh
 $ npm run unparse
```