const express = require('express');
const app = express();
const router = express.Router();
const {User} = require('./User');
const {Role} = require('./Role');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Resource-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Method", "*");
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.sendStatus(200);
    } else {
        console.log("------------------------------------\n");
        next();
    }
});

app.use((req, res, next) => {
    console.log(`request user-agent url: ${req.url} \n`);
    console.log(`request user-agent IP: ${req.ip} \n`);
    next();
});

app.use('/api', router);

const userConn = new User();
const roleConn = new Role();

router.post("/users/createUser", (req, res) => {
    userConn.createUser(res, req.body);
})

router.put("/users/deleteUser", (req, res) => {
    userConn.deleteUser(res, req.body)
})

router.get("/users/getUser", (req, res) => {
    return userConn.getUser(res, req);
})

router.put("/users/addRole", (req, res) => {
    userConn.addRole(res, req.body)
})

router.post("/role/createRole", (req, res) => {
    roleConn.createRole(res, req.body);
})

router.get("/role/getAllRoles", (req, res) => {
    roleConn.getAllRoles(res);
})


app.listen(4000, () => {
    console.log('server start on 4000');
})


