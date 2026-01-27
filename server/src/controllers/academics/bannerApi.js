const bannerschema = require("../../models/academics/bannermodel")


const addbanner =async(req,res)=>{
try{
    
    const add=bannerschema({banner:req.file.filename})

    add.save()

    res.send({status:true,message:"banner added successfully"})

}
catch{
    res.send({status:false,message:"error added banner"})

}
}



module.exports={addbanner}