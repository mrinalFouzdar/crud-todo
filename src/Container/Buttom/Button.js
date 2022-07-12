import styles from './Button.module.css'

const Button = ({children}) => <button className={styles.button} >{children}</button>

export default Button