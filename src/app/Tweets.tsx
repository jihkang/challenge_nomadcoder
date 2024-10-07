"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface TweetProps {
  id: number
  title: string;
  content: string | null;
  author: {
    username: string;
  };
}

export function TweetSeperate({ tweets }: { tweets: TweetProps[] }) {
  const [hydrated, setHydrated] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => { setHydrated(true); }, [hydrated])

  if (!hydrated) {
    return <div>loading...</div>
  }

  return <>
    <ul className="row-span-11 row-start-1 bg-slate-200 flex flex-wrap">
      {tweets?.slice(page * 10, (page + 1) * 10 > tweets.length ? tweets.length : (page + 1) * 10)
        .map(({ title, content, author, id }: TweetProps) =>
          <li key={`tweet_${id.toString()}`} className="text-black bg-transparent shadow-zinc-200 shadow-md min-h-20 h-1/2 max-h-32 w-1/4 max-w-80 gap-4 px-4">
            <Link href={`tweets/${id}`}>
              <div className="text-black bg-transparent flex  items-center h-full">
                <p className="text-black bg-transparent">
                  {author.username}
                </p>
                <p className="text-black bg-transparent">
                  {title}
                </p>
              </div>
              <p className="text-black bg-transparent">{content}</p>
            </Link>
          </li>)}
    </ul>
    <li className="row-start-12 row-span-1">
      <button onClick={() => {
        if (page !== 0) {
          setPage((curPage) => curPage - 1);
        }
      }}>previous</button>
      <button onClick={() => {
        if ((page + 1) * 10 < tweets.length) {
          setPage((curPage) => curPage + 1);
        }
      }}>next</button>
    </li>
  </>
}