const handleRegister = async (req, res, db, bcrypt) => {
    const { email, firstname, lastname, phone, zip, city, address, comment, password } = req.body;

    if (!email || !firstname || !lastname || !phone || !zip || !city || !address || !password) {

        return res.status(400).json('Töltsd ki a kötelező mezőket!');

    }
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert(
            {
                hash: hash,
                email: email
            }
        )
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
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
                        })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(err => res.status(400).json(err));
}



export default handleRegister;