const { DataTypes, DECIMAL } = require('sequelize');
const sequelize = require('../db');
const { TICK_CHAR } = require('sequelize/lib/utils');

const Student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    firstname: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    patronymic: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "STUDENT" },
    group: { type: DataTypes.STRING }
})

const Tutor = sequelize.define('tutor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    firstname: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    patronymic: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "TUTOR" },
})

const Deadline = sequelize.define('deadline', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    object: { type: DataTypes.STRING },
    date: { type: DataTypes.STRING },
})

const Ticket = sequelize.define('ticket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
})





Student.hasMany(Deadline);
Deadline.belongsTo(Student);

Deadline.hasOne(Student);
Student.belongsTo(Deadline);

Student.hasMany(Ticket);
Ticket.belongsTo(Student);

Ticket.hasOne(Student);
Student.belongsTo(Ticket);









module.exports = {
    Student,
    Tutor,
    Deadline,
    Ticket,
}

