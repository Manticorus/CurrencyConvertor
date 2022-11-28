import express from 'express';
import http from 'http';
import { config } from './config/config';
import Logging from './library/Logging';

const router = express();

router.use((req,res,next) => {
    //Log incomnig
    Logging.info(`Incoming -> Method [${req.method}] - Url:[${req.url}] - IP [${req.socket.remoteAddress}]`);
    //Log status
    res.on('finish', () => {
        Logging.info(`Incoming -> Method [${req.method}] - Url:[${req.url}] - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });

    next();
});

router.use(express.urlencoded({extended: true}));
router.use(express.json());

//API Rules
router.use((req,res,next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
})

//Routes

//Healthcheck
router.get('/ping', (req,res,next) => res.status(200).json({ message : 'pong' }));

//Error handling
router.use((req,res,next) => {
    const error = new Error('not found');
    Logging.error(error);

    return res.status(404).json({ message: error.message})
})


http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on ${config.server.port}`))
