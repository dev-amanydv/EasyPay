import { Button } from "./button";
import Image from "next/image"
interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="fixed w-full flex justify-between border-b px-4 border-slate-300 top-0 left-0 z-50 bg-white shadow-md">
        <div className="text-xl flex font-bold flex-col justify-center ml-3 text-blue-900">
        <Image src="/logo.png" alt="logo" height={120} width={120} />
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}