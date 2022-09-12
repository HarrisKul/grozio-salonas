import express from 'express'
import db from '../database/connect.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
       const saloons = await db.Saloons.findAll()
        res.json(saloons)
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida')
    }
})

Router.post('/new', async (req, res) => {
    try {
        await db.Saloons.create(req.body)
        res.send('Salonas sėkmingai sukurtas')
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida issaugant duomenis')
    }
})

Router.put('/edit/:id', async (req, res) => {
    try {
       const saloon = await db.Saloons.findByPk(req.params.id)
        await saloon.update(req.body)
        res.send('Salonas sėkmingai atnaujintas')
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida issaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
      const saloon = await db.Saloons.findByPk(req.params.id)
      await saloon.destroy()

        res.send('Salonas sėkmingai ištrintas')
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida')
    }
})


export default Router