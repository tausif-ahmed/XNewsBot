import { NextRequest, NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';

/**
 * Posts content to Twitter
 */
async function postToTwitter(tweetText: string) {
  try {
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY || '',
      appSecret: process.env.TWITTER_APP_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
    });
    
    const { data } = await twitterClient.v2.tweet(tweetText);
    console.log(`Tweet posted successfully with ID: ${data.id}`);
    return data;
  } catch (error) {
    console.error("Error posting to Twitter:", error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * API route handler for posting to Twitter
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Tweet content is required" },
        { status: 400 }
      );
    }

    if (content.length > 280) {
      return NextResponse.json(
        { error: "Tweet content exceeds 280 characters" },
        { status: 400 }
      );
    }

    const tweetData = await postToTwitter(content);
    return NextResponse.json({ success: true, tweet: tweetData });
  } catch (error) {
    console.error("API error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Failed to post tweet" },
      { status: 500 }
    );
  }
} 