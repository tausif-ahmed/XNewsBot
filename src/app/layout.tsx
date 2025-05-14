import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto News Dashboard',
  description: 'A dashboard for cryptocurrency news with Twitter integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full transition-colors duration-200 bg-gray-50 dark:bg-gray-900`}>
        <ThemeProvider>
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
