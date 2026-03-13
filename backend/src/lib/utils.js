import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const generateToken = async (id, res) => {
    try {
        console.log(id);
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("Token", token, {
            expiresIn: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        })

        return res.user = token

    } catch (error) {
        console.log(error)
    }


}

export default generateToken;
