var express=require("express")
var bodyparser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in connecting to database"))
db.once('open',()=> console.log("connected to databse"))

app.post("/sign_up",(req,res) => {
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "password":password
        
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
            
        }
        console.log("Record inserted succesfull")
    })
    return res.redirect('signup_successful.html')


})

app.get("/",(req,res) =>{
    res.set({
        "Allow-acces-Allow_origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);
console.log("listening on port")

