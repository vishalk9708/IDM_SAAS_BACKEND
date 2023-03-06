import express from "express";
import bodyParser from "body-parser";
import routes from './routes.js'

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.send('jfsgb')
})

app.use('/api', routes);
app.listen(4000, ()=>{
    console.log('listening on port 4000');
})