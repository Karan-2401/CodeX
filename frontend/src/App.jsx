import { useState } from 'react'
import './App.css'
import { SignInButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Hi Karan</h1>
      <SignInButton mode='modal'/> 
    </>
  )
}

export default App
