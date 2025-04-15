const express = require("express");
const CONFIG = require("../config")
const router = express.Router();

router.get("/createPlace", async (req, res) => {
    res.render('createPlace')
})

router.post("/createPlace", async (req, res) => {
    try {
        const response = await fetch(CONFIG.apiBaseURL+"/api/v1/places", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.cookies.token}`
            },
            body: JSON.stringify(req.body)
        })

        if (!response.ok) {
            const data = await response.json();
            let message = ""

            if (response.status == 400) message = "Ошибка валидации - поле не соответствует формату"
            else message = data.message ? data.message : "Неизвестная ошибка"

            res.render('errorPage', {message, title: "Ошибка"})
            return
        }

        res.redirect('/homepage');
    } catch (error) {
        res.render('errorPage', {message: error.message ? error.message : "Неизвестная ошибка", title: "Ошибка"})
    }
})

module.exports = router