import express, { Express } from 'express';
import userRoutes from './userRoutes';

const app: Express = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use user routes
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send("Hello world")
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
