// ── Beacovate Mock Data Store ──
// In production, replace these with API calls to your Express/PostgreSQL backend

const DB = {
  services: [
    { id: 1, title: 'IoT Solutions', category: 'IoT', description: 'Custom IoT systems for smart homes, factories, and agriculture with real-time monitoring dashboards.', price: '₹15,000', status: 'active', created: '2024-11-01' },
    { id: 2, title: 'Electronics Design', category: 'Electronics', description: 'PCB design, embedded systems, prototype development and hardware consulting services.', price: '₹20,000', status: 'active', created: '2024-11-05' },
    { id: 3, title: 'Web Development', category: 'Web', description: 'Full-stack web applications, e-commerce, SaaS platforms and landing pages.', price: '₹25,000', status: 'active', created: '2024-11-10' },
    { id: 4, title: 'Digital Marketing', category: 'Marketing', description: 'SEO, social media management, paid ads, content strategy and performance analytics.', price: '₹10,000', status: 'active', created: '2024-11-15' },
    { id: 5, title: 'Smart Home Setup', category: 'IoT', description: 'End-to-end smart home automation including lighting, security, and energy management.', price: '₹30,000', status: 'draft', created: '2024-12-01' },
    { id: 6, title: 'UI/UX Design', category: 'Web', description: 'User interface and experience design, wireframing, prototyping, and design systems.', price: '₹12,000', status: 'active', created: '2024-12-10' },
  ],

  portfolio: [
    { id: 1, title: 'Smart Farm Monitor', client: 'AgriTech India', category: 'IoT', tags: 'IoT, Agriculture, Sensors', status: 'published', year: '2024' },
    { id: 2, title: 'E-Commerce Platform', client: 'Chennai Retail Co.', category: 'Web', tags: 'React, Node.js, Stripe', status: 'published', year: '2024' },
    { id: 3, title: 'Wearable Health Device', client: 'MedCore Ltd.', category: 'Electronics', tags: 'PCB, Bluetooth, BLE', status: 'published', year: '2024' },
    { id: 4, title: 'Brand Growth Campaign', client: 'StartupX', category: 'Marketing', tags: 'SEO, Google Ads, Meta', status: 'published', year: '2024' },
    { id: 5, title: 'Factory Automation', client: 'IndusManufact.', category: 'IoT', tags: 'PLC, SCADA, IoT', status: 'draft', year: '2025' },
    { id: 6, title: 'SaaS Dashboard', client: 'FinFlow Analytics', category: 'Web', tags: 'React, Postgres, Charts', status: 'published', year: '2025' },
  ],

  blog: [
    { id: 1, title: 'Getting Started with ESP32 for IoT Projects', author: 'Admin', category: 'IoT', status: 'published', views: 1240, created: '2024-12-01' },
    { id: 2, title: 'Why Your Business Needs a Digital Marketing Strategy in 2025', author: 'Admin', category: 'Marketing', status: 'published', views: 892, created: '2024-12-08' },
    { id: 3, title: 'Top 5 PCB Design Mistakes and How to Avoid Them', author: 'Admin', category: 'Electronics', status: 'published', views: 2105, created: '2024-12-15' },
    { id: 4, title: 'Building Scalable Web Apps with Next.js and Prisma', author: 'Admin', category: 'Web', status: 'draft', views: 0, created: '2025-01-02' },
    { id: 5, title: 'Understanding MQTT Protocol for Smart Devices', author: 'Admin', category: 'IoT', status: 'published', views: 560, created: '2025-01-10' },
    { id: 6, title: '2025 SEO Trends Every Business Should Know', author: 'Admin', category: 'Marketing', status: 'draft', views: 0, created: '2025-01-18' },
  ],

  orders: [
    { id: 1001, customer: 'Ramesh Kumar', service: 'IoT Solutions', amount: '₹15,000', status: 'pending', date: '2025-01-14', email: 'ramesh@example.com' },
    { id: 1002, customer: 'Priya Nair', service: 'Web Development', amount: '₹25,000', status: 'active', date: '2025-01-12', email: 'priya@example.com' },
    { id: 1003, customer: 'Arun Selvam', service: 'Electronics Design', amount: '₹20,000', status: 'completed', date: '2025-01-10', email: 'arun@example.com' },
    { id: 1004, customer: 'Meena Iyer', service: 'Digital Marketing', amount: '₹10,000', status: 'pending', date: '2025-01-13', email: 'meena@example.com' },
    { id: 1005, customer: 'Vijay Anand', service: 'Smart Home Setup', amount: '₹30,000', status: 'active', date: '2025-01-11', email: 'vijay@example.com' },
    { id: 1006, customer: 'Lakshmi Devi', service: 'UI/UX Design', amount: '₹12,000', status: 'cancelled', date: '2025-01-09', email: 'lakshmi@example.com' },
    { id: 1007, customer: 'Suresh Babu', service: 'IoT Solutions', amount: '₹15,000', status: 'pending', date: '2025-01-14', email: 'suresh@example.com' },
    { id: 1008, customer: 'Divya Menon', service: 'Web Development', amount: '₹25,000', status: 'completed', date: '2025-01-08', email: 'divya@example.com' },
  ],

  inquiries: [
    { id: 1, name: 'Karan Mehta', email: 'karan@gmail.com', service: 'IoT Solutions', message: 'I need a smart irrigation system for my farm in Coimbatore. Can you provide a quote?', status: 'unread', date: '2025-01-14' },
    { id: 2, name: 'Nisha Patel', email: 'nisha@biz.com', service: 'Web Development', message: 'Looking for an e-commerce website for my clothing store. Budget is around ₹30,000.', status: 'unread', date: '2025-01-13' },
    { id: 3, name: 'Dev Sharma', email: 'dev.sh@corp.in', service: 'Electronics Design', message: 'Need PCB design for a custom sensor module. Can we schedule a call?', status: 'read', date: '2025-01-12' },
    { id: 4, name: 'Ananya Rajan', email: 'ananya@startup.io', service: 'Digital Marketing', message: 'We just launched a SaaS product and need growth marketing help. What packages do you offer?', status: 'replied', date: '2025-01-11' },
    { id: 5, name: 'Ravi Krishnan', email: 'ravi.k@tech.com', service: 'IoT Solutions', message: 'Interested in factory automation project using IoT. Looking for a long-term partner.', status: 'unread', date: '2025-01-14' },
    { id: 6, name: 'Pooja Singh', email: 'pooja@media.co', service: 'UI/UX Design', message: 'Need a redesign of our existing mobile app. Can you share your portfolio?', status: 'unread', date: '2025-01-13' },
    { id: 7, name: 'Arjun Nair', email: 'arjun@nair.in', service: 'Web Development', message: 'Require a property listing portal with payment integration and admin panel.', status: 'read', date: '2025-01-10' },
  ],

  users: [
    { id: 1, name: 'Admin User', email: 'admin@beacovate.com', role: 'super_admin', status: 'active', joined: '2024-11-01' },
    { id: 2, name: 'Priya Editor', email: 'priya@beacovate.com', role: 'editor', status: 'active', joined: '2024-11-15' },
    { id: 3, name: 'Ramesh Kumar', email: 'ramesh@example.com', role: 'customer', status: 'active', joined: '2025-01-05' },
    { id: 4, name: 'Meena Iyer', email: 'meena@example.com', role: 'customer', status: 'active', joined: '2025-01-08' },
    { id: 5, name: 'Vijay Anand', email: 'vijay@example.com', role: 'customer', status: 'active', joined: '2025-01-10' },
    { id: 6, name: 'Guest Account', email: 'guest@beacovate.com', role: 'editor', status: 'inactive', joined: '2024-12-01' },
  ],

  nextId: { services: 7, portfolio: 7, blog: 7, orders: 1009, inquiries: 8, users: 7 },
};

// ── CRUD helpers ──
function dbGetAll(table) { return [...DB[table]]; }

function dbAdd(table, item) {
  const id = DB.nextId[table]++;
  const newItem = { id, ...item };
  DB[table].push(newItem);
  return newItem;
}

function dbUpdate(table, id, updates) {
  const idx = DB[table].findIndex(r => r.id === id);
  if (idx === -1) return null;
  DB[table][idx] = { ...DB[table][idx], ...updates };
  return DB[table][idx];
}

function dbDelete(table, id) {
  const idx = DB[table].findIndex(r => r.id === id);
  if (idx === -1) return false;
  DB[table].splice(idx, 1);
  return true;
}

function dbSearch(table, query, fields) {
  if (!query) return dbGetAll(table);
  const q = query.toLowerCase();
  return DB[table].filter(r => fields.some(f => String(r[f] || '').toLowerCase().includes(q)));
}
