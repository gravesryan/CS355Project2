var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view school_view as
 select s.*, a.street, a.zipcode from school s
 join address a on a.address_id = s.address_id;

 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM teams ORDER BY team_name;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(team_name, callback) {
    var query = 'CALL get_team_data(?)';
    var queryData = [team_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO teams (team_name, city, state, wins, losses, avg_ppg, division) VALUES (?, ?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.team_name, params.city, params.state, params.wins, params.losses, params.avg_ppg, params.division];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(team_name, callback) {
    var query = 'DELETE FROM teams WHERE team_name = ?';
    var queryData = [team_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE teams SET team_name = ?, city = ?, state = ?, wins = ?, losses = ?, avg_ppg = ?, division = ? WHERE team_name = ?';
    var queryData = [params.team_name, params.city, params.state, params.wins, params.losses, params.avg_ppg, params.division, params.team];


    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
     DROP PROCEDURE IF EXISTS school_getinfo;

     DELIMITER //
     CREATE PROCEDURE school_getinfo (school_id int)
     BEGIN
     SELECT * FROM school WHERE school_id = school_id;
     SELECT a.*, school_id FROM address a
     LEFT JOIN school s on s.address_id = a.address_id;

     END //
     DELIMITER ;

     # Call the Stored Procedure
     CALL school_getinfo (4);

 */

exports.edit = function(team_name, callback) {
    var query = 'CALL school_getinfo(?)';
    var queryData = [team_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};