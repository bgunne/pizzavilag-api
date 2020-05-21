const  handleRegister = async(req,res,db, bcrypt) =>
{
    const {email, firstname, lastname, phone, zip, city, address, comment, password} = req.body;

    if(!email || !firstname || !lastname || !phone || !zip || !city || !address || !password)
    {
        
        return res.status(400).json('Töltsd ki a kötelező mezőket!');

    }
    const hash = bcrypt.hashSync(password);

    db.transaction( async function (trx){
        const loginEmail = trx.insert(
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
        
        await res.json(user[0]);
        
        return trx.commit;
    })
}



export default handleRegister;