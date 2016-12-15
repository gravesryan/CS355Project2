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
    var query = 'SELECT * FROM divisions;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(div_name, callback) {
    var query = 'SELECT * FROM teams WHERE division = ?';
    var queryData = [div_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
