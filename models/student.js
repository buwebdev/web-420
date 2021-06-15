/*
============================================
; Title:  student.js
; Author: Professor Krasso
; Date:   16 April 2021
; Description: Student Model
; Business Rules: a CLASS may ENROLL many STUDENT(s)
;                 each STUDENT may ENROLL in many CLASS(s)
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * enrollment schema
 */
let enrollmentSchema = new Schema({
    term: { type: String },
    gpa: { type: String }
});

/**
 * course schema 
 */
let courseSchema = new Schema({
    description: { type: String },
    instructor: { type: String },
    grade: { type: String }
});

/**
 * student schema
 */
let studentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    enrollments: [enrollmentSchema],
    courses: [courseSchema]
})

module.exports = mongoose.model('Student', studentSchema);
