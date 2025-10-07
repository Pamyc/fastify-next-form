import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fastify + Next.js — Starter',
  description: 'One app: Fastify API + Next.js UI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="container">
          <header style={{display:'flex', gap:12}}>
            <Link href="/">Главная</Link>
            <Link href="/form">Форма</Link>
            <a href="/healthz" target="_blank" rel="noreferrer">/healthz</a>
          </header>
          <main className="mt-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
