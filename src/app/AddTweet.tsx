"use client";

import Input from "@/components/Input";
import { Submit } from "@/components/Submit";
import { useFormState } from "react-dom";
import { postTweet } from "@/_actions/action";

export function AddTweet() {
  const [state, action, pending] = useFormState(postTweet, null);
  
  if (state?.success) {
    window.location.reload();
  }

  return (<form action={action} className="flex flex-row row-start-2 row-span-3 w-full">
    <div className="flex flex-col w-4/5 bg-blue-200 h-full gap-2" >
      <Input name="title" className={"w-full h-1/6"}/>
      <Input name="content" className={"w-full h-4/5"}/>
    </div>
    <div className="flex flex-col-reverse h-full items-end w-1/5 gap-2">
      <Submit className={"bg-blue-800 h-14 w-full"}>
        <p>
          게시하기
        </p>
      </Submit>
      {(state?.success !== true  && state?.formErrors)? <span className="min-w-full text-start">{state?.formErrors[0]}</span> : <></>}
    </div>
  </form>);
}