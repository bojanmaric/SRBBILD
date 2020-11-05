var express= require('express');
var router=express.Router();
const Post=require('../models/post');
const Comment=require('../models/comments');
const path=require('path');
const crypto=require('crypto');
const multer = require('multer');
const fs=require('fs');
const authenticate=require('../config/authenticate');
const {json}=require('express')

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads/posts')
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

router.post('/addPost',upload.single('file'), authenticate, function(req,res,next){
    console.log(req.file.filename)
    let post=new Post(JSON.parse(req.body.post));

    post.picture=req.file.filename;
    Post.addPost(post,(err)=>{
        if(err){
            res.json({success:false,msg:'filed to add post'})
        }else{
            res.json({success:true, msg:'Post successful added'})
        }
    })
});
router.put('/:id', authenticate,(req,res)=>{
    console.log(req.body)
    
    Post.updatePost(req.params.id.toString(), req.body,(err)=>{
        if(err){
            res.json({success:false,msg:err})
        }else{
            res.json({success:true,msg:'Uspesno ste izmenili post'})
        }
    })

})
router.get('/getAll',function(req,res, next){
    Post.getPosts((err,posts)=>{
        if(err){
            res.json({success:false,msg:'failed to get data'})
        }else{
            res.json({posts:posts})
        }
    })
})
router.get('/getPost/:id',(req,res)=>{
    Post.getPostByID(req.params.id.toString(),(err, post)=>{
        if(err){
            res.json({success:false,msg:err})
        }else{
            res.json({post:post})
        }
    })
})

router.get('/image/:image', (req, res) => {

    if (!fs.existsSync(path.join(__dirname, '../uploads/posts/', req.params.image)))
        res.send("no")
    else res.status(200).sendFile(path.resolve(path.join(__dirname, '../uploads/posts/', req.params.image)));

});
router.get('/category/:category',(req,res)=>{
    Post.getPostsByCategory(req.params.category.toString(), (err,posts)=>{
        if(err){
            res.json({success:false, msg:err})
        }else{
            res.json({posts:posts})
        }
    })
})

router.delete('/:id',authenticate, (req,res)=>{
    Post.deletePost(req.params.id.toString(), (err)=>{
        if(err){
            res.json({success:false,msg:err})
        }else{
            res.json({success:true,msg:'uspesno ste izbrisali'})
        }
    })
})
router.delete('/brisi/:image',authenticate, (req,res)=>{
   
    fs.unlinkSync('./uploads/posts/'+req.params.image)
    if(!fs.existsSync(path.join(__dirname, '../uploads/posts/', req.params.image))){
        res.json({success:true,msg:"Uspesno izbrisano"})
    }else{
        res.json({success:false,msg:"Doslo je do greske na serveru"})

    }
})
router.get('/getComments/:id',(req,res)=>{
    
    
    Comment.getComenntsByPostID(req.params.id.toString(),(err,comments)=>{
        if(err){
            res.json({success:false, msg:'Server error'})
        }else{
            res.json({ comments:comments})
        }
    })
})

router.post('/comment',(req, res)=>{
   
    
    const comm=new Comment({
        postID: req.body.postID,
        name: req.body.name,
        content: req.body.content,
        banned: req.body.banned,
        date:req.body.date   
     });

    Comment.addComment(comm,(err)=>{
        if(err){
            res.json({success:false,msg:'filed to add Comment'})
        }else{
            res.json({success:true, msg:'Comment successful added'})
        }
    })
})
router.put('/comment/:id',authenticate, (req,res)=>{
    console.log(req.body)
    const comment={
        postID: req.body.postID,
        name: req.body.name,
        content: req.body.content,
        banned: req.body.banned,
        date:req.body.date   
    }
  
    Comment.updateComment(req.params.id.toString(), comment,(err)=>{
        if(err){
            res.json({success:false,msg:err})
        }else{
            res.json({success:true,msg:'Uspesno ste izvrsili izmenu'})
        }
    })

});
router.delete('/comment/:id',authenticate, (req,res)=>{
    Comment.deleteComment(req.params.id,(err)=>{
        if(err){
            res.json({success:false, msg:err})
        }else{
            res.json({success:true,msg:'Uspesno izbrisan comentar'})
        }
    })
})
router.get('/getComments',authenticate,(req,res)=>{
    Comment.getBannedComment((err,comments)=>{
        if(err){
            res.json({success:false,msg:err})
        }else{
            res.json({comments:comments})
        }
    })
})
module.exports=router;


