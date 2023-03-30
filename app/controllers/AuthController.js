const {persona} = require('../models/index');
const {alumno} = require('../models/index');
const {usuario} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authconfig = require('../../config/auth');

module.exports = {
    //Inicio de sesión de alumno
    signIn(req, res) {

        let {control, password} = req.body;

        alumno.findOne({
            where: {
                control: control
            }
        }).then(alumno => {
            
            if(!alumno){
                res.status(404).json({msg: 'El alumno no existe'});
            }else{
                if(/*bcrypt.compareSync(password, usuario.password)*/req.body.alupas == alumno.alupas){
                    token = jwt.sign({ alumno: alumno }, authconfig.secret, {
                        expiresIn: authconfig.expires
                    });
                }else{
                    res.status(401).json({msg: 'Contraseña incorrecta'});
                }
                persona.findByPk(alumno.persona_id).then(persona => {
                    if(!persona){
                        res.status(404).json({msg: 'El usuario no existe'});
                    }else{
                        res.json({
                        usuario: persona,
                        token: token,
                        msg: "Inicio de sesión correcto"
                        });
                    }
                })
            }
        }).catch(err => {
            res.json(err);
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
            /*let token =jwt.sign({ persona: persona}, authconfig.secret, { 
                expiresIn: authconfig.expires
            });*/
//Crear usuario
            alumno.count({
                col: 'control',
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
                alumno.create({
                    control: n_control,
                    alupas: randomStr(10, '123456789ABCDEFGHI'),
                    persona_id: persona.id,
                })
            })
//Cierra creación de usuario
            res.json({
                persona: persona,
                //token: token,
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