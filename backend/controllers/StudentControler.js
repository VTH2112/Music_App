const studentModel = require("../models/student")
const getAllStudents = async(user) =>{
    console.log(user);
    checkPermisionAdmin(user);
    return await studentModel.getStudents();
}
const insertStudent= async(user) =>{
    return await studentModel.insertStudents(user);
}

const checkPermisionAdmin = (user) => {
    // if (!user.per){
    //     throw new Error('PERMISSION_DENIED');
    // }
    return true;
}
module.exports = {getAllStudents, insertStudent}