var express = require('express');
var router = express.Router();
var team_dal = require('../model/team_dal');
var division_dal = require('../model/division_dal');


// View All divisions
router.get('/all', function(req, res) {
    team_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('team/teamViewAll', { 'result':result });
        }
    });

});

// View the school for the given id
router.get('/', function(req, res){
    if(req.query.team_name == null) {
        res.send('team_name is null');
    }
    else {
        team_dal.getById(req.query.team_name, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('team/teamViewById', {'result': result});
           }
        });
    }
});

// Return the add a new school form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    division_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('team/teamAdd', {'division': result});
        }
    });
});

// View the school for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.team_name == null) {
        res.send('Team Name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        team_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/team/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.team_name == null) {
        res.send('A team is required');
    }
    else {
        team_dal.edit(req.query.team, req.query.year, function(err, result){
            res.render('team/teamUpdate', {team: result[0][0], division: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.team_name == null) {
        res.send('A team is required');
    }
    else {
        team_dal.getById(req.query.team_name, function(err, team){
            division_dal.getAll(function(err, division) {
                res.render('team/teamUpdate', {team: team[0], division: division});
            });
        });
    }

});

router.get('/update', function(req, res){
    team_dal.update(req.query, function(err, result){
        res.redirect(302, '/team/all');
    });
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.team_name == null) {
        res.send('team_name is null');
    }
    else {
        team_dal.delete(req.query.team_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/team/all');
            }
        });
    }
});

module.exports = router;
