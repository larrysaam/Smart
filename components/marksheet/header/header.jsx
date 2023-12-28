import {Text, View} from 'react-native'
import styles from './header.style'

const Header = ({form, subject})=>{
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>{form}</Text>
            <Text style={styles.mainText}>{subject}</Text> 
        </View>
    )
}

export default Header