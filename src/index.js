const express=require('express');
const morgan=require('morgan');
const exphandle=require('express-handlebars');
const path=require('path');
const flash=require('connect-flash');
const session=require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const mysqlstore=require('express-mysql-session');
const {database}=require('./keys');


const { tareasdb } = require('./keys')

//inicializaciones
const app=express();

//config
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',  exphandle({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),  
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set( 'view engine', '.hbs');

//peticiones

//guardar tareas en la base de datos
app.use(session({
    secret:'mysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
 
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extented: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//app.use(validator());


//variables globales
app.use((req, res, next) =>{
    app.locals.success=req.flash('success');
    app.locals.user = req.user;
    next();
});

//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links' ,require('./routes/links'));


//publico

app.use(express.static(path.join(__dirname, 'public')));

//inicio de servidor
app.listen(app.get('port'),() => {
    console.log('Server on port', app.get('port'));
});



