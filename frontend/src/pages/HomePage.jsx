import { SignedIn, SignInButton, SignOutButton, SignedOut } from '@clerk/clerk-react'
import React from 'react'

const HomePage = () => {
  return (
    <div>
        <button>Click Me</button>
        <SignedOut>
            <SignInButton mode='model'>
                <button>Login</button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <SignOutButton/>
        </SignedIn>
    </div>
  )
}

export default HomePage