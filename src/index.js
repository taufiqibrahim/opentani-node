import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

// Get request parameter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log to console
app.use(morgan('dev'));

// *** Routes *** //
app.use('/v1', router);

// Demo ROUTE (GET http://localhost:3000/)
app.get('/', function(req, res) {
 res.send('API is running on http://localhost:' + port + '/api')
})

// Start the server
app.listen(port);