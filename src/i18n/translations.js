export const translations = {
  en: {
    // Header
    appTitle: 'Tender Document Package Builder',
    languageSwitch: 'বাংলা',
    
    // Steps
    step1: 'Step 1: Load Requirements',
    step2: 'Step 2: Upload PDF Files',
    step3: 'Step 3: Match Files to Requirements',
    step4: 'Step 4: Enter Expiry Dates',
    step5: 'Step 5: Generate Package',
    
    // Tender Info
    tenderInfo: 'Tender Information',
    tenderId: 'Tender ID',
    title: 'Title',
    procuringEntity: 'Procuring Entity',
    bidder: 'Bidder',
    submissionDeadline: 'Submission Deadline',
    
    // Requirements
    requirements: 'Required Documents',
    document: 'Document',
    type: 'Type',
    status: 'Status',
    expiryDate: 'Expiry Date',
    matchedFile: 'Matched File',
    mandatory: 'Mandatory',
    optional: 'Optional',
    
    // Status
    statusMissing: 'Missing',
    statusExpiryNeeded: 'Expiry date needed',
    statusExpired: 'Expired',
    statusNotProvided: 'Not provided',
    statusOk: 'OK',
    
    // File Upload
    uploadFiles: 'Upload PDF Files',
    dragDrop: 'Drag and drop PDF files here, or click to select',
    uploadedFiles: 'Uploaded Files',
    fileName: 'File Name',
    pages: 'Pages',
    actions: 'Actions',
    remove: 'Remove',
    duplicate: 'DUPLICATE',
    duplicateWarning: 'This file has the same content as another uploaded file',
    
    // Matching
    matchFiles: 'Match Files to Documents',
    selectFile: 'Select a file...',
    noFileSelected: 'No file selected',
    matchFile: 'Match File',
    clearMatch: 'Clear Match',
    enterExpiryDate: 'Enter expiry date',
    
    // Validation messages
    errorInvalidJSON: 'Invalid JSON file. Please select a valid requirements.json file.',
    errorNotPDF: 'Only PDF files are allowed.',
    errorFileTooBig: 'Total file size exceeds 50 MB limit.',
    errorTooManyFiles: 'Maximum 30 files allowed.',
    errorDuplicateFile: 'This file is a duplicate and cannot be matched to a different document.',
    errorLoadingFile: 'Error loading file. The file may be corrupted or password-protected.',
    errorGeneratingPDF: 'Error generating PDF package.',
    
    // Generate
    generatePackage: 'Generate Package',
    blockingIssues: 'Cannot generate package. Please resolve the following issues:',
    missingDocs: 'Missing mandatory documents',
    expiredDocs: 'Expired documents',
    expiryNeeded: 'Expiry dates needed',
    generating: 'Generating package...',
    downloadPackage: 'Download Package',
    packageGenerated: 'Package generated successfully!',
    
    // Buttons
    loadJSON: 'Load requirements.json',
    selectFiles: 'Select Files',
    
    // Cover page
    coverTitle: 'TENDER DOCUMENT PACKAGE',
    packageDate: 'Package Generated On',
    includedDocuments: 'Included Documents',
    
    // General
    loading: 'Loading...',
    noData: 'No data loaded. Please load a requirements.json file to begin.',
    
    // Instructions
    howToUse: 'How to use this app:',
    instruction1: 'Load your requirements.json file',
    instruction2: 'Upload all required PDF documents',
    instruction3: 'Match each PDF to its corresponding requirement',
    instruction4: 'Enter expiry dates for documents that need them',
    instruction5: 'Review the status of all documents',
    instruction6: 'Generate and download the complete package',
  },
  bn: {
    // Header
    appTitle: 'দরপত্র নথি প্যাকেজ নির্মাতা',
    languageSwitch: 'English',
    
    // Steps
    step1: 'ধাপ ১: প্রয়োজনীয়তা লোড করুন',
    step2: 'ধাপ ২: PDF ফাইল আপলোড করুন',
    step3: 'ধাপ ৩: ফাইলগুলি প্রয়োজনীয়তার সাথে মিলান',
    step4: 'ধাপ ৪: মেয়াদ শেষের তারিখ লিখুন',
    step5: 'ধাপ ৫: প্যাকেজ তৈরি করুন',
    
    // Tender Info
    tenderInfo: 'দরপত্রের তথ্য',
    tenderId: 'দরপত্র আইডি',
    title: 'শিরোনাম',
    procuringEntity: 'ক্রয়কারী সংস্থা',
    bidder: 'দরদাতা',
    submissionDeadline: 'জমা দেওয়ার শেষ তারিখ',
    
    // Requirements
    requirements: 'প্রয়োজনীয় নথি',
    document: 'নথি',
    type: 'ধরন',
    status: 'অবস্থা',
    expiryDate: 'মেয়াদ শেষের তারিখ',
    matchedFile: 'মিলিত ফাইল',
    mandatory: 'বাধ্যতামূলক',
    optional: 'ঐচ্ছিক',
    
    // Status
    statusMissing: 'অনুপস্থিত',
    statusExpiryNeeded: 'মেয়াদ শেষের তারিখ প্রয়োজন',
    statusExpired: 'মেয়াদ শেষ',
    statusNotProvided: 'প্রদান করা হয়নি',
    statusOk: 'ঠিক আছে',
    
    // File Upload
    uploadFiles: 'PDF ফাইল আপলোড করুন',
    dragDrop: 'এখানে PDF ফাইল ড্র্যাগ এবং ড্রপ করুন, অথবা নির্বাচন করতে ক্লিক করুন',
    uploadedFiles: 'আপলোড করা ফাইল',
    fileName: 'ফাইলের নাম',
    pages: 'পৃষ্ঠা',
    actions: 'কর্ম',
    remove: 'সরান',
    duplicate: 'প্রতিলিপি',
    duplicateWarning: 'এই ফাইলটির বিষয়বস্তু অন্য একটি আপলোড করা ফাইলের মতোই',
    
    // Matching
    matchFiles: 'নথির সাথে ফাইল মিলান',
    selectFile: 'একটি ফাইল নির্বাচন করুন...',
    noFileSelected: 'কোনো ফাইল নির্বাচন করা হয়নি',
    matchFile: 'ফাইল মিলান',
    clearMatch: 'মিলান মুছুন',
    enterExpiryDate: 'মেয়াদ শেষের তারিখ লিখুন',
    
    // Validation messages
    errorInvalidJSON: 'অবৈধ JSON ফাইল। অনুগ্রহ করে একটি বৈধ requirements.json ফাইল নির্বাচন করুন।',
    errorNotPDF: 'শুধুমাত্র PDF ফাইল অনুমোদিত।',
    errorFileTooBig: 'মোট ফাইলের আকার ৫০ MB সীমা অতিক্রম করেছে।',
    errorTooManyFiles: 'সর্বোচ্চ ৩০টি ফাইল অনুমোদিত।',
    errorDuplicateFile: 'এই ফাইলটি একটি প্রতিলিপি এবং ভিন্ন নথিতে মিলানো যাবে না।',
    errorLoadingFile: 'ফাইল লোড করতে ত্রুটি। ফাইলটি দুর্নীত বা পাসওয়ার্ড-সুরক্ষিত হতে পারে।',
    errorGeneratingPDF: 'PDF প্যাকেজ তৈরি করতে ত্রুটি।',
    
    // Generate
    generatePackage: 'প্যাকেজ তৈরি করুন',
    blockingIssues: 'প্যাকেজ তৈরি করা যাচ্ছে না। অনুগ্রহ করে নিম্নলিখিত সমস্যাগুলি সমাধান করুন:',
    missingDocs: 'অনুপস্থিত বাধ্যতামূলক নথি',
    expiredDocs: 'মেয়াদ শেষ নথি',
    expiryNeeded: 'মেয়াদ শেষের তারিখ প্রয়োজন',
    generating: 'প্যাকেজ তৈরি হচ্ছে...',
    downloadPackage: 'প্যাকেজ ডাউনলোড করুন',
    packageGenerated: 'প্যাকেজ সফলভাবে তৈরি হয়েছে!',
    
    // Buttons
    loadJSON: 'requirements.json লোড করুন',
    selectFiles: 'ফাইল নির্বাচন করুন',
    
    // Cover page
    coverTitle: 'দরপত্র নথি প্যাকেজ',
    packageDate: 'প্যাকেজ তৈরির তারিখ',
    includedDocuments: 'অন্তর্ভুক্ত নথি',
    
    // General
    loading: 'লোড হচ্ছে...',
    noData: 'কোনো তথ্য লোড করা হয়নি। শুরু করতে একটি requirements.json ফাইল লোড করুন।',
    
    // Instructions
    howToUse: 'এই অ্যাপটি কীভাবে ব্যবহার করবেন:',
    instruction1: 'আপনার requirements.json ফাইল লোড করুন',
    instruction2: 'সমস্ত প্রয়োজনীয় PDF নথি আপলোড করুন',
    instruction3: 'প্রতিটি PDF তার সংশ্লিষ্ট প্রয়োজনীয়তার সাথে মিলান',
    instruction4: 'যে নথিগুলির প্রয়োজন তাদের জন্য মেয়াদ শেষের তারিখ লিখুন',
    instruction5: 'সমস্ত নথির অবস্থা পর্যালোচনা করুন',
    instruction6: 'সম্পূর্ণ প্যাকেজ তৈরি এবং ডাউনলোড করুন',
  },
};

// Helper function to get translation
export function getTranslation(lang, key) {
  return translations[lang]?.[key] || translations.en[key] || key;
}
