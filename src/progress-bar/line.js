import { memo } from 'react'
import styles from './line.module.css'

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

export const Line = memo(ProgressBarLine)