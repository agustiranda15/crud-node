const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);




app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
