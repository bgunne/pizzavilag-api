import express from 'express';
import bcrypt from 'bcrypt-nodejs'; 
import cors from 'cors';
import knex from 'knex';
import multer from 'multer';

import signin from './controllers/signin';
import register from './controllers/register';
import upload from './controllers/upload';
import order from './controllers/order';
import orders from './controllers/orders';
import manage from './controllers/manage';
import uploadimage from './controllers/uploadimage';

const app=express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
        rejectUnauthorized: false,

    }
});

app.use(express.json());
app.use(express.static('public'));
app.use(cors());



app.get('/', async function(req,res)
{
    const pizza = await db.select('*').from('pizzas')
    res.status(200).json(pizza);
        
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

app.listen(process.env.PORT || 3000, ()=>
{
    console.log(`app is running on port ${process.env.PORT}...`);
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