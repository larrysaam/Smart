import {View, Text, TextInput} from 'react-native'
import styles from './list.style'



const List =({num, item, onChange})=>{


    return(
        <View style={styles.itemContainer}>
            <Text style={styles.name}>{num}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <TextInput onChangeText={onChange} value={item.score} style={styles.input}/>
        </View>
    )
}

export default List