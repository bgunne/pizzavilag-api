const handleOrders = async (req, res, db) => {
    db.select('*').from('orders').orderBy('id')
        .then(orders => {
            res.status(200).json(orders);
        })
        .catch(err => res.status(400).json('request_fail'))
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
        .catch(err => res.status(400).json('status_fail'));
}
const deleteOrder = async (req, res, db) => {
    const { id } = req.body;
    await db('orders')
        .where('id', '=', id)
        .del();
    res.status(200).json("delete_success");
}
export {
    handleOrders, updateOrder, deleteOrder
};
