export default function Pagination({ page, per, total, onChange }: { page: number; per: number; total: number; onChange: (p: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / per));
  const prev = () => onChange(Math.max(1, page - 1));
  const next = () => onChange(Math.min(pages, page + 1));
  const items = [] as number[];
  for (let i = Math.max(1, page - 2); i <= Math.min(pages, page + 2); i++) items.push(i);
  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={prev}>&laquo;</button>
        </li>
        {items.map((i) => (
          <li key={i} className={`page-item ${i === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onChange(i)}>{i}</button>
          </li>
        ))}
        <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={next}>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
}


