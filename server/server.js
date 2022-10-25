import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import errors from 'express-async-errors';
import cors from "cors";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Database connection
import connectToDB from './db/connect.js';

// Routers
import authRouter from './routes/auth.routes.js';
import amiiboRouter from './routes/amiibo.routes.js'

//Middleware
import notFoundMiddleware from './middleware/not-found.middleware.js';
import errorHandlerMiddleware from './middleware/error-handler.middleware.js';


const app = express();

app.use(cors());
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/amiibos', amiiboRouter);





app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectToDB(process.env.MONGO_URL);
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
