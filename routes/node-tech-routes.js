/*
============================================
; Title:  node-tech-routes.js
; Author: Professor Krasso
; Date:   16 April 2021
; Description: API's for NodeTech
;===========================================
*/

const express = require('express');
const router = express.Router();
const Student = require('../models/student');

/**
 * findAllStudents
 * @openapi
 * /api/students:
 *   get:
 *     tags:
 *       - Students
 *     description: API for returning a list of student documents from MongoODB
 *     summary: return list of student document
 *     responses:
 *       '200':
 *         description: Array of students
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/students', async(req, res) => {
    try {
        Student.find({}, function(err, students) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(students);
                res.json(students);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * createStudent
 * @openapi
 * /api/students:
 *   post:
 *     tags:
 *       - Students
 *     name: createStudent
 *     summary: Creates a new Student document
 *     requestBody:
 *       description: Student information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - enrollments
 *               - courses
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               enrollments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     term:
 *                       type: string
 *                     gpa:
 *                       type: string
 *               courses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     instructor:
 *                       type: string
 *                     grade:
 *                       type: string
 *     responses:
 *       '200':
 *         description: Student added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/students', async(req, res) => {
    try {
        const newStudent = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            enrollments: req.body.enrollments,
            courses: req.body.courses
        };

        await Student.create(newStudent, function(err, student) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(student);
                res.json(student);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;
