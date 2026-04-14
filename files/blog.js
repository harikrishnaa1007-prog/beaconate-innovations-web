// ── Blog CMS ──

function renderBlog(search = '') {
  const rows = dbSearch('blog', search, ['title', 'category', 'author']);
  return `
  <div class="table-card">
    <div class="table-header">
      <span class="table-header-title">Blog Posts <span style="color:var(--text3);font-size:12px;margin-left:6px;">${rows.length} posts</span></span>
      <input class="table-search" placeholder="Search posts…" id="blog-search" value="${esc(search)}" />
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Title</th><th>Author</th><th>Category</th><th>Views</th><th>Status</th><th>Date</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${rows.length ? rows.map(b => `<tr>
            <td style="max-width:260px;font-weight:500;">${b.title}</td>
            <td class="td-muted">${b.author}</td>
            <td><span class="badge badge-purple">${b.category}</span></td>
            <td class="td-mono">${b.views.toLocaleString()}</td>
            <td>${statusBadge(b.status)}</td>
            <td class="td-muted">${fmtDate(b.created)}</td>
            <td>${actionBtns(`editBlog(${b.id})`, `deleteBlog(${b.id},'${esc(b.title)}')}`)}</td>
          </tr>`).join('') : `<tr><td colspan="7"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16M4 8h10M4 12h12M4 16h8" stroke-linecap="round"/></svg><p>No posts found</p></div></td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

function editBlog(id) {
  const b = dbGetAll('blog').find(x => x.id === id);
  if (!b) return;
  openModal('Edit post', blogForm(b), () => {
    dbUpdate('blog', id, {
      title: fv('bl-title'), category: fv('bl-cat'),
      author: fv('bl-author'), status: fv('bl-status'),
    });
    closeModalDirect();
    toast('Post updated');
    refreshPage();
  });
}

function deleteBlog(id, name) {
  confirmDelete(name, () => { dbDelete('blog', id); refreshPage(); });
}

function openAddBlog() {
  openModal('New blog post', blogForm(), () => {
    const title = fv('bl-title');
    if (!title) return toast('Title is required', 'error');
    dbAdd('blog', {
      title, category: fv('bl-cat'), author: fv('bl-author') || 'Admin',
      status: fv('bl-status'), views: 0, created: new Date().toISOString().slice(0,10),
    });
    closeModalDirect();
    toast('Post created');
    refreshPage();
  });
}

function blogForm(b = {}) {
  return `
  <div class="form-group">
    <label>Post Title *</label>
    <input id="bl-title" value="${esc(b.title||'')}" placeholder="Enter post title…" />
  </div>
  <div class="form-grid">
    <div class="form-group">
      <label>Category</label>
      <select id="bl-cat">
        ${['IoT','Electronics','Web','Marketing'].map(c=>`<option ${b.category===c?'selected':''}>${c}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Author</label>
      <input id="bl-author" value="${esc(b.author||'Admin')}" placeholder="Author name" />
    </div>
  </div>
  <div class="form-group">
    <label>Status</label>
    <select id="bl-status">
      <option ${(!b.status||b.status==='draft')?'selected':''}>draft</option>
      <option ${b.status==='published'?'selected':''}>published</option>
    </select>
  </div>
  <div class="form-group">
    <label>Content (Markdown)</label>
    <textarea id="bl-content" style="min-height:120px;" placeholder="Write your post content here…">${esc(b.content||'')}</textarea>
  </div>`;
}
