const handleOrder = async (req, res, db) => {
    const { user, pizzas, price } = req.body;
    if (!user || !pizzas || !price) {
        return res.status(400).json('deficient_data');
    }
    await db.transaction(async function (trx) {
        await trx
            .insert(
                {
                    user: user,
                    pizzas: pizzas,
                    price: price
                })
            .into('orders');
        return trx.commit;
    })
    return res.status(200).json('order_success')
}
export default handleOrder; 