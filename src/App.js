import { useCallback, useState } from 'react'
import { Header } from './header'
import { ProgressBar } from './progress-bar'

function App() {
    const [date, setDate] = useState('1980-01-01')
    const handleDateChange = useCallback((event) => {
        setDate(event.currentTarget.value)
    }, [setDate])

    return (
        <main>
            <Header
                date={date}
                onDateChange={handleDateChange}
            />
            <ProgressBar date={date} />
        </main>
    )
}

export default App
