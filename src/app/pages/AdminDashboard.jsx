const systemAlerts = [
  { id: 1, title: "Payment timeout rate increased", level: "High", status: "Investigating" },
  { id: 2, title: "New role request: Inventory Manager", level: "Medium", status: "Pending approval" },
  { id: 3, title: "Weekly sales report generated", level: "Low", status: "Completed" },
];

export default function AdminDashboard() {
  return (
    <section className="bo-page">
      <header className="bo-page__header">
        <h1>Admin Dashboard</h1>
        <p>Monitor business health, permissions, and platform operations.</p>
      </header>

      <div className="bo-stats-grid">
        <article className="bo-card">
          <p className="bo-card__label">Total Revenue (MTD)</p>
          <h2>$248,900</h2>
          <span className="bo-chip bo-chip--success">+8.6% MoM</span>
        </article>

        <article className="bo-card">
          <p className="bo-card__label">Active Staff Accounts</p>
          <h2>46</h2>
          <span className="bo-chip bo-chip--neutral">3 pending invites</span>
        </article>

        <article className="bo-card">
          <p className="bo-card__label">Critical Incidents</p>
          <h2>2</h2>
          <span className="bo-chip bo-chip--danger">Requires action</span>
        </article>
      </div>

      <article className="bo-card bo-table-card">
        <div className="bo-table-card__head">
          <h3>System Alerts</h3>
          <button type="button">Open monitor</button>
        </div>

        <div className="bo-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Alert</th>
                <th>Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {systemAlerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.title}</td>
                  <td>{alert.level}</td>
                  <td>{alert.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
