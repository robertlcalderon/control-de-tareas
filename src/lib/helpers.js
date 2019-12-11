const bcrypst=require('bcryptjs')
const helpers={};

helpers.encryptPassword= async(password)=>{
   const salt= await bcrypst.genSalt(10);
   const hash=await bcrypst.hash(password, salt );
   return hash;

}

helpers.matchPassword = async (password, savedPassword) => {
    try {
      return await bcrypt.compare(password, savedPassword);
    } catch (e) {
      console.log(e)
    }
  };
module.exports=helpers;