import ratelimit from "../config/uptash.js"



 export const rateLimiter=async(req,res,next)=>{
try{
  const {success}=await ratelimit.limit("my-limit-key");
  if(!success){
res.status(429).json({
  message:"to many requset, please try again"
})


  }

next()

}
catch(error){
console.error("Rate limit error", error);
next(error);

}

  
}
