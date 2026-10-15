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

// Endpoint contracts verified against the published DECA specification.
// Pages without verified schema are still local and clearly marked Coming soon.
const endpointSpecs = {
  'post-v-1-0-qr-qr-mpm-generate': { path:'/snap/qris/v1.0/qr/qr-mpm-generate', service:'47', method:'POST', statuses:'200 · 400 · 401 · 409', request:[['amount','object','Required','value and currency'],['partnerReferenceNo','string','Required','Merchant transaction ID, max 64 characters'],['merchantId','string','Required','Merchant identifier, max 64 characters'],['storeId','string','Required','Store identifier, max 64 characters']], response:[['responseCode','string','Required','Seven digit response code'],['responseMessage','string','Required','Response description'],['referenceNo','string','Required','DECA transaction ID on success'],['partnerReferenceNo','string','Required','Merchant transaction ID'],['qrContent','string','Required','QR string for MPM'],['merchantName','string','Required','Merchant name'],['storeId','string','Required','Store identifier']], sample:{amount:{value:'10000.00',currency:'IDR'},partnerReferenceNo:'ORDER-20261015-001',merchantId:'merchant-id',storeId:'store-id'} },
  'post-v-1-0-qr-qr-mpm-query': { path:'/snap/qris/v1.0/qr/qr-mpm-query', service:'51', method:'POST', statuses:'200 · 400 · 401 · 404 · 409', request:[['originalPartnerReferenceNo','string','Required','Original merchant transaction ID, max 64 characters'],['serviceCode','string','Required','Two digit original transaction service code'],['merchantId','string','Required','Merchant identifier, max 64 characters']], response:[['responseCode','string','Required','Seven digit response code'],['responseMessage','string','Required','Response description'],['originalReferenceNo','string','Required','DECA transaction ID'],['originalPartnerReferenceNo','string','Required','Original merchant transaction ID'],['serviceCode','string','Required','Original service code'],['latestTransactionStatus','string','Required','00 success · 01 initiated · 02 paying · 03 pending · 04 refunded · 05 canceled · 06 failed · 07 not found'],['transactionStatusDesc','string','Required','Status description'],['paidTime','string','Required','ISO 8601 transaction time when paid']], sample:{originalPartnerReferenceNo:'ORDER-20261015-001',serviceCode:'47',merchantId:'merchant-id'} },
  'post-v-1-0-qr-qr-mpm-refund': { path:'/snap/qris/v1.0/qr/qr-mpm-refund', service:'78', method:'POST', statuses:'200 · 400 · 401 · 404 · 409', request:[['originalPartnerReferenceNo','string','Required','Original merchant transaction ID'],['partnerRefundNo','string','Required','Merchant refund reference']], response:[], sample:{originalPartnerReferenceNo:'ORDER-20261015-001',partnerRefundNo:'REFUND-001'} },
  'post-v-1-0-qr-qr-mpm-cancel': { path:'/snap/qris/v1.0/qr/qr-mpm-cancel', service:'53', method:'POST', statuses:'200 · 400 · 401 · 404 · 409', request:[['originalReferenceNo','string','Required','DECA transaction ID'],['merchantId','string','Required','Merchant identifier'],['reason','string','Required','Cancellation reason']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['originalReferenceNo','string','Required','DECA transaction ID'],['cancelTime','string','Required','Cancellation datetime in ISO 8601']], sample:{originalReferenceNo:'DECA-REFERENCE-001',merchantId:'merchant-id',reason:'Customer request'} },
  'post-v-1-qr-qr-mpm-decode': { path:'/snap/qris/v1.0/qr/qr-mpm-decode', service:'48', method:'POST', statuses:'200 · 400 · 401', request:[['qrContent','string','Required','QR string for MPM'],['scanTime','string','Required','Time when the user scanned the QR']], response:[], sample:{qrContent:'000201...',scanTime:'2026-10-15T10:30:00+07:00'} },
  'post-webhook-qr-qr-mpm-notify': { path:'URL callback merchant', service:'52', method:'WEBHOOK', statuses:'200', request:[['originalReferenceNo','string','Required','DECA transaction ID'],['originalPartnerReferenceNo','string','Required','Merchant transaction ID'],['latestTransactionStatus','string','Required','Transaction status code'],['transactionStatusDesc','string','Required','Status description'],['externalStoreId','string','Required','External store ID']], response:[['responseCode','string','Required','Acknowledgement code'],['responseMessage','string','Required','Acknowledgement description']], sample:{originalReferenceNo:'DECA-REFERENCE-001',originalPartnerReferenceNo:'ORDER-20261015-001',latestTransactionStatus:'00',transactionStatusDesc:'Success',externalStoreId:'store-id'} },
  'post-v-1-0-transfer-va-create-va': { path:'/snap/in/v1.0/transfer-va/create-va', service:'27', method:'POST', statuses:'200 · 400 · 401 · 409 · 500', request:[['partnerServiceId','string','Optional','Partner service identifier, max 8 characters'],['customerNo','string','Optional','Customer number, max 20 characters'],['virtualAccountNo','string','Optional','Virtual account number, max 28 characters'],['virtualAccountName','string','Required','Account holder name, max 255 characters'],['trxId','string','Required','Merchant transaction ID, max 64 characters'],['totalAmount','object','Required','value and currency'],['virtualAccountTrxType','string','Optional','C closed · O open'],['feeAmount','object','Optional','value and currency'],['expiredDate','string','Required','Expiry datetime in ISO 8601'],['additionalInfo','object','Required','Includes bankCode']], response:[['responseCode','string','Required','Seven digit response code'],['responseMessage','string','Required','Response description'],['virtualAccountData','object','Required','Virtual account details']], sample:{partnerServiceId:'12345678',customerNo:'CUSTOMER-001',virtualAccountNo:'',virtualAccountName:'Nama Pelanggan',trxId:'ORDER-001',totalAmount:{value:'10000.00',currency:'IDR'},virtualAccountTrxType:'C',expiredDate:'2026-10-16T23:59:59+07:00',additionalInfo:{bankCode:'DECA'}} },
  'post-v-1-0-transfer-va-status': { path:'/snap/in/v1.0/transfer-va/status', service:'26', method:'POST', statuses:'200 · 400 · 401 · 409', request:[['partnerServiceId','string','Required','Partner service identifier'],['customerNo','string','Required','Customer number'],['virtualAccountNo','string','Required','Virtual account number'],['inquiryRequestId','string','Required','Unique inquiry request ID']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description']], sample:{partnerServiceId:'12345678',customerNo:'CUSTOMER-001',virtualAccountNo:'88081234567890',inquiryRequestId:'INQ-001'} },
  'delete-v-1-0-transfer-va-delete-va': { path:'/snap/in/v1.0/transfer-va/delete-va', service:'31', method:'DELETE', statuses:'200 · 400 · 401 · 404', request:[['partnerServiceId','string','Required','Partner service identifier'],['customerNo','string','Required','Customer number'],['virtualAccountNo','string','Required','Virtual account number']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description']], sample:{partnerServiceId:'12345678',customerNo:'CUSTOMER-001',virtualAccountNo:'88081234567890'} },
  'post-webhook-transfer-va-payment': { path:'URL callback merchant', service:'25', method:'WEBHOOK', statuses:'200', request:[['partnerServiceId','string','Required','Partner service identifier'],['customerNo','string','Required','Customer number / virtual account number'],['virtualAccountNo','string','Required','Virtual account number'],['paymentRequestId','integer','Required','DECA payment request ID'],['trxDateTime','string','Required','Transaction datetime in ISO 8601'],['additionalInfo','object','Required','Additional information; can be empty']], response:[['responseCode','string','Required','Acknowledgement code'],['responseMessage','string','Required','Acknowledgement description']], sample:{partnerServiceId:'12345678',customerNo:'CUSTOMER-001',virtualAccountNo:'88081234567890',paymentRequestId:12345,trxDateTime:'2026-10-15T10:30:00+07:00',additionalInfo:{}} },
  'post-v-1-0-emoney-bank-account-inquiry': { path:'/snap/out/v1.0/emoney/bank-account-inquiry', service:'42', method:'POST', statuses:'200 · 400 · 401 · 409', request:[['customerNumber','string','Required','Partner customer phone number'],['beneficiaryAccountNumber','string','Required','Beneficiary bank account number']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['referenceNo','string','Required','DECA transaction ID'],['partnerReferenceNo','string','Required','Merchant transaction ID'],['beneficiaryAccountNumber','string','Required','Beneficiary account number'],['beneficiaryAccountName','string','Required','Beneficiary account name'],['beneficiaryBankCode','string','Required','AJ beneficiary bank code'],['beneficiaryBankShortName','string','Required','Bank short name'],['beneficiaryBankName','string','Required','Bank name']], sample:{customerNumber:'081234567890',beneficiaryAccountNumber:'1234567890'} },
  'post-v-1-0-emoney-transfer-bank': { path:'/snap/out/v1.0/emoney/transfer-bank', service:'43', method:'POST', statuses:'200 · 400 · 401 · 409', request:[['partnerReferenceNo','string','Required','Merchant transaction ID'],['customerNumber','string','Required','Partner customer phone number'],['beneficiaryAccountNumber','string','Required','Beneficiary account number'],['beneficiaryBankCode','string','Required','AJ beneficiary bank code']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['referenceNo','string','Required','DECA transaction ID'],['partnerReferenceNo','string','Required','Merchant transaction ID'],['transactionDate','string','Required','ISO 8601 transaction time'],['referenceNumber','string','Required','Provider transaction ID']], sample:{partnerReferenceNo:'PAYOUT-001',customerNumber:'081234567890',beneficiaryAccountNumber:'1234567890',beneficiaryBankCode:'014'} },
  'post-webhook-emoney-transfer-bank-notify': { path:'URL callback merchant', service:'43', method:'WEBHOOK', statuses:'200', request:[['originalPartnerReferenceNo','string','Required','Original merchant reference'],['originalReferenceNo','string','Required','DECA transaction ID'],['latestTransactionStatus','string','Required','00 success · 03 pending · 06 failed'],['transactionStatusDesc','string','Required','Transaction status description']], response:[['responseCode','string','Required','Acknowledgement code'],['responseMessage','string','Required','Acknowledgement description']], sample:{originalPartnerReferenceNo:'PAYOUT-001',originalReferenceNo:'DECA-REFERENCE-001',latestTransactionStatus:'00',transactionStatusDesc:'Success'} },
  'post-v-1-0-emoney-account-inquiry': { path:'/snap/out/v1.0/emoney/account-inquiry', service:'37', method:'POST', statuses:'200 · 400 · 401 · 404 · 409', request:[['customerNumber','string','Required','Customer phone number (alphanumeric)']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['partnerReferenceNo','string','Required','Merchant transaction ID'],['customerNumber','string','Required','Masked customer phone number'],['customerName','string','Required','Customer name']], sample:{customerNumber:'081234567890'} },
  'post-v-1-0-emoney-customer-top-up': { path:'/snap/out/v1.0/emoney/topup', service:'38', method:'POST', statuses:'200 · 400 · 401 · 409', request:[['partnerReferenceNo','string','Required','Merchant transaction ID'],['customerNumber','string','Required','Customer account number']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description']], sample:{partnerReferenceNo:'TOPUP-001',customerNumber:'081234567890'} },
  'post-v-1-0-emoney-customer-top-up-inquiry-status': { path:'/snap/out/v1.0/emoney/topup-status', service:'39', method:'POST', statuses:'200 · 400 · 401 · 409', request:[['serviceCode','string','Required','Original transaction service code']], response:[], sample:{serviceCode:'38'} },
  'post-v-1-0-emoney-bulk-cashin-payment': { path:'/snap/out/v1.0/emoney/bulk-cashin-payment', service:'40', method:'POST', statuses:'200 · 400 · 401 · 409', request:[['partnerBulkId','string','Required','Merchant batch transaction ID'],['transactionDate','string','Required','ISO 8601 transaction date'],['currency','string','Required','Transaction currency']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['bulkId','string','Required','DECA batch ID'],['partnerBulkId','string','Required','Merchant batch ID']], sample:{partnerBulkId:'BULK-001',transactionDate:'2026-10-15T10:30:00+07:00',currency:'IDR'} },
  'post-webhook-emoney-bulk-cashin-notify': { path:'URL callback merchant', service:'40', method:'WEBHOOK', statuses:'200', request:[['originalPartnerBulkId','string','Required','Original merchant batch ID'],['originalBulkId','string','Required','DECA batch ID'],['transactionDate','string','Required','ISO 8601 transaction date'],['transactionStatus','string','Required','Transaction status code'],['transactionStatusDesc','string','Required','Status description']], response:[['responseCode','string','Required','Acknowledgement code'],['responseMessage','string','Required','Acknowledgement description']], sample:{originalPartnerBulkId:'BULK-001',originalBulkId:'DECA-BULK-001',transactionDate:'2026-10-15T10:30:00+07:00',transactionStatus:'00',transactionStatusDesc:'Success'} },
  'post-v-1-0-balance-inquiry': { path:'/snap/acct/v1.0/balance-inquiry', service:'11', method:'POST', statuses:'200 · 400 · 401 · 404', request:[], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['accountNo','string','Required','Account number']], sample:{} },
  'post-v-1-0-bank-statement': { path:'/snap/acct/v1.0/bank-statement', service:'14', method:'POST', statuses:'200 · 400 · 401', request:[], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description']], sample:{} },
  'post-v-1-0-access-token-b-2-b': { path:'/snap/auth/v1.0/access-token/b2b', service:'73', method:'POST', statuses:'200 · 400 · 401', request:[], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['accessToken','string','Required','B2B access token'],['tokenType','string','Required','Token type'],['expiresIn','integer','Required','Token lifetime in seconds']], comingSoon:true },
  'post-ec-v-1-copg-order': { path:'/ec/v1/copg/order', service:'Non-SNAP', method:'POST', statuses:'200 · 400', headers:[['Authorization','string','Required','Bearer access token.'],['X-Deca-Timestamp','string','Required','Request timestamp.'],['X-Deca-Signature','string','Required','Signature for the request.']], request:[['reference_id','string','Required','Merchant order reference'],['total','integer','Required','Total amount'],['items','object[]','Required','Line items contain name, qty, and nominal'],['payment_channel','string','Required','Selected payment channel'],['finish_redirect_url','string','Required','URL after successful payment'],['unfinish_redirect_url','string','Required','URL when payment is not completed']], response:[], sample:{reference_id:'ORDER-001',total:10000,items:[{name:'Pembayaran',qty:1,nominal:10000}],payment_channel:'QRIS',finish_redirect_url:'https://merchant.example/success',unfinish_redirect_url:'https://merchant.example/pending'} },
  'get-ec-v-1-copg-order-reference': { path:'/ec/v1/copg/order/reference/:reference_id', service:'Non-SNAP', method:'GET', statuses:'200 · 400', headers:[['Authorization','string','Required','Bearer access token.'],['X-Deca-Timestamp','string','Required','Request timestamp.'],['X-Deca-Signature','string','Required','Signature for the request.']], request:[['reference_id','string','Required','Merchant order reference in the path']], response:[], sample:null },
  'get-ec-v-1-payment-id': { path:'/ec/v1/payment/:payment_id', service:'Non-SNAP', method:'GET', statuses:'200 · 400', headers:[['Authorization','string','Required','Bearer access token.'],['X-Deca-Timestamp','string','Required','Request timestamp.'],['X-Deca-Signature','string','Required','Signature for the request.']], request:[['payment_id','integer','Required','DECA payment identifier in the path']], response:[], sample:null },
  'get-ec-v-1-payment-reference-id': { path:'/ec/v1/payment/reference-id/:reference_id', service:'Non-SNAP', method:'GET', statuses:'200 · 400', headers:[['Authorization','string','Required','Bearer access token.'],['X-Deca-Timestamp','string','Required','Request timestamp.'],['X-Deca-Signature','string','Required','Signature for the request.']], request:[['reference_id','string','Required','Merchant payment reference in the path']], response:[], sample:null },
  'post-webhook-ec-payment-status': { path:'URL callback merchant', service:'Non-SNAP', method:'WEBHOOK', statuses:'200', request:[], response:[], sample:null, comingSoon:true },
  'post-webhook-ec-payment': { path:'/webhook/ec/payment', service:'Non-SNAP', method:'POST', statuses:'200', headers:[['X-Deca-Timestamp','string','Required','Timestamp of the request.'],['X-Deca-Signature','string','Required','Signature for the request.']], request:[['billed_amount','string','Required','Amount billed'],['billed_amount_decimal','number','Required','Amount as decimal'],['notify_type','string','Required','Notification type'],['payment_id','integer','Required','Payment identifier'],['trace_number','string','Required','Trace number'],['reference_id','string','Required','Merchant reference']], response:[], sample:{billed_amount:'10000',billed_amount_decimal:10000,notify_type:'payment',payment_id:123,trace_number:'TRACE-001',reference_id:'ORDER-001'} }
};

const snapHeaders = [
  ['Content-Type','string','Required','Media type; use application/json.'],
  ['Authorization','string','Required','Bearer access token.'],
  ['X-PARTNER-ID','string','Required','Partner ID issued by DECA.'],
  ['X-TIMESTAMP','date-time','Required','ISO 8601 timestamp using GMT+7.'],
  ['X-SIGNATURE','string','Required','SNAP signature for the request.'],
  ['X-EXTERNAL-ID','string','Required','Unique request ID; DECA docs state it resets every 24 hours.'],
  ['CHANNEL-ID','string','Required','Channel/device identifier.']
];

const docsPages = {
  home: { title: 'Docs DECA', subtitle: 'Panduan integrasi layanan DECA, dari persiapan akses sampai transaksi berjalan.',
    body: `<p>Dokumentasi ini memisahkan panduan alur bisnis dari spesifikasi endpoint. Gunakan Docs untuk memahami integrasi, lalu buka API Reference saat membutuhkan field request, response, dan path endpoint.</p>
      <div class="content-section"><div class="section-label">CASH IN</div><h2>Terima pembayaran</h2><p>Alur pembayaran masuk yang tercakup dalam spesifikasi DECA saat ini.</p><div class="link-list">${row('QRIS','Generate, inquiry, refund/cancel, dan callback QRIS.','docs/cash-in')} ${row('Virtual Account','Buat VA, cek status, hapus, dan terima notifikasi pembayaran.','docs/cash-in')} ${row('External Checkout','Referensi Non-SNAP untuk membuat order checkout dan memeriksa pembayaran.','reference/externalCheckout','Non-SNAP')}</div></div>
      <div class="content-section"><div class="section-label">CASH OUT</div><h2>Kirim dana ke penerima</h2><p>Kelompokkan transfer bank, e-money top up, dan pengiriman dana batch dalam satu alur keluar.</p><div class="link-list">${row('Bank Transfer','Inquiry rekening tujuan, transfer, dan notifikasi status.','docs/cash-out')} ${row('E-money Top Up','Inquiry akun tujuan, top up, dan cek status.','docs/cash-out')} ${row('Bulk Cash In','Pengiriman batch yang berada di path SNAP /out/ pada spesifikasi DECA.','docs/cash-out')}</div></div>
      <div class="content-section"><div class="section-label">OPERASIONAL</div><h2>Account & Reports</h2><p>Balance Inquiry dan Bank Statement tersedia sebagai referensi akun dan laporan, bukan sebagai alur pencairan.</p>${linkRow('Buka panduan Account & Reports','docs/account')}</div>
      <div class="content-section"><div class="section-label">DOKUMENTASI BERTAHAP</div><h2>Topik lain</h2><p>Materi yang belum tersedia di dokumentasi DECA saat ini akan ditambahkan bertahap.</p>${comingSoonRow('Payment Link','Belum ada panduan DECA yang dipublikasikan.')} ${comingSoonRow('Sub-account & marketplace','Belum ada panduan DECA yang dipublikasikan.')} ${comingSoonRow('SDK, plugin & reconciliation guide','Belum ada panduan DECA yang dipublikasikan.')}</div>
      <div class="inline-actions"><a class="button primary" href="#reference/home" data-route="reference/home">Buka API Reference <span>→</span></a><a class="text-link" href="#docs/getting-started" data-route="docs/getting-started">Mulai integrasi</a></div>`
  },
  'getting-started': { title: 'Mulai integrasi', subtitle: 'Persiapan umum sebelum memanggil API DECA.', body: `<ol class="plain-steps"><li><strong>Aktifkan akses merchant.</strong> Hubungi tim DECA untuk proses aktivasi dan kredensial environment.</li><li><strong>Siapkan autentikasi SNAP.</strong> Ikuti panduan signature dan token di API Reference.</li><li><strong>Pilih alur transaksi.</strong> Mulai dari Cash In, Cash Out, atau Account & Reports sesuai kebutuhan.</li><li><strong>Uji callback dan status.</strong> Cocokkan notifikasi dengan endpoint inquiry yang tersedia.</li></ol><div class="callout"><strong>Detail teknis ada di API Reference</strong><p>Detail endpoint, field request, dan response ditampilkan di portal ini.</p><a class="text-link" href="#reference/auth" data-route="reference/auth">Lihat authentication reference →</a></div>` },
  'cash-in': { title: 'Cash In', subtitle: 'Panduan untuk menerima pembayaran pelanggan.', body: `<p>Dokumentasi DECA saat ini mencakup alur QRIS, Virtual Account, dan External Checkout Non-SNAP. Setiap endpoint tetap berada pada referensi protokol asalnya.</p><div class="content-section"><h2>QRIS</h2><p>Buat Dynamic QR, periksa status atau inquiry transaksi, lalu tangani callback. Endpoint refund, cancel, dan decode tersedia di referensi QRIS.</p>${linkRow('Lihat endpoint QRIS','reference/qris')}</div><div class="content-section"><h2>Virtual Account</h2><p>Buat VA, periksa statusnya, kelola penghapusan VA, dan siapkan penerimaan callback pembayaran.</p>${linkRow('Lihat endpoint Virtual Account','reference/va')}</div><div class="content-section"><h2>External Checkout · Non-SNAP</h2><p>Buat checkout order untuk memperoleh URL halaman pembayaran, lalu gunakan endpoint fetch dan webhook untuk mengikuti status pembayaran.</p>${linkRow('Lihat API Reference External Checkout','reference/externalCheckout')}</div>` },
  'cash-out': { title: 'Cash Out', subtitle: 'Panduan untuk mengirim dana dari bisnis ke rekening atau akun penerima.', body: `<p>Spesifikasi DECA menempatkan layanan ini di path SNAP <code>/out/</code>. Kelompokkan alur berdasarkan tujuan dana agar operasi Cash Out mudah dicari.</p><div class="content-section"><h2>Transfer bank</h2><p>Lakukan inquiry rekening tujuan sebelum mengirim transaksi, lalu pantau hasil transfer melalui status dan callback.</p>${linkRow('Lihat endpoint Bank Transfer','reference/bankTransfer')}</div><div class="content-section"><h2>E-money Top Up</h2><p>Periksa akun penerima, lakukan Customer Top Up, dan gunakan inquiry status untuk mendapatkan pembaruan transaksi.</p>${linkRow('Lihat endpoint E-money Top Up','reference/ewallet')}</div><div class="content-section"><h2>Bulk Cash In</h2><p>Walau nama endpoint menyebut Cash In, rute spesifikasi adalah <code>/snap/out/v1.0/emoney/bulk-cashin-payment</code> dan fiturnya berada di kategori Disbursement. Karena itu halaman ini menjelaskannya sebagai Cash Out batch, sambil mempertahankan nama API resmi.</p>${linkRow('Lihat endpoint Bulk Cash In','reference/bulkCashIn')}</div>` },
  account: { title: 'Account & Reports', subtitle: 'Referensi saldo dan laporan rekening merchant.', body: `<p>Balance Inquiry dan Bank Statement membantu membaca informasi akun. Keduanya berdiri sendiri dari alur dana masuk dan pencairan.</p>${linkRow('Lihat endpoint Balance & Bank Statement','reference/account')}` },
  'authentication-guide': { title: 'Authentication & security', subtitle: 'Konsep keamanan yang digunakan sebelum request SNAP.', body: `<p>API SNAP menggunakan B2B Access Token dan signature. Ikuti aturan key, canonical string, timestamp, dan header sesuai spesifikasi DECA; jangan menaruh private key di browser atau repo publik.</p><p>Langkah pembuatan signature dan format request lengkap tersedia di API Reference.</p>${linkRow('Buka Authentication Reference','reference/auth')} ${linkRow('Lihat request headers','reference/headers')}` },
  environments: { title: 'Environment', subtitle: 'Gunakan base URL sesuai environment dan kredensial merchant.', body: `<div class="table-wrap"><table class="param-table"><thead><tr><th>Environment</th><th>Base URL</th><th>Penggunaan</th></tr></thead><tbody><tr><td>Staging</td><td><code>https://api.dev.deca.co.id</code></td><td>Pengembangan dan pengujian</td></tr><tr><td>Production</td><td><code>https://api.deca.co.id</code></td><td>Transaksi production setelah aktivasi</td></tr></tbody></table></div><div class="callout"><strong>Kredensial berbeda tiap environment</strong><p>Pastikan akses dan kredensial telah dikonfirmasi tim DECA sebelum berpindah ke production.</p></div>` },
  webhooks: { title: 'Webhooks & status transaksi', subtitle: 'Terima notifikasi server-to-server dan periksa status transaksi.', body: `<p>Endpoint callback berada di grup produk masing-masing. Gunakan callback Cash In untuk pembayaran QRIS/VA, dan callback Cash Out untuk transfer bank atau bulk cash-in.</p><div class="content-section"><h2>Cash In</h2>${linkRow('Callback QRIS','reference/qris')} ${linkRow('Callback Virtual Account','reference/va')}</div><div class="content-section"><h2>Cash Out</h2>${linkRow('Callback transfer bank','reference/bankTransfer')} ${linkRow('Callback bulk cash-in','reference/bulkCashIn')}</div><div class="callout"><strong>Kontrak callback</strong><p>Validasi payload dan acknowledgment berdasarkan spesifikasi endpoint DECA yang aktif.</p></div>` },
  testing: { title: 'Testing & go-live', subtitle: 'Uji endpoint dan callback sebelum mengaktifkan production.', body: `<ol class="plain-steps"><li>Konfirmasi base URL serta kredensial staging.</li><li>Uji transaksi sukses dan penolakan untuk produk yang digunakan.</li><li>Pastikan callback diterima dan status dapat dicocokkan dengan inquiry.</li><li>Koordinasikan pengaktifan production dengan tim DECA.</li></ol><div class="callout"><strong>Environment production perlu aktivasi</strong><p>Gunakan kredensial dan base URL production setelah proses aktivasi merchant dikonfirmasi.</p></div>` }
};

const referencePages = {
  home: { title: 'API Reference', subtitle: 'Spesifikasi endpoint DECA, dipisahkan menurut alur produk dan protokol.', body: `<p>Detail API dibuka langsung di portal ini. Pilih produk untuk melihat method, path, header, schema request/response, dan status yang tersedia.</p><div class="content-section"><div class="section-label">CASH IN</div><h2>Terima pembayaran</h2><div class="link-list">${row('QRIS','Generate, inquiry, refund/cancel, decode, dan webhook.','reference/qris','SNAP')} ${row('Virtual Account','Buat VA, cek status, hapus, dan callback.','reference/va','SNAP')} ${row('External Checkout','Order, payment, dan webhook.','reference/externalCheckout','Non-SNAP')}</div></div><div class="content-section"><div class="section-label">CASH OUT</div><h2>Kirim dana</h2><div class="link-list">${row('Bank Transfer','Inquiry rekening, transfer, dan callback.','reference/bankTransfer','SNAP')} ${row('E-money Top Up','Inquiry akun, top up, dan cek status.','reference/ewallet','SNAP')} ${row('Bulk Cash In','Batch transfer dan callback.','reference/bulkCashIn','SNAP')}</div></div><div class="content-section"><div class="section-label">OPERASIONAL</div><h2>Account & Reports</h2><div class="link-list">${row('Balance & Bank Statement','Informasi saldo dan mutasi rekening.','reference/account','SNAP')} ${row('Authentication & Headers','Access token, signature, dan request headers.','reference/auth','SNAP')}</div></div><div class="content-section"><div class="section-label">COMING SOON</div><h2>Produk berikutnya</h2>${comingSoonRow('Payment Link API','Spesifikasi DECA belum tersedia di portal ini.')} ${comingSoonRow('Sub-account & marketplace API','Spesifikasi DECA belum tersedia di portal ini.')}</div>` },
  qris: { title: endpointGroups.qris.title, subtitle: endpointGroups.qris.intro, group: 'qris' },
  va: { title: endpointGroups.va.title, subtitle: endpointGroups.va.intro, group: 'va' },
  bankTransfer: { title: endpointGroups.bankTransfer.title, subtitle: endpointGroups.bankTransfer.intro, group: 'bankTransfer' },
  ewallet: { title: endpointGroups.ewallet.title, subtitle: endpointGroups.ewallet.intro, group: 'ewallet' },
  bulkCashIn: { title: endpointGroups.bulkCashIn.title, subtitle: endpointGroups.bulkCashIn.intro, group: 'bulkCashIn' },
  account: { title: endpointGroups.account.title, subtitle: endpointGroups.account.intro, group: 'account' },
  auth: { title: 'Authentication', subtitle: 'Autentikasi SNAP dan endpoint untuk memperoleh B2B Access Token.', body: `<p>Request SNAP menggunakan B2B Access Token dan signature. Simpan client secret serta private key di server merchant.</p>${endpointList(endpointGroups.auth.items)}<div class="content-section"><h2>Request headers</h2>${linkRow('Lihat headers SNAP','reference/headers')} ${linkRow('Panduan authentication','docs/authentication-guide')}</div>` },
  headers: { title: 'Request Headers', subtitle: 'Header SNAP yang digunakan pada transaksi DECA.', body: `<p>Gunakan header berikut untuk endpoint SNAP. Timestamp harus menggunakan format ISO 8601 dengan GMT+7; signature mengikuti aturan SNAP.</p>${fieldTable(snapHeaders,'Header','Keterangan')}` },
  externalCheckout: { title: 'External Checkout', subtitle: 'Referensi checkout pembayaran DECA menggunakan protokol Non-SNAP.', body: `<p>Alur checkout Non-SNAP memiliki kontrak authentication tersendiri. Detail request dan response tiap endpoint akan ditampilkan di portal ini saat migrasi kontrak selesai.</p><div class="link-list">${externalRow('Create Checkout Order','POST','/nonSnapReference/generated/post-ec-v-1-copg-order','Membuat order checkout.')} ${externalRow('Get Checkout Order','GET','/nonSnapReference/generated/get-ec-v-1-copg-order-reference','Mengambil informasi checkout order.')} ${externalRow('Get Payment By ID','GET','/nonSnapReference/generated/get-ec-v-1-payment-id','Mengambil pembayaran berdasarkan ID.')} ${externalRow('Get Payment By Reference ID','GET','/nonSnapReference/generated/get-ec-v-1-payment-reference-id','Mengambil pembayaran berdasarkan reference.')} ${externalRow('Payment Status Changed Webhook','POST','/nonSnapReference/generated/post-webhook-ec-payment-status','Notifikasi perubahan status pembayaran.')} ${externalRow('External Checkout Payment Webhook','POST','/nonSnapReference/generated/post-webhook-ec-payment','Notifikasi pembayaran External Checkout.')}</div><div class="callout"><strong>Authentication Non-SNAP</strong><p>Kontrak autentikasi dan signature Non-SNAP ditandai Coming soon sampai spesifikasinya dimigrasikan.</p>${comingSoonRow('Non-SNAP Authentication & Signature','Detail DECA belum tersedia di portal ini.')}</div>` }
};

const endpointTitles = {};
const endpointOwners = {};
for (const [groupId, group] of Object.entries(endpointGroups)) {
  for (const [title,,docPath] of group.items) {
    const slug = docPath.split('/').pop();
    endpointTitles[slug] = title;
    endpointOwners[slug] = groupId;
  }
}
Object.assign(endpointTitles, {
  'post-ec-v-1-copg-order':'Create Checkout Order',
  'get-ec-v-1-copg-order-reference':'Get Checkout Order',
  'get-ec-v-1-payment-id':'Get Payment By ID',
  'get-ec-v-1-payment-reference-id':'Get Payment By Reference ID',
  'post-webhook-ec-payment-status':'Payment Status Changed Webhook',
  'post-webhook-ec-payment':'External Checkout Payment Webhook'
});
for (const [slug, spec] of Object.entries(endpointSpecs)) {
  referencePages[slug] = { title:endpointTitles[slug] || slug.replace(/^(post|delete|get)-/,'').replaceAll('-',' '), subtitle:spec.path === 'URL callback merchant' ? 'Payload callback yang dikirim DECA ke URL merchant.' : `Spesifikasi ${spec.method} DECA · service code ${spec.service}.`, contract:spec, group:endpointOwners[slug] };
}

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
  return `<div class="endpoint-list">${items.map(([title, method, docPath, note]) => { const slug = docPath.split('/').pop(); return `<a class="endpoint-row" href="#reference/${slug}" data-route="reference/${slug}"><span class="method ${method.toLowerCase()}">${method}</span><span class="endpoint-copy"><strong>${title}</strong><small>${note}</small></span><span class="row-arrow">→</span></a>`; }).join('')}</div>`;
}
function externalRow(title, method, path, note) {
  const slug = path.split('/').pop();
  return `<a class="endpoint-row" href="#reference/${slug}" data-route="reference/${slug}"><span class="method ${method.toLowerCase()}">${method}</span><span class="endpoint-copy"><strong>${title}</strong><small>${note}</small></span><span class="row-arrow">→</span></a>`;
}
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
function fieldTable(fields, firstHeader = 'Field', lastHeader = 'Description') {
  if (!fields.length) return `<div class="coming-contract"><strong>Coming soon</strong><span>Schema detail untuk bagian ini belum tersedia di portal.</span></div>`;
  return `<div class="table-wrap"><table class="param-table"><thead><tr><th>${firstHeader}</th><th>Type</th><th>Status</th><th>${lastHeader}</th></tr></thead><tbody>${fields.map(([name,type,required,description]) => `<tr><td><code>${escapeHtml(name)}</code></td><td>${escapeHtml(type)}</td><td>${escapeHtml(required)}</td><td>${escapeHtml(description)}</td></tr>`).join('')}</tbody></table></div>`;
}
function contractBody(spec) {
  const isWebhook = spec.method === 'WEBHOOK';
  const route = isWebhook ? 'DECA mengirim ke URL callback merchant' : `https://api.dev.deca.co.id${spec.path}`;
  const headers = spec.headers || (spec.service === 'Non-SNAP' || spec.service === '73' ? [] : snapHeaders);
  return `<div class="endpoint-contract">
    <div class="endpoint-request-line"><span class="method ${spec.method.toLowerCase()}">${spec.method}</span><code>${escapeHtml(route)}</code><span class="protocol-label">${spec.service === 'Non-SNAP' ? 'Non-SNAP' : `Service code ${escapeHtml(spec.service)}`}</span></div>
    <div class="contract-meta"><span>Environment</span><code>https://api.dev.deca.co.id</code><span>Response codes</span><code>${escapeHtml(spec.statuses)}</code></div>
    ${spec.comingSoon ? `<div class="coming-contract prominent"><strong>Coming soon</strong><span>Method dan path sudah dicatat, tetapi request, response, dan aturan autentikasi belum dimigrasikan ke dokumentasi baru.</span></div>` : ''}
    ${isWebhook ? `<div class="callout"><strong>URL callback</strong><p>URL endpoint ini disediakan oleh merchant dan didaftarkan saat aktivasi. DECA mengirim payload callback ke URL tersebut.</p></div>` : ''}
    ${headers.length ? `<section class="content-section"><h2>Request headers</h2>${fieldTable(headers,'Header','Keterangan')}</section>` : ''}
    <section class="content-section"><h2>${isWebhook ? 'Callback payload' : spec.method === 'GET' ? 'Path parameters' : 'Request body'}</h2>${fieldTable(spec.request,'Field','Description')}${spec.sample && Object.keys(spec.sample).length ? `<details class="code-disclosure"><summary>Contoh JSON</summary><pre><code>${escapeHtml(JSON.stringify(spec.sample,null,2))}</code></pre></details>` : ''}</section>
    <section class="content-section"><h2>Response</h2>${fieldTable(spec.response,'Field','Description')}</section>
    <div class="callout"><strong>Production</strong><p>Gunakan base URL production <code>https://api.deca.co.id</code> setelah akses production merchant diaktifkan.</p></div>
  </div>`;
}
function renderNav(mode, page) {
  const groups = mode === 'docs' ? docNav : referenceNav;
  const activePage = endpointOwners[page] || page;
  document.getElementById('sideNav').innerHTML = groups.map(([heading, links]) => `<section class="nav-group"><h2 class="nav-heading">${heading}</h2>${links.map(([id, label]) => `<a class="nav-link ${activePage === id ? 'active' : ''}" href="${routeHref(`${mode}/${id}`)}" data-route="${mode}/${id}">${label}</a>`).join('')}</section>`).join('');
  document.getElementById('docsTab').classList.toggle('selected', mode === 'docs');
  document.getElementById('referenceTab').classList.toggle('selected', mode === 'reference');
}
function renderRail(mode) {
  const rail = document.getElementById('rightRail');
  rail.innerHTML = `<div class="rail-title">DECA DEVELOPER</div><a href="#docs/home" data-route="docs/home">Docs</a><a href="#reference/home" data-route="reference/home">API Reference</a><div class="rail-card"><strong>Butuh akses API?</strong><p>Hubungi tim DECA untuk aktivasi merchant dan environment.</p><a href="mailto:partnership@deca.co.id">partnership@deca.co.id ↗</a></div><div class="rail-note">${mode === 'reference' ? 'Referensi endpoint tersedia langsung di portal ini.' : 'Panduan disusun mengikuti alur produk DECA.'}</div>`;
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
  if (item.contract) {
    content = contractBody(item.contract);
  } else if (item.group) {
    const group = endpointGroups[item.group];
    content = `${endpointList(group.items)}<div class="callout"><strong>Kontrak endpoint</strong><p>Parameter dan response lengkap tersedia di dokumentasi endpoint aktif DECA.</p></div>`;
  } else {
    content = item.body;
  }
  const groupInfo = item.group ? endpointGroups[item.group] : null;
  document.getElementById('mainContent').innerHTML = `<div class="page-head"><div class="breadcrumbs">DECA Developer <span>/</span> ${mode === 'reference' ? 'API Reference' : 'Docs'}</div><div class="eyebrow">${eyebrow}${groupInfo ? ` <span class="eyebrow-divider">/</span> ${groupInfo.flow} · ${groupInfo.protocol}` : ''}</div><h1>${item.title}</h1><p class="page-subtitle">${item.subtitle || ''}</p></div><div class="page-content">${content}</div>`;
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
