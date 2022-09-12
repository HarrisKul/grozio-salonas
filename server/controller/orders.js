import express from 'express'
import db from '../database/connect.js'

const Router = express.Router()

Router.get('/user/', async (req, res) => {
    const user_id = 1

    try {
       const orders = await db.Orders.findAll({
              where: { user_id: user_id }
       })
        res.json(orders)
    } catch(error) {
        console.log(error)
        res.status(500).send('Ivyko klaida')
    }
})

Router.post('/new', async (req, res) => {
    try {
        await db.Orders.create(req.body)
        res.send('Uzsakymas sėkmingai pridetas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Ivyko klaida issaugant duomenis')
    }
})

Router.put('/edit/:id', async (req, res) => {
    try {
        const order = await db.Orders.findByPk(req.params.id)
        await order.update(req.body)
        res.send('Uzsakymas sėkmingai atnaujintas')
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida issaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
        const order = await db.Orders.findByPk(req.params.id)
        await order.destroy()
        
        res.send('Uzsakymas sėkmingai ištrintas')
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida')
    }
})

Router.get('/', async (req, res) => {
    try {
       const orders = await db.Orders.findAll()
        res.json(orders)
    } catch(error) {
        console.log(error)
        res.status(500).send('Ivyko klaida')
    }
})


export default Router