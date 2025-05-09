import { useEffect } from 'react'
import { useThemeStore } from './store/themeStore'
import PomodoroApp from './components/PomodoroApp/PomodoroApp'

function App() {
  const { themeColor } = useThemeStore()

  // Apply the theme color on initial load
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--theme-color',
      `var(--${themeColor})`,
    )

    // Set a dark background for the app
    document.body.classList.add('bg-gray-900')

    // Add theme CSS variables to the document
    const rootStyle = document.documentElement.style
    rootStyle.setProperty('--design-1', '#F87070') // Red
    rootStyle.setProperty('--design-2', '#70F3F8') // Cyan
    rootStyle.setProperty('--design-3', '#D881F8') // Purple
  }, [themeColor])

  return (
    <div className="text-gray-200">
      <PomodoroApp />
    </div>
  )
}

export default App
