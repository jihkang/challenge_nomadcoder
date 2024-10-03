import { getUserDB } from "@/lib/db";
import Link from "next/link";
import LogOut from "@/logout";
import { Suspense } from "react";

export default async function Home() {
  const {result} = await getUserDB();
  
  return (
    <>
      <div className="flex h-auto w-full justify-end gap-2">
        {!result ? <>
          <Link href="/login" className="hover:bg-slate-200 px-2 rounded-md text-center">
            <p>Login</p>
          </Link>
          <Link href="/create-account" className="hover:bg-slate-200 px-2 rounded-md text-centers">
            Register
          </Link>
        </> : <>
          <Link href="/profile" className="hover:bg-slate-200 px-2 rounded-md text-center">
            <p>Profile</p>
          </Link>
          <LogOut/>
        </>
      }
      </div>
      <div className="flex flex-row flex-wrap w-4/5 bg-blue-100 h-full">
        
      </div>
    </>
  );
}
