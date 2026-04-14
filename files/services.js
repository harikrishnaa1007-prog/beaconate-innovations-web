// ── Services CMS ──

function renderServices(search = '') {
  const rows = dbSearch('services', search, ['title', 'category', 'description']);
  return `
  <div class="table-card">
    <div class="table-header">
      <span class="table-header-title">Services <span style="color:var(--text3);font-size:12px;margin-left:6px;">${rows.length} total</span></span>
      <input class="table-search" placeholder="Search services…" id="services-search" value="${esc(search)}" />
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Title</th><th>Category</th><th>Price</th><th>Status</th><th>Created</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${rows.length ? rows.map(s => `<tr>
            <td><span style="font-weight:500;">${s.title}</span><br><span class="td-muted" style="font-size:12px;">${s.description.slice(0,55)}…</span></td>
            <td><span class="badge badge-purple">${s.category}</span></td>
            <td class="td-mono">${s.price}/mo</td>
            <td>${statusBadge(s.status)}</td>
            <td class="td-muted">${fmtDate(s.created)}</td>
            <td>${actionBtns(`editService(${s.id})`, `deleteService(${s.id},'${esc(s.title)}')}`)}</td>
          </tr>`).join('') : `<tr><td colspan="6"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M12 8v8"/></svg><p>No services found</p></div></td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

function editService(id) {
  const s = dbGetAll('services').find(x => x.id === id);
  if (!s) return;
  openModal('Edit service', serviceForm(s), () => {
    dbUpdate('services', id, {
      title: fv('svc-title'), category: fv('svc-cat'),
      description: fv('svc-desc'), price: fv('svc-price'), status: fv('svc-status'),
    });
    closeModalDirect();
    toast('Service updated');
    refreshPage();
  });
}

function deleteService(id, name) {
  confirmDelete(name, () => { dbDelete('services', id); refreshPage(); });
}

function openAddService() {
  openModal('Add service', serviceForm(), () => {
    const title = fv('svc-title');
    if (!title) return toast('Title is required', 'error');
    dbAdd('services', {
      title, category: fv('svc-cat'), description: fv('svc-desc'),
      price: fv('svc-price'), status: fv('svc-status'), created: new Date().toISOString().slice(0,10),
    });
    closeModalDirect();
    toast('Service added');
    refreshPage();
  });
}

function serviceForm(s = {}) {
  return `
  <div class="form-grid">
    <div class="form-group">
      <label>Title *</label>
      <input id="svc-title" value="${esc(s.title||'')}" placeholder="Service name" />
    </div>
    <div class="form-group">
      <label>Category</label>
      <select id="svc-cat">
        ${['IoT','Electronics','Web','Marketing'].map(c=>`<option ${s.category===c?'selected':''}>${c}</option>`).join('')}
      </select>
    </div>
  </div>
  <div class="form-group">
    <label>Description</label>
    <textarea id="svc-desc">${esc(s.description||'')}</textarea>
  </div>
  <div class="form-grid">
    <div class="form-group">
      <label>Starting Price</label>
      <input id="svc-price" value="${esc(s.price||'')}" placeholder="₹10,000" />
    </div>
    <div class="form-group">
      <label>Status</label>
      <select id="svc-status">
        <option ${s.status==='active'?'selected':''}>active</option>
        <option ${s.status==='draft'?'selected':''}>draft</option>
      </select>
    </div>
  </div>`;
}
