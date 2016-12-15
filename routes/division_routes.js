var express = require('express');
var router = express.Router();
var division_dal = require('../model/division_dal');
var team_dal = require('../model/team_dal');


// View All divisions
router.get('/all', function(req, res) {
    division_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('division/divisionViewAll', { 'result':result });
        }
    });

});

// View the school for the given id
router.get('/', function(req, res){
    if(req.query.div_name == null) {
        res.send('div_name is null');
    }
    else {
        division_dal.getById(req.query.div_name, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('division/divisionViewById', {'result': result});
           }
        });
    }
});

module.exports = router;
