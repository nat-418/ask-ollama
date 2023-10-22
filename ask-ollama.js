#!/usr/bin/env node
import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { Ollama } from 'langchain/llms/ollama';
import { PromptTemplate } from 'langchain/prompts';
import { HuggingFaceTransformersEmbeddings } from 'langchain/embeddings/hf_transformers';
import meow from 'meow';

const cli = meow(`
	Usage
	  $ ask-ollama <question> <url>

	Options
	  --model, -m  Specify model (defaults to llama2)

	Examples
	  $ ask-ollama 'What time is it now in Paris?' 'https://www.timeanddate.com/worldclock/france/paris'
	`, {
	importMeta: import.meta,
	booleanDefault: false,
	flags: {
		model: 'llama2',
	}
});

async function query({ model = 'llama2', query, url }) {
	const loader = new CheerioWebBaseLoader(url);
	const docs = await loader.load();

	const splitter = new RecursiveCharacterTextSplitter({
		chunkOverlap: 0,
		chunkSize: 500,
	});

	const splitDocuments = await splitter.splitDocuments(docs);

	const vectorstore = await HNSWLib.fromDocuments(
		splitDocuments,
		new HuggingFaceTransformersEmbeddings()
	);

	const retriever = vectorstore.asRetriever();

	const ollama = new Ollama({
		baseUrl: 'http://localhost:11434',
		model: model,
	});

	const template = `Use the following pieces of context to answer the question at the end.
If you do not know the answer, just say that you do not know, do not try to make up an answer.
Use three paragraphs maximum and keep the answer as concise as possible.
{context}
Question: {question}
Helpful Answer:`;

	const QA_CHAIN_PROMPT = new PromptTemplate({
		inputVariables: ['context', 'question'],
		template,
	});

	// Create a retrieval QA chain that uses a Llama 2-powered QA stuff chain with a custom prompt.
	const chain = new RetrievalQAChain({
		combineDocumentsChain: loadQAStuffChain(ollama, { prompt: QA_CHAIN_PROMPT }),
		retriever,
		returnSourceDocuments: true,
		inputKey: 'question',
	});

	const response = await chain.call({
		question: query,
	});

	return response;
}

const out = await query({
	url: cli.input.at(1),
	query: cli.input.at(0),
	model: cli.flags.model
});

try {
	console.log(out.text);
} catch (err) {
	console.error('Error:', err);
}

