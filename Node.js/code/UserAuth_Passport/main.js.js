const app = require('./lib/express')();
const passport = require('./lib/passport')(app);

const indexRouter = require('./routes/index')(passport);
const authRouter = require('./routes/auth')(passport); 

app.use('/', indexRouter);  
app.use('/auth/', authRouter);

app.listen(8001, function(){
    console.log('connected 8001 port');
})