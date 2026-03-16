import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "arifRahman";
const yourPassword = "arif123";
const yourAPIKey = "4d71e842-7131-4f26-8e8a-35534114535d";
const yourBearerToken = "bbc0555f-3669-4847-95d4-bfef1239daae";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
 
  try{
    const response = await axios.get(API_URL + "random");
    const result = JSON.stringify(response.data, null, 2);
    console.log(response);
    res.render('index.ejs', {
      content: result
    })
  } catch(error) {
    console.error('failed to load the content', error.message)
    res.render('index.ejs', {
      error: 'No Activity that match to your criteria'
    })
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try{
    const page = req.query.page || 2;
    const response = await axios.get(`${API_URL}all?page=${page}`, {
      auth: {
        username: yourUsername,
        password: yourPassword
      }
    });
    const result = JSON.stringify(response.data, null, 2);
    res.render('index.ejs', {content: result})
    
  } catch (error) {
    console.error('Failed to make a request', error.message)
    res.render('index.ejs', {
      error: error.message
    });
  }
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
