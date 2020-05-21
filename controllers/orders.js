const handleOrders = async(res,db) =>{
    db.select('*').from('orders').orderBy('id')
    .then(orders =>
    {
        res.status(200).json(orders);
        
    })
}

const updateOrder = async(req, res,db) =>{
    const { id, statusCode } = req.body;
    const status = await db('orders')
        .where('id', '=', id)
        .update('status', statusCode)
        .returning('status');
    return res.json(status[0]);
}

const deleteOrder = async (req, res,db) =>{
    const { id } = req.body;
    await db('orders')
        .where('id', '=', id)
        .del();
    return res.status(200).json("Rendelés törölve.");
}



export {
        handleOrders, updateOrder, deleteOrder
    };
