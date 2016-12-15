var express = require('express');
var router = express.Router();


// View All divisions
router.get('/all', function(req, res) {
            res.render('about/aboutViewAll');
});



module.exports = router;
