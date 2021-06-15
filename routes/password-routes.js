/*
============================================
; Title:  password-routes.js
; Author: Professor Krasso
; Date:   16 April 2021
; Description: Routes for registering and resetting passwords.  
;===========================================
*/

const express = require('express');
const router = express.Router();
const Password = require('../models/password');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const saltRounds = 10;

/**
 * register
 * @openapi
 * /api/register:
 *   post:
 *     tags:
 *       - Passwords
 *     name: register
 *     summary: Register password
 *     requestBody:
 *       description: Password information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/register', async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
        const newPassword = {
            passId: uuidv4(),
            pass: hashedPassword
        }

        await Password.create(newPassword, function(err, password) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(password);
                res.json(password);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Excpetion: ${e.message}`
        })
    }
})

/**
 * verify-password
 * @openapi
 * /api/verify-password:
 *   post:
 *     tags:
 *       - Passwords
 *     name: verify password
 *     summary: Verifies a password
 *     requestBody:
 *       description: Password information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - passId
 *               - password
 *             properties:
 *               passId:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password added to MongoDB
 *       '401':
 *         description: Invalid passId or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/verify-password', async(req, res) => {
    try {
        Password.findOne({'passId': req.body.passId}, function(err, password) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(password);
                if (password) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, password.pass);

                    if (passwordIsValid) {
                        console.log('Password matches');
                        res.status(200).send({
                            'message': 'Password matches'
                        })
                    } else {
                        console.log('Password is incorrect');
                        res.status(401).send({
                            'message': `Invalid passId or password`
                        })
                    }
                } else {
                    console.log('Invalid passId');
                    res.status(401).send({
                        'message': `Invalid passId or password`
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})

module.exports = router;
