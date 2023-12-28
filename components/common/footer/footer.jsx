import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import { icons } from '../../../constants'

import styles from './footer.style'

const Footer = () => {
  return (
    <View style={styles.container}>
        <View style={styles.navContainer}>
            <TouchableOpacity style={styles.likeBtn}>
                <Image source={icons.home} style={styles.likeBtnImage} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Footer