import {View, Text, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import styles from './class.style'

const ClassCard = ({detail, handleClick}) =>{

    return(
       
        <View style={styles.container}>
            <TouchableOpacity style={styles.classContainer} onPress={handleClick}>
                <Text style={styles.form}>{detail.classe}</Text>
                <Text style={styles.subjectName}>{detail.subject}</Text>
                <Text style={styles.sequenceTitle}>sequence</Text>
                <View style={styles.bottomContainer}>
                    <View style={styles.circleContainer}>
                        <View style={styles.miniCircle}><Text>1</Text></View>
                        <View style={styles.miniCircle}><Text>2</Text></View>
                        <View style={styles.miniCircle}><Text>3</Text></View>
                        <View style={styles.miniCircle}><Text>4</Text></View>
                        <View style={styles.miniCircle}><Text>5</Text></View>
                        <View style={styles.miniCircle}><Text>6</Text></View>
                    </View>
                    <Text style={styles.number}> |   24 Students</Text>
                </View>
            </TouchableOpacity>
        </View>
        
    )
}

export default ClassCard;