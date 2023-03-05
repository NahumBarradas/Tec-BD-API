'use strinct';
const {Model} = require('sequelize');
const {persona} = require('../models/index');
const {alumno} = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    class usuario extends Model {

        static associate(models) {

        }
    }
    usuario.init({
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        rol: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        persona_id: {
            type: DataTypes.INTEGER,
            references: {
                model: persona,
                key: 'id',
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        sequelize,
        modelName: 'usuario',
        freezeTableName: true,
    });
    return usuario;
}