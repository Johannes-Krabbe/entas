import { useState } from 'react'
import styles from './Signin.module.scss'
import TextInput from '../input/TextInput'

export default function Signin() {
    // username state
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    /*
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirm] = useState('')
    */

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1>Create a new Account!</h1>
                <form className={styles.form}>
                    <TextInput
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Max.Mustermann"
                        type="text"
                        topLabel="Username"
                        bottomLabel={
                            username.length < 3 && username.length > 0
                                ? 'Username must be at least 3 characters long'
                                : null
                        }
                        state={
                            username.length < 3 && username.length > 0
                                ? 'error'
                                : 'default'
                        }
                    />
                    <TextInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Max@Mustermann.de"
                        type="text"
                        topLabel="Email"
                        bottomLabel={
                            email.length < 3 && email.length > 0
                                ? 'Email must be at least 3 characters long'
                                : null
                        }
                        state={
                            email.length < 3 && email.length > 0
                                ? 'error'
                                : 'default'
                        }
                    />

                    <div className={styles.button}>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
