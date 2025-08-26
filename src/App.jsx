import React, { useEffect } from 'react'
import GameMain from './components/GameMain'

function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand()
    }
  }, [])

  return (
    <GameMain />
  )
}

export default App
