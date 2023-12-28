import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import React, { useState } from 'react'
import styles from './loginArea.style'

const LoginArea = ({handleLogin, code, setCode}) =>{


    return(
     
        <View>

            <View style={styles.inputContainer}>
                <Text style={styles.welcomeMessage} >Welcome!</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputField} 
                    value={code} 
                    placeholder='School Name'
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry={true}
                    style={styles.inputField} 
                    value={code}
                    onChangeText={(text) => setCode(text)} 
                    placeholder='Teacher Code'
                />
            </View>

            <View style={styles.loginBtnContainer}>
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={styles.loginBtnText}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>

        
    )
}

export default LoginArea;