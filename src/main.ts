import { app } from "./app";
import { APP } from "./core";


function main(){

    let port = app.get('PORT')

    app.listen(port, ()=>{
        console.log(`server is run http:localhost:${port}`);
        
    });

};

main();