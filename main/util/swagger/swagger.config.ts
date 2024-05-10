import swaggerJSDoc from "swagger-jsdoc";
import path from 'path';

let apiFile = path.join(process.cwd(), "dist","main.js"); 


const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Api SPC',
            version: '1.0.0',
            description: 'SPC Module',
        },
    },
    apis:[
        apiFile
    ],
}

const specs = swaggerJSDoc(options);
export default specs;