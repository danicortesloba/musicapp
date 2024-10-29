
import User from "../models/User.model.js";

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOneUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
};


const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, email, age, password } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, lastname, email, age, password });
    res.json(user);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
};

export {getAllUsers, getOneUser, createUser, updateUser, deleteUser};