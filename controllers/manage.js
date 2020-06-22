const handleStock = async (req, res, db) => {
    const pizza = await db.select('*').from('pizzas').orderBy('id')
    res.status(200).json(pizza);
}
const uploadStock = async (req, res, db) => {
    const { name, topping, price, imageurl } = req.body;
    if (!name || !topping || !price) {
        return res.status(400).json('deficient_details');
    }
    await db.transaction(async (trx) => {
        await trx
            .insert(
                {
                    name: name,
                    topping: topping,
                    price: price,
                    imageurl: imageurl
                }
            )
            .into('pizzas');
        return trx.commit;
    })
    return res.status(200).json('upload_success');
}
const updateStock = async (req, res, db) => {
    const { id, name, topping, price, imageurl } = req.body;
    await db('pizzas')
        .where('id', '=', id)
        .update("name", name)
        .update("topping", topping)
        .update("price", price)
        .update("imageurl", imageurl);
    res.status(200).json("update_success");
}
const deleteStock = async (req, res, db) => {
    const { id } = req.body;
    await db('pizzas')
        .where('id', '=', id)
        .del();
    res.status(200).json("delete_success");
}
export {
    handleStock, updateStock, deleteStock, uploadStock
}; 