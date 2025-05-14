/**
 * Type definition for a news article
 */
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

/**
 * Type definition for API responses
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status?: number;
}

/**
 * Type definition for the rephrased content
 */
export interface RephrasedContent {
  content: string;
}

/**
 * Type definition for a tweet
 */
export interface Tweet {
  id: string;
  text: string;
}

/**
 * Type definition for the theme context
 */
export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
} 