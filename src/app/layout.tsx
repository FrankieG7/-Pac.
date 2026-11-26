import type {Metadata} from 'next';
import './globals.css';
import {ErrorLogger} from '@/components/ErrorLogger';

export const metadata: Metadata = {
  title: 'DREAMER AI Portfolio',
  description: 'Real-time Intelligence Dashboard for modern investors',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&family=Source+Code+Pro:wght@200..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ErrorLogger />
        {children}
      </body>
    </html>
  );
}