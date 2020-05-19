const express = require('express');
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors');
const knex = require('knex');
const multer = require('multer');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const upload = require('./controllers/upload');
const order = require('./controllers/order');
const orders = require('./controllers/orders');
const manage = require('./controllers/manage');
const uploadimage = require('./controllers/uploadimage');

const app=express();

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password:'bgunne',
        database: 'pizzavilag'

    }
});

app.use(express.json());
app.use(express.static('public'));
app.use(cors());



app.get('/', (req,res)=>
{
    db.select('*').from('pizzas')
    .then(pizza =>
        {
            res.status(200).json(pizza);
        })
});

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db,bcrypt));
app.post('/upload', upload.handleUpload(db));
app.post('/order', order.handleOrder(db));
app.get('/orders', orders.handleOrders(db));
app.put('/orders', orders.updateOrder(db));
app.delete('/orders', orders.deleteOrder(db));
app.get('/manage', manage.handleStock(db));
app.put('/manage', manage.updateStock(db));
app.delete('/manage', manage.deleteStock(db));
app.post('/manage', manage.uploadStock(db));
app.post('/uploadimage', uploadimage.handleUploadImage());

app.listen(3000, ()=>
{
    console.log('app is running on port 3000...');
});

/* _ENDPOINTS PLAN_
 
    /               --> GET =   pizzas
    /signin         --> POST=   success/fail    ok
    /register       --> POST=   user            ok
    /order          --> POST=   user,pizzas     ok      
    /orders         --> GET =   orders          ok
    /orders         --> PUT =   orders          ok
    /orders         --> DEL =   orders          ok
    /manage         --> GET =   pizzas          ok
    /manage         --> POST=   pizzas          ok
    /manage         --> PUT =   pizzas          ok
    /manage         --> DEL =   pizzas          ok

*/