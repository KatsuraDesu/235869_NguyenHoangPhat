const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/devices';

async function request(url, options) {
  let res;
  try {
    res = await fetch(url, options);
  } catch {
    throw new Error('Không kết nối được tới máy chủ');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data.errors ? ': ' + data.errors.join(', ') : '';
    throw new Error((data.message || 'Có lỗi xảy ra') + detail);
  }
  return data;
}

const json = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const getDevices = (search = '') =>
  request(`${API}?search=${encodeURIComponent(search)}`);
export const getDevice = (id) => request(`${API}/${id}`);
export const createDevice = (data) => request(API, json('POST', data));
export const updateDevice = (id, data) => request(`${API}/${id}`, json('PUT', data));
export const deleteDevice = (id) => request(`${API}/${id}`, { method: 'DELETE' });