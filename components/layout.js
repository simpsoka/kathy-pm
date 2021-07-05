import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>kathy.pm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="antialiased flex flex-col items-center justify-center min-h-screen py-2 px-4 max-w-3xl mb-16 mx-auto">
        <header className="mt-12 mb-16">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 85.167 84.5"
              className="w-12 h-12 absolute top-8 left-8"
            >
              <path
                fill="#7A52EF"
                d="M42.625 1.063c-22.768 0-41.292 18.523-41.292 41.292 0 22.769 18.523 41.292 41.292 41.292s41.292-18.523 41.292-41.292C83.916 19.586 65.393 1.063 42.625 1.063zm-7.292 58.104a4 4 0 01-8 0v-34a4 4 0 018 0v34zm23.69-2.327a4.002 4.002 0 01-6.412 4.786L37.574 41.477l16.084-18.453a4 4 0 016.032 5.257L47.847 41.866 59.023 56.84z"
              />
            </svg>
          </Link>
          <nav className="flex justify-center gap-12 text-center text-xl text-purple-600 hover:text-purple-900 font-bold uppercase tracking-wide">
            <Link href="/" className="no-underline cursor-pointer">
              Profile
            </Link>
            <Link href="/cv" className="no-underline cursor-pointer">
              CV
            </Link>
            <Link href="/contact" className="no-underline cursor-pointer">
              Contact
            </Link>
          </nav>
        </header>
        <body>{children}</body>
      </div>
    </>
  );
}
