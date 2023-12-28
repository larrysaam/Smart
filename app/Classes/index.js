import ClassCard from '../../components/home/classes/class'
import {View, Text, SafeAreaView, TextInput, FlatList} from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES} from '../../constants/theme'
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import * as SQLite from 'expo-sqlite'
import academicYear from '../../components/common/date'


const Classes = ()=>{

    const db = SQLite.openDatabase('test.db')
    const route = useRoute()
    const navigation = useNavigation()

    const DATA = []
    


     // runs only on page render
     useEffect(() => {
        subjectList();
    }, [])


    
    const subjectList = ()=>{
        
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT id, class, subject FROM Subject WHERE acadyear=? AND matricule=?",
                ["2023_2024", "123456789"],
                (tx, results)=>{
                    var len = results.rows.length-1
                    if(len>=0){
                        while(len>=0){
                            
                            const obj = {
                                id: results.rows.item(len).id,
                                classe: results.rows.item(len).class,
                                subject: results.rows.item(len).subject
                            }
                            DATA.push(obj)
                            len--
                        }
                        console.log(DATA)
                    }else{
                        <Text>No subject Available</Text>
                    }
                }
            )
        })
    }


    return(
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
            options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerTitle: "Class"
            }}
            />

            <FlatList

                data={DATA}
                renderItem={({item}) => (
                    <ClassCard
                    detail={item}
                    handleClick={() => navigation.navigate('Marksheet/index', {Classe: item.classe, SeqNum: route.params.seqnum, Subject: item.subject})}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
            />
            
            
        </SafeAreaView>
        
    )

}

export default Classes;