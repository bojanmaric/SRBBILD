const mongoose=require('mongoose');

const CatalogShema=new mongoose.Schema({
    srcSlika:{
        type:String,
        require:true
    },
    name:{
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

const Catalog=module.exports=mongoose.model('Catalog',CatalogShema);

module.exports.addCatalog=function(catalog,callback){
    catalog.save(callback);
}
module.exports.deleteCatalog=function(id,callback){
    Catalog.findByIdAndRemove({_id:id},callback);
}

module.exports.getKataloge=function(query,callback){
    Catalog.find(query).sort({'date':-1}).exec(callback)
}

module.exports.getLastTwoCatalogs=function(query,callback){
    Catalog.find(query).sort({'date':-1}).limit(2).exec(callback)
}