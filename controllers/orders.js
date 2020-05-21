const handleOrders = async (req, res, db) => {
    const orders = db.select('*').from('orders').orderBy('id')
        .then(orders => {
            res.status(200).json(orders);
        })
    console.log(orders);
    
}

const updateOrder = async (req, res, db) => {
    const { id, statusCode } = req.body;
    db('orders')
        .where('id', '=', id)
        .update('status', statusCode)
        .returning('status')
        .then(status => {
            res.json(status[0]);
        })
        .catch(err => res.status(400).json('unable to get status'));
}

const deleteOrder = async (req, res, db) => {
    const { id } = req.body;
    db('orders')
        .where('id', '=', id)
        .del()
        .then(res.status(200).json("Rendelés törölve."))
        .catch(err => res.status(400).json('unable to get id'));
}



export {
    handleOrders, updateOrder, deleteOrder
};
