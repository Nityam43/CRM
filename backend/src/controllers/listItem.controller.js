const ListItem = require('../models/listItem.model.js');

const createListItem = async (req, res) => {
    try {
        const { name, type } = req.body;
        if (!name || !type) {
            return res.status(400).json({ message: 'Name and type are required' });
        }
        const listItem = new ListItem({ name, type });
        await listItem.save();
        res.status(201).json({
            message: 'List item created successfully',
            data: listItem,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating list item',
            error: error.message,
        });
    }
};

const getListItems = async (req, res) => {
    try {
        const { type } = req.query;
        let listItems;
        if (type) {
            listItems = await ListItem.find({ type });
        } else {
            listItems = await ListItem.find();
        }
        res.status(200).json({
            message: 'List items fetched successfully',
            data: listItems,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching list items',
            error: error.message,
        });
    }
};

module.exports = {
    createListItem,
    getListItems,
};
