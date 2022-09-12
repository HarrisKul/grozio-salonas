import express from 'express'
import db from '../database/connect.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
       const service = await db.Services.findAll()
        res.json(service)
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida')
    }
})

Router.post('/new', async (req, res) => {
    try {
        await db.Services.create(req.body)
        res.send('Paslauga sėkmingai sukurta')
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida issaugant duomenis')
    }
})

Router.put('/edit/:id', async (req, res) => {
    try {
       const service = await db.Services.findByPk(req.params.id)
        await service.update(req.body)
        res.send('Paslauga sėkmingai atnaujinta')
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida issaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
      const service = await db.Services.findByPk(req.params.id)
      await service.destroy()

        res.send('Paslauga sėkmingai ištrinta')
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida')
    }
})


export default Router