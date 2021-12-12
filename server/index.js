const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const fs = require('fs');
var path = '../subsripted-email.json';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from get!')
})

app.post('/', (req, res) => {

  let user= {
    'firstName': req.body.firstName,
    'lastName': req.body.lastName,
    'email': req.body.email,
    'password': req.body.password
  }

  //Validacija maila
  function validateEmail (user)
  {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (user.email.match(regexEmail)) {
      res.send('Successfully subscribed');

      //Upis u JSON
      fs.appendFile(path, JSON.stringify(user) + "\r", 'utf8', (err) => {
        if (err) {
          console.log('An error occured while writing JSON Object to File.');
          return console.log(err);
        }
        console.log('JSON file has been saved');
      });
    } else {
      res.status('400').send({message: 'Nema podataka unesenih u json fajl '});
    }
  }
  validateEmail(user);
})

app.listen(port, () => {
  console.log(`Server slusa na portu ${port}`)
})


