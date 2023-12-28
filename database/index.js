import SQLite from 'react-native-sqlite-storage'

// create the database
const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    ()=>{},
    error=>{console.log(error)}
)


/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 1* on Login, the app gets 'user' data from Mongodb
 */

// login function
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



// verify if user exist in Mongodb, 
// if true, return  id, name, code
const Mongodb_verify_user = (code)=>{

    var col = db.collection('users')
    col.findOne({Code: code}).toArray(function(err, docs)
    {
        if(docs.length>0){
            return docs
        }else{
            return docs
        }
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

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 2* secondly, 'subject' data corresponding to the teachers code is gotten from Mongodb
 */

const data=[]
const code =''

const Mongodb_get_subject=(code, acadyear)=>{

    var col = db.collection('subject')
    col.find({Code: code}, {Acadyear: acadyear}).toArray(function(err, docs)
    {
        var len = docs.length-1
        if(len>=0){
            while(len>=0){
                const obj = {
                    id: docs[len].id,
                    class: docs[len].class,
                    subject: docs[len].subject,
                    acadyear: docs[len].acadyear  
                }
                data.push(obj)
                len--
            }
            SQLite_insert_subject()
        }else{
            // no subject registered
            alert("No subject available")
        }
    })
}


const SQLite_insert_subject = ()=>{
    var len = data.length-1
    while(len>=0){
        db.transaction(tx=>{
            tx.executeSql(
                "INSERT INTO subject(id, class, subject, acadyear) VALUES(?,?,?,?)",
                [data[len].id, data[len].class, data[len].subject, data[len].acadyear]
            )
        })
        len--
    }
    
}



/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 3* thirdly, Marksheet Table is created corresponding to the subject, class and acadyear
 */

const acadyear = ''

const SQLite_get_Subject_data=()=>{
    db.transaction(tx=>{
        tx.executeSql(
            "SELECT * FROM subject WHERE acadyear=?",
            [acadyear],
            (tx, result)=>{
                var len = result.rows.length -1
                if(len>0){
                    while(len>=0){
                        const classe = result.rows.item(len).class
                        const subject = result.rows.item(len).subject
                
                        //create corresponding Marksheet Table
                        SQLite_create_Marksheet_Table(classe, subject, acadyear)
                        len--
                    }
                }
            }
        )
    })
}


const SQLite_create_Marksheet_Table = (classe, subject, acadyear) =>{
    db.transaction(tx=>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS"
            +classe +"_"+subject +"_"+acadyear
            +"(id INTEGER PRIMARY KEY, student_name VARCHAR," + subject +" TEXT);"
        )
    })
}



/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 4* copy all student name from a class and acadyear from Mongodb Table (classname + acadyear) to SQLite DB Table (classname + subject + acadyear)
 */

var classe = ''
var classList = []

const SQLite_get_class_name=()=>{
    db.transaction(tx=>{
        tx.executeSql(
            "SELECT class FROM subjects WHERE acadyear=?",
            [acadyear],
            (tx, result)=>{
                var len = result.rows.length-1
                if(len>0){
                    while(len>=0){
                        classe = "Form_" + result.rows.item(len).class +"_"+ acadyear
                        Mongodb_get_class_list(classe)
                        SQLite_insert_Student_names();

                        len--
                    }
                }
            }
        )
    })
}


const Mongodb_get_class_list=(classe)=>{

    var col = db.collection(classe)
    col.find().toArray(function(err, docs)
    {
        var len = docs.length-1
        while(len>=0){
            classList[len] = docs[len].student_name
            len--
        }
    })
}


const SQLite_insert_Student_names=()=>{
    var num = 1;
    db.transaction(tx=>{
        //creating full marksheet with all 6 sequences
        while(num <= 6){
            var len = classList.length-1
            for(var i=0; i<=len; i++){
                tx.executeSql(
                    "INSERT INTO "+classe+"_"+subject+"_"+acadyear +
                    "(student_name, sequence) VALUES (?,?)",
                    [classList[i], num]
                )
            }
            num++
        }
    })
}




/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 5* when marksheet is saved, the data is copied from SQLite Table (classname + subject + acadyear) to corresponding Mongodb Table(classname + acadyear) under (subject) column
 */


var scores = []
var tablename = ''
const sequence = ''

const Save_score=(tablename)=>{
    db.transaction(tx=>{
        tx.executeSql(
            "SELECT student_name,score FROM "+ tablename +" WHERE sequence=?",
            [sequence],
            (tx, result)=>{
                var len = result.rows.length-1
                if(len>0){
                    while(len>=0){
                        var obj={
                            name: result.rows.item(len).student_name,
                            score: result.rows.item(len).student_name
                        }
                        scores.push(obj)
                        len--
                    }
                    Mongodb_insert_score(scores, classe, acadyear, sequence)
                }
            }
        )
    })
}



const Mongodb_insert_score=(classe, sequence)=>{

    var col = db.collection(classe)
    var len = scores.length-1
    while(len>=0){
        var myquery = {student_name: array[len].name, sequence: sequence} 
        var newvalue = { $set: {score: array[len].score}} 

        col.UpdateOne(myquery, newvalue, function(err, res){
            if(err) throw err
            console.log("1 document inserted")
        })
    }
}




const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                       
// const url = "<connection-string>"
// const client = new MongoClient(url);

// Reference the database to use
const dbName = "gettingStarted";
                     
async function run() {
    try {
        // Connect to the Atlas cluster
         await client.connect();
         const db = client.db(dbName);

         // Reference the "people" collection in the specified database
         const col = db.collection("people");

         // Create a new document                                                                                                                                          
         let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // May 23, 1912                                                                                                                                
             "death": new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                 
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }

         // Insert the document into the specified collection       
         const p = await col.insertOne(personDocument);

         // Find and return the document
         const filter = { "name.last": "Turing" };
         const document = await col.findOne(filter);
         console.log("Document found:\n" + JSON.stringify(document));

        } catch (err) {
         console.log(err.stack);
     }

     finally {
        await client.close();
    }
}

run().catch(console.dir);







const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                       
const url = "mongodb+srv://<username>:<password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority";

// Connect to your Atlas cluster
const client = new MongoClient(url);


async function run() {
    try {
        // Connect to the Atlas cluster
        await client.connect();
        const db = client.db(dbName);
        console.log("Successfully connected to Atlas");
        return db

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);