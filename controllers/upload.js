async function handleUpload(req, res, db){
    const {
        name,
        topping,
        price,
        imageurl
    } = req.body;

    if (!name || !topping || !price) {
        return res.status(400).json('Tölts ki minden mezőt!');
    }

    db.transaction( async function (trx){
            await trx
                .insert({
                    name: name,
                    topping,
                    topping,
                    price: price,
                    imageurl: imageurl
                })
                .into('pizzas');
            return trx.commit;
            
        });
}

export default handleUpload;