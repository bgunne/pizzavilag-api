const handleUpload = (db) => (req, res) => {
    const {
        name,
        topping,
        price,
        imageurl
    } = req.body;

    if (!name || !topping || !price) {
        return res.status(400).json('Tölts ki minden mezőt!');
    }

    db.transaction(trx => {
        return trx
            .insert({
                name: name,
                topping: topping,
                price: price,
                imageurl: imageurl
            })
            .into('pizzas')
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(err => res.status(400).json(err));
}

module.exports = {
    handleUpload: handleUpload
}