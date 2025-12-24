import { NextRequest, NextResponse } from 'next/server';
import { fetchLatestVideo } from '../../../lib/youtube';

export async function GET(request: NextRequest) {
  try {
    // Channel ID aus Query-Parametern oder Environment-Variable
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId') || process.env.YOUTUBE_CHANNEL_ID;

    if (!channelId) {
      console.error('No channelId provided');
      return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
    }

    const video = await fetchLatestVideo(channelId);

    if (!video) {
      return NextResponse.json({ error: 'No video found' }, { status: 404 });
    }

    return NextResponse.json(video);

  } catch (error) {
    console.error('YouTube API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch YouTube data' },
      { status: 500 }
    );
  }
}