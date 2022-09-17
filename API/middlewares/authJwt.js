const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { user } = require("../models");
const db = require("../models");
const User = db.user;

verifyToken = (res, req, next) => {
    let token = req.headers["x-acess-token"];
    if (!token)
        return res.status(403).send({ message: "No token provided" });
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({ message: "unauthorized" });
        req.userId = decoded.id;
        next();
    });
};
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (i = 0; i <= roles.length; i++) {
                if (roles.name == "admin")
                    next();
                return;

            }
            res.status(403).send({ messge: "Admin role required" });
        });
    });
};

isTrainer = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "trainer") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator Role!"
            });
        });
    });
};
isTrainerOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "trainer") {
                    next();
                    return;
                }
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;