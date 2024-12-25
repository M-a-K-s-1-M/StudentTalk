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
    group: { type: DataTypes.STRING },
    curs: { type: DataTypes.INTEGER }
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

const Chat = sequelize.define('chat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING }
})

const Group = sequelize.define('group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
})

const Curs = sequelize.define('curs', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.INTEGER }
})








Student.hasMany(Deadline);
Deadline.belongsTo(Student);

Deadline.hasOne(Student);
Student.belongsTo(Deadline);

Student.hasMany(Ticket);
Ticket.belongsTo(Student);

Ticket.hasOne(Student);
Student.belongsTo(Ticket);

Student.hasMany(Chat);
Chat.belongsTo(Student);

Chat.hasOne(Student);
Student.belongsTo(Chat);

Student.hasOne(Group);
Group.belongsTo(Student);

Group.hasMany(Student);
Student.belongsTo(Group);

Student.hasOne(Curs);
Curs.belongsTo(Student);


/// -----

Chat.hasMany(Message);
Message.belongsTo(Chat);

Message.hasOne(Chat);
Chat.belongsTo(Message);

/// -----



Tutor.hasMany(Ticket);
Ticket.belongsTo(Tutor);

Ticket.hasOne(Tutor);
Tutor.belongsTo(Ticket);

Tutor.hasMany(Chat);
Chat.belongsTo(Tutor);

Chat.hasOne(Tutor);
Tutor.belongsTo(Chat);









module.exports = {
    Student,
    Tutor,
    Deadline,
    Ticket,
    Chat,
    Message,
    Group,
    Curs,
}

