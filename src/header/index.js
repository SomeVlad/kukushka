import styles from './index.module.css'

export function Header({ date, onDateChange }) {
    return (
        <header className={styles.root}>
            <label>
                Enter your birthday:{' '}
                <input type='date' value={date} onChange={onDateChange} />
            </label>
        </header>
    )
}
