const handleSignin = (db, bcrypt) => (req, res) =>
{
    const {email, password} = req.body;
    if(!email || !password)
    {
        return res.status(400).json('Minden mező kitöltése kötelező!');
    }

    db.select('email', 'hash').from('login')
    .where('email','=',email)
    .then(data =>
        {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if(isValid)
            {
                return db.select('*').from('users')
                .where('email','=',email)
                .then(user =>
                    {
                        res.json(user[0]);
                    }
                )
                .catch(err => res.status(400).json("Bejelentkezés nem sikerült. Kérlek, próbálkozz újra később."))
            }
            else
            {
                res.status(400).json('Felhasználónév vagy jelszó hibás.');
            }
        }
    )
    .catch(err => res.status(400).json('Felhasználónév vagy jelszó hibás.'));
}

module.exports = 
{
    handleSignin: handleSignin
}