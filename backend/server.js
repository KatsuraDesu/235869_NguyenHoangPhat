const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const deviceRoutes = require('./routes/devices');

const app = express();
const origins = process.env.CORS_ORIGIN && process.env.CORS_ORIGIN !== '*'
  ? process.env.CORS_ORIGIN.split(',') : '*';
app.use(cors({ origin: origins }));
app.use(express.json());

app.get('/health', (req, res) => res.json({
  status: 'ok',
  database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  time: new Date().toISOString(),
}));

app.use('/api/devices', deviceRoutes);
app.use((req, res) => res.status(404).json({ message: 'Không tìm thấy endpoint' }));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Đã kết nối MongoDB Atlas');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server chạy cổng ${PORT}`));
  })
  .catch((err) => {
    console.error('Lỗi kết nối MongoDB:', err.message);
    process.exit(1);
  });