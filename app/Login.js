import LoginArea from '../components/login/loginArea/loginArea'
import Footer from '../components/login/footer/footer'
import Top from '../components/login/top/top'
import {View, Text, SafeAreaView, TextInput} from 'react-native'
import { Stack, router, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES} from '../constants/theme'
import SQLite from 'react-native-sqlite-storage'
import { useEffect, useState } from 'react';


// create the database
const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    ()=>{},
    error=>{console.log(error)}
)


const SetAcadYear =()=> {
    const month = new Date().getMonth()+1
    const year = new Date().getFullYear()
    const acadyear = ''

    if(month>=9 & month<=12){
        acadyear = String.valueOf(year) + "_" + String.valueOf(year + 1);
        return acadyear
    }else if(month>=1 & month<9){
        acadyear = String.valueOf(year - 1) + "_" + String.valueOf(year);
        return acadyear
    }
}




const Login = ()=>{
    

    const [code, setCode] = useState('')
    const subject = ""
    const classe =""
    const acadyear =  SetAcadYear()

    // runs only on page render
    useEffect(() => {
        createTable();
    }, [])


    // creates all fundamental tables used in the system
    const createTable = () =>{
        db.transaction((tx)=>{
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS"
                +"user"
                +"(id INTEGER PRIMARY KEY, name TEXT, code TEXT);"
            )
        })
        db.transaction((tx)=>{
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS"
                +"subject"
                +"(id INTEGER PRIMARY KEY, class TEXT, subject TEXT, acadyear TEXT);"
            )
        })
    }


    // inserts subjects and class into Subject Table 
    const Save_Subjects =({id, subject, classe})=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "INSERT INTO subject (id, class, subject, acadyear) VALUES (?,?,?,?)",
                [id,subject,classe,acadyear]
            )
        })
    }


    // get the subject and class with corresponding year and teachername or teacherid from MongoDB database
    //then save it into "subject" Table in SQLite database
    const get_Subjects = ()=>{
        /*
        ******code******
        */
    }


    const Create_Marksheet_Table = () =>{

        //get data from subject Table 
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT class, subject FROM subject WHERE acadyear=? ",
                [acadyear],
                (tx, results)=>{
                    var len = results.rows.length
                    // loop to get all corresponding results
                    while(len>0){
                        classe = results.rows.item(len).class
                        subject = results.rows.item(len).subject

                        //create corresponding Marksheet Table
                        db.transaction((tx)=>{
                            tx.executeSql(
                                "CREATE TABLE IF NOT EXISTS"
                                + classe+"_"+subject+"_"+acadyear
                                +"(Matricule VARCHAR, Name TEXT, Subject TEXT, Sequence INTEGER );"
                            )
                        })
                        len--
                    }
                }
            )
        })
    }


    // functions verifies if login code correspond to what is in the database
    // if true access is granted
    const handleLogin = ()=>{
        
        db.transaction(tx=>{
            tx.executeSql(
                "SELECT name FROM user WHERE code = ?",
                [code],
                (tx, result)=>{
                    var len = result.rows.length-1
                    if(len>=0){
                        // allow access to home page
    
                        /* *******code****** */
    
                    }else{
                        // verify if user exist in Mongodb, 
                        // if true, return  id, name, code
    
                        var doc = Mongodb_verify_user(code)
    
                        if( doc.length > 0){
                            // save id, name, code in SQLite 'user' table
                            SQLite_insert_user(doc.id, doc.name, doc.code)
                            
                            /****  go to home page ***** */
                        }else{
                            
                            alert("Invalid access code")
                        }
                    }
                }
            )
        })
    }



    return(
        
        <View>
            <View>
                <Top />
                <LoginArea code={code} setCode={setCode} handleLogin={handleLogin}/>
            </View>
            
            <Footer/>
        </View>

            
            
      
        
    )

}

export default Login;







// import SequenceCard from "../components/sequence/sequenceCard";
// import Footer from "../components/common/footer/footer";
// import {View, Text, SafeAreaView, TextInput, FlatList} from 'react-native'
// import { Stack, useRouter } from 'expo-router';
// import { COLORS, icons, images, SIZES} from '../constants/theme'
// import { useNavigation } from 'expo-router';
// import { useRoute } from '@react-navigation/native';

// const Seq =({route})=>{

//     const navigation = useNavigation();
//     const route = useRoute()

//     return(
//         <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
//             <Stack.Screen
//             options={{
//                 headerStyle: {backgroundColor: COLORS.lightWhite},
//                 headerShadowVisible: false,
//                 headerTitle: "Sequence",
//                 headerTitleAlign: "center"
//             }}
//             />

//             <SequenceCard num1={"1st"} num2={"2nd"}   handleClick1={ navigation.navigate('../Marksheet',{ paramkey2: [route.params.paramkey, 1]})} handleClick2={ navigation.navigate('../Marksheet',{ paramkey2: [route.params.paramkey, 2]})}/>
//             <SequenceCard num1={"3rd"} num2={"4th"}   handleClick1={ navigation.navigate('../Marksheet',{ paramkey2: [route.params.paramkey, 3]})} handleClick2={ navigation.navigate('../Marksheet',{ paramkey2: [route.params.paramkey, 4]})}/>
//             <SequenceCard num1={"5th"} num2={"6th"}   handleClick1={ navigation.navigate('../Marksheet',{ paramkey2: [route.params.paramkey, 5]})} handleClick2={ navigation.navigate('../Marksheet',{ paramkey2: [route.params.paramkey, 6]})}/>
//             <Footer/>
            
//         </SafeAreaView>
        
//     )
        

// }

// export default Seq




// import { Stack } from "expo-router";
// import {SafeAreaView, View, FlatList, ScrollView} from 'react-native'
// import Header from "../components/marksheet/header/header";
// import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
// import List from "../components/marksheet/List/list";
// import Footer from "../components/marksheet/footer/footer";
// import { COLORS, icons, images } from "../constants";


// const handleChange =()=>{

// }

// const handleSave =()=>{
//     alert("saved")
// }

// const Marksheet =()=>{

//     return(
//         <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
//              <Stack.Screen
//             options={{
//                 headerStyle: {backgroundColor: COLORS.lightWhite},
//                 headerShadowVisible: false,
//                 headerLeft: () => (
//                     <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension='60%' />
//                 ),
//                 headerRight: () => (
//                     <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
//                 ),
//                 headerTitle: "Marksheet",
//                 headerTitleAlign: "center",
//             }}
//             />

//             <Header form={"Form 1"} subject={"Physics"}/>
//             <ScrollView style={{paddingLeft: 14, paddingRight: 14}}>
//                 <List num={'1'} name={"Larrien Saam Larrien Saam Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//                 <List num={'1'} name={"Larrien Saam"} score={"20"} handleChange={handleChange}/>
//             </ScrollView>
//             <Footer handleSave={handleSave}/>
            
//         </SafeAreaView>
//     )
// }

// export default Marksheet