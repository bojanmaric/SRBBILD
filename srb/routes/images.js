var express= require('express');
var router=express.Router();
const Catalog=require('../models/catalog');
const Video=require('../models/video');
const Image=require('../models/images');

const path=require('path');
const crypto=require('crypto');
const multer = require('multer');
const fs=require('fs');
const authenticate=require('../config/authenticate');
const {json}=require('express');
const { route } = require('./posts');

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads/images')
    },
    filename:function(req,file,cb){
        crypto.pseudoRandomBytes(16, function(err,raw){
            var ext=file.originalname.split('.').pop();
            cb(null, raw.toString('hex')+ Date.now()+'.'+ext)
        });
    }

});
var upload =multer({
    storage:storage
})

router.post('/addPicture',upload.single('file'),authenticate, function(req,res){
    var image=new Image(JSON.parse(req.body.image))

    image.srcSlika=req.file.filename;
    console.log(image)
    Image.addImage(image,(err)=>{
        if(err){
            console.log(err);
            res.json({success:false,msg:err})
        }else{
            res.json({success:true,msg:"Uspesno ste postavili sliku"})
        }
    })
})



router.get('/getDailyImage',(req,res)=>{
    Image.getImages((err,image)=>{
        if(err){
            res.json({success:false,msg:err})
        }else{
            res.json({image:image})
        }
    })
})



router.get('/getLastDailyImage',(req,res)=>{
    Image.getLastone((err,image)=>{
        if(err){
            console.log(err)
            res.json({success:false,msg:err})
        }else{
            res.json({image:image})
        }
    })
})
router.get('/:image', (req, res) => {

    if (!fs.existsSync(path.join(__dirname, '../uploads/images/', req.params.image)))
        res.send("no")
    else res.status(200).sendFile(path.resolve(path.join(__dirname, '../uploads/images/', req.params.image)));

});


router.delete('/:id',authenticate,(req,res)=>{
    Image.deleteImage(req.params.id.toString(),(err)=>{
        if(err){
            res.json({success:false,msg:err})

        }else{
            res.json({success:true,msg:'Uspesno izbrisana slika'})

        }
    })
})

router.delete('/delImg/:image',authenticate,(req,res)=>{
    
    if (fs.existsSync(path.join(__dirname, '../uploads/images/', req.params.image))){
        
        fs.unlinkSync('./uploads/images/'+req.params.image)
        if(!fs.existsSync(path.join(__dirname, '../uploads/images/', req.params.image))){
            res.json({success:true,msg:'Uspesno izbrisana slika'})
        }else{
            res.json({success:false,msg:'Doslo je do greske na serveru'})

        }
    
    } else {
        res.json({success:false,msg:'File not found'})
    }
})





















module.exports=router;

