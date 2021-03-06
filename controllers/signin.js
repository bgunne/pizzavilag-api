const handleSignin = async (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('deficient_data');
    }
    const data = await db.select('email', 'hash').from('login').where('email', '=', email);
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if (isValid) {
        const user = await db.select('*').from('users').where('email', '=', email);
        return res.json(user[0]);
    }
    else {
        return res.status(400).json('incorrect_data');
    }
}
export default handleSignin;