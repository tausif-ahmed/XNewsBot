# Crypto News Dashboard

A full-stack Next.js application for a cryptocurrency news dashboard with Twitter integration. The app fetches the latest cryptocurrency news, displays the top articles, and allows users to rephrase them into tweets using Google's Gemini AI, and post them to Twitter.

## Features

- 📰 Latest cryptocurrency news from News API
- 🤖 AI-powered tweet generation with Google Gemini
- 🐦 Direct posting to Twitter
- 🌓 Dark/light mode toggle
- 📱 Responsive design for all devices
- 🔄 Loading animations and error handling
- 🍞 Toast notifications for user feedback

## Tech Stack

- [Next.js 14](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Headless UI](https://headlessui.com/) for accessible UI components
- [React Hot Toast](https://react-hot-toast.com/) for notifications
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api) for posting tweets
- [Google Gemini API](https://ai.google.dev/) for AI-powered content generation
- [News API](https://newsapi.org/) for fetching cryptocurrency news

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- API keys (see Environment Variables section)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tausif-ahmed/XNewsBot.git
cd crypto-news-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your API keys:

```
NEWS_API_KEY=your_news_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
TWITTER_APP_KEY=your_twitter_app_key_here
TWITTER_APP_SECRET=your_twitter_app_secret_here
TWITTER_ACCESS_TOKEN=your_twitter_access_token_here
TWITTER_ACCESS_SECRET=your_twitter_access_secret_here
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

The following environment variables are required:

| Variable | Description |
|----------|-------------|
| `NEWS_API_KEY` | Your API key from [News API](https://newsapi.org/) |
| `GEMINI_API_KEY` | Your API key from [Google AI Studio](https://ai.google.dev/) |
| `TWITTER_APP_KEY` | Your Twitter API Key |
| `TWITTER_APP_SECRET` | Your Twitter API Secret |
| `TWITTER_ACCESS_TOKEN` | Your Twitter Access Token |
| `TWITTER_ACCESS_SECRET` | Your Twitter Access Token Secret |

## Deployment on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project into Vercel
3. Add the environment variables in the Vercel project settings
4. Deploy!

## Project Structure

```
crypto-news-dashboard/
├── public/
│   └── placeholder-news.jpg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── news/
│   │   │   │   └── route.ts
│   │   │   ├── rephrase/
│   │   │   │   └── route.ts
│   │   │   └── tweet/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── NewsCard.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   └── TweetModal.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── lib/
│   │   └── api.ts
│   └── types/
│       └── index.ts
├── .env.example
├── .env.local (not committed)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## License

This project is licensed under the MIT License.

## Acknowledgements

- [News API](https://newsapi.org/) for the cryptocurrency news data
- [Google Gemini](https://ai.google.dev/) for the AI-powered content generation
- [Twitter API](https://developer.twitter.com/en) for the Twitter integration
