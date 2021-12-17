const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');
const {
    BlogsRoutes,
    CommentsRoutes,
    UsersRoutes,
    ReadinglistsRoutes,
} = require('./api-routes');

config();
loaders();
events();

const app = express();

app.use(express.json());
app.use(helmet());

app.listen(process.env.EXPRESS_APP_PORT, () => {
    console.log(`Server is running on port ${process.env.EXPRESS_APP_PORT}...`);
    app.use('/blogs', BlogsRoutes);
    app.use('/comments', CommentsRoutes);
    app.use('/users', UsersRoutes);
    app.use('/readinglists', ReadinglistsRoutes);
});
