import { getUserDB } from "@/lib/db";
import Link from "next/link";
import LogOut from "@/logout";
import { Suspense, useEffect, useState } from "react";
import { getTweet } from "@/_actions/action";
import { TweetSeperate } from "./Tweets";
import { AddTweet } from "./AddTweet";

export async function Tweets() {
  const data = await getTweet();

  return <div className="bg-transparent h-full grid w-full grid-rows-12">
    <TweetSeperate tweets={data}/>
  </div>
}

export default async function Home() {
  const {result} = await getUserDB();

  return (
    <div className="grid h-full w-full gap-4 p-4 overflow-y-auto grid-rows-12 min-h-screen">
      <div className="flex h-fit w-full justify-end gap-3 row-start-1">
        {!result ? <div className="h-8 text-center">
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
      <AddTweet/>
      <div className="flex items-start justify-start w-full bg-white max-h-full row-start-5 row-span-6">
        <Suspense>
          <Tweets/>
        </Suspense>
      </div>
    </div>
  );
}
