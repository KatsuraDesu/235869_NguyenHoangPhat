const COLORS = {
  'Đang sử dụng': { bg: '#dcfce7', fg: '#166534' },
  'Hư hỏng': { bg: '#fee2e2', fg: '#991b1b' },
  'Đang sửa chữa': { bg: '#fef9c3', fg: '#854d0e' },
  'Ngừng sử dụng': { bg: '#e5e7eb', fg: '#374151' },
};

export default function StatusBadge({ status }) {
  const c = COLORS[status] || COLORS['Ngừng sử dụng'];
  return (
    <span className="badge" style={{ background: c.bg, color: c.fg }}>
      {status}
    </span>
  );
}