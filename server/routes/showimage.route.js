const express = require('express');
const router = express.Router();
const clientdetails = require('../models/clientDetails');


/* GET Images list */

router.get('/getimage', function(req, res) {
    clientdetails.find({})
        .exec(function(err, imagename) {
            console.log(imagename, "from clientdetails.find");
            if (err) {
                res.json({
                    success: false,
                    err: err,
                    failuremessage: 'Unable to found image'
                })
            } else {
                res.json({
                    success: true,
                    code: 200,
                    imagename: imagename
                })
            }
        })
})

module.exports = router;