const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}
async function handleGetUserById(req, res) {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({error : 'user not found'})
        return res.json(user);
}
async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: "changed"})
    console.log(User);
    return res.send({ status : "user have been updated" });
}
async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id)
    return res.send({ status : "user have been deleted" });
}
async function handleCreateUser(req, res) {
    // TODO : Create new user
const body = req.body; // we wil get in this line of code data from frontend and express js dont know what kind of data are present and dont know how to handle this data this is why we use middleware .
if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
    return res.status(400).json({error: "Please provide all the details."})
}
const result = await User.create({
firstName: body.first_name,
lastName: body.last_name,
email: body.email,
gender: body.gender,
jobTitle: body.job_title
});
return res.status(201).json({msg: 'success' , id: result._id});
}
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
}