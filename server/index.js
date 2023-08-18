const {config} = require('dotenv');
config()

const { testDbConnection } = require('./src/config/database');
const app = require('./src/server');

testDbConnection()

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`port : ${port}\ngo to server - http://localhost:${port}/api`))