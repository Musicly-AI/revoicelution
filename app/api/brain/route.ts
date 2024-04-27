import OpenAI from 'openai';
import Groq from 'groq-sdk';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const model_name = 'llama3-70b-8192';

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  const start = Date.now();

  // Request the OpenAI API for the response based on the prompt
  try {
    const response = await groq.chat.completions.create({
      model: model_name,
      stream: true,
      messages: messages,
    });

    const stream = OpenAIStream(response);
    console.log('using model_name', model_name);
    return new StreamingTextResponse(stream, {
      headers: {
        'X-LLM-Start': `${start}`,
        'X-LLM-Response': `${Date.now()}`,
      },
    });
  } catch (error) {
    console.error('test', error);
  }
}
