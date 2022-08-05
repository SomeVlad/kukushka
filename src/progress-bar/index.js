import styles from './index.module.css'
import { useEffect, useState } from 'react'

const averageLifeExpectancyInYears = 72.74

function ProgressBarLine({ completed, totalPercentage }) {
    const isLabelShown = completed > 0 && completed < 100
    const labelText = `${totalPercentage.toFixed(9)}%`

    return (
        <div className={styles['line-container']}>
            <div
                className={styles['line-filler']}
                style={{ width: `${completed}%` }}
            >
                {isLabelShown && <code className={styles['line-label']}>{labelText}</code>}
            </div>
        </div>
    )
}

const lines = 95

export function ProgressBar({ date }) {
    const [time, setTime] = useState(Date.now());

    const birthDate = new Date(date)
    const dateOfDeath = new Date(date)
    dateOfDeath.setFullYear(birthDate.getFullYear() + averageLifeExpectancyInYears)

    const completed = 100 * (time - birthDate.getTime()) / (dateOfDeath.getTime() - birthDate.getTime())

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 100);
        return () => {
            clearInterval(interval);
        };
    }, []);

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

                return (
                    <ProgressBarLine
                        key={i}
                        completed={lineCompleted}
                        totalPercentage={completed}
                    />
                )
            })}
        </div>
    )
}