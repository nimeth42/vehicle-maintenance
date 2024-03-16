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

<<<<<<< HEAD
const grageTagRoute = require("./routes/grageUserTagRoute");// tag route

const notificationRoute = require("./routes/notificationRoute");// notification route

const maintainceRoute = require("./routes/maintainceRoute");// notification route



=======
const grageTagRoute = require('./routes/grageUserTagRoute');
>>>>>>> 3189642a87c2021dd149e0dad24840dd2bc17fec

app.use('/api/v1/user', userRoute);
app.use('/api/v1/otp', otpRoute);
app.use('/api/v1/tag', grageTagRoute);

<<<<<<< HEAD
app.use("/api/v1/user", userRoute);
app.use("/api/v1/otp",otpRoute);
app.use("/api/v1/tag",grageTagRoute);
app.use("/api/v1/notification",notificationRoute);
app.use("/api/v1/maintaince",maintainceRoute);

=======
app.use('/api', expenseRoute); // Integrating the expense route -VehicleEpense-SF

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
>>>>>>> 3189642a87c2021dd149e0dad24840dd2bc17fec

module.exports = app;
