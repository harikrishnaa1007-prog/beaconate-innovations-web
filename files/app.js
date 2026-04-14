// ── Beacovate Admin — Main App Controller ──

let currentPage = 'overview';

// ── Auth ──
function doLogin() {
  const email = document.getElementById('login-email').value;
  const pass  = document.getElementById('login-password').value;
  if (!email || !pass) { toast('Please enter credentials', 'error'); return; }
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  navigate(document.querySelector('[data-page="overview"]'), 'overview');
  toast('Welcome to Beacovate Admin', 'success');
}

function doLogout() {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
}

// Allow Enter key on login
document.getElementById('login-password').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});

// ── Routing ──
const pageConfig = {
  overview:   { title: 'Overview',    addLabel: null },
  services:   { title: 'Services',    addLabel: 'Add service' },
  portfolio:  { title: 'Portfolio',   addLabel: 'Add project' },
  blog:       { title: 'Blog Posts',  addLabel: 'New post' },
  orders:     { title: 'Orders',      addLabel: 'Add order' },
  inquiries:  { title: 'Inquiries',   addLabel: null },
  users:      { title: 'Users',       addLabel: 'Add user' },
};

function navigate(btnEl, page) {
  currentPage = page;

  // Update active nav
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  // Update title
  const cfg = pageConfig[page];
  document.getElementById('page-title').textContent = cfg.title;

  // Update add button
  const addBtn   = document.getElementById('add-btn');
  const addLabel = document.getElementById('add-btn-label');
  if (cfg.addLabel) {
    addBtn.style.display = '';
    addLabel.textContent = cfg.addLabel;
  } else {
    addBtn.style.display = 'none';
  }

  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');

  renderCurrentPage();
}

function refreshPage() {
  renderCurrentPage();
}

function renderCurrentPage(search = '') {
  const el = document.getElementById('page-content');
  switch (currentPage) {
    case 'overview':  el.innerHTML = renderOverview(); break;
    case 'services':  el.innerHTML = renderServices(search); wireSearch('services-search', q => renderCurrentPage(q)); break;
    case 'portfolio': el.innerHTML = renderPortfolio(search); wireSearch('portfolio-search', q => renderCurrentPage(q)); break;
    case 'blog':      el.innerHTML = renderBlog(search); wireSearch('blog-search', q => renderCurrentPage(q)); break;
    case 'orders':    el.innerHTML = renderOrders(search); wireSearch('orders-search', q => renderCurrentPage(q)); break;
    case 'inquiries': el.innerHTML = renderInquiries(search); wireSearch('inquiries-search', q => renderCurrentPage(q)); break;
    case 'users':     el.innerHTML = renderUsers(search); wireSearch('users-search', q => renderCurrentPage(q)); break;
  }
}

// ── Add button dispatcher ──
function openAddModal() {
  switch (currentPage) {
    case 'services':  openAddService(); break;
    case 'portfolio': openAddPortfolio(); break;
    case 'blog':      openAddBlog(); break;
    case 'orders':    openAddOrder(); break;
    case 'inquiries': openAddInquiry(); break;
    case 'users':     openAddUser(); break;
  }
}

// ── Sidebar toggle (mobile) ──
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ── Badge counts ──
function updateBadgeCounts() {
  const pendingOrders = dbGetAll('orders').filter(o => o.status === 'pending').length;
  const unreadInq     = dbGetAll('inquiries').filter(i => i.status === 'unread').length;
  const ob = document.getElementById('orders-badge');
  const ib = document.getElementById('inquiries-badge');
  if (ob) { ob.textContent = pendingOrders; ob.style.display = pendingOrders ? '' : 'none'; }
  if (ib) { ib.textContent = unreadInq;     ib.style.display = unreadInq ? '' : 'none'; }
}

// Update badges every 30s (simulating real-time)
setInterval(updateBadgeCounts, 30000);
