const mongoose=require('mongoose');

const ImageShema=new mongoose.Schema({
    srcSlika:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        required:true
    }
});

const Image=module.exports=mongoose.model('images',ImageShema);

module.exports.addImage=function(image,callback){
    image.save(callback);
}
module.exports.deleteImage=function(id,callback){
    Image.findByIdAndRemove({_id:id},callback);
}

module.exports.getImages=function(query,callback){
    Image.find(query).sort({'date':-1}).exec(callback)
}
module.exports.getLastone=function(callback){
    Image.findOne().sort({'date':-1}).exec(callback)
}