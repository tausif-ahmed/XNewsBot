import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

/**
 * Rephrases content using Google Gemini API
 */
async function rephraseWithGoogleGemini(title: string, url: string) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_BARD_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Generate a concise and engaging tweet for X.com under 279 characters based on the news title: ${title}. Use the reference URL: ${url} to gather more information. Include relevant hashtags, emojis, and avoid posting any reference links in the tweet. Keep the tone aligned with the topic`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rephrasedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return rephrasedText ? rephrasedText : `${title} - ${url}`;
  } catch (error) {
    console.error("Error rephrasing content:", error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * API route handler for rephrasing content
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, url } = body;

    if (!title || !url) {
      return NextResponse.json(
        { error: "Title and URL are required" },
        { status: 400 }
      );
    }

    const rephrasedContent = await rephraseWithGoogleGemini(title, url);
    return NextResponse.json({ content: rephrasedContent });
  } catch (error) {
    console.error("API error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Failed to rephrase content" },
      { status: 500 }
    );
  }
} 