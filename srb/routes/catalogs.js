var express = require('express');
var router = express.Router();
const Catalog = require('../models/catalog');
const Video = require('../models/video');
const Image = require('../models/images');

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const authenticate = require('../config/authenticate');
const { json } = require('express');
const { route } = require('./posts');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/catalogs')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            var ext = file.originalname.split('.').pop();
            cb(null, raw.toString('hex') + Date.now() + '.' + ext)
        });
    }

});
var upload = multer({
    storage: storage
})

router.post('/addCatalog', upload.single('file'), authenticate, function (req, res, next) {

    let catalog = new Catalog(JSON.parse(req.body.katalog))
    catalog.srcSlika = req.file.filename;
    console.log(catalog)
    Catalog.addCatalog(catalog, (err) => {
        if (err) {
            res.json({ success: false, msg: err })
        } else {
            res.json({ success: true, msg: "Upsepsno dodata Katalog" })
        }

    })
})



router.post('/addVideo', authenticate, function (req, res, next) {

    let video = new Video({
        link: req.body.link,
        description: req.body.description,
        date: req.body.date
    })
    Video.addVideo(video, (err) => {
        if (err) {
            res.json({ success: false, msg: err })
        } else {
            res.json({ success: true, msg: "uspesno ste dodali video" })
        }
    })

})

router.get('/getCatalogs', (req, res) => {

    Catalog.getKataloge((err, catalogs) => {
        if (err) {
            res.json({ success: false, msg: err })
        } else {
            res.json({ success: true, catalogs: catalogs })
        }
    })

})

router.get('/getLastTwoCatalogs', (req, res) => {

    Catalog.getLastTwoCatalogs((err, catalogs) => {
        if (err) {
            res.json({ success: false, msg: err })
        } else {
            res.json({ catalogs: catalogs })
        }
    })

})

router.get('/getVideos', (req, res) => {

    Video.getVideos((err, videos) => {
        if (err) {
            res.json({ success: false, msg: err })
        } else {
            res.json({ success: true, videos: videos })
        }
    })

})

router.get('/getLastVideos', (req, res) => {

    Video.getLastVideos((err, videos) => {
        if (err) {
            res.json({ success: false, msg: err })
        } else {
            res.json({ videos: videos })
        }
    })

})
router.delete('/deleteVideo/:id', authenticate, (req, res) => {
    Video.deleteVideo(req.params.id.toString(), (err) => {
        if (err) {
            res.json({ success: false, msg: err })
        } else {
            res.json({ success: true, msg: 'Uspesno izbrisano Video' })
        }
    })
})
router.delete('/deleteCatalog/:id', authenticate, (req, res) => {
    Catalog.deleteCatalog(req.params.id.toString(), (err) => {
        if (err) {
            res.json({ success: false, msg: err })
        } else {
            res.json({ success: true, msg: 'Uspesno izbrisan Katalog' })
        }
    })
})


router.get('/image/:image', (req, res) => {

    if (!fs.existsSync(path.join(__dirname, '../uploads/catalogs/', req.params.image)))
        res.send("no")
    else res.status(200).sendFile(path.resolve(path.join(__dirname, '../uploads/catalogs/', req.params.image)));

});

router.delete('/brisiImgCataloga/:image', (req, res) => {
    if (fs.existsSync(path.join(__dirname, '../uploads/catalogs/', req.params.image))){
        fs.unlinkSync('./uploads/catalogs/'+req.params.image);
        if (!fs.existsSync(path.join(__dirname, '../uploads/catalogs/', req.params.image))){
            res.json({ success: false, msg: "Doslo je do greske na serveru" })
        }else{
            res.json({ success: true, msg: "Uspesno obrisano" })
        }

    } else {
        res.json({ success: false, msg: "Ne postoji fajl na serveru" })


    }
})






module.exports = router;

