const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema({
    userPost:{
        type:String,
        default:'bojan'
    },
    userID:{
        type:String
    },
    picture:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    video:{
        type:String,
        default:'noVideo'
    },
    category:{
        type:String,
        required:true
    }

},{timestamps:true});

const Post=module.exports=mongoose.model('post',PostSchema);

module.exports.addPost=function(post,callback){
    console.log(post)
    post.save(callback);
    
}
module.exports.deletePost=function(id,callback){
    var query={_id:id}
    Post.findByIdAndRemove(query,callback)
}
module.exports.getPosts=function(query,callback){
    Post.find(query).sort({'date':-1}).limit(50).exec(callback)
}
module.exports.getPostByID=function(id,callback){
    Post.findById(id).sort({'date':-1}).exec(callback);
}
module.exports.getPostsByCategory=function(category,callback){
    const query={'category':category};
    Post.find(query,callback)
}
module.exports.updatePost=function(id,post,callback){
    var query={_id:id};
    Post.findByIdAndUpdate(query,{$set:post},callback)

}
