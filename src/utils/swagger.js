import express from 'express';

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const app = express();

const swaggerOptions = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Adopt Me API",
        description: "API de prueba",
      },
    },
    apis: [`src/docs/**/*.yaml`],
  };

  const specs = swaggerJsDoc(swaggerOptions);
  
  app.use("/", swaggerUi.serve, swaggerUi.setup(specs));


  

  
  
  

export default app;
