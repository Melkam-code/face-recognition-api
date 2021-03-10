const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'Melkam',
            email: 'melkam343@gmail.com',
            password: 'cool',
            entries: 0,
            joined: new Date()
        },
        {
            id: '126',
            name: 'Sally',
            email: 'sally3@gmail.com',
            password: 'cool',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'melkam343@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    // Load hash from your password DB.
bcrypt.compare("cool", '$2a$10$.sGCuPxy219sZcee0gcuSO09uMF0u2Hmr.s1LHL2siMU4FXTT/VkK', function(err, res) {
    console.log('first guess ', res);
 });
 bcrypt.compare("veggies", '$2a$10$.sGCuPxy219sZcee0gcuSO09uMF0u2Hmr.s1LHL2siMU4FXTT/VkK', function(err, res) {
    console.log('second guess ', res);
 }); 

    if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json("success");
    } else {
        res.status(400).json('error loging in');
    }
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
    });

    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json("user not found");
    }
})

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json("user not found");
    }
})

app.listen(3000, () => {
    console.log("app is running");
})