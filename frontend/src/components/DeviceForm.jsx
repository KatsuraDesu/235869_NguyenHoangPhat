import { useState } from 'react';

export const STATUSES = ['Đang sử dụng', 'Hư hỏng', 'Đang sửa chữa', 'Ngừng sử dụng'];

const EMPTY = {
  deviceId: '', name: '', deviceType: '', room: '', brand: '',
  model: '', quantity: 1, status: 'Đang sử dụng', purchaseDate: '', description: '',
};

export default function DeviceForm({ initial, onSubmit, onCancel, saving }) {
  const [f, setF] = useState(() => ({
    ...EMPTY,
    ...(initial || {}),
    purchaseDate: initial?.purchaseDate ? initial.purchaseDate.slice(0, 10) : '',
  }));

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const data = { ...f, quantity: Number(f.quantity) };
    if (!data.purchaseDate) delete data.purchaseDate;
    onSubmit(data);
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h2>{initial ? 'Cập nhật thiết bị' : 'Thêm thiết bị'}</h2>
      <div className="grid">
        <label>Mã thiết bị *
          <input value={f.deviceId} onChange={set('deviceId')} required />
        </label>
        <label>Tên thiết bị *
          <input value={f.name} onChange={set('name')} required />
        </label>
        <label>Loại thiết bị *
          <input value={f.deviceType} onChange={set('deviceType')} required />
        </label>
        <label>Phòng học *
          <input value={f.room} onChange={set('room')} required />
        </label>
        <label>Hãng sản xuất
          <input value={f.brand} onChange={set('brand')} />
        </label>
        <label>Model
          <input value={f.model} onChange={set('model')} />
        </label>
        <label>Số lượng *
          <input type="number" min="0" value={f.quantity} onChange={set('quantity')} required />
        </label>
        <label>Tình trạng
          <select value={f.status} onChange={set('status')}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label>Ngày mua / tiếp nhận
          <input type="date" value={f.purchaseDate} onChange={set('purchaseDate')} />
        </label>
      </div>
      <label>Mô tả, ghi chú
        <textarea rows="3" value={f.description} onChange={set('description')} />
      </label>
      <div className="actions">
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? 'Đang lưu...' : 'Lưu'}
        </button>
        <button type="button" className="btn" onClick={onCancel}>Hủy</button>
      </div>
    </form>
  );
}