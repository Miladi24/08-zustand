import { Metadata } from 'next';
import Link from 'next/link';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Page not found | NoteHub',
  description: 'The page you are looking for does not exist.',
  metadataBase: 'https://08-zustand-seven-pi.vercel.app/',
  openGraph: {
    title: 'Page not found | NoteHub',
    description: 'The page you are looking for does not exist.',
    url: 'https://08-zustand-seven-pi.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub – page not found'
      }
    ]
  }
}

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;