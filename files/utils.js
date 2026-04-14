// ── Utilities ──

// Toast notifications
function toast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-dot"></span>${message}`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// Modal helpers
let currentModalSave = null;

function openModal(title, bodyHTML, onSave) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHTML;
  document.getElementById('modal-overlay').classList.remove('hidden');
  currentModalSave = onSave;
}

function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal-body').innerHTML = '';
  currentModalSave = null;
}

function saveModal() {
  if (currentModalSave) currentModalSave();
}

// Confirm delete modal
function confirmDelete(label, onConfirm) {
  openModal(
    'Confirm delete',
    `<p class="confirm-msg">Are you sure you want to delete <strong>${label}</strong>? This action cannot be undone.</p>`,
    () => { onConfirm(); closeModalDirect(); toast('Deleted successfully', 'success'); }
  );
  document.getElementById('modal-save-btn').textContent = 'Delete';
  document.getElementById('modal-save-btn').style.background = 'var(--red)';
  document.getElementById('modal-save-btn').style.color = '#fff';
  document.getElementById('modal-save-btn').addEventListener('click', () => {
    document.getElementById('modal-save-btn').textContent = 'Save';
    document.getElementById('modal-save-btn').style.background = '';
    document.getElementById('modal-save-btn').style.color = '';
  }, { once: true });
}

// Get form value helper
function fv(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// Format date
function fmtDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Status badge HTML
function statusBadge(status) {
  const map = {
    active: 'green', published: 'green', completed: 'green', replied: 'green',
    pending: 'orange', draft: 'gray', unread: 'blue',
    cancelled: 'red', inactive: 'red',
    read: 'purple', super_admin: 'green', editor: 'blue', customer: 'gray',
  };
  const cls = map[status] || 'gray';
  const label = status.replace('_', ' ');
  return `<span class="badge badge-${cls}">${label}</span>`;
}

// Table search wiring
function wireSearch(inputId, renderFn) {
  const el = document.getElementById(inputId);
  if (el) el.addEventListener('input', () => renderFn(el.value));
}

// Build action buttons for a row
function actionBtns(editFn, deleteFn) {
  return `
    <div class="td-actions">
      <button class="btn-icon edit" onclick="${editFn}" title="Edit">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M4 14l10-10 2 2L6 16H4v-2z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="btn-icon danger" onclick="${deleteFn}" title="Delete">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M5 5l10 10M15 5L5 15" stroke-linecap="round"/>
        </svg>
      </button>
    </div>`;
}

// Escape for HTML attr
function esc(str) {
  return String(str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
