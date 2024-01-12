import AutoHeight from '../AutoHeight'
import styles from './TextInput.module.scss'

interface TextInputProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    type: string
    topLabel: string | null
    bottomLabel: string | null
    state: 'default' | 'error' | 'success'
}

export default function TextInput({
    value,
    onChange,
    placeholder,
    type = 'text',
    topLabel,
    bottomLabel,
    state = 'default',
}: TextInputProps) {
    return (
        <div
            className={`${styles.input} ${
                state === 'error' ? styles.error : null
            }`}
        >
            {topLabel && (
                <label className={styles.topLabel} htmlFor="username">
                    {topLabel}
                </label>
            )}
            <input
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                value={value}
            />
            <AutoHeight>
                {bottomLabel && (
                    <label className={styles.bottomLabel} htmlFor="username">
                        {bottomLabel}
                    </label>
                )}
            </AutoHeight>
        </div>
    )
}
