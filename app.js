const legacy = 'https://api.deca.co.id/snap-docs';
const docsUrl = (path) => `${legacy}${path}`;

const endpointGroups = {
  qris: {
    title: 'QRIS', flow: 'Cash In', protocol: 'SNAP',
    intro: 'Endpoint DECA untuk membuat dan mengelola transaksi QRIS.',
    items: [
      ['Dynamic QR Generate', 'POST', '/apiReference/post-v-1-0-qr-qr-mpm-generate', 'Service code 47'],
      ['Check Transaction Status / Inquiry', 'POST', '/apiReference/post-v-1-0-qr-qr-mpm-query', 'Service code 51'],
      ['Refund Transaction', 'POST', '/apiReference/post-v-1-0-qr-qr-mpm-refund', 'Service code 78'],
      ['Cancel Payment', 'POST', '/apiReference/post-v-1-0-qr-qr-mpm-cancel', 'Service code 53'],
      ['QRIS Decode', 'POST', '/apiReference/post-v-1-qr-qr-mpm-decode', 'Service code 48'],
      ['Callback / Notify Payment Status', 'EVENT', '/apiReference/post-webhook-qr-qr-mpm-notify', 'Service code 52']
    ]
  },
  va: {
    title: 'Virtual Account', flow: 'Cash In', protocol: 'SNAP',
    intro: 'Endpoint DECA untuk membuat, memeriksa, dan menghapus Virtual Account.',
    items: [
      ['Create Virtual Account', 'POST', '/apiReference/post-v-1-0-transfer-va-create-va', 'Service code 27'],
      ['VA Check Status', 'POST', '/apiReference/post-v-1-0-transfer-va-status', 'Service code 26'],
      ['Delete Virtual Account', 'DELETE', '/apiReference/delete-v-1-0-transfer-va-delete-va', 'Service code 31'],
      ['Callback / Notify VA Payment', 'EVENT', '/apiReference/post-webhook-transfer-va-payment', 'Service code 25']
    ]
  },
  bankTransfer: {
    title: 'Bank Transfer', flow: 'Cash Out', protocol: 'SNAP',
    intro: 'Endpoint pencairan dana ke rekening bank penerima.',
    items: [
      ['Transfer to Bank Inquiry', 'POST', '/apiReference/post-v-1-0-emoney-bank-account-inquiry', 'Service code 42'],
      ['Transfer to Bank Transaction', 'POST', '/apiReference/post-v-1-0-emoney-transfer-bank', 'Service code 43'],
      ['Callback / Notify Transfer to Bank Status', 'EVENT', '/apiReference/post-webhook-emoney-transfer-bank-notify', 'Service code 43']
    ]
  },
  ewallet: {
    title: 'E-money Top Up', flow: 'Cash Out', protocol: 'SNAP',
    intro: 'Endpoint untuk memeriksa akun tujuan dan memproses top up ke akun e-money.',
    items: [
      ['Account Inquiry', 'POST', '/apiReference/post-v-1-0-emoney-account-inquiry', 'Service code 37'],
      ['Customer Top Up', 'POST', '/apiReference/post-v-1-0-emoney-customer-top-up', 'Service code 38'],
      ['Customer Top Up Inquiry Status', 'POST', '/apiReference/post-v-1-0-emoney-customer-top-up-inquiry-status', 'Service code 39']
    ]
  },
  bulkCashIn: {
    title: 'Bulk Cash In', flow: 'Cash Out', protocol: 'SNAP',
    intro: 'Endpoint pengiriman dana batch ke akun penerima. Nama endpoint mengikuti spesifikasi DECA; path API berada di kelompok /snap/out/.',
    items: [
      ['Submit Bulk Cash In', 'POST', '/apiReference/post-v-1-0-emoney-bulk-cashin-payment', 'Service code 40'],
      ['Callback / Notify Bulk Cash In Status', 'EVENT', '/apiReference/post-webhook-emoney-bulk-cashin-notify', 'Service code 40']
    ]
  },
  account: {
    title: 'Account & Reports', flow: 'Account & Reports', protocol: 'SNAP',
    intro: 'Endpoint untuk melihat saldo dan mengambil rekening koran. Bagian ini terpisah dari alur Cash In dan Cash Out.',
    items: [
      ['Balance Inquiry', 'POST', '/apiReference/post-v-1-0-balance-inquiry', 'Service code 11'],
      ['Bank Statement', 'POST', '/apiReference/post-v-1-0-bank-statement', 'Service code 14']
    ]
  },
  auth: {
    title: 'Authentication', flow: 'Authentication', protocol: 'SNAP',
    intro: 'Endpoint B2B Access Token untuk autentikasi request SNAP.',
    items: [['POST B2B Access Token', 'POST', '/apiReference/post-v-1-0-access-token-b-2-b', 'SNAP authentication']]
  }
};

const docsPages = {
  home: { title: 'Docs DECA', subtitle: 'Panduan integrasi layanan DECA, dari persiapan akses sampai transaksi berjalan.',
    body: `<p>Dokumentasi ini memisahkan panduan alur bisnis dari spesifikasi endpoint. Gunakan Docs untuk memahami integrasi, lalu buka API Reference saat membutuhkan field request, response, dan path endpoint.</p>
      <div class="content-section"><div class="section-label">CASH IN</div><h2>Terima pembayaran</h2><p>Alur pembayaran masuk yang tercakup dalam spesifikasi DECA saat ini.</p><div class="link-list">${row('QRIS','Generate, inquiry, refund/cancel, dan callback QRIS.','docs/cash-in')} ${row('Virtual Account','Buat VA, cek status, hapus, dan terima notifikasi pembayaran.','docs/cash-in')} ${row('External Checkout','Referensi Non-SNAP untuk membuat order checkout dan memeriksa pembayaran.','reference/externalCheckout','Non-SNAP')}</div></div>
      <div class="content-section"><div class="section-label">CASH OUT</div><h2>Kirim dana ke penerima</h2><p>Kelompokkan transfer bank, e-money top up, dan pengiriman dana batch dalam satu alur keluar.</p><div class="link-list">${row('Bank Transfer','Inquiry rekening tujuan, transfer, dan notifikasi status.','docs/cash-out')} ${row('E-money Top Up','Inquiry akun tujuan, top up, dan cek status.','docs/cash-out')} ${row('Bulk Cash In','Pengiriman batch yang berada di path SNAP /out/ pada spesifikasi DECA.','docs/cash-out')}</div></div>
      <div class="content-section"><div class="section-label">OPERASIONAL</div><h2>Account & Reports</h2><p>Balance Inquiry dan Bank Statement tersedia sebagai referensi akun dan laporan, bukan sebagai alur pencairan.</p>${linkRow('Buka panduan Account & Reports','docs/account')}</div>
      <div class="content-section"><div class="section-label">DOKUMENTASI BERTAHAP</div><h2>Topik lain</h2><p>Materi yang belum tersedia di dokumentasi DECA saat ini akan ditambahkan bertahap.</p>${comingSoonRow('Payment Link','Belum ada panduan DECA yang dipublikasikan.')} ${comingSoonRow('Sub-account & marketplace','Belum ada panduan DECA yang dipublikasikan.')} ${comingSoonRow('SDK, plugin & reconciliation guide','Belum ada panduan DECA yang dipublikasikan.')}</div>
      <div class="inline-actions"><a class="button primary" href="#reference/home" data-route="reference/home">Buka API Reference <span>→</span></a><a class="text-link" href="#docs/getting-started" data-route="docs/getting-started">Mulai integrasi</a></div>`
  },
  'getting-started': { title: 'Mulai integrasi', subtitle: 'Persiapan umum sebelum memanggil API DECA.', body: `<ol class="plain-steps"><li><strong>Aktifkan akses merchant.</strong> Hubungi tim DECA untuk proses aktivasi dan kredensial environment.</li><li><strong>Siapkan autentikasi SNAP.</strong> Ikuti panduan signature dan token pada spesifikasi DECA.</li><li><strong>Pilih alur transaksi.</strong> Mulai dari Cash In, Cash Out, atau Account & Reports sesuai kebutuhan.</li><li><strong>Uji callback dan status.</strong> Cocokkan notifikasi dengan endpoint inquiry yang tersedia.</li></ol><div class="callout"><strong>Detail teknis ada di API Reference</strong><p>Request dan response tetap merujuk ke dokumen endpoint DECA yang aktif.</p><a class="text-link" href="#reference/auth" data-route="reference/auth">Lihat authentication reference ↗</a></div>` },
  'cash-in': { title: 'Cash In', subtitle: 'Panduan untuk menerima pembayaran pelanggan.', body: `<p>Dokumentasi DECA saat ini mencakup alur QRIS, Virtual Account, dan External Checkout Non-SNAP. Setiap endpoint tetap berada pada referensi protokol asalnya.</p><div class="content-section"><h2>QRIS</h2><p>Buat Dynamic QR, periksa status atau inquiry transaksi, lalu tangani callback. Endpoint refund, cancel, dan decode tersedia di referensi QRIS.</p>${linkRow('Lihat endpoint QRIS','reference/qris')}</div><div class="content-section"><h2>Virtual Account</h2><p>Buat VA, periksa statusnya, kelola penghapusan VA, dan siapkan penerimaan callback pembayaran.</p>${linkRow('Lihat endpoint Virtual Account','reference/va')}</div><div class="content-section"><h2>External Checkout · Non-SNAP</h2><p>Buat checkout order untuk memperoleh URL halaman pembayaran, lalu gunakan endpoint fetch dan webhook untuk mengikuti status pembayaran.</p>${linkRow('Lihat API Reference External Checkout','reference/externalCheckout')}</div>` },
  'cash-out': { title: 'Cash Out', subtitle: 'Panduan untuk mengirim dana dari bisnis ke rekening atau akun penerima.', body: `<p>Spesifikasi DECA menempatkan layanan ini di path SNAP <code>/out/</code>. Kelompokkan alur berdasarkan tujuan dana agar operasi Cash Out mudah dicari.</p><div class="content-section"><h2>Transfer bank</h2><p>Lakukan inquiry rekening tujuan sebelum mengirim transaksi, lalu pantau hasil transfer melalui status dan callback.</p>${linkRow('Lihat endpoint Bank Transfer','reference/bankTransfer')}</div><div class="content-section"><h2>E-money Top Up</h2><p>Periksa akun penerima, lakukan Customer Top Up, dan gunakan inquiry status untuk mendapatkan pembaruan transaksi.</p>${linkRow('Lihat endpoint E-money Top Up','reference/ewallet')}</div><div class="content-section"><h2>Bulk Cash In</h2><p>Walau nama endpoint menyebut Cash In, rute spesifikasi adalah <code>/snap/out/v1.0/emoney/bulk-cashin-payment</code> dan fiturnya berada di kategori Disbursement. Karena itu halaman ini menjelaskannya sebagai Cash Out batch, sambil mempertahankan nama API resmi.</p>${linkRow('Lihat endpoint Bulk Cash In','reference/bulkCashIn')}</div>` },
  account: { title: 'Account & Reports', subtitle: 'Referensi saldo dan laporan rekening merchant.', body: `<p>Balance Inquiry dan Bank Statement membantu membaca informasi akun. Keduanya berdiri sendiri dari alur dana masuk dan pencairan.</p>${linkRow('Lihat endpoint Balance & Bank Statement','reference/account')}` },
  'authentication-guide': { title: 'Authentication & security', subtitle: 'Konsep keamanan yang digunakan sebelum request SNAP.', body: `<p>API SNAP menggunakan B2B Access Token dan signature. Ikuti aturan key, canonical string, timestamp, dan header sesuai spesifikasi DECA; jangan menaruh private key di browser atau repo publik.</p><p>Langkah pembuatan signature dan format request lengkap tersedia di API Reference.</p>${linkRow('Buka Authentication Reference','reference/auth')} ${linkRow('Lihat request headers','reference/headers')}` },
  environments: { title: 'Environment', subtitle: 'Gunakan base URL sesuai environment dan kredensial merchant.', body: `<div class="table-wrap"><table class="param-table"><thead><tr><th>Environment</th><th>Base URL</th><th>Penggunaan</th></tr></thead><tbody><tr><td>Staging</td><td><code>https://api.dev.deca.co.id</code></td><td>Pengembangan dan pengujian</td></tr><tr><td>Production</td><td><code>https://api.deca.co.id</code></td><td>Transaksi production setelah aktivasi</td></tr></tbody></table></div><div class="callout"><strong>Kredensial berbeda tiap environment</strong><p>Pastikan akses dan kredensial telah dikonfirmasi tim DECA sebelum berpindah ke production.</p></div>` },
  webhooks: { title: 'Webhooks & status transaksi', subtitle: 'Terima notifikasi server-to-server dan periksa status transaksi.', body: `<p>Endpoint callback berada di grup produk masing-masing. Gunakan callback Cash In untuk pembayaran QRIS/VA, dan callback Cash Out untuk transfer bank atau bulk cash-in.</p><div class="content-section"><h2>Cash In</h2>${linkRow('Callback QRIS','reference/qris')} ${linkRow('Callback Virtual Account','reference/va')}</div><div class="content-section"><h2>Cash Out</h2>${linkRow('Callback transfer bank','reference/bankTransfer')} ${linkRow('Callback bulk cash-in','reference/bulkCashIn')}</div><div class="callout"><strong>Kontrak callback</strong><p>Validasi payload dan acknowledgment berdasarkan spesifikasi endpoint DECA yang aktif.</p></div>` },
  testing: { title: 'Testing & go-live', subtitle: 'Uji endpoint dan callback sebelum mengaktifkan production.', body: `<ol class="plain-steps"><li>Konfirmasi base URL serta kredensial staging.</li><li>Uji transaksi sukses dan penolakan untuk produk yang digunakan.</li><li>Pastikan callback diterima dan status dapat dicocokkan dengan inquiry.</li><li>Koordinasikan pengaktifan production dengan tim DECA.</li></ol><div class="callout"><strong>Environment production perlu aktivasi</strong><p>Gunakan kredensial dan base URL production setelah proses aktivasi merchant dikonfirmasi.</p></div>` }
};

const referencePages = {
  home: { title: 'API Reference', subtitle: 'Spesifikasi endpoint DECA, dipisahkan menurut alur produk dan protokol.', body: `<p>Pilih alur untuk melihat endpoint yang tersedia. Detail field, contoh request/response, dan kode layanan dibuka pada spesifikasi DECA yang aktif.</p><div class="content-section"><div class="section-label">CASH IN</div><h2>Terima pembayaran</h2><div class="link-list">${row('QRIS','6 endpoint','reference/qris','SNAP')} ${row('Virtual Account','4 endpoint','reference/va','SNAP')} ${row('External Checkout','Create order, fetch, payment status, dan webhook','reference/externalCheckout','Non-SNAP')}</div></div><div class="content-section"><div class="section-label">CASH OUT</div><h2>Kirim dana</h2><div class="link-list">${row('Bank Transfer','Inquiry, transfer, callback','reference/bankTransfer','SNAP')} ${row('E-money Top Up','Account inquiry, top up, status','reference/ewallet','SNAP')} ${row('Bulk Cash In','Batch transfer + callback · path /out/','reference/bulkCashIn','SNAP')}</div></div><div class="content-section"><div class="section-label">OPERASIONAL</div><h2>Account & Reports</h2><div class="link-list">${row('Balance & Bank Statement','2 endpoint','reference/account','SNAP')} ${row('Authentication & Headers','B2B Access Token, signatures, dan request headers','reference/auth','SNAP')}</div></div><div class="content-section"><div class="section-label">DOKUMENTASI BERTAHAP</div><h2>API yang belum dipublikasikan</h2><p>Topik dari struktur dokumentasi yang belum punya spesifikasi DECA ditampilkan sebagai Coming soon.</p>${comingSoonRow('Payment Link API','Belum ada spesifikasi DECA yang dipublikasikan.')} ${comingSoonRow('Sub-account & marketplace API','Belum ada spesifikasi DECA yang dipublikasikan.')}</div>` },
  qris: { title: endpointGroups.qris.title, subtitle: endpointGroups.qris.intro, group: 'qris' },
  va: { title: endpointGroups.va.title, subtitle: endpointGroups.va.intro, group: 'va' },
  bankTransfer: { title: endpointGroups.bankTransfer.title, subtitle: endpointGroups.bankTransfer.intro, group: 'bankTransfer' },
  ewallet: { title: endpointGroups.ewallet.title, subtitle: endpointGroups.ewallet.intro, group: 'ewallet' },
  bulkCashIn: { title: endpointGroups.bulkCashIn.title, subtitle: endpointGroups.bulkCashIn.intro, group: 'bulkCashIn' },
  account: { title: endpointGroups.account.title, subtitle: endpointGroups.account.intro, group: 'account' },
  auth: { title: 'Authentication', subtitle: 'Autentikasi SNAP dan endpoint untuk memperoleh B2B Access Token.', body: `<p>Gunakan spesifikasi DECA sebagai sumber kebenaran untuk algoritma signature, format canonical string, key, masa berlaku, serta header yang diwajibkan.</p>${endpointList(endpointGroups.auth.items)}<div class="content-section"><h2>Referensi terkait</h2>${linkRow('Request headers SNAP','reference/headers')} ${linkRow('Panduan authentication','docs/authentication-guide')}</div>` },
  headers: { title: 'Request Headers', subtitle: 'Header SNAP yang digunakan pada transaksi DECA.', body: `<p>Persyaratan header dapat berbeda menurut jenis request. Cocokkan daftar berikut dengan endpoint DECA yang dituju.</p><div class="table-wrap"><table class="param-table"><thead><tr><th>Header</th><th>Penggunaan</th></tr></thead><tbody><tr><td>Content-Type</td><td>Media type request.</td></tr><tr><td>Authorization</td><td>B2B access token dengan prefix Bearer.</td></tr><tr><td>X-PARTNER-ID</td><td>Identitas partner yang diberikan DECA.</td></tr><tr><td>X-TIMESTAMP</td><td>Timestamp ISO 8601 sesuai timezone yang ditentukan spesifikasi.</td></tr><tr><td>X-SIGNATURE</td><td>Signature sesuai skema SNAP.</td></tr><tr><td>X-EXTERNAL-ID</td><td>Referensi unik dari sisi partner.</td></tr><tr><td>CHANNEL-ID</td><td>Identitas channel.</td></tr></tbody></table></div><a class="external-row" href="${docsUrl('/apiDocumentation/apiRequestHeaders')}" target="_blank" rel="noreferrer">Buka spesifikasi headers DECA ↗</a>` },
  externalCheckout: { title: 'External Checkout', subtitle: 'Referensi checkout pembayaran DECA menggunakan protokol Non-SNAP.', body: `<p>Spesifikasi Non-SNAP menyediakan pembuatan checkout order, pengambilan order dan payment, serta webhook status pembayaran.</p><div class="link-list">${externalRow('Create Checkout Order','POST','/nonSnapReference/generated/post-ec-v-1-copg-order','Membuat order dan memperoleh URL halaman checkout.')} ${externalRow('Get Checkout Order','GET','/nonSnapReference/generated/get-ec-v-1-copg-order-reference','Mengambil informasi checkout order.')} ${externalRow('Get Payment By ID','GET','/nonSnapReference/generated/get-ec-v-1-payment-id','Mengambil informasi pembayaran berdasarkan ID.')} ${externalRow('Get Payment By Reference ID','GET','/nonSnapReference/generated/get-ec-v-1-payment-reference-id','Mengambil informasi pembayaran berdasarkan reference.')} ${externalRow('Payment Status Changed Webhook','POST','/nonSnapReference/generated/post-webhook-ec-payment-status','Notifikasi perubahan status pembayaran.')} ${externalRow('External Checkout Payment Webhook','POST','/nonSnapReference/generated/post-webhook-ec-payment','Notifikasi pembayaran External Checkout.')}</div><div class="callout"><strong>Protokol terpisah</strong><p>Authentication dan signature Non-SNAP mengikuti spesifikasi tersendiri.</p><a class="external-row" href="${docsUrl('/apiDocumentation/nonSnapReference')}" target="_blank" rel="noreferrer">Buka Authentication & Signature Non-SNAP ↗</a></div>` }
};

const docNav = [
  ['MULAI DI SINI', [['home','Selamat datang'],['getting-started','Mulai integrasi'],['environments','Environment']]],
  ['CASH IN', [['cash-in','Terima pembayaran']]],
  ['CASH OUT', [['cash-out','Kirim dana']]],
  ['ACCOUNT & REPORTS', [['account','Saldo & rekening koran']]],
  ['PANDUAN TEKNIS', [['authentication-guide','Authentication & security'],['webhooks','Webhooks & status'],['testing','Testing & go-live']]]
];
const referenceNav = [
  ['API REFERENCE', [['home','Ringkasan API']]],
  ['CASH IN', [['qris','QRIS'],['va','Virtual Account'],['externalCheckout','External Checkout · Non-SNAP']]],
  ['CASH OUT', [['bankTransfer','Bank Transfer'],['ewallet','E-money Top Up'],['bulkCashIn','Bulk Cash In']]],
  ['ACCOUNT & REPORTS', [['account','Balance & Bank Statement']]],
  ['AUTHENTICATION', [['auth','B2B Access Token'],['headers','Request headers']]]
];

function routeHref(route) { return `#${route}`; }
function row(title, description, route, badge = '') {
  return `<a class="nav-row" href="${routeHref(route)}" data-route="${route}"><span class="nav-row-copy"><strong>${title}</strong><small>${description}</small></span>${badge ? `<span class="protocol-label">${badge}</span>` : ''}<span class="row-arrow">↗</span></a>`;
}
function comingSoonRow(title, description) {
  return `<div class="nav-row unavailable"><span class="nav-row-copy"><strong>${title}</strong><small>${description}</small></span><span class="coming-soon">Coming soon</span></div>`;
}
function linkRow(label, route) { return `<a class="text-link row-link" href="${routeHref(route)}" data-route="${route}">${label} <span>→</span></a>`; }
function endpointList(items) {
  return `<div class="endpoint-list">${items.map(([title, method, path, note]) => `<a class="endpoint-row" href="${docsUrl(path)}" target="_blank" rel="noreferrer"><span class="method ${method.toLowerCase()}">${method}</span><span class="endpoint-copy"><strong>${title}</strong><small>${note}</small></span><span class="row-arrow">↗</span></a>`).join('')}</div>`;
}
function externalRow(title, method, path, note) {
  return `<a class="endpoint-row" href="${docsUrl(path)}" target="_blank" rel="noreferrer"><span class="method ${method.toLowerCase()}">${method}</span><span class="endpoint-copy"><strong>${title}</strong><small>${note}</small></span><span class="row-arrow">↗</span></a>`;
}
function renderNav(mode, page) {
  const groups = mode === 'docs' ? docNav : referenceNav;
  document.getElementById('sideNav').innerHTML = groups.map(([heading, links]) => `<section class="nav-group"><h2 class="nav-heading">${heading}</h2>${links.map(([id, label]) => `<a class="nav-link ${page === id ? 'active' : ''}" href="${routeHref(`${mode}/${id}`)}" data-route="${mode}/${id}">${label}</a>`).join('')}</section>`).join('');
  document.getElementById('docsTab').classList.toggle('selected', mode === 'docs');
  document.getElementById('referenceTab').classList.toggle('selected', mode === 'reference');
}
function renderRail(mode) {
  const rail = document.getElementById('rightRail');
  rail.innerHTML = `<div class="rail-title">DECA DEVELOPER</div><a href="#docs/home" data-route="docs/home">Docs</a><a href="#reference/home" data-route="reference/home">API Reference</a><div class="rail-card"><strong>Butuh akses API?</strong><p>Hubungi tim DECA untuk aktivasi merchant dan environment.</p><a href="mailto:partnership@deca.co.id">partnership@deca.co.id ↗</a></div><div class="rail-note">${mode === 'reference' ? 'Spesifikasi endpoint mengarah ke dokumentasi resmi DECA.' : 'Panduan disusun mengikuti alur produk DECA.'}</div>`;
}
function routeFromHash() {
  const raw = location.hash.slice(1);
  if (raw.includes('/')) {
    const [mode, page] = raw.split('/');
    if ((mode === 'docs' && docsPages[page]) || (mode === 'reference' && referencePages[page])) return { mode, page };
  }
  const backward = { home:['docs','home'], overview:['docs','getting-started'], environments:['docs','environments'], auth:['reference','auth'], headers:['reference','headers'], qris:['reference','qris'], va:['reference','va'], balance:['reference','account'], disbursement:['reference','bankTransfer'], webhooks:['docs','webhooks'], testing:['docs','testing'], nonsnap:['reference','externalCheckout'] };
  return backward[raw] ? { mode: backward[raw][0], page: backward[raw][1] } : { mode: 'docs', page: 'home' };
}
function navigate(route) {
  const [mode, page] = route.split('/');
  const pages = mode === 'reference' ? referencePages : docsPages;
  if (!pages[page]) return;
  if (location.hash !== `#${route}`) history.pushState(null, '', `#${route}`);
  render(mode, page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('sidebar').classList.remove('open');
}
function render(mode, page) {
  const pages = mode === 'reference' ? referencePages : docsPages;
  const item = pages[page] || pages.home;
  renderNav(mode, page);
  renderRail(mode);
  document.title = `${item.title} — DECA ${mode === 'reference' ? 'API Reference' : 'Docs'}`;
  const eyebrow = mode === 'reference' ? 'API REFERENCE' : 'DECA DEVELOPER DOCS';
  let content;
  if (item.group) {
    const group = endpointGroups[item.group];
    content = `${endpointList(group.items)}<div class="callout"><strong>Kontrak endpoint</strong><p>Parameter dan response lengkap tersedia di dokumentasi endpoint aktif DECA.</p></div>`;
  } else {
    content = item.body;
  }
  document.getElementById('mainContent').innerHTML = `<div class="page-head"><div class="breadcrumbs">DECA Developer <span>/</span> ${mode === 'reference' ? 'API Reference' : 'Docs'}</div><div class="eyebrow">${eyebrow}${item.group ? ` <span class="eyebrow-divider">/</span> ${endpointGroups[item.group].flow} · ${endpointGroups[item.group].protocol}` : ''}</div><h1>${item.title}</h1><p class="page-subtitle">${item.subtitle || ''}</p></div><div class="page-content">${content}</div>`;
  bindRouteLinks();
}
function bindRouteLinks() {
  document.querySelectorAll('[data-route]').forEach(link => link.onclick = event => { event.preventDefault(); if (link.closest('#searchResults')) closeSearch(); navigate(link.dataset.route); });
}

const searchEntries = [
  ...Object.entries(docsPages).map(([id, page]) => ({ route:`docs/${id}`, title:page.title, section:'Docs' })),
  ...Object.entries(referencePages).map(([id, page]) => ({ route:`reference/${id}`, title:page.title, section:'API Reference' }))
];
function openSearch() { const modal = document.getElementById('searchModal'); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.getElementById('searchInput').focus(); showSearch(''); }
function closeSearch() { const modal = document.getElementById('searchModal'); modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
function showSearch(query) {
  const matches = searchEntries.filter(item => !query || `${item.title} ${item.section}`.toLowerCase().includes(query.toLowerCase()));
  document.getElementById('searchResults').innerHTML = matches.length ? matches.map(item => `<a class="search-result" href="#${item.route}" data-route="${item.route}"><span>${item.title}</span><small>${item.section}</small></a>`).join('') : '<div class="empty-state">Tidak ada halaman yang cocok.</div>';
  bindRouteLinks();
}

document.getElementById('searchOpen').onclick = openSearch;
document.getElementById('searchOpenSide').onclick = openSearch;
document.getElementById('searchClose').onclick = closeSearch;
document.getElementById('searchInput').oninput = event => showSearch(event.target.value);
document.getElementById('themeToggle').onclick = () => { document.body.classList.toggle('dark'); localStorage.setItem('deca-doc-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); };
if (localStorage.getItem('deca-doc-theme') === 'dark') document.body.classList.add('dark');
document.getElementById('mobileMenu').onclick = () => document.getElementById('sidebar').classList.toggle('open');
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
  if (event.key === 'Escape') closeSearch();
  if (event.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) { event.preventDefault(); openSearch(); }
});
window.addEventListener('hashchange', () => { const route = routeFromHash(); render(route.mode, route.page); });
window.addEventListener('popstate', () => { const route = routeFromHash(); render(route.mode, route.page); });
const initial = routeFromHash();
if (!location.hash || !location.hash.slice(1).includes('/')) history.replaceState(null, '', `#${initial.mode}/${initial.page}`);
render(initial.mode, initial.page);
