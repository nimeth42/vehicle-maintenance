const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoClient = require('./mongo-connection');
mongoClient();
const expenseRoute = require('./routes/expenseRoute'); //vehicleExpense -SF
app.use('/api', expenseRoute); // piechart

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '1mb'})); // file size change (when image upload size must increase)

// CORS middleware
app.use(cors());

const userRoute = require('./routes/user'); //user routing

const otpRoute = require('./routes/otpRoute'); //otp routing

const grageTagRoute = require('./routes/grageUserTagRoute');

app.use('/api/v1/user', userRoute);
app.use('/api/v1/otp', otpRoute);
app.use('/api/v1/tag', grageTagRoute);

app.use('/api', expenseRoute); // Integrating the expense route -VehicleEpense-SF

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
