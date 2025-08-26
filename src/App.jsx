import React, { useEffect } from 'react'
import GameMain from './components/GameMain'

function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp
      tg.expand()
      tg.disableVerticalScroll(true)
    }
  }, [])

  return (
    <GameMain />
  )
}

export default App
