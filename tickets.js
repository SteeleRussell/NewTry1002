var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer();
var router = express.Router();
module.exports = router;

var app = express();



app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//Require the Router we defined in movies.js
var tickets = require('./tickets.js');

//Use the Router on the sub route /movies
app.use('/rest', tickets);

app.listen(3000);

router.get('/list/', function(req, res){
   res.json(tickets);
});
var tickets = [
   {id: 101, created_at: "2015-07-20T22:55:29Z",updated_at: "2016-05-05T10:38:52Z",type: "incident",subject: "MFP not working right",description: "PC Load Letter? What does that even mean???",priority: "med",status: "open",recipient: "support_example@selu.edu",submitter: "Michael_bolton@selu.edu",assignee_id: 235323,follower_ids: [235323, 234],tags: ["enterprise", "printers"]},   
   {id: 102, created_at: "2019-17-20T22:09:20Z",updated_at: "2020-05-05T10:38:52Z",type: "incident",subject: "TEST1",description: "TEST1",priority: "TEST",status: "TST",recipient: "TEST@selu.edu",submitter: "TEST@selu.edu",assignee_id: "NULL",follower_ids: ["NULL"],tags: ["TEST"]},
   {id: 103, created_at: "2011-17-20T22:09:20Z",updated_at: "2014-05-05T10:38:52Z",type: "program",subject: "typing",description: "TEST2",priority: "TEST2",status: "TST2",recipient: "TEST2@selu.edu",submitter: "TEST2@selu.edu",assignee_id: "NULL2",follower_ids: ["NULL2"],tags: ["TEST2"]},
   {id: 104, created_at: "2010-17-20T22:09:20Z",updated_at: "2011-05-05T10:38:52Z",type: "test",subject: "typing",description: "TEST3",priority: "TEST23",status: "TST23",recipient: "TEST23@selu.edu",submitter: "TEST23@selu.edu",assignee_id: "NULL23",follower_ids: ["NULL23"],tags: ["TEST23"]},
];
 //Routes will go here
 module.exports = router;

 router.get('/ticket/:id([0-9]{3,})', function(req, res){
    var currMovie = tickets.filter(function(movie){
       if(movie.id == req.params.id){
          return true;
       }
    });
    if(currMovie.length == 1){
       res.json(currMovie[0])
    } else {
       res.status(404);//Set status to 404 as movie was not found
       res.json({message: "Not Found"});
    }
 });

 router.post('/ticket/', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.body.name ||
       !req.body.year.toString().match(/^[0-9]{4}$/g) ||
       !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){
       
       res.status(400);
       res.json({message: "Bad Request"});
    } else {
       var newId = ticket[ticket.length-1].id+1;
       tickets.push({
          id: newId,
          name: req.body.name,
          year: req.body.year,
          rating: req.body.rating
       });
       res.json({message: "New movie created.", location: "/tickets/" + newId});
    }
 });


