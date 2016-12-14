var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var app = express();
app.use(bodyParser.json());
var conn = massive.connectSync({
  connectionString: "postgres://postgres:@localhost/massive_demo"
});
app.set('db', conn);
var db = app.get('db');

// db.get_all_injuries(function(err, injuries) {
//   console.log(injuries) // injuries will contain an array of injuries
// });

var port = 3000;

app.get('/incidents', function(req, res) {
  if (req.query.by === 'cause') {
    db.get_incidents_by_cause([req.query.cause], function(err, response) {
      console.log(response);
      res.status(200).send(response);
    });
  } else {
    db.get_all_incidents(function(err, response) {
      console.log(response);
      res.status(200).send(response);
    });
  }
});

app.post('/incidents', function(req, res) {
  console.log('POST sighting');
  db.create_new_incident([req.body.us_state, req.body.injury_id, req.body.cause_id], function(err, response) {
    res.status(200).send('New incident created.');
  });
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
