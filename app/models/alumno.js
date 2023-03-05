'use strinct';
const {Model} = require('sequelize');
const {persona} = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    class alumno extends Model {

        static associate(models) {

        }
    }
    alumno.init({
        control: {
            type: DataTypes.STRING(9),
            allowNull: false,
            unique: true,
        },
        alupas: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        persona_id: {
            type: DataTypes.INTEGER,
            references: {
                model: persona,
                key: 'id',
            }
        }
    },{
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        sequelize,
        modelName: 'alumno',
        freezeTableName: true,
    });
    return alumno;
}