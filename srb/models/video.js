const mongoose=require('mongoose');

const VideoShema=new mongoose.Schema({
    
    description:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
    },
    date:{
        type:Date
    }
});

const Video=module.exports=mongoose.model('Video',VideoShema);

module.exports.addVideo=function(video,callback){
    video.save(callback);
}
module.exports.deleteVideo=function(id,callback){
    Video.findByIdAndRemove({_id:id},callback);
}

module.exports.getVideos=function(query,callback){
    Video.find(query).sort({'date':-1}).exec(callback)
}


module.exports.getLastVideos=function(query,callback){
    Video.find(query).sort({'date':-1}).limit(4).exec(callback)
}