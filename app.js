const multer = require('multer');
const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
app.listen(3000 , () => console.log("server is runing..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('frontend'))

// -----------------------Upload image-----------------------------------

// const storageImage = multer.diskStorage({
//     destination: 'upload/images',
//     filename: (req, file , callback) => {
//         return callback(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
//     }
// })
// const upload = multer({
//    storage: storageImage
// });

// app.use('/image', express.static('upload/images'))  upload.single('image'), 


let messsagepost = JSON.parse(fs.readFileSync("list_user.json"))

app.post('/post',(req, res) => {
    let authorname = req.body.Authorname;
    let content = req.body.contence;
    let date = req.body.date;
    let index = Date.now();

    // if(req?.file?.filename) {
    //     img_url = "http://localhost:3000/image/" + req.file.originalname;
    // }

    let items = {
        id: index,
        Authorname: authorname,
        contence: content,
        date: date
    }
    console.log(items);
    messsagepost.push(items);
    fs.writeFileSync("list_user.json" , JSON.stringify(messsagepost));
    res.send(messsagepost);
   
});

// -------------------------------------------------------------------

// get the data
app.get("/post" , (req , res) => {
    res.send(messsagepost);
})

// edit post 
app.put("/post/:id" , (req , res) => {
    let index = parseInt(req.params.id);
    for (let user of messsagepost){
        if (user.id === index){
            user.contence = req.body.contence;
        }
    }
    fs.writeFileSync("list_user.json",JSON.stringify(messsagepost));
    res.send(messsagepost)
})

// remove post 
app.delete("/post/:id" , (req , res) => {
    let index = parseInt(req.params.id);
    let messsage = [];
    for (let user of messsagepost){
        if (user.id !== index){
            messsage.push(user);
        }
    }
    fs.writeFileSync("list_user.json", JSON.stringify(messsage));
    res.send(messsage);
})