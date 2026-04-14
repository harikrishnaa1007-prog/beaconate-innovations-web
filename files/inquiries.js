// ── Inquiries Management ──

function renderInquiries(search = '') {
  const rows = dbSearch('inquiries', search, ['name', 'email', 'service', 'message']);
  return `
  <div class="table-card">
    <div class="table-header">
      <span class="table-header-title">Inquiries <span style="color:var(--text3);font-size:12px;margin-left:6px;">${rows.length} total</span></span>
      <input class="table-search" placeholder="Search inquiries…" id="inquiries-search" value="${esc(search)}" />
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>From</th><th>Service Interest</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${rows.length ? rows.map(i => `<tr style="${i.status==='unread'?'background:rgba(91,156,246,0.04);':''}">
            <td>
              <span style="font-weight:${i.status==='unread'?'600':'400'};">${i.name}</span><br>
              <a href="mailto:${i.email}" style="font-size:11px;color:var(--blue);text-decoration:none;">${i.email}</a>
            </td>
            <td><span class="badge badge-orange">${i.service}</span></td>
            <td style="max-width:220px;">
              <span class="td-muted" style="font-size:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${i.message}</span>
            </td>
            <td>${statusBadge(i.status)}</td>
            <td class="td-muted">${fmtDate(i.date)}</td>
            <td>
              <div class="td-actions">
                <button class="btn-icon edit" onclick="viewInquiry(${i.id})" title="View & Reply">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="7.5"/><path d="M10 7v3l2 2" stroke-linecap="round"/></svg>
                </button>
                <button class="btn-icon danger" onclick="deleteInquiry(${i.id},'${esc(i.name)}')" title="Delete">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l10 10M15 5L5 15" stroke-linecap="round"/></svg>
                </button>
              </div>
            </td>
          </tr>`).join('') : `<tr><td colspan="6"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8l9 6 9-6" stroke-linecap="round"/></svg><p>No inquiries found</p></div></td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

function viewInquiry(id) {
  const i = dbGetAll('inquiries').find(x => x.id === id);
  if (!i) return;
  dbUpdate('inquiries', id, { status: i.status === 'unread' ? 'read' : i.status });
  updateBadgeCounts();
  openModal(`Inquiry from ${i.name}`, `
  <div style="background:var(--bg3);border-radius:var(--radius-sm);padding:14px 16px;margin-bottom:16px;">
    <div style="display:flex;gap:24px;flex-wrap:wrap;margin-bottom:10px;">
      <div><span style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;">From</span><br><span style="font-size:13.5px;font-weight:500;">${i.name}</span></div>
      <div><span style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;">Email</span><br><a href="mailto:${i.email}" style="color:var(--blue);font-size:13.5px;">${i.email}</a></div>
      <div><span style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;">Service</span><br><span style="font-size:13.5px;">${i.service}</span></div>
      <div><span style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;">Date</span><br><span style="font-size:13.5px;">${fmtDate(i.date)}</span></div>
    </div>
    <div style="border-top:1px solid var(--border);padding-top:10px;">
      <span style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px;">Message</span>
      <p style="font-size:13.5px;color:var(--text);line-height:1.65;">${i.message}</p>
    </div>
  </div>
  <div class="form-group">
    <label>Reply (opens in email client)</label>
    <textarea id="inq-reply" placeholder="Type your reply here…" style="min-height:100px;"></textarea>
  </div>`, () => {
    const reply = fv('inq-reply');
    if (reply) {
      window.location.href = `mailto:${i.email}?subject=Re: ${encodeURIComponent(i.service)} Inquiry&body=${encodeURIComponent(reply)}`;
    }
    dbUpdate('inquiries', id, { status: 'replied' });
    closeModalDirect();
    toast('Marked as replied');
    updateBadgeCounts();
    refreshPage();
  });
  document.getElementById('modal-save-btn').textContent = 'Send Reply';
}

function deleteInquiry(id, name) {
  confirmDelete(name, () => { dbDelete('inquiries', id); updateBadgeCounts(); refreshPage(); });
}

function openAddInquiry() {
  toast('Inquiries come from the customer contact form', 'info');
}
