const express = require('express');
const app = express();

const expressIp = require('express-ip');

app.use(expressIp().getIpInfoMiddleware);

app.get('/', (req, res) => {
	  res.send(req.ipInfo);
});

app.listen(3000, () => {
	  console.log('Listening on port 3000');
});

