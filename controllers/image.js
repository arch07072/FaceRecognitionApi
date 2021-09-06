// Importing API Call Dependency
const Clarifai = require('clarifai');

// Importing API Key
//const { apiKey } = require('../private/apiKey');

const app = new Clarifai.App({
  apiKey: 'd147460feee74565b8f837e2cf4ec5b1'
 });

// You must add your own API key from Clarifai
//const app = new Clarifai.App({apiKey: apiKey});

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("API Error"));
};

 // app.models
  // .predict(
  //   Clarifai.FACE_DETECT_MODEL ,
  //   this.state.input)

const handleImage = (req, res, db) => {
    const { id } = req.body;
     db('users').where('id', '=', id)
    .increment('entries',1)
    .returning(' entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err =>  res.status(400).json('Unable to get count')); 
 
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};