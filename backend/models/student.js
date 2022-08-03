const {db} = require("./")

const getStudents = async() =>{
    return await db.students.find({}).toArray();
}
const insertStudents = async(student) =>{
    return await db.students.insertOne({name: student.name, age: student.age, per: student.per});
}
module.exports = {getStudents, insertStudents}