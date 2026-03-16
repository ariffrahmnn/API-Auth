import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "arifRahman";
const yourPassword = "arif123";
const yourAPIKey = "2917b89a-f24e-4fb3-ba77-76a5bd64664d";
const yourBearerToken = "cfa5513a-91cd-471d-b8d0-2e8f0352019d";

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

  try{
    const response = await axios.get(`${API_URL}all?page=2`, {
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

app.get("/apiKey", async (req, res) => {  
  const score = 5
  try{
    const response = await axios.get(`${API_URL}filter?`, {
    params: {
      score: score,
      apiKey: yourAPIKey
    }
    })

    const result = JSON.stringify(response.data, null, 2)
    res.render('index.ejs', {content: result})
  
  } catch(error) {
    console.error('Failed make a request', error.message)
    res.render('index.ejs', {
      error: error.message
    })
  }
  
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  const id = 42;
  try {
    const response = await axios.get(`${API_URL}secrets/42`,{
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      }
    })
    const result = JSON.stringify(response.data, null, 2);
    res.render('index.ejs', {content: result})

  } catch(error) {
    console.error('Failed to make a request', error.message)
    res.render('index.ejs', {
      error: error.message
    })
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
