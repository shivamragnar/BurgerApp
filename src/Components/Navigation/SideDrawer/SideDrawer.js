import React from 'react'
import styles from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/AuxFolder/lax'

const Sidedrawer = (props) =>{
let classes = [styles.SideDrawer, styles.close]
if(props.open){
    classes = [styles.SideDrawer, styles.open]
}
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.close} />
            <div className={classes.join(' ')} onClick={props.close}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
        
    )
}

export default Sidedrawer
