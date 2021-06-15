/*
============================================
; Title:  ex01.js
; Author: Professor Krasso
; Date:   16 April 2021
; Description: OpenAPI documentation example. 
;===========================================
*/

const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Examples
 *     description: API for returning a list of preconfigured users
 *     summary: Returns a list of users
 *     responses:
 *       200:
 *         description: Returns a list of users
 */
router.get('/users', async(req, res) => {

    const users = [
        {
            "firstName": "Richard",
            "lastName": "Krasso"
        },
        {
            "firstName": "John",
            "lastName": "Doe"
        },
        {
            "firstName": "Jane",
            "lastName": "Doe"
        },
        {
            "firstName": "William",
            "lastName": "Smith"
        },
        {
            "firstName": "Maricela",
            "lastName": "Molgado"
        }
    ]
    res.json(users);
})

module.exports = router;
