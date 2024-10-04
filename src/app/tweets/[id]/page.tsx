"use client";

import { getTweetId } from "@/_actions/_tweets/actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tweet() {
    const {id} = useParams();
    const [hydrated, setHydrated] = useState(false);
    const [tweet, setTweet] = useState<any>();
    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        const asyncGetTweet = async() => {
            const tweet = await getTweetId(+id);
            setTweet(tweet);
        }
        asyncGetTweet();
    }, [id]);

    if (!hydrated || !tweet) {
        return <>loading...</>
    }
    return <>
        <div>
            <h1>
                {tweet.title}
            </h1>
            <h2>
                {tweet.content}
            </h2>
        </div>
    </>
}