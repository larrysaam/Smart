import {View, Image, Text} from 'react-native'
import React, { useState } from 'react'
import styles from './footer.style'

const Footer = () =>{

    return(
     
        <View style={styles.container}>
            <Text style={styles.footertext}>developed by SMART</Text>
        </View>

    )
}

export default Footer;