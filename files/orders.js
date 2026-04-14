// ── Orders Management ──

function renderOrders(search = '') {
  const rows = dbSearch('orders', search, ['customer', 'service', 'email']);
  return `
  <div class="table-card">
    <div class="table-header">
      <span class="table-header-title">Orders <span style="color:var(--text3);font-size:12px;margin-left:6px;">${rows.length} total</span></span>
      <input class="table-search" placeholder="Search orders…" id="orders-search" value="${esc(search)}" />
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Order #</th><th>Customer</th><th>Service</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${rows.length ? rows.map(o => `<tr>
            <td class="td-mono">#${o.id}</td>
            <td>
              <span style="font-weight:500;">${o.customer}</span><br>
              <span class="td-muted" style="font-size:11px;">${o.email}</span>
            </td>
            <td class="td-muted">${o.service}</td>
            <td class="td-mono" style="color:var(--accent);">${o.amount}</td>
            <td>${statusBadge(o.status)}</td>
            <td class="td-muted">${fmtDate(o.date)}</td>
            <td>
              <div class="td-actions">
                <select style="background:var(--bg3);border:1px solid var(--border);color:var(--text);border-radius:var(--radius-sm);font-family:var(--font);font-size:12px;padding:4px 8px;cursor:pointer;"
                  onchange="updateOrderStatus(${o.id}, this.value)">
                  ${['pending','active','completed','cancelled'].map(s=>`<option ${o.status===s?'selected':''}>${s}</option>`).join('')}
                </select>
                <button class="btn-icon danger" onclick="deleteOrder(${o.id},'#${o.id}')" title="Delete">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l10 10M15 5L5 15" stroke-linecap="round"/></svg>
                </button>
              </div>
            </td>
          </tr>`).join('') : `<tr><td colspan="7"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke-linecap="round" stroke-linejoin="round"/></svg><p>No orders found</p></div></td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

function updateOrderStatus(id, status) {
  dbUpdate('orders', id, { status });
  updateBadgeCounts();
  toast(`Order status updated to ${status}`);
  refreshPage();
}

function deleteOrder(id, label) {
  confirmDelete(label, () => { dbDelete('orders', id); updateBadgeCounts(); refreshPage(); });
}

function openAddOrder() {
  const services = dbGetAll('services').filter(s=>s.status==='active');
  openModal('Add order', `
  <div class="form-grid">
    <div class="form-group">
      <label>Customer Name *</label>
      <input id="ord-name" placeholder="Full name" />
    </div>
    <div class="form-group">
      <label>Email</label>
      <input id="ord-email" type="email" placeholder="customer@email.com" />
    </div>
  </div>
  <div class="form-grid">
    <div class="form-group">
      <label>Service</label>
      <select id="ord-service">
        ${services.map(s=>`<option>${s.title}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Amount</label>
      <input id="ord-amount" placeholder="₹15,000" />
    </div>
  </div>
  <div class="form-group">
    <label>Status</label>
    <select id="ord-status">
      <option>pending</option><option>active</option><option>completed</option>
    </select>
  </div>`, () => {
    const name = fv('ord-name');
    if (!name) return toast('Customer name is required', 'error');
    dbAdd('orders', {
      customer: name, email: fv('ord-email'), service: fv('ord-service'),
      amount: fv('ord-amount'), status: fv('ord-status'),
      date: new Date().toISOString().slice(0,10),
    });
    closeModalDirect();
    updateBadgeCounts();
    toast('Order added');
    refreshPage();
  });
}
