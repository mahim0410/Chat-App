

export const signupController = async (req, res) => {
    try {
        await res.send("Controller created")
    } catch (error) {
        res.status(500).json({ error: "The error is in signup controller" })
        console.log(`Error: ${error}. It is in the sign up controller`)
    }
}