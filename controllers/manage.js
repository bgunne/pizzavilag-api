const handleStock = async (req, res, db) => {
    const pizza = await db.select('*').from('pizzas').orderBy('id')
    res.status(200).json(pizza);
}

const uploadStock = async (req, res, db) => {
    const { name, topping, price, imageurl } = req.body;

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
    return res.status(200).json('Pizza sikeresen hozzáadva.');
}

const updateStock = async (req, res, db) => {
    const { id, name, topping, price, imageurl } = req.body;
    await db('pizzas')
        .where('id', '=', id)
        .update("name", name)
        .update("topping", topping)
        .update("price", price)
        .update("imageurl", imageurl);
    res.status(200).json("Pizza adatai frissítve.");
}

const deleteStock = async (req, res, db) => {
    const { id } = req.body;
    await db('pizzas')
        .where('id', '=', id)
        .del();
    res.status(200).json("Pizza törölve.");
}

export {
    handleStock, updateStock, deleteStock, uploadStock
};