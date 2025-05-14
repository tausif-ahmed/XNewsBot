import { NextResponse } from 'next/server';
import axios from 'axios';

/**
 * Fetches cryptocurrency news using News API
 */
async function fetchCryptoNews() {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: "CryptoCurrency",
        language: "en",
        sortBy: "publishedAt",
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
      },
    });
    const articles = response.data.articles;
    console.log(articles,"articles");
    return articles;
  } catch (error) {
    console.error("Error fetching news:", error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * API route handler for fetching cryptocurrency news
 */
export async function GET() {
  try {
    const articles = await fetchCryptoNews();
    return NextResponse.json({ articles: articles.slice(0, 10) });
  } catch (error) {
    console.error("API error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Failed to fetch cryptocurrency news" },
      { status: 500 }
    );
  }
} 