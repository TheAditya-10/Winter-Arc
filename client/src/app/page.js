import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server";

export default async function Home() {

  const { userId, sessionClaims } = await auth()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-center font-mono font-semibold text-2xl w-full">Winter Arc</h1>
        <div className="flex justify-between gap-10 items-center">
          <SignedOut>
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
          </SignedOut>
          <SignedIn>
              {!!(userId && sessionClaims) && <p>Hello, {sessionClaims.firstName}</p>}
              <UserButton />
          </SignedIn>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
