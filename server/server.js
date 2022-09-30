import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import errors from 'express-async-errors';

// Database connection
import connectToDB from './db/connect.js';

// Routers
import authRouter from './routes/auth.routes.js';
import amiiboRouter from './routes/amiibo.routes.js'

//Middleware
import notFoundMiddleware from './middleware/not-found.middleware.js';
import errorHandlerMiddleware from './middleware/error-handler.middleware.js';

const app = express();

app.use(express.json());

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
