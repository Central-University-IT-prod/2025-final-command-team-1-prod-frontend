const express = require("express");
const CONFIG = require("../config")
const router = express.Router();

router.get("/place/delete/:id", async (req, res) => {

    try {
        const id = req.params.id

        const response = await fetch(CONFIG.apiBaseURL+`/api/v1/places/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.cookies.token}`
            },
        })

        if (!response.ok) {
            const data = await response.json();

            res.render('errorPage', {message: data.message ? data.message : "Неизвестная ошибка", title: "Ошибка"})
            return
        }

        res.redirect('/homepage');
    } catch (error) {
        res.render('errorPage', {message: error.message ? error.message : "Неизвестная ошибка", title: "Ошибка"})
    }
})

module.exports = router;