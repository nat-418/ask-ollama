# ask-ollama
Query Ollama models with RAG

## Description

This repository contains a program, `ask-ollama`,
that uses [retrieval-automated generation] with
[Ollama]-compatible [large language models] to provide
an advanced web-search command-line interface.

## Usage
This program can be invoked using `npx ask-ollama <question> <url>`.
If you don't already have Ollama running locally, you can follow
the Docker steps in the Development section of this README to get
started and install some models. This also provides a ChatGPT-style
web UI without this project's RAG capabilities for testing.

```bash

  Usage
    $ ask-ollama <question> <url>

  Options
    --model, -m  Specify model (defaults to llama2)

  Examples
    $ ask-ollama 'What time is it now in Paris?' 'https://www.timeanddate.com/worldclock/france/paris'

```

## Development

This tool uses the [LangChain] framework for JavaScript.

To hack on the project, follow these steps:

1. Install [Docker] and [Node.js]
2. Clone this repository
3. Run `$ docker-compose up` from inside this repository
4. Install a model using, e.g., `$ docker exec -it ollama-backend-1 ollama pull llama2`
5. Run `$ npm install` from inside this repository
6. Edit `ask-ollama.js`

[retrieval-automated generation]: https://research.ibm.com/blog/retrieval-augmented-generation-RAG
[Ollama]: https://ollama.ai
[large language models]: https://ollama.ai/library
[LangChain]: https://docs.langchain.com/docs/
[Docker]: https://www.docker.com
[Node.js]: https://nodejs.org/
