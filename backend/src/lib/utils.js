import jwt from 'jsonwebtoken';

const generateToken = (id, res) => {
    const Token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("Token", Token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
    })

    return Token
}

export default generateToken;