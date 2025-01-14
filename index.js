import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try{
        res.render('index.ejs', { jokeQues: "Click below to get a Joke"});
    }
    catch(error){
        console.error(error);
    }
});

app.get('/get-joke', async (req, res) => {
    try{
        // console.log(Object.keys(req.query)[0]);
        const safemode = Object.keys(req.query)[0];
        let url = `https://v2.jokeapi.dev/joke/Any`;
        if(safemode === 'safe-mode'){
            url = `https://v2.jokeapi.dev/joke/Any?${safemode}`;
            const response = await axios.get(url);
            res.render('index.ejs', { jokeQues: response.data.setup, jokeAns: response.data.delivery, jokeCategory: `Category: ${response.data.category}` });
        }else{
            const response = await axios.get(url);
            res.render('index.ejs', { jokeQues: response.data.setup, jokeAns: response.data.delivery, jokeCategory: `Category: ${response.data.category}` });
        }
        // console.log(url);
        
    }
    catch(error){
        console.error(error);
        res.render('index.ejs', { jokeQues: "Error", jokeAns: "Error" });
    }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});