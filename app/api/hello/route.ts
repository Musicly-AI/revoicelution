import { NextResponse } from 'next/server';
import twilio, { twiml } from 'twilio';

import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(request: NextApiRequest, res: NextApiResponse) {
  if (request.method === 'POST') {
    const twimlResponse = new twiml.VoiceResponse();
    twimlResponse.start().stream({
      url: 'wss://0829-2601-646-8080-204c-00-7b.ngrok-free.app/ws', // Your WebSocket server URL
    });
    twimlResponse.say('Starting audio stream...');
    twimlResponse.pause({ length: 3600 });

    // Since we need to return a NextResponse, we create it here
    const nextResponse = new NextResponse(twimlResponse.toString(), {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    return nextResponse;
  } else {
    // For non-POST requests, we return a method not allowed response
    return new NextResponse('Method Not Allowed', { status: 405 });
  }
}
