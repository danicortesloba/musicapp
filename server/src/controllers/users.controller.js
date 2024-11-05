
import User from "../models/User.model.js";

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(new User(req.body));
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOneUser = async (req, res) => {
   try{
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
   }catch (error) {
    res.status(500).json({ message: error.message });
   }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
    const user = await User.findOne({ email });
    res.json(user);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
    const { name, lastname, email, age, password } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, lastname, email, age, password });
    res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
   try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
};

export {getAllUsers, getOneUser, createUser, updateUser, deleteUser, getUserByEmail};