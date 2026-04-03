import jwt from 'jsonwebtoken';

const generateToken = async (id, res) => {
    try {
        const Token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("Token", Token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        })
        return Token

    } catch (error) {
        console.log(error)
    }
}

export default generateToken;



