const express = require('express');
const mongoose = require('mongoose');
const Device = require('../models/Device');
const router = express.Router();

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function handleError(err, res) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Dữ liệu không hợp lệ', errors: Object.values(err.errors).map(e => e.message) });
  }
  if (err.code === 11000) return res.status(409).json({ message: 'Mã thiết bị đã tồn tại' });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Dữ liệu hoặc ID không hợp lệ' });
  console.error(err);
  return res.status(500).json({ message: 'Lỗi máy chủ hoặc kết nối cơ sở dữ liệu' });
}

const checkId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id) ? next() : res.status(400).json({ message: 'ID không hợp lệ' });

// GET /api/devices?search=...
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};
    if (search && search.trim()) {
      const re = new RegExp(escapeRegex(search.trim()), 'i');
      filter = { $or: [{ deviceId: re }, { name: re }, { deviceType: re }, { room: re }] };
    }
    res.json(await Device.find(filter).sort({ createdAt: -1 }));
  } catch (e) { handleError(e, res); }
});

router.get('/:id', checkId, async (req, res) => {
  try {
    const d = await Device.findById(req.params.id);
    if (!d) return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
    res.json(d);
  } catch (e) { handleError(e, res); }
});

router.post('/', async (req, res) => {
  try { res.status(201).json(await Device.create(req.body)); }
  catch (e) { handleError(e, res); }
});

router.put('/:id', checkId, async (req, res) => {
  try {
    const d = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!d) return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
    res.json(d);
  } catch (e) { handleError(e, res); }
});

router.delete('/:id', checkId, async (req, res) => {
  try {
    const d = await Device.findByIdAndDelete(req.params.id);
    if (!d) return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
    res.json({ message: 'Đã xóa thiết bị' });
  } catch (e) { handleError(e, res); }
});

module.exports = router;