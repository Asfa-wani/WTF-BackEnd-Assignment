const express = require("express");
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:8081/"
};
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");
const Role = db.role;
db.sequelize.sync({ force: true }).then(() => {
    console.log("Db resync"),
        initialize();
})

function initialize() {
    Role.create({
        id: 1,
        name: "admin"
    });
    Role.create({
        id: 2,
        name: "trainer"
    });
    Role.create({
        id: 3,
        name: "member"
    })
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})