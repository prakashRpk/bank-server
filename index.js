var express=require('express');
var mongoose=require('mongoose');
var app=express();
var cors=require('cors');
app.use(cors());
app.use(express.json());

//create a root path
app.get('/',(req,res)=>{res.send("welcome")})

//open the port
app.listen(8080,()=>{console.log("Server Connected")});

//connect 
mongoose.connect('mongodb+srv://mrprakash08112004:mrprakash@cluster0.owokt.mongodb.net/bank').then(()=>{console.log("DB connect")})

//create a schema

let data=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    amount:Number
})

let Data=mongoose.model("test",data)

// let data1= new Data({
//     name:"Udaya",
//     email:"udaya@gmail.com",
//     password:"vazhlkaiye vahlathan",
//     amount:1100
// })
// data1.save()

//API FOR FETCHING THE DATA

app.get('/data',(req,res)=>(Data.find().then((item)=>res.send(item))))

//API FOR CREATING DATA
app.post('/create',(req,res)=>(Data.create(req.body).then((item)=>res.send(item))))


app.delete('/delete/:id', async (req, res) => {
    try {
      await Data.findByIdAndDelete(req.params.id);
      res.send({ message: "Data deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting data", error });
    }
  });
  
  //  UPDATE 
    app.put('/update/:id', async (req, res) => {
        try {
        const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedData);
        } catch (error) {
        res.status(500).send({ message: "Error updating data", error });
        }
    });