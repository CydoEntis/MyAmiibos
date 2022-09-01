import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Routers
import authRouter from "./routes/auth.routes.js";
import notFoundMiddleware from './middleware/not-found.middleware.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome');
});

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});
