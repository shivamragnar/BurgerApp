import React from 'react'
import BurgerLogo from '../../Assets/Images/logo.png'
import styles from './Logo.css'
const Logo = (props) =>(
    <div className={styles.Logo}>
        <img src={BurgerLogo} alt='BurgerLogo'></img>
    </div>
)

export default Logo