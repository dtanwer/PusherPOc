const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const pusher = new Pusher({
    appId: "1638067",
    key: "d880ba05057d516534d1",
    secret: "9e10fff9e414ea48437b",
    cluster: "ap2",
    useTLS: true
});
app.set('PORT', 4000);

app.post('/message', (req, res) => {
    const payload = req.body;
    // console.log(payload)
    pusher.trigger('Systumm', 'message', payload);
    res.send(payload)
});

app.listen(app.get('PORT'), () =>
    console.log('Listening at ' + app.get('PORT')))
