// grab our modules
const express = require('express');
const dogRouter = require('./api/router');
// const corsResolver = require('./cors.js');
const cors = require('cors');

// initialize our express application
const app = express();

// hostname and port number
const hostname = '127.0.0.1';
const port = 3500;

// set up our server
app.listen(port, hostname, () => {
	console.log(`Express server is started at http://${hostname}:${port}`);
});

// ************** ROUTES **************
// app.use('/api', corsResolver);
app.use(
	cors({
		origin: 'http://127.0.0.1:5500',
	})
);
app.use(express.json());
app.use('/api', dogRouter);

// ************** SERVER DEFAULT PAGE **************
app.get('/', (req, res) => {
	res.end(`<h1>Our Node.js server is running</h1>`);
});
