"use client";

import { useEffect, useState } from "react";

interface TweetProps {
    id: number
    title: string;
    content: string | null;
    author: {
      username: string;
    };
  }
  
  
  
export function TweetSeperate({tweets}: {tweets: TweetProps[]}) {
    const [hydrated, setHydrated] = useState(false);
    const [page, setPage] = useState(0);
  
    useEffect(() => {setHydrated(true);}, [hydrated])
  
    if (!hydrated) {
      return <div>loading...</div>
    }
  
    return <>
    {
    tweets?.slice(page, (page + 1) * 10 > tweets.length ? tweets.length : (page + 1) * 10)
      .map(({title, content, author, id}: TweetProps) => 
      <li key={`tweet_${id.toString()}`} className="text-black bg-transparent">
        <div className="text-black bg-transparent">
          <p className="text-black bg-transparent">
            {author.username}
          </p>
          <p className="text-black bg-transparent">
            {title}
          </p>
        </div>
        <p className="text-black bg-transparent">{content}</p>
      </li>)
      }
      <button onClick={() => {
        if (page !== 0) {
          setPage((curPage) => curPage - 1);
        }
      }}>previous</button>
      <button onClick={() => {
        if (page * 10 < tweets.length) {
          setPage((curPage) => curPage + 1);
        }
      }}>next</button>
    </>
  }