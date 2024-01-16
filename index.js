import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;
const API_URL="https://api.blockchain.com/v3/exchange/tickers/";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get("/", async (req,res)=> {
    try {
        const result = await axios.get(API_URL);

        res.render("index.ejs", { content: result.data });
      } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      }
});

app.post("/getprice", async (req,res)=> {
    try {
        const result = await axios.get(API_URL+req.body.currency);
        res.render("index.ejs", { currencyprice: result.data });
      } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      }
});

app.listen(port,()=>{
    console.log(`App started at port ${port}`);
});