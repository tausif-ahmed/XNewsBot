import { NewsArticle, RephrasedContent, Tweet } from "@/types";

/**
 * Fetches cryptocurrency news from the API
 */
export async function fetchNews(): Promise<NewsArticle[]> {
  try {
    const response = await fetch("/api/news");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * Rephrases an article title for Twitter using the API
 */
export async function rephraseContent(title: string, url: string): Promise<string> {
  try {
    const response = await fetch("/api/rephrase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, url }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data: RephrasedContent = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error rephrasing content:", error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * Posts content to Twitter using the API
 */
export async function postTweet(content: string): Promise<Tweet> {
  try {
    const response = await fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.tweet;
  } catch (error) {
    console.error("Error posting tweet:", error instanceof Error ? error.message : String(error));
    throw error;
  }
} 