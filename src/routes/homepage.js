const express = require("express");
const CONFIG = require("../config")
const router = express.Router();

router.get("/", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/auth/login');
    }

    try {
        const response = await fetch(CONFIG.apiBaseURL+'/api/v1/places', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const data = await response.json();

            if (response.status == 401) {
                res.redirect('/auth/login')
                return
            }

            res.render('errorPage', {message: data.message ? data.message : "Неизвестная ошибка", title: "Ошибка"})
            return
        }

        const data = await response.json();

        console.log(data)

        res.render('homepage', { places: data, title: "BookBook - Главная" })

    } catch (error) {
        res.render('errorPage', {message: error.message ? error.message : "Неизвестная ошибка", title: "Ошибка"})
    }
});


module.exports = router;