const handleOrder = (db) => (req,res) =>
{
    const {user, pizzas, price} = req.body;

    if(!user || !pizzas || !price)
    {
        return res.status(400).json('Adj meg minden szükséges adatot a rendeléshez!');
    }

    db.transaction(trx =>
    {
        return trx
        .insert(
        {
            user: user,
            pizzas: pizzas,
            price: price
        })
        .into('orders')
        .then(trx.commit)
        .catch(trx.rollback);   
    })
    .catch(err=>res.status(400).json(err));
    return res.status(200).json('Rendelését fogadtuk.')
}

module.exports = 
{
    handleOrder: handleOrder
}