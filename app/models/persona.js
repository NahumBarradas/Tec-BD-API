'use strict';
const {Model} = require('sequelize');
const {alumno} = require('../models/index')

module.exports = (sequelize, DataTypes) => {
    class persona extends Model {
        
        static associate(model) {
            
        }
    }
    persona.init({
        curp: {
            type: DataTypes.STRING(18),
            allowNull: false,
            unique: true,
        },
        rfc: {
            type: DataTypes.STRING(13),
            allowNull: true,
            unique: true,
        },
        nss: {
            type: DataTypes.STRING(11),
            allowNull: true,
            defaultValue: null,
            unique: true,
        },
        nombre: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        apellido_paterno: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        apellido_materno: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        fecha_nacimiento: {
            type: DataTypes.DATE(),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
        genero: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
        },
        estado_civil: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
        },
        tipo_sangre: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
        },
        requiere_actualizar_domicilio: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
        },
        requiere_actualizar_bachillerato: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
        },
        requiere_actualizar_contacto: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
        },
        requiere_actualizar_contacto_personal: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
        },
        rh_actualizacion: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        sequelize,
        modelName: 'persona',
        freezeTableName: true,
    });
    return persona;
};