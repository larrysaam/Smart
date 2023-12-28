import { Stack } from "expo-router";
import {SafeAreaView, View, FlatList} from 'react-native'
import Header from "../../components/marksheet/header/header";
import List from "../../components/marksheet/List/list";
import Footer from "../../components/marksheet/footer/footer";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite'
import academicYear from '../../components/common/date'
import {COLORS, SIZES} from '../../constants'


// create the database



const Marksheet =()=>{

    
    const route = useRoute()
    const {Classe, SeqNum, Subject} = route.params
    const tablename = Classe+"_"+Subject+"_"+academicYear
    const sequence = SeqNum
    const data = []
    const [name, setName] = useState('')
    const [score, setScore] = useState('')
    var scores = []
    var uri = "https://us-east-1.aws.data.mongodb-api.com/app/scholaidapp-kjzfi/endpoint/insertscore"


    //connections
    const db = SQLite.openDatabase('test.db')

    // runs only on page render
    useEffect(() => {
        subjectList();
    }, [])
    


    const Save_score=(tablename)=>{
        db.transaction(tx=>{
            tx.executeSql(
                "SELECT name, score FROM "+ tablename +" WHERE sequence=?",
                [sequence],
                (tx, result)=>{
                    var len = result.rows.length-1
                    if(len>0){
                        while(len>=0){
                            var obj={
                                name: result.rows.item(len).name,
                                score: result.rows.item(len).score
                            }
                            scores.push(obj)
                            len--
                        }
                        Mongodb_insert_score(tablename)
                    }
                }
            )
        })
    }



    const Mongodb_insert_score=(tablename)=>{

        var len = scores.length-1
        while(len>=0){
            var studentname = scores[len].name
            var score = scores[len].score

            // create json request body type
            const params = JSON.stringify({
                "tablename": tablename,
                "name": studentname,
                "sequence": SeqNum,
                Subject : score
            })

            axios.post(uri +"insertscore", params, {
                "headers":{
                    "Content-Type":"application/json"
                }
            })
            .then((response)=>{
                if(response.status === 200){

                }else{
                    alert("An error occured. Check your connection and try again!")
                }
            })
            .catch(err =>{
                console.log(err)
            })

        }

        
    }


    


    



    // function changes the value of score in the array of data
    const handleChange =(text, studentname, newscore)=>{
        setScore(text)
        for(let i=0; i< data.length; i++){
            if(data[i].name === studentname){
                data[i].score = newscore
            }
        }
    }




    const subjectList = ()=>{
        
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT name, score FROM " +tablename + " WHERE sequence=?",
                [sequence],
                (tx, results)=>{
                    var len = results.rows.length-1
                    if(len>=0){
                        while(len>=0){
                            const obj = {
                                name: results.rows.item(len).name,
                                score: results.rows.item(len).score
                            }
                            data.push(obj)
                            len--
                        }
                    }else{
                        <Text>Marksheet not Available</Text>
                    }
                }
            )
        })
    }



    
    const handleSave =()=>{
        //saves all changes into sqlite database table
        for(let i=0; i< data.length; i++){
            db.transaction(tx=>{
                tx.executeSql(
                    "INSERT INTO "+tablename+"(score) VALUES (?) WHERE name = ?",
                    [data[i].score, data[i].name]
                )
            })
        }
        alert("saved successfuly")

        //save to mongodb if internet connection is available
        if(internet){
            Save_score(tablename)
        }else{
            
        }
        
    }



    return(
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
            options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerTitle: "Sequence"
            }}
            />

            <Header form={Classe} subject={Subject}/>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <List 
                        num={'1'} 
                        item={item}
                        onChange={handleChange(text, item.name, score)}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
            />
            <Footer handleSave={handleSave}/>
            
        </SafeAreaView>
    )
}

export default Marksheet