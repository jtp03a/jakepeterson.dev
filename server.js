require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jwtDecode = require('jwt-decode');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const csrf = require('csurf');
const bodyParser = require('body-parser');

const publicRoutes = require('./server/routes/public.routes');
const privateRoutes = require('./server/routes/private.routes');

const csrfProtection = csrf({ cookie: true });

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'));

app.get('*', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use('/api', publicRoutes);

const attachUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Authentication Invalid' })
    }

    const decodedToken = jwtDecode(token);

    if (!decodedToken) {
        return res.status(401).json({ message: 'There was a problem authorizing the request' })
    } else {
        req.user = decodedToken;
        next()
    }
};

app.use(attachUser);

const checkJwt = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    issuer: 'api.natasia',
    audience: 'api.natasia',
    getToken: req => req.cookies.token
});

app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
});

const requireAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.status(401).json({ message: 'Insufficient role' });
    }
    next();
}

app.use('/api/private/', checkJwt, privateRoutes);

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('mongoDB connected...'));

app.get('*', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
