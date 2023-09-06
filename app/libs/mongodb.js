import mongoose from "mongoose"

export const mongodb = async ()=>{
    try {
        if(mongoose.connection.readyState === 0){
            await mongoose.connect(process.env.MONGODB_URI)
            console.log(process.env.MONGODB_URI);
            console.log('database connected')
        }
        
    } catch (error) {
        console.log(error)
        
    }
}