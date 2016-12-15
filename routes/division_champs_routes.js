var express = require('express');
var router = express.Router();
var division_champs_dal = require('../model/division_champs_dal');
var team_dal = require('../model/team_dal');


// View All divisions
router.get('/all', function(req, res) {
    division_champs_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('division_champs/division_champsViewAll', { 'result':result });
        }
    });

});

// View the school for the given id
router.get('/', function(req, res){
    if(req.query.team == null) {
        res.send('team is null');
    }
    else if (req.query.year == null) {
        res.send('year is null');
    }
    else {
        division_champs_dal.getById(req.query.team, req.query.year, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('division_champs/division_champsViewById', {'result': result});
           }
        });
    }
});

// Return the add a new school form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    team_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('division_champs/division_champsAdd', {'team': result});
        }
    });
});

// View the school for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.team == null) {
        res.send('Team Name must be provided.');
    }
    else if(req.query.year == null) {
        res.send('A year must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        division_champs_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/division_champs/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.team == null) {
        res.send('A team is required');
    }
    else if (req.query.year == null) {
        res.send('A year is required');
    }
    else {
        division_champs_dal.edit(req.query.team, req.query.year, function(err, result){
            res.render('division_champs/division_champsUpdate', {school: result[0][0], address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.team == null) {
        res.send('A team is required');
    }
    else if (req.query.year == null) {
        res.send('A year is required');
    }
    else {
        division_champs_dal.getById(req.query.team, req.query.year, function(err, school){
            team_dal.getAll(function(err, address) {
                res.render('division_champs/division_champsUpdate', {division_champs: division_champs[0], team: team});
            });
        });
    }

});

router.get('/update', function(req, res){
    division_champs_dal.update(req.query, function(err, result){
        res.redirect(302, '/division_champs/all');
    });
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.team == null) {
        res.send('team is null');
    }
    else if (req.query.year == null) {
        res.send('A year is required');
    }
    else {
        division_champs_dal.delete(req.query.team, req.query.year, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/division_champs/all');
            }
        });
    }
});

module.exports = router;
