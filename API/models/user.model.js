module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        uid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        mobile: Sequelize.INTEGER,
        status: Sequelize.STRING,
    })
    return User;
}

/* 
 * VALIDATING USER INFO WITH JOI VALIDATION 
 */
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity")
exports.validate = (data) => {
    const schema = joi.object({
        firstname: joi.string().required().label("First Name"),
        lastname: joi.string().required().label("Last Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"), //USING JOI PASSWORD COMPLEXITY
        mobile: joi.string().length(10).required().label("Mobile"),
        status: joi.string().required().label("Status"),


    });
    return schema.validate(data);
}