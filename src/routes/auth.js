const express = require("express");
const CONFIG = require("../config")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login", { title: "BookBook - вход" });
});

const checkIfUserIsAdmin = async (token) => {
    try {
        
    } catch (error) {
        
    }
}

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let response = await fetch(CONFIG.apiBaseURL+'/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const data = await response.json();
            let message = ""

            if (response.status == 400) message = "Ошибка валидации - пароль или почта не соответствуют формату"
            else message = data.message ? data.message : "Неизвестная ошибка"

            res.render('errorPage', {message,title: "Ошибка"})
            return
        }

        const {token} = await response.json();
        console.log(token)

        response = await fetch(CONFIG.apiBaseURL+"/api/v1/users/me", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const data = await response.json();
            let message = ""

            if (response.status == 400) message = "Ошибка валидации - пароль или почта не соответствуют формату"
            else message = data.message ? data.message : "Неизвестная ошибка"

            res.render('errorPage', {message,title: "Ошибка"})
            return
        }

        const data = await response.json()
        console.log(data)
        const is_admin = data.is_admin
        if (!is_admin) {
            res.render('errorPage', {message: "У вас нет прав на пользование панелью",title: "Ошибка"})
            return
        }

        console.log(data)
        res.cookie("token", token)
        res.redirect('/homepage');
    } catch (error) {
        res.render('errorPage', {message: error.message ? error.message : "Неизвестная ошибка", title: "Ошибка"})
    }
})

module.exports = router;