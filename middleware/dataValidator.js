
const { check, validationResult } = require('express-validator');

exports.dataValidationRegister = [
    check('email_address', 'Email length should be 5 to 30 characters')
                    .isEmail()
                    .isLength({ min: 5, max: 30 })
                    .notEmpty()
                    .withMessage('Email Address required'),

    check('login', 'Login length should be 10 to 20 characters')
                    .notEmpty().withMessage('login is required')
                    .isLength({ min: 5, max: 20 })
                    ,
    check('real_name', 'Real name should be 5 to 20 characters')
                    .notEmpty().withMessage('real name is required')
                    .isLength({ min: 5, max: 20 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .notEmpty().withMessage('password is required')
                    .isLength({ min: 8, max: 10 }),
    check('birth_date', 'birth date shoud be like year-month-day')
                    .notEmpty().withMessage('birth date is required')
                    .matches(/[0-9]/)
]


