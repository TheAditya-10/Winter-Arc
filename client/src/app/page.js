'use server'

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ConnectWithLinkedin } from "@/components/connect-with-linkedin";

export default async function Home() {

  const { userId, sessionClaims } = await auth()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-center font-mono font-semibold text-2xl w-full">Winter Arc</h1>
        <SignedOut>
          <div className="flex justify-between gap-10 items-center">
            <SignInButton>
              <button className="bg-[#ac47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex justify-between gap-10 items-center">
            {!!(userId && sessionClaims) && <p>Hello, {sessionClaims.firstName}</p>}
            <div className="size-7">
              <UserButton/>
            </div>
          </div>
          <div className="w-fit m-auto">
            {(sessionClaims?.publicMetadata?.status !== 'registered')
              ? <Button><Link href={'/auth/register'}>Register Now</Link></Button>
              : <Button><Link href={'/dashboard'}>Dashboard</Link></Button>}
          </div>
          {(sessionClaims?.publicMetadata?.status === 'registered') && <ConnectWithLinkedin />}
          
        </SignedIn>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
