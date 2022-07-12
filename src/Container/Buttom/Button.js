import styles from './Button.module.css'

const Button = ({children, handlebtnClick}) => <button className={styles.button} onClick={handlebtnClick}>{children}</button>

export default Button