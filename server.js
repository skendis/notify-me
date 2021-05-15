//Install express server
const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyparser = require('body-parser');

const app = express();
const appName = 'notify-me';
const port = process.env.PORT || 8080;
const notificationsUrl = 'https://www.oref.org.il/WarningMessages/alert/alerts.json';
const historyUrl = 'https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&mode=1';
const configHeaders = {
  'Accept': 'text/plain, */*; q=0.01',
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Referer': 'https://www.oref.org.il//12481-he/Pakar.aspx',
  'Host':'www.oref.org.il'
}


// Serve only the static files form the dist directory
app.use(express.static(__dirname + `/dist/${appName}`));
app.use(bodyparser.json());


app.get('/api/notifications', async (req, res) => {
  try {
    const response = await axios.get(notificationsUrl, {headers: configHeaders});
    return res.json(response.data);
  } catch (err) {
    console.log('error:',err);
    return res.json({
      description:'server error',
      data:err
    })
  }
})




app.get('/api/notifications-history', async (req, res) => {
  try {
    const response = await axios.get(historyUrl,{headers:configHeaders});
    return res.json(response.data);
  } catch (err) {
    console.log('error:',err);
    return res.json({
      description:'server error',
      data:err
    })
  }
})


app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname + `/dist/${appName}/index.html`));
  next();
});

// Start the app by listening on the default Heroku port
app.listen(port, () => console.log('server listening on', port));
