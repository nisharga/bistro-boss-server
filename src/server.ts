/* eslint-disable no-console */
import app from "./app";
import config from "./config";


import mongoose from 'mongoose';


async function boostrap() {
    try{
        await mongoose.connect(config.database_url as string);
        console.log("Database is connected");
        app.listen(config.port, () => {
            console.log(`app listening on port ${config.port}`)
          })
    }
    catch(err){
        console.log("Faild to connected DB", err);
    }
}
boostrap();