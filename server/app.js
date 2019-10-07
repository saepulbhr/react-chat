var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/react-chatdb', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

var indexRouter = require('./routes/index');


const app = express();
const http = require("http").Server(app);

const portAccess = 4001;

//Setting up express and adding socketIo middleware

const connectSocket = http.listen(portAccess);

const io = require('socket.io')(connectSocket);

io.on('connection', function (socket) {
    socket.on('addchat', function (data) {
        
        io.emit('loaddata', data)
    });



});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);



module.exports = app;
