import express from 'express';
import { json } from 'body-parser';
import { setUserRoutes } from './routes/userRoutes';
import { setNewsPostRoutes } from './routes/newspostRoutes';
import { connectToDatabase } from './database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

connectToDatabase();

setUserRoutes(app);
setNewsPostRoutes(app);

app.get('/', (req, res) => {
    res.send(`
        <h1>API Endpoints</h1>
        <h2>Users</h2>
        <ul>
            <li>GET /users - get all users</li>
            <li>GET /users/:id - get a user by ID</li>
            <li>POST /users - Create a new user</li>
            <li>PUT /users/:id - Update a user</li>
            <li>DELETE /users/:id - Delete a user</li>
        </ul>
        <h2>News Posts</h2>
        <ul>
            <li>GET /news - get all news posts</li>
            <li>GET /news/:id - get a news post by ID</li>
            <li>POST /news - Create a new news post</li>
            <li>PUT /news/:id - Update a news post</li>
            <li>DELETE /news/:id - Delete a news post</li>
        </ul>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});