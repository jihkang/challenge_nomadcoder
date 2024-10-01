import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen overflow-y-scroll overflow-x-hidden flex-col items-center p-4 justify-between text-black">
      <div className="flex h-auto w-full justify-end gap-2 bg-blue-300">
        <Link href="/login" className="hover:bg-slate-400 bg-slate-200 px-2 rounded-md text-center">
          <p>Login</p>
        </Link>
        <Link href="/create-account" className="hover:bg-slate-400 bg-slate-200 px-2 rounded-md text-centers">
          Register
        </Link>
      </div>
      <div className="flex flex-row flex-wrap w-full bg-blue-100 h-full">

      </div>
    </main>
  );
}
