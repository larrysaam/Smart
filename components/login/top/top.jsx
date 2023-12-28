import {View, Image} from 'react-native'
import React, { useState } from 'react'
import styles from './top.style'
import {icons} from '../../../constants'

const Top = () =>{

    return(
     
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={icons.heart} style={styles.profileImage} />
            </View>
        </View>

    )
}

export default Top;