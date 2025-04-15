const express = require("express");

const router = express.Router();

router.get('/error', async (req, res) => {
    res.render('errorPage', { message: req.query.message })
})

module.exports = router;