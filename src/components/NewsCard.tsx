'use client';

import { NewsArticle } from '@/types';
import { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import TweetModal from './TweetModal';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  // Default image if no image is provided
  const imageUrl = article.urlToImage || '/placeholder-news.jpg';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        {/* Next.js Image component with fallback */}
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-news.jpg';
          }}
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {article.source.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formattedDate}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex justify-between items-center">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Read more
          </a>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Rephrase
          </button>
        </div>
      </div>

      {isModalOpen && (
        <TweetModal
          article={article}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
} 