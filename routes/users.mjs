import express from 'express'
import verifyToken from '../middlewares/verifytoken.mjs'
import Users from '../models/Users.mjs'
const router = express.Router()

router.get('/', async (req, res) => {
   try {
    const users = await Users.find({})
    res.status(200).send({ data: users })
} catch (error) {
       res.status(404).send({ message: 'users not found' })
    
   }
})

router.post('/register', async (req, res) => {
    
    try {
        await Users.create(req.body)

        res.send({ message: 'User registered successfully!'})
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

router.put('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email })
    
        if (!user) {
            res.status(404).send({ message: 'Email not found!' })
            return
        }
    
        const isCorrectPassword = user.comparePassword(password)
    
        if (!isCorrectPassword) {
            res.status(404).send({ message: 'Password is incorrect!' })
            return
        }
    
        const token = user.generateToken()
        user.tokens.push(token)
        await user.save()
    
        res.send({ message: 'User logged in successfully!', token })
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

router.put('/logout', verifyToken, async (req, res) => {
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({ message: 'Logged out successfully!' })
})

export default router