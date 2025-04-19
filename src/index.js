const express =require('express');
const ejs = require('ejs');
const path = require('path');
const multer= require('multer');
const {v4 :uuidv4} = require('uuid');

const uuid=uuidv4();

const storage= multer.diskStorage({
    destination: path.join(__dirname,'public/img'),
    filename:(req,file,cb)=>{
        cb(null, uuid+ path.extname(file.originalname).toLocaleLowerCase());
    }
});

const  app=express();

app.set('port',3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine' ,'ejs');

app.use(multer({
    storage,
    dest: path.join(__dirname,'public/img'),
    limits:{fileSize:1000000},
    fileFilter(req,file,cb){
        const filetypes = /jpeg|jpg|png/;
        const extname=filetypes.test(file.mimetype)
        const extname2 = filetypes.test(path.extname(file.originalname));
        if(extname&&extname2){
            return cb(null,true);
        }
        cb("Error no es imagen")
    
    }   
}).single('imagen'));

app.get('/',(req,res)=>{
    res.render('index');
});
app.post('/upload',(req,res)=>{
    console.log(req.file);
    res.send('Subido');
})
app.use(express.static(path.join(__dirname,'public')))

app.listen(app.get('port'),()=>{
    console.log('Server on port ')
});