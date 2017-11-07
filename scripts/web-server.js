var  express  =  require('express');
var  path  =  require('path');
//var events = require('./eventsController');
var  app  =  express();
var fs = require('fs');
var  rootpath  =  path.normalize(__dirname  +  '/../');
var bodyParser = require('body-parser');
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8000);
app.use('/api', router);
app.use(express.static(rootpath + '/app'));

// router.get('/ping', function (req, res, next) {
//     res.send('pong');
// });

router.get('/ping/:fileName', function (req, res, next) {
    fs.readFile('./app/data/event/' + req.params.fileName + '.json','utf8',function(err,data){
        if(err)throw err;
        console.log("Success from server");
        res.send(data);        
    });
});

router.post('/ping/:fileName',function(req,res,next){
    var event = req.body;
    console.log(req.body);
    var msg="success on post";
    fs.writeFile('./app/data/event/' + req.params.fileName + '.json', JSON.stringify(event,null,2)); 
    res.send(msg);
});

console.log("listening on port 8000..."); 