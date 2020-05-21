const handleStock = (db) => (req,res) =>
{
    db.select('*').from('pizzas').orderBy('id')
    .then(pizza =>
    {
        res.status(200).json(pizza);
    })
}

const uploadStock = (db) => (req,res) =>
{
    const {name, topping, price, imageurl} = req.body;

    db.transaction(trx =>
        {
            return trx
            .insert(
                {
                    name: name,
                    topping: topping,
                    price: price,
                    imageurl: imageurl
                }
            )
            .into('pizzas')
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .catch(err=>res.status(400).json(err));
        return res.status(200).json('Pizza sikeresen hozzáadva.');
}

const updateStock = (db) => (req,res) =>
{
    const {id, name, topping, price, imageurl} = req.body;
    
    
    db('pizzas')
    .where('id','=', id)
    .update("name",name)
    .update("topping",topping)
    .update("price",price)
    .update("imageurl",imageurl)
    .then(status => 
        {
            res.status(200).json("Pizza adatai frissítve.");
        })
    .catch(err=>res.status(400).json('unable to update item'));
    
    
}

const deleteStock = (db) => (req,res) =>
{
    const {id} = req.body;
    db('pizzas')
    .where('id','=',id)
    .del()
    .then(res.status(200).json("Pizza törölve."))
    .catch(err => res.status(400).json('unable to get id'));
}

export default {
    handleStock, updateStock, deleteStock, uploadStock
};