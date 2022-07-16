const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'My API',
        description: 'Recipes'
    },
    host: 'cse341-recipe-app.herokuapp',
    schemes: ['https']
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
    'endpointsFiles' only the root file where the route starts,
    such as index.js, app.js, routes.js, ... */

// swaggerAutogen(outputFile, endpointsFiles, doc);

// run server after generated
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    await import('./app.js');
});
