import {View, Text, TouchableOpacity, ProgressBarAndroid, ProgressBarAndroidBase} from 'react-native'
import React, { useState } from 'react'
import styles from './sequence.style'

const SequenceCard = ({num1, num2, handleClick1, handleClick2}) =>{

    return(
       
        <View style={styles.container}>
            <TouchableOpacity style={styles.seqContainer} onPress={handleClick1}>
                <Text style={styles.number}>{num1} </Text>
                <Text style={styles.name}>Sequence</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.seqContainer} onPress={handleClick2}>
                <Text style={styles.number}>{num2} </Text>
                <Text style={styles.name}>Sequence</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default SequenceCard;