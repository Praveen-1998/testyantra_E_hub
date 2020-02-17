const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const clientDetails = require('../models/clientDetails');

/* Posting Image */
router.post('/fileupload', function(req, res) {
    const uploaded_files = 0;
    const src = 'public/assets/uploads';
    const pathSeparator = path.sep;
    const media_file = [];
    let vaidImage = false;
    const form = new formidable.IncomingForm();
    form.keepExtensions = true; //keep file extension
    form.uploadDir = src;

    form.onPart = function(part) {
        if (!part.filename || part.filename.match(/\.(jpg|jpeg|png|pdf|doc|csv)$/i)) {
            vaidImage = true;
            this.handlePart(part);
        } else {
            vaidImage = false;
            // return res.json({ status: 500, msg: 'Invaid File' });
        }
    }

    form.parse(req, function(err, fields, files) {
        if (form.bytesReceived > 1000000) {
            return res.json({ status: "Failure", code: 500, msg: constObj.message[defaultLang].ImageSizeExceeds });
        } else {
            if (vaidImage) {
                const fileName = files.file.path.split(pathSeparator)[3];
                const clientdetails = new clientDetails({
                        image: fileName
                    })
                    // user.save(function(err, imagenamedsaved) {
                    //     if (err) {
                    //         console.log(err);
                    //     } else {
                    //         console.log("Image name saved")
                    //     }
                    // })
                const fullpathFileName = files.file.path;
                media_file.push(files.file.path.split(pathSeparator)[3]);

                return res.json({ status: "Success", code: 200, msg: 'success image upload', filename: fileName });
            } else {
                return res.json({ status: 500, msg: 'Invaid File' });
            }
        }
    });
})

module.exports = router;