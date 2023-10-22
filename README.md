# ask-ollama
Query Ollama models with RAG

## Description

This repository contains a program, `ask-ollama`,
that uses [retrieval-automated generation] with
[Ollama]-compatible [large language models] to provide
an advanced web-search command-line interface.

## Usage
This program can be invoked using `npx ask-ollama <question> <url>`.

## Development

This tool uses the [LangChain] framework for JavaScript.

To hack on the project, follow these steps:

1. Setup Ollama (see the Docker Compose file in this repo)
2. Install [Node.js]
3. Clone this repository
4. Run `$ npm install` from inside this repository
5. Edit `ask-ollama.js`

[retrieval-automated generation]: https://research.ibm.com/blog/retrieval-augmented-generation-RAG
[Ollama]: https://ollama.ai
[large language models]: https://ollama.ai/library
[LangChain]: https://docs.langchain.com/docs/
[Node.js]: https://nodejs.org/
