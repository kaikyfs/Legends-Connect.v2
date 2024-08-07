const express = require('express');
const jogadorRoutes = require('./routes/jogadores');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json()); 
app.use('/api', jogadorRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
