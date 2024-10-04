import { getUserDB } from "@/lib/db";
import Link from "next/link";
import LogOut from "@/logout";
import { Suspense, useEffect, useState } from "react";
import { getTweet } from "@/_actions/action";
import { TweetSeperate } from "./Tweets";

export async function Tweets() {
  const data = await getTweet();
  
  return <ul className="bg-transparent">
    <TweetSeperate tweets={data}/>
  </ul>
}

export default async function Home() {
  const {result} = await getUserDB();
  
  return (
    <div className="flex flex-col h-full w-full gap-4">
      <div className="flex h-auto w-full justify-end gap-2">
        {!result ? <div>
          <Link href="/login" className="hover:bg-slate-200 px-2 rounded-md text-center">
            <p>Login</p>
          </Link>
          <Link href="/create-account" className="hover:bg-slate-200 px-2 rounded-md text-centers">
            Register
          </Link>
        </div> : <>
          <Link href="/profile" className="hover:bg-slate-200 px-2 rounded-md text-center">
            <p>Profile</p>
          </Link>
          <LogOut/>
        </>
        }    
      </div>
        <div className="flex flex-col items-start justify-start w-full bg-blue-100 h-full">
          <Suspense>
            <Tweets/>
          </Suspense>
        </div>
    </div>
  );
}
