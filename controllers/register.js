const handleRegister = async (req, res, db, bcrypt) => {
    const { email, firstname, lastname, phone, zip, city, address, comment, password } = req.body;
    if (!email || !firstname || !lastname || !phone || !zip || !city || !address || !password) {
        return res.status(400).json('deficient_data');
    }
    const hash = bcrypt.hashSync(password);
    await db.transaction(async trx => {
        const loginEmail = await trx.insert(
            {
                hash: hash,
                email: email
            }
        )
            .into('login')
            .returning('email');
        const user = await trx('users')
            .returning('*')
            .insert(
                {
                    email: loginEmail[0],
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    zip: zip,
                    city: city,
                    address: address,
                    comment: comment,
                    joined: new Date()
                });
        trx.commit;
        return res.json(user[0]);
    })
}
export default handleRegister;