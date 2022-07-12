import styles from './Button.module.css'

const Button = ({children, handlebtnClick,handelDisable}) => <button className={styles.button} onClick={handlebtnClick} disabled={handelDisable}>{children}</button>

export default Button