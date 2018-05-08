const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `./controllers/messages_controller` );
const expressSession = require( 'express-session');
require( 'dotenv').config()

const createInitialSession = require( `${__dirname}/middlewares/session.js` );

const app = express();
const filter = require(`${__dirname}/middlewares/filter.js`);

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../build` ) );
app.use( expressSession ({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized:true,
  cookie: { 
    secure: false,
    maxAge: 10000*10 }
}));

app.use(createInitialSession);
app.use(( req, res, next) => {
    const {method} = req;
    if( methos === "POST" || method === "PUT"){
        filter(req,res,next);
    }else{
        next();
    }
});

app.post( "/api/messages", mc.create );
app.get( "/api/messages", mc.read );
app.put( "/api/messages", mc.update );
app.delete( "/api/messages", mc.delete );
app.get( "/api/messages/history", mc.history);

const port = process.env.PORT || 3000
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );