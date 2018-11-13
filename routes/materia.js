var express = require('express'),
    router = express.Router(),
    materiaModel = require('../models/Materia');
var debug = require('debug')('taller:server');

router.get('/', function (req, res) {
    debug('Obteniendo todas las materias');
    materiaModel.find({}, function (err, materias) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                err
            });
        } else {

            res.json(materias);
        }
    });
});

router.get('/:name', function (req, res) {
    if (req.params.name) {
        materiaModel.findOne({
            nombre: req.params.name
        }, function (err, materia) {
            if (err) {
                res.status(500);
                res.json({
                    status: 500,
                    err
                });
            } else {
                res.json(materia);
            }
        });
    } else {
        res.status(400);
        res.json({
            status: 400,
            err: 'Bad Request'
        })
    }
});

router.post('/', function (req, res) {
    let Materia = new materiaModel({
        nombre: req.body.name,
        uv: req.body.uv,
        descripcion: req.body.descripcion
    })

    Materia.save(function (err) {
        if (err) {
            res.status(500)
            res.send({
                err
            });
        }
        res.send({
            message: "saved",
            success: true
        });
    });
});

router.delete('/:id', function (req, res) {
    if (req.params.id) {
        materiaModel.findByIdAndRemove(req.params.id, function (err, materia) {
            if (err) {
                res.status(500);
                res.json({
                    status: 500,
                    success: false,
                    err
                });
            } else {
                res.json({
                    success: true,
                    delete: materia
                });
            }
        });

    } else {

        res.status(400);
        res.json({
            status: 400,
            success: false
        });
    }
});

router.put("/:id", function (req, res) {
    if (req.params.id) {
        materiaModel.findByIdAndUpdate(req.params.id, {
                nombre: req.body.name,
                uv: req.body.uv,
                descripcion: req.body.descripcion
            },
            function (err, materia) {
                res.json({err, materia});
            });
    } else {
        res.status(400);
        res.json({
            status: 400,
            success: false
        });
    }
});
module.exports = router;