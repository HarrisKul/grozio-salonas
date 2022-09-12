import express from 'express'
import cors from 'cors'
import session from 'express-session'
import { Saloons, Services, Workers, Orders} from './controller/index.js'


const app = express()

//CORS blokavimo nuėmimas 
app.use(cors())

//Duomenų priėmimui JSON formatu
app.use(express.json())

app.use('/uploads', express.static('uploads'))

//Duomenų priėmimui POST metodu
app.use(express.urlencoded({extended: true}))

app.set('trust proxy', 1) 

app.use(session({
    secret: 'Labai slapta fraze',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 60000000
    }
    
 }))
app.use('/api/workers', Workers)
app.use('/api/saloons/', Saloons)
app.use('/api/services/', Services)
app.use('/api/orders/', Orders)
//Paleidžiame serverį
app.listen(3000)