const {persona} = require('../models/index');
const {alumno} = require('../models/index');
const {usuario} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authconfig = require('../../config/auth');

module.exports = {
    //Inicio de sesión de alumno
    signIn(req, res) {

        let {username, password} = req.body;

        usuario.findOne({
            where: {
                username: username
            }
        }).then(usuario => {
            
            if(!usuario){
                res.status(404).json({msg: 'El usuario no existe'});
            }else{
                if(/*bcrypt.compareSync(password, usuario.password)*/req.body.password == usuario.password){
                    token = jwt.sign({ usuario: usuario }, authconfig.secret, {
                        expiresIn: authconfig.expires
                    });
                }else{
                    res.status(401).json({msg: 'Contraseña incorrecta'});
                }
                persona.findByPk(usuario.persona_id).then(persona => {
                    if(!persona){
                        res.status(404).json({msg: 'El usuario no existe'});
                    }else{
                        res.json({
                        usuario: persona,
                        token: token
                        });
                    }
                })
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    },
    //Registro de nueva persona
    signUp(req, res) {
        persona.create({
            curp: req.body.curp,
            rfc: req.body.rfc,
            nss: req.body.nss,
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            fecha_nacimiento: req.body.fecha_nacimiento,
            email: req.body.email,
            genero: req.body.genero,
            estado_civil: req.body.estado_civil,
            tipo_sangre: req.body.tipo_sangre,
            status: req.body.status,
            requiere_actualizar_domicilio: req.body.requiere_actualizar_domicilio,
            requiere_actualizar_bachilletato: req.body.requiere_actualizar_bachillerato,
            requiere_actualizar_contacto: req.body.requiere_actualizar_contacto,
            requiere_actualizar_contacto_personal: req.body.requiere_actualizar_contacto_personal,
            rh_actualizacion: req.body.rh_actualizacion,
        }).then(persona => {
            let token =jwt.sign({ persona: persona}, authconfig.secret, { 
                expiresIn: authconfig.expires
            });
//Crear usuario
            usuario.count({
                col: 'username',
            }).then(function (count) {
                function llenarConCeros(num, totalLength) {
                    return String(num).padStart(totalLength, '0');
                }
                var now = new Date();
                var fecha_control = (now.getFullYear() + "7O").slice(2);
                function randomStr(len, arr) {
                    var ans = '';
                    for (var i = len; i > 0; i--) {
                        ans +=
                        arr[Math.floor(Math.random() * arr.length)];
                    }
                    return ans;
                } 
                const folio_control = llenarConCeros(count, 5);
                n_control = fecha_control + folio_control;
                usuario.create({
                    username: n_control,
                    password: randomStr(20, '123456789ABCDEFGHI'),
                    persona_id: persona.id,
                    rol: 2,
                    status: 1,
                })
            })
//Cierra creación de ususario

            res.json({
                persona: persona,
                token: token
            });
        }).catch(err => {
            res.status(500).json(err)
        })
    },
    //Despliegue de perfil
    perfil(req, res, next) {

        let {persona_id} = req.body;

        persona.findByPk(persona_id).then(persona => {
            if(!persona){
                res.status(404).json({ msg: 'No such person'});
            }else{
                res.json({
                    persona: persona
                })
            }
        })
    }
}