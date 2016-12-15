var express = require('express');
var router = express.Router();
var player_dal = require('../model/player_dal');
var team_dal = require('../model/team_dal');


// View All divisions
router.get('/all', function(req, res) {
    player_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('player/playerViewAll', { 'result':result });
        }
    });

});

// View the school for the given id
router.get('/', function(req, res){
    if(req.query.first_name == null) {
        res.send('first_name is null');
    }
    else if (req.query.last_name == null) {
        res.send('last_name is null');
    }
    else {
        player_dal.getById(req.query.first_name, req.query.last_name, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('player/playerViewById', {'result': result});
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
            res.render('player/playerAdd', {'team': result});
        }
    });
});

// View the school for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.first_name == null) {
        res.send('First Name must be provided.');
    }
    else if(req.query.last_name == null) {
        res.send('Last Name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        player_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/player/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.first_name == null) {
        res.send('A first name is required');
    }
    else if(req.query.last_name == null) {
        res.send('Last Name must be provided.');
    }
    else {
        player_dal.edit(req.query.first_name, req.query.last_name, function(err, result){
            res.render('player/playerUpdate', {player: result[0][0], team: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.first_name == null) {
        res.send('A first name is required');
    }
    else if(req.query.last_name == null) {
        res.send('Last Name must be provided.');
    }
    else {
        player_dal.getById(req.query.first_name, req.query.last_name, function(err, player){
            team_dal.getAll(function(err, team) {
                res.render('player/playerUpdate', {player: player[0], team: team});
            });
        });
    }

});

router.get('/update', function(req, res){
    player_dal.update(req.query, function(err, result){
        res.redirect(302, '/player/all');
    });
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.first_name == null) {
        res.send('first_name is null');
    }
    else if(req.query.last_name == null) {
        res.send('last_name is null');
    }
    else {
        player_dal.delete(req.query.first_name, req.query.last_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/player/all');
            }
        });
    }
});

module.exports = router;
