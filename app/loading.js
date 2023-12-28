import * as SQLite from 'expo-sqlite'
import {View, Image, Text, ActivityIndicator } from 'react-native'
import { COLORS, icons } from '../constants'
import { useEffect, useState } from 'react';
import { useRouter, useNavigation } from 'expo-router'
import axios from 'axios';
import academicYear from '../components/common/date'



const Loading = ()=>{

    const db = SQLite.openDatabase('test.db')

    const subjectdata=[]
    var classList = []
    const code =''
    var classe = ''
    const router = useRouter()
    const [isLoading, setIsloading] = useState(false)
    var uri = "https://us-east-1.aws.data.mongodb-api.com/app/scholaidapp-kjzfi/endpoint/"


    const navigation = useNavigation()


    // runs only on page render
    useEffect(() => {
        // loadAll()
    }, [])



    const Mongodb_get_subject=(code)=>{
        // create json request body type
        const params = JSON.stringify({
            "matricule": code
        })

        axios.post(uri +"getSubjects", params, {
            "headers":{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
            //get the subject names
            if(response.data.length>0){
                //insert subject names into SQLite table
                var len = response.data.length-1
                if(len>=0){
                    while(len>=0){
                        var jsonDataObject = response.data[len]
                        //append object of data to array
                        subjectdata.push(jsonDataObject)
                        len--
                    }
                    //insert names into table
                    SQLite_insert_subject()
                }
            }else{
                //collection is empty
                alert("no subject found")
                console.log("no subject found")
            }
        }).catch(err=>{
            alert("error occured while connecting to database")
        })


        // var col = mongo.collection('subject')
        // col.find({Code: code}, {Acadyear: academicYear}).toArray(function(err, docs)
        // {
        //     var len = docs.length-1
        //     if(len>=0){
        //         while(len>=0){
        //             const obj = {
        //                 id: docs[len].id,
        //                 class: docs[len].class,
        //                 subject: docs[len].subject,
        //                 acadyear: docs[len].acadyear  
        //             }
        //             data.push(obj)
        //             len--
        //         }
        //         SQLite_insert_subject()
        //     }else{
        //         // no subject registered
        //         alert("No subject available")
        //     }
        // })
    }


    const SQLite_insert_subject = ()=>{
        var len = data.length-1
        while(len>=0){
            db.transaction(tx=>{
                tx.executeSql(
                    "INSERT INTO Subject(id, class, subject, acadyear) VALUES(?,?,?,?)",
                    [subjectdata[len].id, subjectdata[len].classe, subjectdata[len].subject, subjectdata[len].academicYear]
                )
            })
            len--
        }
        
    }



    //3* thirdly, Marksheet Table is created corresponding to the subject, class and acadyear


    const SQLite_get_Subject_data=()=>{
        db.transaction(tx=>{
            tx.executeSql(
                "SELECT * FROM Subject WHERE acadyear=?",
                [academicYear],
                (tx, result)=>{
                    var len = result.rows.length -1
                    if(len>0){
                        while(len>=0){
                            const classe = result.rows.item(len).class
                            const subject = result.rows.item(len).subject
                    
                            //create corresponding Marksheet Table
                            SQLite_create_Marksheet_Table(classe, subject, academicYear)
                            len--
                        }
                    }
                }
            )
        })
    }


    const SQLite_create_Marksheet_Table = (classe, subject) =>{
        db.transaction(tx=>{
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS"
                +classe +"_"+subject +"_"+academicYear
                +"(id INTEGER PRIMARY KEY, name VARCHAR, " + subject +" VARCHAR, sequence VARCHAR);"
            )
        })
    }


    // 4* copy all student name from a class and acadyear from Mongodb Table (classname + acadyear) to SQLite DB Table (classname + subject + acadyear)
    

    const SQLite_get_class_name=()=>{
        db.transaction(tx=>{
            tx.executeSql(
                "SELECT class FROM Subjects WHERE acadyear=?",
                [academicYear],
                (tx, result)=>{
                    var len = result.rows.length-1
                    if(len>0){
                        while(len>=0){
                            classe = result.rows.item(len).class +"_"+ academicYear
                            Mongodb_get_class_list(classe)
                            SQLite_insert_Student_names();

                            len--
                        }
                    }
                }
            )
        })
    }


    const Mongodb_get_class_list=({classe})=>{
         // create json request body type
         const params = JSON.stringify({
            "tablename": classe+"_"+academicYear,
            
        })

        axios.post(uri +"getclasslist", params, {
            "headers":{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
            //verify data
            if(response.data.length>0){
                //retrieve all data
                var len = response.data.length-1
                while(len>=0){
                    var obj = response.data[len]
                    classList.push(obj)
                    len--
                }
                //insert class list names into SQLite table
                SQLite_insert_Student_names()
            }else{
                alert("class list is Empty")
            }
        }).catch(err=>{
            console.log(err)
            alert("An error occured while connecting to database")
        })

  
  
    }


    const SQLite_insert_Student_names=()=>{
        db.transaction(tx=>{
            //creating full marksheet with all 6 sequences
                var len = classList.length-1
                for(var i=0; i<=len; i++){
                    tx.executeSql(
                        "INSERT INTO "+classe+"_"+subject+"_"+academicYear +
                        "(name, sequence) VALUES (?,?)",
                        [classList[i].name, classList[i].sequence]
                    )
                }
        })
    }




    const loadAll = ()=>{
        setIsloading(true)

        Mongodb_get_subject()
        SQLite_get_Subject_data()
        SQLite_get_class_name()

        setIsloading(false)
    }



    return(
        <View>
            <Image source={icons.logo} />
            <View>
                {isLoading ? (
                    <>
                        <ActivityIndicator size="large" color={COLORS.primary}/>
                        <Text>preparing data ...</Text>
                    </>
                    
                ) : (
                    navigation.navigate("Sequence/index")
                )}
                
            </View>
        </View>
    )

}

export default Loading
