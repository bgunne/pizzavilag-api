import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import multer from 'multer';

import handleSignin from './controllers/signin.js';
import handleRegister from './controllers/register.js';
import handleUpload from './controllers/upload.js';
import handleOrder from './controllers/order.js';
import handleOrders from './controllers/orders.js';
import updateOrder from './controllers/orders.js';
import deleteOrder from './controllers/orders.js';
import handleStock from './controllers/manage.js';
import updateStock from './controllers/manage.js';
import uploadStock from './controllers/manage.js';
import deleteStock from './controllers/manage.js';
import handleUploadImage from './controllers/uploadimage.js';

const app = express();

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



app.get('/', async function (req, res) {
    const pizza = await db.select('*').from('pizzas')
    res.status(200).json(pizza);

});

app.post('/signin', (req,res) => {handleSignin(req, res,db, bcrypt)});
app.post('/register', (req,res) => {handleRegister(req, res, db, bcrypt)});
app.post('/upload', (req,res) => {handleUpload(req, res,db)});
app.post('/order', (req,res) => {handleOrder(req,res,db)});
app.get('/orders', (req,res) => {handleOrders(req, res, db)});
app.put('/orders', (req,res) => {updateOrder(req,res,db)});
app.delete('/orders', (req,res) => {deleteOrder(req,res,db)});
app.get('/manage', (req,res) => {handleStock(req, res, db)});
app.put('/manage', (req,res) => {updateStock(req, res, db)});
app.delete('/manage', (req,res) => {deleteStock(req, res, db)});
app.post('/manage', (req,res) => {uploadStock(req, res, db)});
app.post('/uploadimage', (req,res) => {handleUploadImage(req, res)});

app.listen(process.env.PORT || 3000, () => {
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
export default app;