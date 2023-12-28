import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import { icons } from '../../../constants'

import styles from './footer.style'

const Footer = ({handleSave}) => {
  return (
    <View style={styles.container}>
        <View style={styles.navContainer}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Image source={icons.tick} style={styles.saveBtnImage} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Footer