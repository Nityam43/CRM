const express = require('express');
const { createListItem, getListItems } = require('../controllers/listItem.controller.js');
const router = express.Router();

router.post('/add', createListItem);
router.get('/list', getListItems);

module.exports = router;
