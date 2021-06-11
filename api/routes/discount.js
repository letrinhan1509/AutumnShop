const express = require('express');
const router = express.Router();

const db = require('../models/database');
const modelDiscount = require('../models/model_discount');


            // API GET
    // Danh sách bình luận:
router.get('/danh-sach', async function(req, res) { 
    try {
        let listCmt = await modelComment.list_Comments();
        res.json({ "status": "Success", "data": listCmt });
    } catch (error) {
        res.json({ "status": "Fail", "error": error })
    }
});


module.exports = router;