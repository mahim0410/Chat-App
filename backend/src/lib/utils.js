import jwt from 'jsonwebtoken';

const generateToken = async (id, res) => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("Token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        })
        return token

    } catch (error) {
        console.log(error)
    }
}

export default generateToken;



