import express from 'express'
import db from '../database/connect.js'
import upload from '../middleware/multer.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
       const workers = await db.Workers.findAll()
        res.json(workers)
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida')
    }
})

Router.post('/new', upload.single('photo'), async (req, res) => {
    try {
            req.body.photo = '/uploads/' + req.file.filename

        await db.Workers.create(req.body)
        res.send('darbuotojas sėkmingai sukurtas')
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida issaugant duomenis')
    }
})

Router.put('/edit/:id', upload.single('photo'), async (req, res) => {
    try {
        if(req.file)
        req.body.photo = '/uploads/' + req.file.filename

       const worker = await db.Workers.findByPk(req.params.id)
        await worker.update(req.body)
        res.send('darbuotojo duomenys sėkmingai atnaujinti')
    } catch(error) {
        console.log(error)
        res.status(500).send('Ivyko klaida issaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
      const worker = await db.Workers.findByPk(req.params.id)
      await worker.destroy()

        res.send('darbuotojas sėkmingai ištrintas')
    } catch {
        console.log(error)
        res.status(500).send('Ivyko klaida')
    }
})


export default Router