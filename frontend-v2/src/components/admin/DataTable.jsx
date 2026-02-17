// components/admin/DataTable.jsx
"use client";

export default function DataTable({ columns, data }) {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} style={styles.th}>
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={styles.row}>
              {columns.map((c) => (
                <td key={c} style={styles.td}>
                  {row[c]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#ffffff",
    border: "1px solid rgba(26,60,52,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "18px 24px",
    fontFamily: "'Lato', sans-serif",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#1a3c34",
    borderBottom: "1px solid rgba(26,60,52,0.08)",
  },

  td: {
    padding: "20px 24px",
    fontFamily: "'Lato', sans-serif",
    fontSize: 15,
    color: "#444",
  },

  row: {
    borderBottom: "1px solid rgba(26,60,52,0.06)",
  },
};
