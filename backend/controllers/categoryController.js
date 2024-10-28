const Category = require('../models/categoryModel');
const User = require('../models/userModel');
require('dotenv').config();

exports.category = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    
    const user = await User.findById(req.user.id);

    const categories = await Category.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const markedCategories = user ? user.interests : [];

    const categoriesWithMarkings = categories.map(category => ({
        ...category._doc, 
        marked: markedCategories.includes(category._id) 
    }));

    res.json(categoriesWithMarkings);
};

exports.markedCategory = async (req, res) => {
    const { categoryId } = req.body;
    const user = await User.findById(req.user.id); 
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    if (!user.interests.includes(categoryId)) {
        user.interests.push(categoryId);
        await user.save();
    }
    res.json({ message: 'Interest marked' });
};
