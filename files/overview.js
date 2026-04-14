// ── Overview Page ──

function renderOverview() {
  const services  = dbGetAll('services');
  const orders    = dbGetAll('orders');
  const inquiries = dbGetAll('inquiries');
  const users     = dbGetAll('users');

  const revenue   = orders.filter(o => o.status === 'completed').length * 18500;
  const pending   = orders.filter(o => o.status === 'pending').length;
  const unread    = inquiries.filter(i => i.status === 'unread').length;

  const recentOrders = [...orders].reverse().slice(0, 5);
  const recentInq    = [...inquiries].reverse().slice(0, 4);

  return `
  <div class="stats-grid">
    <div class="stat-card green">
      <div class="stat-label">Total Revenue</div>
      <div class="stat-value">₹${(revenue/1000).toFixed(0)}k</div>
      <div class="stat-change up">+12% this month</div>
    </div>
    <div class="stat-card blue">
      <div class="stat-label">Active Services</div>
      <div class="stat-value">${services.filter(s=>s.status==='active').length}</div>
      <div class="stat-change">of ${services.length} total</div>
    </div>
    <div class="stat-card orange">
      <div class="stat-label">Pending Orders</div>
      <div class="stat-value">${pending}</div>
      <div class="stat-change">Needs attention</div>
    </div>
    <div class="stat-card purple">
      <div class="stat-label">Unread Inquiries</div>
      <div class="stat-value">${unread}</div>
      <div class="stat-change">New messages</div>
    </div>
  </div>

  <div class="three-col">
    <div class="mini-card">
      <div class="mini-card-title">Orders by Status</div>
      ${['pending','active','completed','cancelled'].map(s => {
        const count = orders.filter(o=>o.status===s).length;
        const pct   = Math.round((count/orders.length)*100);
        return `
        <div style="margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="font-size:12px;color:var(--text2);text-transform:capitalize;">${s}</span>
            <span style="font-size:12px;color:var(--text);font-family:var(--font-mono);">${count}</span>
          </div>
          <div style="height:4px;background:var(--bg4);border-radius:4px;">
            <div style="height:4px;width:${pct}%;background:${s==='completed'?'var(--green)':s==='pending'?'var(--orange)':s==='active'?'var(--blue)':'var(--red)'};border-radius:4px;transition:width 0.6s ease;"></div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <div class="mini-card">
      <div class="mini-card-title">Services by Category</div>
      ${['IoT','Electronics','Web','Marketing'].map(cat => {
        const count = services.filter(s=>s.category===cat).length;
        return `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span style="font-size:13px;color:var(--text2);">${cat}</span>
          <span style="font-size:13px;font-family:var(--font-mono);color:var(--text);">${count} service${count!==1?'s':''}</span>
        </div>`;
      }).join('')}
    </div>

    <div class="mini-card">
      <div class="mini-card-title">Platform Summary</div>
      ${[
        ['Blog Posts', dbGetAll('blog').length, 'var(--purple)'],
        ['Portfolio Items', dbGetAll('portfolio').length, 'var(--blue)'],
        ['Total Users', users.length, 'var(--green)'],
        ['Total Orders', orders.length, 'var(--orange)'],
      ].map(([label, count, color]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span style="font-size:13px;color:var(--text2);">${label}</span>
          <span style="font-size:15px;font-family:var(--font-mono);color:${color};font-weight:500;">${count}</span>
        </div>
      `).join('')}
    </div>
  </div>

  <div class="two-col">
    <div class="table-card">
      <div class="table-header">
        <span class="table-header-title">Recent Orders</span>
        <button class="btn-ghost" style="font-size:12px;padding:5px 12px;" onclick="navigate(document.querySelector('[data-page=orders]'),'orders')">View all</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>Customer</th><th>Service</th><th>Amount</th><th>Status</th>
          </tr></thead>
          <tbody>
            ${recentOrders.map(o => `<tr>
              <td>${o.customer}</td>
              <td class="td-muted">${o.service}</td>
              <td class="td-mono">${o.amount}</td>
              <td>${statusBadge(o.status)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="mini-card">
      <div class="mini-card-title">Recent Inquiries</div>
      <div class="activity-list">
        ${recentInq.map(i => `
          <div class="activity-item">
            <div class="activity-dot" style="background:${i.status==='unread'?'var(--blue)':i.status==='replied'?'var(--green)':'var(--text3)'}"></div>
            <div>
              <div class="activity-text">${i.name} — ${i.service}</div>
              <div class="activity-time">${i.message.slice(0,55)}…</div>
              <div class="activity-time">${fmtDate(i.date)} · ${statusBadge(i.status)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}
