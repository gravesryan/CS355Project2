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
    var query = 'SELECT * FROM players ORDER BY last_name;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(first_name, last_name, callback) {
    var query = 'SELECT * FROM players WHERE first_name = ? AND last_name = ?';
    var queryData = [first_name, last_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO players (first_name, last_name, player_num, position, injured, team) VALUES (?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.first_name, params.last_name, params.player_num, params.position, params.injured, params.team];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(first_name, last_name, callback) {
    var query = 'DELETE FROM players WHERE first_name = ? AND last_name = ?';
    var queryData = [first_name, last_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE players SET first_name = ?, last_name = ?, player_num = ?, position = ?, injured = ?, team = ? WHERE first_name = ? AND last_name = ?';
    var queryData = [params.first_name, params.last_name, params.player_num, params.position, params.injured, params.team, params.first, params.last];


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

exports.edit = function(school_id, callback) {
    var query = 'CALL school_getinfo(?)';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};