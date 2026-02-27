const todayTasks = [
  { id: 1, title: "Pack outbound orders", priority: "High", owner: "Warehouse A" },
  { id: 2, title: "Confirm return requests", priority: "Medium", owner: "Support Team" },
  { id: 3, title: "Update product stock", priority: "Low", owner: "Catalog Team" },
];

export default function StaffDashboard() {
  return (
    <section className="bo-page">
      <header className="bo-page__header">
        <h1>Staff Dashboard</h1>
        <p>Track daily store operations and customer support tasks.</p>
      </header>

      <div className="bo-stats-grid">
        <article className="bo-card">
          <p className="bo-card__label">Pending Orders</p>
          <h2>128</h2>
          <span className="bo-chip bo-chip--warning">+12 since yesterday</span>
        </article>

        <article className="bo-card">
          <p className="bo-card__label">Returns to Process</p>
          <h2>19</h2>
          <span className="bo-chip bo-chip--neutral">5 urgent</span>
        </article>

        <article className="bo-card">
          <p className="bo-card__label">Low Stock SKUs</p>
          <h2>23</h2>
          <span className="bo-chip bo-chip--danger">Restock required</span>
        </article>
      </div>

      <article className="bo-card bo-table-card">
        <div className="bo-table-card__head">
          <h3>Today&apos;s Task Queue</h3>
          <button type="button">View all</button>
        </div>

        <div className="bo-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {todayTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.priority}</td>
                  <td>{task.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
