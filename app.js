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
    title: 'Authentication', flow: 'Authentication', protocol: 'SNAP & Non-SNAP',
    intro: 'Endpoint token untuk autentikasi request SNAP dan Non-SNAP.',
    items: [['POST B2B Access Token', 'POST', '/apiReference/post-v-1-0-access-token-b-2-b', 'SNAP · service code 73'],['Requesting an OAuth2 Access Token','POST','/apiReference/post-oauth-2-token','Non-SNAP · client credentials']]
  }
};

// Endpoint contracts verified against the published DECA specification.
// Pages without verified schema are still local and clearly marked Coming soon.
const endpointSpecs = {
  'post-v-1-0-qr-qr-mpm-generate': { path:'/snap/qris/v1.0/qr/qr-mpm-generate', service:'47', method:'POST', statuses:'200 · 400 · 401 · 409', request:[['amount','object','Required','value and currency'],['partnerReferenceNo','string','Required','Merchant transaction ID, max 64 characters'],['merchantId','string','Required','Merchant identifier, max 64 characters'],['storeId','string','Required','Store identifier, max 64 characters']], response:[['responseCode','string','Required','Seven digit response code'],['responseMessage','string','Required','Response description'],['referenceNo','string','Required','DECA transaction ID on success'],['partnerReferenceNo','string','Required','Merchant transaction ID'],['qrContent','string','Required','QR string for MPM'],['merchantName','string','Required','Merchant name'],['storeId','string','Required','Store identifier']], sample:{amount:{value:'10000.00',currency:'IDR'},partnerReferenceNo:'ORDER-20261015-001',merchantId:'merchant-id',storeId:'store-id'} },
  'post-v-1-0-qr-qr-mpm-query': { path:'/snap/qris/v1.0/qr/qr-mpm-query', service:'51', method:'POST', statuses:'200 · 400 · 401 · 404 · 409', request:[['originalPartnerReferenceNo','string','Required','Original merchant transaction ID, max 64 characters'],['serviceCode','string','Required','Two digit original transaction service code'],['merchantId','string','Required','Merchant identifier, max 64 characters']], response:[['responseCode','string','Required','Seven digit response code'],['responseMessage','string','Required','Response description'],['originalReferenceNo','string','Required','DECA transaction ID'],['originalPartnerReferenceNo','string','Required','Original merchant transaction ID'],['serviceCode','string','Required','Original service code'],['latestTransactionStatus','string','Required','00 success · 01 initiated · 02 paying · 03 pending · 04 refunded · 05 canceled · 06 failed · 07 not found'],['transactionStatusDesc','string','Required','Status description'],['paidTime','string','Required','ISO 8601 transaction time when paid']], sample:{originalPartnerReferenceNo:'ORDER-20261015-001',serviceCode:'47',merchantId:'merchant-id'} },
  'post-v-1-0-qr-qr-mpm-refund': { path:'/snap/qris/v1.0/qr/qr-mpm-refund', service:'78', method:'POST', statuses:'200 · 400 · 401 · 404 · 409 · 500', request:[['originalPartnerReferenceNo','string','Required','Original merchant transaction ID'],['partnerRefundNo','string','Required','Merchant refund reference'],['refundAmount','object','Optional','value and currency'],['reason','string','Optional','Refund reason; max 256 characters']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['originalPartnerReferenceNo','string','Required','Original merchant transaction reference'],['refundNo','string','Required','DECA refund reference'],['refundAmount','object','Required','value and currency'],['refundTime','string','Required','Refund datetime']], sample:{originalPartnerReferenceNo:'ORDER-20261015-001',partnerRefundNo:'REFUND-001',refundAmount:{value:'10000.00',currency:'IDR'},reason:'Customer request'} },
  'post-v-1-0-qr-qr-mpm-cancel': { path:'/snap/qris/v1.0/qr/qr-mpm-cancel', service:'53', method:'POST', statuses:'200 · 400 · 401 · 404 · 409 · 500', request:[['originalReferenceNo','string','Required','DECA transaction ID'],['merchantId','string','Required','Merchant identifier'],['reason','string','Required','Cancellation reason']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['originalReferenceNo','string','Required','DECA transaction ID'],['cancelTime','string','Required','Cancellation datetime in ISO 8601']], sample:{originalReferenceNo:'DECA-REFERENCE-001',merchantId:'merchant-id',reason:'Customer request'} },
  'post-v-1-qr-qr-mpm-decode': { path:'/snap/qris/v1.0/qr/qr-mpm-decode', service:'48', method:'POST', statuses:'200 · 400 · 401', request:[['partnerReferenceNo','string','Optional','Merchant transaction reference'],['qrContent','string','Required','QR string for MPM; max 512 characters'],['scanTime','string','Required','Time when the user scanned the QR']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['referenceNo','string','Required','DECA transaction reference'],['partnerReferenceNo','string','Required','Merchant transaction reference'],['redirectUrl','string','Required','Payment redirect URL'],['merchantName','string','Required','Merchant name'],['merchantCategory','string','Required','Merchant category'],['merchantLocation','string','Required','Merchant location'],['merchantInfos','object[]','Optional','Additional merchant information'],['merchantPAN','string','Required','Merchant PAN'],['acquirerName','string','Required','Acquirer name'],['accountNumber','string','Optional','Account number'],['transactionAmount','object','Required','value and currency'],['feeAmount','object','Optional','Fee amount']], sample:{partnerReferenceNo:'ORDER-001',qrContent:'000201...',scanTime:'2026-10-15T10:30:00+07:00'} },
  'post-webhook-qr-qr-mpm-notify': { path:'URL callback merchant', callbackPath:'/{version}/qr/qr-mpm-notify', service:'52', method:'WEBHOOK', statuses:'200', request:[['originalReferenceNo','string','Required','DECA transaction ID'],['originalPartnerReferenceNo','string','Required','Merchant transaction ID'],['latestTransactionStatus','string','Required','00 success · 01 initiated · 02 paying · 03 pending · 04 refunded · 05 canceled · 06 failed · 07 not found'],['transactionStatusDesc','string','Required','Status description; max 50 characters'],['amount','object','Required','Transaction amount; value and currency'],['externalStoreId','string','Required','External store ID']], response:[['responseCode','string','Required','Acknowledgement code'],['responseMessage','string','Required','Acknowledgement description']], sample:{originalReferenceNo:'DECA-REFERENCE-001',originalPartnerReferenceNo:'ORDER-20261015-001',latestTransactionStatus:'00',transactionStatusDesc:'Success',amount:{value:'10000.00',currency:'IDR'},externalStoreId:'store-id'} },
  'post-v-1-0-transfer-va-create-va': { path:'/snap/in/v1.0/transfer-va/create-va', service:'27', method:'POST', statuses:'200 · 400 · 401 · 409 · 500', request:[['partnerServiceId','string','Optional','Partner service identifier, max 8 characters'],['customerNo','string','Optional','Customer number, max 20 characters'],['virtualAccountNo','string','Optional','Virtual account number, max 28 characters'],['virtualAccountName','string','Required','Account holder name, max 255 characters'],['trxId','string','Required','Merchant transaction ID, max 64 characters'],['totalAmount','object','Required','value and currency'],['virtualAccountTrxType','string','Optional','C closed · O open'],['feeAmount','object','Optional','value and currency'],['expiredDate','string','Required','Expiry datetime in ISO 8601'],['additionalInfo','object','Required','Includes bankCode']], response:[['responseCode','string','Required','Seven digit response code'],['responseMessage','string','Required','Response description'],['virtualAccountData','object','Required','Virtual account details']], sample:{partnerServiceId:'12345678',customerNo:'CUSTOMER-001',virtualAccountNo:'',virtualAccountName:'Nama Pelanggan',trxId:'ORDER-001',totalAmount:{value:'10000.00',currency:'IDR'},virtualAccountTrxType:'C',expiredDate:'2026-10-16T23:59:59+07:00',additionalInfo:{bankCode:'DECA'}} },
  'post-v-1-0-transfer-va-status': { path:'/snap/in/v1.0/transfer-va/status', service:'26', method:'POST', statuses:'200 · 400 · 401 · 409 · 500', request:[['partnerServiceId','string','Required','Partner service identifier'],['customerNo','string','Required','Customer number'],['virtualAccountNo','string','Required','Virtual account number'],['inquiryRequestId','string','Required','Unique inquiry request ID']], response:[['responseCode','string','Required','Response description'],['responseMessage','string','Required','Response description'],['virtualAccountData','object','Required','VA details: partnerServiceId, customerNo, virtualAccountNo, inquiryRequestId, paidAmount, totalAmount, trxDateTime, paymentFlagStatus']], sample:{partnerServiceId:'12345678',customerNo:'CUSTOMER-001',virtualAccountNo:'88081234567890',inquiryRequestId:'INQ-001'} },
  'delete-v-1-0-transfer-va-delete-va': { path:'/snap/in/v1.0/transfer-va/delete-va', service:'31', method:'DELETE', statuses:'200 · 400 · 401 · 404 · 500', request:[['partnerServiceId','string','Required','Partner service identifier'],['customerNo','string','Required','Customer number'],['virtualAccountNo','string','Required','Virtual account number']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description']], sample:{partnerServiceId:'12345678',customerNo:'CUSTOMER-001',virtualAccountNo:'88081234567890'} },
  'post-webhook-transfer-va-payment': { path:'URL callback merchant', callbackPath:'/api/v1.0/transfer-va/payment', service:'25', method:'WEBHOOK', statuses:'200', request:[['partnerServiceId','string','Required','Partner service identifier'],['customerNo','string','Required','Virtual account number; max 20 characters'],['virtualAccountNo','string','Required','Virtual account number; max 28 characters'],['virtualAccountName','string','Optional','Virtual account holder name'],['trxId','string or null','Nullable','Merchant transaction ID may be null'],['paymentRequestId','integer','Required','DECA payment request ID'],['paidAmount','object','Required','value and currency'],['totalAmount','object','Required','value and currency'],['trxDateTime','string','Required','Transaction datetime in ISO 8601'],['additionalInfo','object','Required','Additional information; can be empty']], response:[['responseCode','string','Required','Acknowledgement code'],['responseMessage','string','Required','Acknowledgement description'],['virtualAccountData','object','Required','Legacy response schema also lists virtualAccountData']], sample:{partnerServiceId:'12345678',customerNo:'88081234567890',virtualAccountNo:'88081234567890',virtualAccountName:'Nama Pelanggan',trxId:'ORDER-001',paymentRequestId:12345,paidAmount:{value:'10000.00',currency:'IDR'},totalAmount:{value:'10000.00',currency:'IDR'},trxDateTime:'2026-10-15T10:30:00+07:00',additionalInfo:{}} },
  'post-v-1-0-emoney-bank-account-inquiry': { path:'/snap/out/v1.0/emoney/bank-account-inquiry', service:'42', method:'POST', statuses:'200 · 400 · 401 · 403 · 409 · 500', request:[['customerNumber','string','Required','Partner customer phone number'],['beneficiaryAccountNumber','string','Required','Beneficiary bank account number']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['referenceNo','string','Required','DECA transaction ID'],['partnerReferenceNo','string','Required','Merchant transaction ID'],['beneficiaryAccountNumber','string','Required','Beneficiary account number'],['beneficiaryAccountName','string','Required','Beneficiary account name'],['beneficiaryBankCode','string','Required','AJ beneficiary bank code'],['beneficiaryBankShortName','string','Required','Bank short name'],['beneficiaryBankName','string','Required','Bank name'],['amount','object','Optional','value and currency']], sample:{customerNumber:'081234567890',beneficiaryAccountNumber:'1234567890'} },
  'post-v-1-0-emoney-transfer-bank': { path:'/snap/out/v1.0/emoney/transfer-bank', service:'43', method:'POST', statuses:'200 · 400 · 401 · 403 · 409 · 500', request:[['partnerReferenceNo','string','Required','Merchant transaction ID'],['customerNumber','string','Required','Partner customer phone number'],['beneficiaryAccountNumber','string','Required','Beneficiary account number'],['beneficiaryBankCode','string','Required','AJ beneficiary bank code']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['referenceNo','string','Required','DECA transaction ID'],['partnerReferenceNo','string','Required','Merchant transaction ID'],['transactionDate','string','Required','ISO 8601 transaction time'],['referenceNumber','string','Required','Provider transaction ID']], sample:{partnerReferenceNo:'PAYOUT-001',customerNumber:'081234567890',beneficiaryAccountNumber:'1234567890',beneficiaryBankCode:'014'} },
  'post-webhook-emoney-transfer-bank-notify': { path:'URL callback merchant', callbackPath:'/api/v1.0/emoney/transfer-bank', service:'43', method:'WEBHOOK', statuses:'200', request:[['originalPartnerReferenceNo','string','Required','Original merchant reference'],['originalReferenceNo','string','Required','DECA transaction ID'],['latestTransactionStatus','string','Required','00 success · 03 pending · 06 failed'],['transactionStatusDesc','string','Required','Transaction status description'],['amount','object','Required','Transfer amount; value and currency']], response:[['responseCode','string','Required','Acknowledgement code'],['responseMessage','string','Required','Acknowledgement description']], sample:{originalPartnerReferenceNo:'PAYOUT-001',originalReferenceNo:'DECA-REFERENCE-001',latestTransactionStatus:'00',transactionStatusDesc:'Success',amount:{value:'10000.00',currency:'IDR'}} },
  'post-v-1-0-emoney-account-inquiry': { path:'/snap/out/v1.0/emoney/account-inquiry', service:'37', method:'POST', statuses:'200 · 400 · 401 · 404 · 409', request:[['customerNumber','string','Required','Customer phone number (alphanumeric)']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['partnerReferenceNo','string','Required','Merchant transaction ID'],['customerNumber','string','Required','Masked customer phone number'],['customerName','string','Required','Customer name']], sample:{customerNumber:'081234567890'} },
  'post-v-1-0-emoney-customer-top-up': { path:'/snap/out/v1.0/emoney/topup', service:'38', method:'POST', statuses:'200 · 400 · 401 · 403 · 409 · 500', request:[['partnerReferenceNo','string','Required','Merchant transaction ID'],['customerNumber','string','Required','Customer account number']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['referenceNo','string','Required','DECA transaction ID'],['partnerReferenceNo','string','Required','Merchant transaction ID'],['customerNumber','string','Required','Customer phone number'],['amount','object','Required','value and currency']], sample:{partnerReferenceNo:'TOPUP-001',customerNumber:'081234567890'} },
  'post-v-1-0-emoney-customer-top-up-inquiry-status': { path:'/snap/out/v1.0/emoney/topup-status', service:'39', method:'POST', statuses:'200 · 400 · 401 · 409 · 500', request:[['serviceCode','string','Required','Original transaction service code']], response:[], sample:{serviceCode:'38'} },
  'post-v-1-0-emoney-bulk-cashin-payment': { path:'/snap/out/v1.0/emoney/bulk-cashin-payment', service:'40', method:'POST', statuses:'200 · 400 · 401 · 403 · 409 · 500', request:[['partnerBulkId','string','Required','Merchant batch transaction ID'],['transactionDate','string','Required','ISO 8601 transaction date'],['currency','string','Required','Transaction currency']], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['bulkId','string','Required','DECA batch ID'],['partnerBulkId','string','Required','Merchant batch ID']], sample:{partnerBulkId:'BULK-001',transactionDate:'2026-10-15T10:30:00+07:00',currency:'IDR'} },
  'post-webhook-emoney-bulk-cashin-notify': { path:'URL callback merchant', callbackPath:'/api/v1.0/emoney/bulk-cashin-payment', service:'40', method:'WEBHOOK', statuses:'200', request:[['originalPartnerBulkId','string','Required','Original merchant batch ID'],['originalBulkId','string','Required','DECA batch ID'],['transactionDate','string','Required','ISO 8601 transaction date'],['totalAmount','object','Required','Batch total amount'],['transactionStatus','string','Required','Transaction status code'],['transactionStatusDesc','string','Required','Status description']], response:[['responseCode','string','Required','Acknowledgement code'],['responseMessage','string','Required','Acknowledgement description']], sample:{originalPartnerBulkId:'BULK-001',originalBulkId:'DECA-BULK-001',transactionDate:'2026-10-15T10:30:00+07:00',totalAmount:{value:'10000.00',currency:'IDR'},transactionStatus:'00',transactionStatusDesc:'Success'} },
  'post-v-1-0-balance-inquiry': { path:'/snap/acct/v1.0/balance-inquiry', service:'11', method:'POST', statuses:'200 · 400 · 401 · 404 · 500', request:[], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['partnerReferenceNo','string','Required','Merchant request reference'],['referenceNo','string','Required','DECA request reference'],['accountNo','string','Required','Account number'],['name','string','Required','Account holder name'],['accountInfos','object[]','Required','Balance information by type']], sample:{} },
  'post-v-1-0-bank-statement': { path:'/snap/acct/v1.0/bank-statement', service:'14', method:'POST', statuses:'200 · 400 · 401 · 500', request:[], response:[['responseCode','string','Required','Response code'],['responseMessage','string','Required','Response description'],['partnerReferenceNo','string','Required','Merchant request reference'],['referenceNo','string','Required','DECA request reference'],['hasMore','boolean','Required','Whether more statement pages are available'],['lastRecordDateTime','string','Optional','Datetime of the last record'],['detailData','object[]','Required','Statement transaction details'],['detailBalance','object','Required','Opening and closing balances'],['nextPageToken','string','Optional','Token for the next page']], sample:{} },
  'post-v-1-0-access-token-b-2-b': { path:'/snap/auth/v1.0/access-token/b2b', service:'73', method:'POST', statuses:'200 · 400 · 401', headers:[['X-CLIENT-KEY','string','Required','Client ID issued during merchant registration.'],['X-SIGNATURE','string','Required','Signature; see Generate Signature > B2B Token.'],['X-TIMESTAMP','date-time','Required','Current ISO 8601 time with GMT+7 offset.']], request:[['grantType','string','Required','Constant value: client_credentials']], response:[['responseCode','string','Required','Seven digit response code'],['responseMessage','string','Required','Response description'],['accessToken','string','Required','B2B access token'],['tokenType','string','Required','Token type'],['expiresIn','integer','Required','Token lifetime in seconds']] },
  'post-oauth-2-token': { path:'/oauth2/token', service:'Non-SNAP', method:'POST', statuses:'200 · 400', headers:[['Content-Type','string','Required','application/x-www-form-urlencoded'],['Authorization','string','Optional','HTTP Basic authentication using client_id and client_secret.']], request:[['grant_type','string','Required','Constant value: client_credentials'],['client_id','string','Optional','Client ID; may instead be provided using Basic authentication.'],['client_secret','string','Optional','Client secret; may instead be provided using Basic authentication.'],['scope','string','Optional','Requested scopes. If omitted, all allowed scopes are assigned.']], response:[['access_token','string','Required','Bearer token used to authenticate subsequent requests.'],['expires_in','integer','Required','Token lifetime in seconds.'],['scope','string','Required','Scopes assigned to the token.'],['token_type','string','Required','Authorization scheme; Bearer.']], errorResponse:[['message','string','Optional','Error description.'],['status_code','integer','Optional','HTTP status code.'],['error_code','integer','Optional','OAuth error code.']], sampleFormat:'form', sample:{grant_type:'client_credentials',client_id:'YOUR_CLIENT_ID',client_secret:'YOUR_CLIENT_SECRET',scope:''} },
  'post-ec-v-1-copg-order': { path:'/ec/v1/copg/order', service:'Non-SNAP', method:'POST', statuses:'200 · 400', headers:[['Authorization','string','Required','Bearer access token.'],['X-Deca-Timestamp','string','Required','Request timestamp.'],['X-Deca-Signature','string','Required','Signature for the request.']], request:[['reference_id','string','Required','Merchant order reference'],['total','integer','Required','Total amount'],['items','object[]','Required','Line items contain name, qty, and nominal'],['payment_channel','string','Required','Selected payment channel'],['finish_redirect_url','string','Required','URL after successful payment'],['unfinish_redirect_url','string','Required','URL when payment is not completed']], response:[], sample:{reference_id:'ORDER-001',total:10000,items:[{name:'Pembayaran',qty:1,nominal:10000}],payment_channel:'QRIS',finish_redirect_url:'https://merchant.example/success',unfinish_redirect_url:'https://merchant.example/pending'} },
  'get-ec-v-1-copg-order-reference': { path:'/ec/v1/copg/order/reference/:reference_id', service:'Non-SNAP', method:'GET', statuses:'200 · 400', headers:[['Authorization','string','Required','Bearer access token.'],['X-Deca-Timestamp','string','Required','Request timestamp.'],['X-Deca-Signature','string','Required','Signature for the request.']], request:[['reference_id','string','Required','Merchant order reference in the path']], response:[], sample:null },
  'get-ec-v-1-payment-id': { path:'/ec/v1/payment/:payment_id', service:'Non-SNAP', method:'GET', statuses:'200 · 400', headers:[['Authorization','string','Required','Bearer access token.'],['X-Deca-Timestamp','string','Required','Request timestamp.'],['X-Deca-Signature','string','Required','Signature for the request.']], request:[['payment_id','integer','Required','DECA payment identifier in the path']], response:[], sample:null },
  'get-ec-v-1-payment-reference-id': { path:'/ec/v1/payment/reference-id/:reference_id', service:'Non-SNAP', method:'GET', statuses:'200 · 400', headers:[['Authorization','string','Required','Bearer access token.'],['X-Deca-Timestamp','string','Required','Request timestamp.'],['X-Deca-Signature','string','Required','Signature for the request.']], request:[['reference_id','string','Required','Merchant payment reference in the path']], response:[], sample:null },
  'post-webhook-ec-payment-status': { path:'/webhook/ec/payment-status', service:'Non-SNAP', method:'POST', statuses:'200', headers:[['X-Deca-Timestamp','string','Required','Timestamp of the request.'],['X-Deca-Signature','string','Required','Signature for the request.']], request:[['notify_type','string','Required','Notification type'],['status','integer','Required','Payment status'],['reference_id','string','Required','Merchant order reference'],['payment_id','string','Required','DECA payment identifier'],['amount','string','Required','Amount as string'],['amount_decimal','number','Required','Amount as decimal'],['fee','string','Required','Fee as string'],['fee_decimal','number','Required','Fee as decimal'],['settlement_fee','string','Required','Settlement fee as string'],['settlement_fee_decimal','number','Required','Settlement fee as decimal'],['paid_at','string','Required','Payment datetime']], response:[], sample:{notify_type:'payment',status:1,reference_id:'ORDER-001',payment_id:'123',amount:'10000',amount_decimal:10000,fee:'100',fee_decimal:100,settlement_fee:'50',settlement_fee_decimal:50,paid_at:'2026-10-15T10:30:00+07:00'} },
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
  externalCheckout: { title: 'External Checkout', subtitle: 'Referensi checkout pembayaran DECA menggunakan protokol Non-SNAP.', body: `<p>Endpoint, header, dan payload yang tersedia di docs DECA ditampilkan sebagai halaman lokal. Untuk lookup payment, docs lama mencantumkan HTTP status tanpa schema atau contoh body response.</p><div class="link-list">${externalRow('Create Checkout Order','POST','/nonSnapReference/generated/post-ec-v-1-copg-order','Membuat order checkout.')} ${externalRow('Get Checkout Order','GET','/nonSnapReference/generated/get-ec-v-1-copg-order-reference','Mengambil informasi checkout order.')} ${externalRow('Get Payment By ID','GET','/nonSnapReference/generated/get-ec-v-1-payment-id','Mengambil pembayaran berdasarkan ID.')} ${externalRow('Get Payment By Reference ID','GET','/nonSnapReference/generated/get-ec-v-1-payment-reference-id','Mengambil pembayaran berdasarkan reference.')} ${externalRow('Payment Status Changed Webhook','POST','/nonSnapReference/generated/post-webhook-ec-payment-status','Notifikasi perubahan status pembayaran.')} ${externalRow('External Checkout Payment Webhook','POST','/nonSnapReference/generated/post-webhook-ec-payment','Notifikasi pembayaran External Checkout.')}</div><div class="content-section"><h2>Autentikasi & signature</h2><p>Gunakan OAuth2 client credentials untuk memperoleh access token. Signature tiap request dihitung menggunakan HMAC-SHA256 dan parameter method, path, query, token, timestamp, serta body.</p>${linkRow('Lihat endpoint OAuth2 Access Token','reference/post-oauth-2-token')} ${linkRow('Lihat panduan Non-SNAP Signature','reference/nonsnapSignature')}</div>` }
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
  'post-oauth-2-token':'Requesting an OAuth2 Access Token',
  'post-ec-v-1-copg-order':'Create Checkout Order',
  'get-ec-v-1-copg-order-reference':'Get Checkout Order',
  'get-ec-v-1-payment-id':'Get Payment By ID',
  'get-ec-v-1-payment-reference-id':'Get Payment By Reference ID',
  'post-webhook-ec-payment-status':'Payment Status Changed Webhook',
  'post-webhook-ec-payment':'External Checkout Payment Webhook'
});
for (const [slug, spec] of Object.entries(endpointSpecs)) {
  referencePages[slug] = { title:endpointTitles[slug] || slug.replace(/^(post|delete|get)-/,'').replaceAll('-',' '), subtitle:spec.service === 'Non-SNAP' ? `Spesifikasi ${spec.method} DECA · protokol Non-SNAP.` : `Spesifikasi ${spec.method} DECA · service code ${spec.service}.`, contract:spec, group:endpointOwners[slug] };
}
referencePages.nonsnapSignature = { title:'Non-SNAP Signature', subtitle:'Membentuk signature untuk request External Checkout.', body:`<p>DECA memvalidasi timestamp, access token, dan signature pada request yang dilindungi. Signature dihitung dengan HMAC-SHA256 menggunakan signing key yang sesuai dengan access token.</p><div class="content-section"><h2>Formula</h2><details class="code-disclosure" open><summary>String yang ditandatangani</summary><pre><code>BodyHash = Base64Encode(SHA256(RequestBody))
StringToSign = HTTPMethod:Path:QueryString:AccessToken:Timestamp:BodyHash
Signature = Base64Encode(HMAC_SHA256(SigningKey, StringToSign))</code></pre></details><p>Output SHA256 dan HMAC_SHA256 adalah binary sebelum di-encode Base64. Jika query string atau request body kosong, gunakan string kosong untuk komponennya.</p></div><div class="content-section"><h2>Parameter</h2>${fieldTable([['HTTPMethod','string','Required','HTTP verb uppercase, misalnya GET atau POST.'],['Path','string','Required','Bagian path setelah hostname; harus diawali /.'],['QueryString','string','Required','Query ternormalisasi tanpa tanda ?; string kosong bila tidak ada.'],['AccessToken','string','Required','Token dari endpoint OAuth2; string kosong bila tidak ada.'],['Timestamp','string','Required','Nilai X-Deca-Timestamp.'],['RequestBody','string','Required','Raw request body; string kosong bila tidak ada.'],['SigningKey','string','Required','Signing key untuk menandatangani request.']])}</div><div class="content-section"><h2>Test vector dari docs DECA</h2><div class="table-wrap"><table class="param-table"><thead><tr><th>Parameter</th><th>Nilai</th></tr></thead><tbody><tr><td>HTTPMethod</td><td>POST</td></tr><tr><td>Path</td><td>/test/path</td></tr><tr><td>QueryString</td><td>one=1&amp;two=2</td></tr><tr><td>AccessToken</td><td>test_access_token</td></tr><tr><td>Timestamp</td><td>1234567890</td></tr><tr><td>RequestBody</td><td><code>{"three":3,"four":4}</code></td></tr><tr><td>SigningKey</td><td>test_signing_key</td></tr><tr><td>BodyHash</td><td><code>MreoBWQ49I0F4Wr7icp9xzxeDS2abC92NTOkA0UsRE8=</code></td></tr><tr><td>Signature</td><td><code>uJaJW7QhQ+fAoJJ71xkH4LKbemwFwdNB3OjviX42POs=</code></td></tr></tbody></table></div></div><div class="callout"><strong>Access token Non-SNAP</strong><p>Gunakan OAuth2 client credentials untuk memperoleh access token sebelum membuat signature.</p>${linkRow('Buka endpoint OAuth2 Access Token','reference/post-oauth-2-token')}</div>` };

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
  ['AUTHENTICATION', [['auth','Token access'],['headers','Request headers'],['nonsnapSignature','Non-SNAP signature']]]
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
const legacyResponseCodes = {
  'post-v-1-0-qr-qr-mpm-generate': {'200':[['2004700','Request has been processed successfully']], '400':[['4004701','Invalid Field Format amount'],['4004702','Invalid Mandatory Field amount']], '401':[['4014700','Unauthorized. [Invalid Header]'],['4014701','Invalid Token (B2B)']], '409':[['4094700','Conflict']]},
  'post-v-1-0-qr-qr-mpm-query': {'200':[['2005100','Request has been processed successfully']], '400':[['4005101','Invalid Field Format merchantId'],['4005102','Invalid Mandatory Field Format merchantId']], '401':[['4015100','Unauthorized. [Invalid Header]'],['4015101','Invalid Token (B2B)']], '404':[['4045101','Transaction Not Found']], '409':[['4095100','Conflict']]},
  'post-v-1-0-qr-qr-mpm-refund': {'200':[['2007800','Successful']], '400':[['4007801','Invalid Field Format originalPartnerReferenceNo'],['4007802','Invalid Mandatory Field originalPartnerReferenceNo']], '401':[['4017800','Unauthorized. [Invalid Header]'],['4017801','Invalid Token (B2B)']], '404':[['4047801','Transaction Not Found']], '409':[['4097800','Cannot use same X-EXTERNAL-ID in same day'],['4097801','Duplicate partnerReferenceNo']], '500':[['5007801','Internal Server Error']]},
  'post-v-1-0-qr-qr-mpm-cancel': {'200':[['2005300','Successful']], '400':[['4005301','Invalid Field Format originalReferenceNo'],['4005302','Invalid Mandatory Field originalReferenceNo']], '401':[['4015300','Unauthorized. [Invalid Header]'],['4015301','Invalid Token (B2B)']], '404':[['4045301','Transaction Not Found']], '409':[['4095300','Cannot use same X-EXTERNAL-ID in same day']], '500':[['5005300','General error']]},
  'post-v-1-qr-qr-mpm-decode': {'200':[['2004800','Request has been processed successfully']], '400':[['4004801','Invalid Field Format qrContent']], '401':[['4014800','Unauthorized. [Invalid Header]'],['4014801','Invalid Token (B2B)']]},
  'post-webhook-qr-qr-mpm-notify': {'200':[['2005200','Request has been processed successfully']]},
  'post-v-1-0-transfer-va-create-va': {'200':[['2002700','Successful']], '409':[['409XX00','Conflict']], '500':[['500XX00','General error']]},
  'post-v-1-0-transfer-va-status': {'200':[['2002600','Successful']], '409':[['409XX00','Conflict']], '500':[['500XX00','General error']]},
  'delete-v-1-0-transfer-va-delete-va': {'200':[['2003100','Successful']], '404':[['4043100','Invalid Virtual Account']], '500':[['500XX00','General error']]},
  'post-webhook-transfer-va-payment': {'200':[['2002500','Successful']]},
  'post-v-1-0-balance-inquiry': {'200':[['2001100','Successful']], '404':[['4041100','Account Not Found']], '500':[['500XX00','General error']]},
  'post-v-1-0-bank-statement': {'200':[['2001400','Successful']], '500':[['500XX00','General error']]},
  'post-v-1-0-emoney-bank-account-inquiry': {'200':[['2004200','Successful']], '400':[['4004201','Invalid Field Format customerNumber'],['4004202','Invalid Mandatory Field customerNumber'],['4004201','Invalid Field Format bankCode']], '401':[['4014200','Unauthorized. [Invalid Header]'],['4014201','Invalid Token (B2B)']], '403':[['4034214','Insufficient Funds'],['4034202','Exceeds Transaction Amount Limit']], '409':[['4094200','Conflict']], '500':[['5004200','General error']]},
  'post-v-1-0-emoney-transfer-bank': {'200':[['2004300','Successful']], '400':[['4004301','Invalid Field Format beneficiaryBankCode'],['4004302','Invalid Mandatory Field partnerReferenceNo']], '401':[['4014300','Unauthorized. [Invalid Header]'],['4014301','Invalid Token (B2B)']], '403':[['4034301','Feature Not Allowed [API is currently disabled]'],['4034314','Insufficient Funds'],['4034302','Exceeds Transaction Amount Limit']], '409':[['4094300','Conflict']], '500':[['5004300','General error']]},
  'post-v-1-0-emoney-account-inquiry': {'200':[['2003700','Successful']], '400':[['4003701','Invalid Field Format customerNumber'],['4003702','Invalid Mandatory Field customerNumber']], '401':[['4013700','Unauthorized. [Invalid Header]'],['4013701','Invalid Token (B2B)']], '404':[['4043711','Invalid Account']], '409':[['4093700','Conflict']]},
  'post-v-1-0-emoney-bulk-cashin-payment': {'200':[['2004000','Successful']], '400':[['4004001','Invalid Field Format accountNumber'],['4004002','Invalid Mandatory Field partnerBulkId']], '401':[['4014000','Unauthorized. [Invalid Header]'],['4014001','Invalid Token (B2B)']], '403':[['4034014','Insufficient Funds']], '409':[['4094000','Conflict']], '500':[['5004000','General error']]},
  'post-v-1-0-emoney-customer-top-up': {'200':[['2003800','Request has been processed successfully']], '409':[['409XX00','Conflict']], '500':[['500XX00','General error']]},
  'post-v-1-0-emoney-customer-top-up-inquiry-status': {'409':[['409XX00','Conflict']], '500':[['500XX00','General error']]},
  'post-webhook-emoney-transfer-bank-notify': {'200':[['2004300','Request has been processed successfully']]},
  'post-webhook-emoney-bulk-cashin-notify': {'200':[['2004000','Request has been processed successfully']]},
  'post-v-1-0-access-token-b-2-b': {'200':[['2007300','Successful']], '400':[['4007301','Invalid Field Format grantType'],['4007302','Invalid Mandatory Field Format grantType']], '401':[['4017300','Unauthorized. [Unknown client]']]}
};
const responseLabels = {'200':'Success','400':'Bad Request','401':'Unauthorized','403':'Forbidden','404':'Not Found','409':'Conflict','500':'Server Error'};
const nestedResponseSamples = {
  'post-oauth-2-token': {access_token:'XXXxxxxXXXxXxXx...xXXxXxXXXXXxXxXXXx',expires_in:1800,scope:'dg_disbursement:write dg_inquiry:write pg_get_payment:read',token_type:'Bearer'},
  'post-v-1-qr-qr-mpm-decode': {transactionAmount:{value:'10000.00',currency:'IDR'},feeAmount:{value:'0.00',currency:'IDR'},merchantInfos:[]},
  'post-v-1-0-qr-qr-mpm-refund': {refundAmount:{value:'10000.00',currency:'IDR'}},
  'post-v-1-0-emoney-bank-account-inquiry': {amount:{value:'10000.00',currency:'IDR'}},
  'post-v-1-0-emoney-customer-top-up': {amount:{value:'10000.00',currency:'IDR'}},
  'post-v-1-0-transfer-va-create-va': {virtualAccountData:{partnerServiceId:'12345678',customerNo:'CUSTOMER-001',virtualAccountNo:'88081234567890',virtualAccountName:'Nama Pelanggan',trxId:'ORDER-001',totalAmount:{value:'10000.00',currency:'IDR'},feeAmount:{value:'0.00',currency:'IDR'},expiredDate:'2026-10-16T23:59:59+07:00',additionalInfo:{bankCode:'DECA'}}},
  'post-v-1-0-transfer-va-status': {virtualAccountData:{partnerServiceId:'12345678',customerNo:'CUSTOMER-001',virtualAccountNo:'88081234567890',inquiryRequestId:'INQ-001',paidAmount:{value:'10000.00',currency:'IDR'},totalAmount:{value:'10000.00',currency:'IDR'},trxDateTime:'2026-10-15T10:30:00+07:00',paymentFlagStatus:'00'}},
  'post-webhook-transfer-va-payment': {virtualAccountData:{partnerServiceId:'12345678',customerNo:'88081234567890',virtualAccountNo:'88081234567890',virtualAccountName:'Nama Pelanggan',trxId:'ORDER-001',paymentRequestId:12345,paidAmount:{value:'10000.00',currency:'IDR'},totalAmount:{value:'10000.00',currency:'IDR'},trxDateTime:'2026-10-15T10:30:00+07:00',additionalInfo:{}}},
  'post-v-1-0-balance-inquiry': {accountInfos:[{balanceType:'Cash',amount:{value:'100000.00',currency:'IDR'},availableBalance:{value:'100000.00',currency:'IDR'}}]},
  'post-v-1-0-bank-statement': {detailData:[{amount:{value:'10000.00',currency:'IDR'},transactionDate:'2026-10-15T10:30:00+07:00',remark:'Pembayaran',transactionId:'TRX-001',type:'CREDIT',transactionDetailStatus:'00',additionalInfo:{}}],detailBalance:{startAmount:{value:'90000.00',currency:'IDR'},endAmount:{value:'100000.00',currency:'IDR'},originAmount:{value:'90000.00',currency:'IDR'}}}
};
function sampleResponseBody(spec, slug, status, example) {
  if (status !== '200') {
    if (example) return {responseCode:example[0],responseMessage:example[1]};
    if (spec.errorResponse?.length) return Object.fromEntries(spec.errorResponse.map(([name,type])=>[name,type==='integer'||type==='number'?0:'string']));
    return null;
  }
  if (!spec.response?.length) return null;
  const body = {};
  const samples = nestedResponseSamples[slug] || {};
  for (const [name,type] of spec.response) {
    if (name === 'responseCode') body[name] = example?.[0] || 'string';
    else if (name === 'responseMessage') body[name] = example?.[1] || 'string';
    else if (Object.hasOwn(samples,name)) body[name] = samples[name];
    else if (type === 'object') body[name] = {};
    else if (type.includes('[]')) body[name] = [];
    else if (type === 'integer' || type === 'number') body[name] = 0;
    else body[name] = 'string';
  }
  if (example) { body.responseCode = example[0]; body.responseMessage = example[1]; }
  return body;
}
function responseExplorer(spec, slug) {
  const statuses = spec.statuses.split('·').map(value => value.trim());
  const note = spec.service === 'Non-SNAP' ? 'Kode di atas adalah HTTP status. Sample body ditampilkan bila tersedia di dokumentasi DECA.' : 'Status di atas adalah HTTP status. Nilai <code>responseCode</code> di contoh adalah kode bisnis DECA di dalam body.';
  return `<div class="response-explorer"><p class="response-note">${note}</p><div class="response-tabs" role="tablist" aria-label="HTTP response codes">${statuses.map((status,index) => `<button class="response-tab ${index===0?'active':''}" type="button" role="tab" aria-selected="${index===0}" data-response-tab="${index}"><strong>${status}</strong><span>${responseLabels[status] || 'Response'}</span></button>`).join('')}</div>${statuses.map((status,index) => {
    const examples = legacyResponseCodes[slug]?.[status] || [];
    const info = responseLabels[status] || 'Response';
    const sample = sampleResponseBody(spec,slug,status,examples[0]) || (status!=='200' && spec.service!=='Non-SNAP' ? {responseCode:'string',responseMessage:'string'} : null);
    const sampleMarkup = sample ? `<pre class="response-json"><code>${escapeHtml(JSON.stringify(sample,null,2))}</code></pre>` : `<div class="coming-contract"><strong>Body response belum dipublikasikan</strong><span>Docs lama hanya mencantumkan status HTTP untuk endpoint ini.</span></div>`;
    const alternatives = examples.length > 1 ? `<div class="response-variants"><span>Contoh lain</span>${examples.slice(1).map(item=>`<pre class="response-json"><code>${escapeHtml(JSON.stringify({responseCode:item[0],responseMessage:item[1]},null,2))}</code></pre>`).join('')}</div>` : '';
    const note = examples.length ? `${examples.length} example${examples.length>1?'s':''} dari docs lama` : sample ? 'Schema response dari docs lama; sample kode spesifik tidak tersedia' : 'Contoh response tidak tersedia di docs lama';
    return `<div class="response-panel ${index===0?'active':''}" role="tabpanel" data-response-panel="${index}"><div class="response-panel-heading"><strong>${info}</strong><span>${note}</span></div>${sampleMarkup}${alternatives}</div>`;
  }).join('')}</div>`;
}
function contractBody(spec, slug) {
  const isWebhook = spec.method === 'WEBHOOK';
  const route = spec.path === 'URL callback merchant' ? `Callback merchant${spec.callbackPath ? ` · ${spec.callbackPath}` : ''}` : `https://api.dev.deca.co.id${spec.path}`;
  const headers = spec.headers || (spec.service === 'Non-SNAP' || spec.service === '73' ? [] : snapHeaders);
  return `<div class="endpoint-contract">
    <div class="endpoint-request-line"><span class="method ${spec.method.toLowerCase()}">${spec.method}</span><code>${escapeHtml(route)}</code><span class="protocol-label">${spec.service === 'Non-SNAP' ? 'Non-SNAP' : `Service code ${escapeHtml(spec.service)}`}</span></div>
    <div class="contract-meta"><span>Environment</span><code>https://api.dev.deca.co.id</code><span>Response codes</span><code>${escapeHtml(spec.statuses)}</code></div>
    ${spec.comingSoon ? `<div class="coming-contract prominent"><strong>Coming soon</strong><span>Method dan path sudah dicatat, tetapi request, response, dan aturan autentikasi belum dimigrasikan ke dokumentasi baru.</span></div>` : ''}
    ${isWebhook ? `<div class="callout"><strong>URL callback</strong><p>URL endpoint ini disediakan oleh merchant dan didaftarkan saat aktivasi. DECA mengirim payload callback ke URL tersebut.</p></div>` : ''}
    ${headers.length ? `<section class="content-section"><h2>Request headers</h2>${fieldTable(headers,'Header','Keterangan')}</section>` : ''}
    <section class="content-section"><h2>${isWebhook ? 'Callback payload' : spec.method === 'GET' ? 'Path parameters' : 'Request body'}</h2>${fieldTable(spec.request,'Field','Description')}${spec.sample && Object.keys(spec.sample).length ? `<details class="code-disclosure"><summary>${spec.sampleFormat === 'form' ? 'Contoh form-urlencoded' : 'Contoh JSON'}</summary><pre><code>${escapeHtml(spec.sampleFormat === 'form' ? Object.entries(spec.sample).map(([key,value])=>`${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&') : JSON.stringify(spec.sample,null,2))}</code></pre></details>` : ''}</section>
    <section class="content-section"><h2>Response</h2>${fieldTable(spec.response,'Field','Description')}${responseExplorer(spec,slug)}</section>
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
    content = contractBody(item.contract, page);
  } else if (item.group) {
    const group = endpointGroups[item.group];
    content = `${endpointList(group.items)}<div class="callout"><strong>Detail endpoint</strong><p>Buka endpoint untuk melihat request, response code, dan contoh payload yang tersedia.</p></div>`;
  } else {
    content = item.body;
  }
  const groupInfo = item.group ? endpointGroups[item.group] : null;
  document.getElementById('mainContent').innerHTML = `<div class="page-head"><div class="breadcrumbs">DECA Developer <span>/</span> ${mode === 'reference' ? 'API Reference' : 'Docs'}</div><div class="eyebrow">${eyebrow}${groupInfo ? ` <span class="eyebrow-divider">/</span> ${groupInfo.flow} · ${groupInfo.protocol}` : ''}</div><h1>${item.title}</h1><p class="page-subtitle">${item.subtitle || ''}</p></div><div class="page-content">${content}</div>`;
  bindRouteLinks();
  bindResponseTabs();
}
function bindRouteLinks() {
  document.querySelectorAll('[data-route]').forEach(link => link.onclick = event => { event.preventDefault(); if (link.closest('#searchResults')) closeSearch(); navigate(link.dataset.route); });
}
function bindResponseTabs() {
  document.querySelectorAll('.response-tab').forEach(tab => tab.onclick = () => {
    const root = tab.closest('.response-explorer');
    root.querySelectorAll('.response-tab').forEach(item => { const active = item === tab; item.classList.toggle('active',active); item.setAttribute('aria-selected',String(active)); });
    root.querySelectorAll('.response-panel').forEach(panel => panel.classList.toggle('active',panel.dataset.responsePanel === tab.dataset.responseTab));
  });
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
