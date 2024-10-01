import { getUser } from "@/_actions/_profile/actions";

export default async function Page() {
    const user = await getUser();
    return <div className="bg-slate-400 justify-center items-center flex flex-col">
        <div>Welcome</div>
        <div className="flex gap-3">
            <label>
                username
            </label>    
            <span>
                {user?.username}
            </span>
            </div>
        <div className="flex gap-3">
            <label>
                email
            </label>    
            <span>
                {user?.email}
            </span>
        </div>
    </div>
}