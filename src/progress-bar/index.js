import { useEffect, useState, memo } from 'react'
import styles from './index.module.css'

const averageLifeExpectancyInYears = 72.74
const lines = 95

function ProgressBarLine({ completed, isLabelOverflow, label }) {
    const labelStyles = `${styles['line-label']} ${isLabelOverflow ? `${styles['line-label_overflow']}` : ''}`

    return (
        <div className={styles['line-container']}>
            <div
                className={styles['line-filler']}
                style={{ width: `${completed}%` }}
            >
                {label && (
                    <code className={labelStyles}>
                        {label}
                    </code>
                )}
            </div>
        </div>
    )
}

const MemoizedProgressBarLine = memo(ProgressBarLine)


export function ProgressBar({ date }) {
    const [time, setTime] = useState(Date.now())

    const birthDate = new Date(date)
    const dateOfDeath = new Date(date)
    dateOfDeath.setFullYear(birthDate.getFullYear() + averageLifeExpectancyInYears)

    const completed = 100 * (time - birthDate.getTime()) / (dateOfDeath.getTime() - birthDate.getTime())

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 100)
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
                    <MemoizedProgressBarLine
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