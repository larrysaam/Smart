import LoginArea from '../components/login/loginArea/loginArea'
import Footer from '../components/login/footer/footer'
import Top from '../components/login/top/top'
import {View} from 'react-native'
import { Stack, router, useRouter, useNavigation } from 'expo-router';
import axios from 'axios';
import * as SQLite from 'expo-sqlite'
import { useEffect, useState } from 'react';


const Login = ()=>{
  
    //connections
    const db = SQLite.openDatabase('test.db')
    const URI = "https://us-east-1.aws.data.mongodb-api.com/app/scholaidapp-kjzfi/endpoint/";

    //usestates
    const [code, setCode] = useState()
    const route = useRouter()
    const navigation = useNavigation()


    // runs only on page render
    useEffect(() => {
        createTable()
    }, [])


    // creates all fundamental tables used in the system
    const createTable = () =>{
        db.transaction((tx)=>{
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS users "
                +"(id INTEGER PRIMARY KEY, name VARCHAR, code VARCHAR);"
            )
        })

        db.transaction((tx)=>{
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS"
                +" Subject"
                +"(id INTEGER PRIMARY KEY , matricule VARCHAR, class VARCHAR, subject VARCHAR, acadyear VARCHAR);"
            )   
        })
    }

    
    //function inserts user data into SQLite user table
    const SQLite_insert_user=(id, name, code)=>{
        db.transaction(tx=>{
            tx.executeSql(
                "INSERT INTO user(id, name, code) VALUES(?,?,?)",
                [id, name, code]
            )
        })
    }


    

    // verify if user exist in Mongodb, 
    // if true, return  id, name, code
    const Mongodb_verify_user = async(code)=>{
        // create json request body type
        const params = JSON.stringify({
            "matricule": code
        })

        axios.post(URI +"login", params, {
            "headers":{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
            //teacher found
            if(response.data.length > 0){
                SQLite_insert_user(response.data[0]._id, response.data[0].name, response.data[0].matricule)
                navigation.navigate("loading")
            }else{
                console.log("invalid access code!")
                alert("invalid access code!")
            }
        }).catch(err=>{
            console.log(err)
            alert("an error occured. check your connection and try again")
        })
    }



    // functions verifies if login code correspond to what is in the database
    // if true access is granted
    const handleLogin = ()=>{         
        db.transaction(tx=>{
            tx.executeSql(
                "SELECT name FROM users WHERE code = ?",
                [code],
                (tx, result)=>{
                    var len = result.rows.length-1
                    if(len>=0){
                        // allow access to home page
                        route.push('/loading')
                    }else{
                        // verify if user exist in Mongodb, 
                        Mongodb_verify_user(code)
                    }
                }
            )
        })

    }



    return(
        <>
            <View>
                <Top />
                <LoginArea code={code} setCode={setCode} handleLogin={handleLogin}/>
            </View>
            
            <Footer/>
        </>
        
    )

}

export default Login;
