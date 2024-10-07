import { getTweetId } from "@/_actions/_tweets/actions";
import { redirect } from "next/navigation";

interface TweetProps {
  title: string;
  content: string | null;
};

export default async function Tweet({ params: { id } }: { params: { id: string } }) {
  const tweet: TweetProps | null = await getTweetId(+id);
  
  if (tweet === null) {
    redirect('/');
  }

  return <>
    <div className="">
      <h1>
        {tweet?.title}
      </h1>
      <h2>
        {tweet?.content}
      </h2>
    </div>
  </>
}