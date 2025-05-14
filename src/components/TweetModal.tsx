'use client';

import { NewsArticle } from '@/types';
import { rephraseContent, postTweet } from '@/lib/api';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface TweetModalProps {
  article: NewsArticle;
  onClose: () => void;
}

export default function TweetModal({ article, onClose }: TweetModalProps) {
  const [tweetContent, setTweetContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  // Get rephrased content when modal opens
  useEffect(() => {
    async function getRephrasedContent() {
      try {
        setIsLoading(true);
        setError('');
        const content = await rephraseContent(article.title, article.url);
        setTweetContent(content);
        setCharCount(content.length);
      } catch (error) {
        setError('Failed to generate tweet content. Please try again.');
        console.error('Error rephrasing content:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getRephrasedContent();
  }, [article]);

  // Update character count when tweet content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setTweetContent(content);
    setCharCount(content.length);
  };

  // Post the tweet
  const handlePostTweet = async () => {
    try {
      setIsPosting(true);
      setError('');
      await postTweet(tweetContent);
      toast.success('Tweet posted successfully!');
      onClose();
    } catch (error) {
      setError('Failed to post tweet. Please try again.');
      toast.error('Failed to post tweet');
      console.error('Error posting tweet:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
              Rephrase for Twitter
            </Dialog.Title>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          {isLoading ? (
            <div className="py-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 mb-4">{error}</div>
          ) : (
            <>
              <textarea
                value={tweetContent}
                onChange={handleContentChange}
                className="w-full h-32 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                disabled={isPosting}
              />
              
              <div className="flex justify-between items-center mt-2 mb-4">
                <span className={`text-sm ${charCount > 280 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {charCount}/280
                </span>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled={isPosting}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostTweet}
                  disabled={isPosting || charCount === 0 || charCount > 280}
                  className={`px-4 py-2 rounded-md text-white ${
                    isPosting || charCount === 0 || charCount > 280
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isPosting ? 'Posting...' : 'Post to Twitter'}
                </button>
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 