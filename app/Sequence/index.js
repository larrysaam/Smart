
import SequenceCard from "../../components/sequence/sequenceCard";
import Footer from "../../components/common/footer/footer";
import {View, Text, SafeAreaView, TextInput, FlatList} from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES} from '../../constants/theme'
import { useNavigation } from 'expo-router';
import { useEffect, useState } from "react";

const Seq =()=>{

    const navigation = useNavigation();



    //function handles sequence button click
    const handleclick = (seqnum) =>{
        navigation.navigate('Classes/index', {seqnum})
    }


    return(
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
            options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerTitle: "Sequence",
                headerTitleAlign: "center"
            }}
            />

            <SequenceCard num1={"1st"} num2={"2nd"}   handleClick1={ () => handleclick(1)} handleClick2={ () => handleclick(2)}/>
            <SequenceCard num1={"3rd"} num2={"4th"}   handleClick1={ () => handleclick(3)} handleClick2={ () => handleclick(4)}/>
            <SequenceCard num1={"5th"} num2={"6th"}   handleClick1={ () => handleclick(5)} handleClick2={ () => handleclick(6)}/>
            <Footer/>
            
        </SafeAreaView>
        
    )
        

}

export default Seq
