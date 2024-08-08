const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', rewardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
