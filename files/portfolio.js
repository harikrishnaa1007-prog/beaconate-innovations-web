// ── Portfolio CMS ──

function renderPortfolio(search = '') {
  const rows = dbSearch('portfolio', search, ['title', 'client', 'category', 'tags']);
  return `
  <div class="table-card">
    <div class="table-header">
      <span class="table-header-title">Portfolio <span style="color:var(--text3);font-size:12px;margin-left:6px;">${rows.length} projects</span></span>
      <input class="table-search" placeholder="Search projects…" id="portfolio-search" value="${esc(search)}" />
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Project</th><th>Client</th><th>Category</th><th>Tags</th><th>Year</th><th>Status</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${rows.length ? rows.map(p => `<tr>
            <td style="font-weight:500;">${p.title}</td>
            <td class="td-muted">${p.client}</td>
            <td><span class="badge badge-blue">${p.category}</span></td>
            <td><span class="td-mono" style="font-size:11px;">${p.tags}</span></td>
            <td class="td-muted">${p.year}</td>
            <td>${statusBadge(p.status)}</td>
            <td>${actionBtns(`editPortfolio(${p.id})`, `deletePortfolio(${p.id},'${esc(p.title)}')}`)}</td>
          </tr>`).join('') : `<tr><td colspan="7"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><p>No projects found</p></div></td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

function editPortfolio(id) {
  const p = dbGetAll('portfolio').find(x => x.id === id);
  if (!p) return;
  openModal('Edit project', portfolioForm(p), () => {
    dbUpdate('portfolio', id, {
      title: fv('pf-title'), client: fv('pf-client'), category: fv('pf-cat'),
      tags: fv('pf-tags'), year: fv('pf-year'), status: fv('pf-status'),
    });
    closeModalDirect();
    toast('Project updated');
    refreshPage();
  });
}

function deletePortfolio(id, name) {
  confirmDelete(name, () => { dbDelete('portfolio', id); refreshPage(); });
}

function openAddPortfolio() {
  openModal('Add project', portfolioForm(), () => {
    const title = fv('pf-title');
    if (!title) return toast('Title is required', 'error');
    dbAdd('portfolio', {
      title, client: fv('pf-client'), category: fv('pf-cat'),
      tags: fv('pf-tags'), year: fv('pf-year') || new Date().getFullYear().toString(),
      status: fv('pf-status'),
    });
    closeModalDirect();
    toast('Project added');
    refreshPage();
  });
}

function portfolioForm(p = {}) {
  return `
  <div class="form-grid">
    <div class="form-group">
      <label>Project Title *</label>
      <input id="pf-title" value="${esc(p.title||'')}" placeholder="Project name" />
    </div>
    <div class="form-group">
      <label>Client</label>
      <input id="pf-client" value="${esc(p.client||'')}" placeholder="Client name" />
    </div>
  </div>
  <div class="form-grid">
    <div class="form-group">
      <label>Category</label>
      <select id="pf-cat">
        ${['IoT','Electronics','Web','Marketing'].map(c=>`<option ${p.category===c?'selected':''}>${c}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Year</label>
      <input id="pf-year" value="${esc(p.year||new Date().getFullYear())}" placeholder="2025" />
    </div>
  </div>
  <div class="form-group">
    <label>Tags (comma separated)</label>
    <input id="pf-tags" value="${esc(p.tags||'')}" placeholder="React, Node.js, IoT" />
  </div>
  <div class="form-group">
    <label>Status</label>
    <select id="pf-status">
      <option ${p.status==='published'?'selected':''}>published</option>
      <option ${p.status==='draft'?'selected':''}>draft</option>
    </select>
  </div>`;
}
