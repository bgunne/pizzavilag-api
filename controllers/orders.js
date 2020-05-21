const handleOrders = async(res,db) =>{
    const orders = await db.select('*').from('orders').orderBy('id');
    return res.status(200).json(orders);
}

async function updateOrder (req, res,db){
    const { id, statusCode } = req.body;
    const status = await db('orders')
        .where('id', '=', id)
        .update('status', statusCode)
        .returning('status');
    return res.json(status[0]);
}

async function deleteOrder (req, res,db){
    const { id } = req.body;
    await db('orders')
        .where('id', '=', id)
        .del();
    return res.status(200).json("Rendelés törölve.");
}


/*
export default handleOrders/*{
        handleOrders, updateOrder, deleteOrder
    };*/

    module.exports =
{
    handleOrders: handleOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder
}