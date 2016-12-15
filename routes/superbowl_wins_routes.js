var express = require('express');
var router = express.Router();
var superbowl_wins_dal = require('../model/superbowl_wins_dal');
var team_dal = require('../model/team_dal');


// View All divisions
router.get('/all', function(req, res) {
    superbowl_wins_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('superbowl_wins/superbowl_winsViewAll', { 'result':result });
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
        superbowl_wins_dal.getById(req.query.team, req.query.year, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('superbowl_wins/superbowl_winsViewById', {'result': result});
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
            res.render('superbowl_wins/superbowl_winsAdd', {'team': result});
        }
    });
});

// View the school for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.team == null) {
        res.send('School Name must be provided.');
    }
    else if(req.query.year == null) {
        res.send('An Address must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        superbowl_wins_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/superbowl_wins/all');
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
        superbowl_wins_dal.edit(req.query.team, req.query.year, function(err, result){
            res.render('superbowl_wins/superbowl_winsUpdate', {school: result[0][0], address: result[1]});
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
        superbowl_wins_dal.getById(req.query.team, req.query.year, function(err, school){
            team_dal.getAll(function(err, address) {
                res.render('superbowl_wins/superbowl_winsUpdate', {superbowl_wins: superbowl_wins[0], team: team});
            });
        });
    }

});

router.get('/update', function(req, res){
    superbowl_wins_dal.update(req.query, function(err, result){
        res.redirect(302, '/superbowl_wins/all');
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
        superbowl_wins_dal.delete(req.query.team, req.query.year, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/superbowl_wins/all');
            }
        });
    }
});

module.exports = router;
