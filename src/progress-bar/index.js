import { useEffect, useState } from 'react'
import { Line } from './line'

const averageLifeExpectancyInYears = 72.74
const lines = 95

export function ProgressBar({ date }) {
    const [time, setTime] = useState(Date.now())

    const birthDate = new Date(date)
    const dateOfDeath = new Date(date)
    dateOfDeath.setFullYear(birthDate.getFullYear() + averageLifeExpectancyInYears)

    const completed = 100 * (time - birthDate.getTime()) / (dateOfDeath.getTime() - birthDate.getTime())

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 20)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div>
            {new Array(lines).fill(null).map((_, i) => {
                const oneLinePercentage = 100 / lines
                const thisLineMin = oneLinePercentage * i
                const thisLineMax = oneLinePercentage * (i + 1)
                let lineCompleted

                if (completed > thisLineMax) {
                    lineCompleted = 100
                } else if (completed < thisLineMin) {
                    lineCompleted = 0
                } else {
                    const completedFraction = (completed - thisLineMin) % oneLinePercentage
                    lineCompleted = 100 * completedFraction / oneLinePercentage
                }

                const isLabelShown = lineCompleted > 0 && lineCompleted < 100
                const isLabelOverflow = lineCompleted > 0 && lineCompleted < 9
                const labelText = `${completed.toFixed(9)}%`

                return (
                    <Line
                        key={i}
                        completed={lineCompleted}
                        label={isLabelShown && labelText}
                        isLabelOverflow={isLabelShown && isLabelOverflow}
                    />
                )
            })}
        </div>
    )
}