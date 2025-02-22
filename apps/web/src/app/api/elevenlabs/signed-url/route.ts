import {NextResponse} from "next/server";
import {env} from "~/env";

export async function GET() {
  const agentId = env.ELEVENLABS_AGENT_ID
  const apiKey = env.ELEVENLABS_XI_API_KEY
  if (!agentId) {
    throw Error('AGENT_ID is not set')
  }
  if (!apiKey) {
    throw Error('XI_API_KEY is not set')
  }
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get signed URL');
    }

    const data = await response.json();
    return NextResponse.json({signedUrl: data.signed_url})
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({error: 'Failed to get signed URL'}, {status: 500});
  }
}
