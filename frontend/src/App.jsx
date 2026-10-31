import { useEffect, useState, useCallback } from 'react';
import { getDevices, createDevice, updateDevice, deleteDevice } from './api';
import DeviceForm from './components/DeviceForm';
import StatusBadge from './components/StatusBadge';
import './App.css';

export default function App() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [view, setView] = useState('list'); // list | form | detail
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setDevices(await getDevices(keyword));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(t);
  }, [message]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(search.trim());
  };

  const handleSave = async (data) => {
    setSaving(true);
    setError('');
    try {
      if (selected && view === 'form') {
        await updateDevice(selected._id, data);
        setMessage('Cập nhật thiết bị thành công');
      } else {
        await createDevice(data);
        setMessage('Thêm thiết bị thành công');
      }
      setView('list');
      setSelected(null);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (d) => {
    if (!window.confirm(`Xóa thiết bị "${d.name}"?`)) return;
    setError('');
    try {
      await deleteDevice(d._id);
      setMessage('Đã xóa thiết bị');
      if (view === 'detail') { setView('list'); setSelected(null); }
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const fmtDate = (v) => (v ? new Date(v).toLocaleDateString('vi-VN') : '—');

  return (
    <div className="container">
      <h1>Quản lý thiết bị phòng học</h1>

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      {view === 'form' && (
        <DeviceForm
          initial={selected}
          saving={saving}
          onSubmit={handleSave}
          onCancel={() => { setView('list'); setSelected(null); setError(''); }}
        />
      )}

      {view === 'detail' && selected && (
        <div className="card">
          <h2>Chi tiết thiết bị</h2>
          <dl className="detail">
            <dt>Mã thiết bị</dt><dd>{selected.deviceId}</dd>
            <dt>Tên thiết bị</dt><dd>{selected.name}</dd>
            <dt>Loại thiết bị</dt><dd>{selected.deviceType}</dd>
            <dt>Phòng học</dt><dd>{selected.room}</dd>
            <dt>Hãng sản xuất</dt><dd>{selected.brand || '—'}</dd>
            <dt>Model</dt><dd>{selected.model || '—'}</dd>
            <dt>Số lượng</dt><dd>{selected.quantity}</dd>
            <dt>Tình trạng</dt><dd><StatusBadge status={selected.status} /></dd>
            <dt>Ngày mua / tiếp nhận</dt><dd>{fmtDate(selected.purchaseDate)}</dd>
            <dt>Mô tả</dt><dd>{selected.description || '—'}</dd>
          </dl>
          <div className="actions">
            <button className="btn primary" onClick={() => setView('form')}>Sửa</button>
            <button className="btn danger" onClick={() => handleDelete(selected)}>Xóa</button>
            <button className="btn" onClick={() => { setView('list'); setSelected(null); }}>Quay lại</button>
          </div>
        </div>
      )}

      {view === 'list' && (
        <>
          <div className="toolbar">
            <form onSubmit={handleSearch} className="search">
              <input
                placeholder="Tìm theo mã, tên, loại thiết bị hoặc phòng..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn primary" type="submit">Tìm kiếm</button>
              {keyword && (
                <button className="btn" type="button"
                  onClick={() => { setSearch(''); setKeyword(''); }}>
                  Xóa lọc
                </button>
              )}
            </form>
            <button className="btn primary" onClick={() => { setSelected(null); setView('form'); }}>
              + Thêm thiết bị
            </button>
          </div>

          <div className="card table-wrap">
            {loading ? (
              <p className="center">Đang tải dữ liệu...</p>
            ) : devices.length === 0 ? (
              <p className="center">Không có thiết bị nào.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Mã</th><th>Tên thiết bị</th><th>Loại</th>
                    <th>Phòng</th><th>Số lượng</th><th>Tình trạng</th><th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((d) => (
                    <tr key={d._id}>
                      <td>{d.deviceId}</td>
                      <td>{d.name}</td>
                      <td>{d.deviceType}</td>
                      <td>{d.room}</td>
                      <td>{d.quantity}</td>
                      <td><StatusBadge status={d.status} /></td>
                      <td className="row-actions">
                        <button className="btn sm" onClick={() => { setSelected(d); setView('detail'); }}>Xem</button>
                        <button className="btn sm" onClick={() => { setSelected(d); setView('form'); }}>Sửa</button>
                        <button className="btn sm danger" onClick={() => handleDelete(d)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}