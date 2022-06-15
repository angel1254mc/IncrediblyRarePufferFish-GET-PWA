import Head from 'next/head';

export default function Offline() {
    return (
      <div className="w-full">
        <Head>
          <title>GET APP PWA</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className="flex w-auto flex-col items-center justify-center">
            <div className="text-3xl text-underline text-light text-black">This App is OFFLINE!</div>
        </main>
      </div>
    );
  }