import express from 'express';

const app = express();
app.use(express.json());

var cors = require('cors')
var corsOptions={
 origin:'*'   
}

app.use(cors(corsOptions))
export default app;
