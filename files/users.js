// ── Users Management ──

function renderUsers(search = '') {
  const rows = dbSearch('users', search, ['name', 'email', 'role']);
  return `
  <div class="table-card">
    <div class="table-header">
      <span class="table-header-title">Users <span style="color:var(--text3);font-size:12px;margin-left:6px;">${rows.length} accounts</span></span>
      <input class="table-search" placeholder="Search users…" id="users-search" value="${esc(search)}" />
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${rows.length ? rows.map(u => `<tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:30px;height:30px;border-radius:50%;background:var(--accent-dim);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0;">${u.name[0].toUpperCase()}</div>
                <span style="font-weight:500;">${u.name}</span>
              </div>
            </td>
            <td class="td-muted">${u.email}</td>
            <td>${statusBadge(u.role)}</td>
            <td>${statusBadge(u.status)}</td>
            <td class="td-muted">${fmtDate(u.joined)}</td>
            <td>${actionBtns(`editUser(${u.id})`, `deleteUser(${u.id},'${esc(u.name)}')}`)}</td>
          </tr>`).join('') : `<tr><td colspan="6"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke-linecap="round"/></svg><p>No users found</p></div></td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

function editUser(id) {
  const u = dbGetAll('users').find(x => x.id === id);
  if (!u) return;
  openModal('Edit user', userForm(u), () => {
    dbUpdate('users', id, {
      name: fv('usr-name'), email: fv('usr-email'),
      role: fv('usr-role'), status: fv('usr-status'),
    });
    closeModalDirect();
    toast('User updated');
    refreshPage();
  });
}

function deleteUser(id, name) {
  if (id === 1) return toast('Cannot delete the main admin account', 'error');
  confirmDelete(name, () => { dbDelete('users', id); refreshPage(); });
}

function openAddUser() {
  openModal('Add user', userForm(), () => {
    const name  = fv('usr-name');
    const email = fv('usr-email');
    if (!name || !email) return toast('Name and email are required', 'error');
    dbAdd('users', {
      name, email, role: fv('usr-role'), status: fv('usr-status'),
      joined: new Date().toISOString().slice(0,10),
    });
    closeModalDirect();
    toast('User added');
    refreshPage();
  });
}

function userForm(u = {}) {
  return `
  <div class="form-grid">
    <div class="form-group">
      <label>Full Name *</label>
      <input id="usr-name" value="${esc(u.name||'')}" placeholder="Full name" />
    </div>
    <div class="form-group">
      <label>Email *</label>
      <input id="usr-email" type="email" value="${esc(u.email||'')}" placeholder="user@email.com" />
    </div>
  </div>
  ${!u.id ? `<div class="form-group">
    <label>Password</label>
    <input id="usr-pass" type="password" placeholder="Set initial password" />
  </div>` : ''}
  <div class="form-grid">
    <div class="form-group">
      <label>Role</label>
      <select id="usr-role">
        <option ${u.role==='customer'?'selected':''}>customer</option>
        <option ${u.role==='editor'?'selected':''}>editor</option>
        <option ${u.role==='super_admin'?'selected':''}>super_admin</option>
      </select>
    </div>
    <div class="form-group">
      <label>Status</label>
      <select id="usr-status">
        <option ${(!u.status||u.status==='active')?'selected':''}>active</option>
        <option ${u.status==='inactive'?'selected':''}>inactive</option>
      </select>
    </div>
  </div>`;
}
