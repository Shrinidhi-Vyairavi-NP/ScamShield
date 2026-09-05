import { LanguageOption } from '../types';

export interface TranslationDict {
  // Brand & Nav
  brandName: string;
  tagline: string;
  tabScanner: string;
  tabExplainability: string;
  tabRadar: string;
  tabPersona: string;
  tabAnalytics: string;
  tabDownloads: string;
  tabPrivacy: string;
  tabSupport?: string;
  languageSelect: string;

  // Scanner
  scannerTitle: string;
  scannerSubtitle: string;
  pastePlaceholder: string;
  analyzeBtn: string;
  runAnalysisBtn: string;
  analyzingBtn: string;
  sampleScamsLabel: string;
  sampleSbiKyc: string;
  sampleDigitalArrest: string;
  sampleTelegramJob: string;
  sampleElectricityBill: string;
  sampleKbcLottery: string;
  selectChannelLabel: string;
  selectPersonaLabel: string;
  uploadScreenshotBtn: string;
  zeroRetentionBadge: string;

  // Explainability
  analysisTitle: string;
  analysisSubtitle: string;
  overallRiskScore: string;
  verdictSafe: string;
  verdictSuspicious: string;
  verdictMalicious: string;
  audioListenBtn: string;
  resetScanBtn: string;
  layer1Title: string;
  layer2Title: string;
  layer3Title: string;
  layer4Title: string;
  layer5Title: string;
  layer6Title: string;
  highlightsTitle: string;
  suspiciousLinksTitle: string;
  recommendedActionsTitle: string;
  reportingPortalsTitle: string;

  // Radar & Geo Map
  radarTitle: string;
  radarSubtitle: string;
  geoMapTitle: string;
  geoMapSubtitle: string;
  filterAllCategories: string;
  filterJobFraud: string;
  filterParcelCustoms: string;
  filterDigitalArrest: string;
  filterBankingKyc: string;
  filterUtilityBill: string;
  filterLottery: string;
  hotspotIncidents: string;
  hotspotThreatLevel: string;
  hotspotTopTarget: string;
  reportScamBtn: string;
  refreshFeedBtn: string;
  searchRadarPlaceholder: string;
  allRegions: string;
  allChannels: string;
  verifyBtn: string;
  verifiedBadge: string;
  submitReportModalTitle: string;
  publishReportBtn: string;

  // Personas
  personaTitle: string;
  personaSubtitle: string;
  studentTitle: string;
  seniorTitle: string;
  jobSeekerTitle: string;
  businessTitle: string;
  generalTitle: string;

  // Analytics
  analyticsTitle: string;
  analyticsSubtitle: string;
  totalScanned: string;
  scamsBlocked: string;
  zeroDayCatchRate: string;
  avgScanLatency: string;
  exportReportBtn: string;

  // Hub & Privacy
  downloadHubTitle: string;
  chromeExtension: string;
  mobileApp: string;
  privacyTitle: string;
  privacySubtitle: string;
  ephemeralMode: string;
}

export const translations: Record<LanguageOption, TranslationDict> = {
  english: {
    brandName: "ScramAway AI",
    tagline: "Multilingual Zero-Day Scam Shield",
    tabScanner: "AI Scam Scanner",
    tabExplainability: "6-Layer Explainability",
    tabRadar: "Live Scam Radar & Map",
    tabPersona: "Persona Profiler",
    tabAnalytics: "Analytics & History",
    tabDownloads: "App & Extension Hub",
    tabPrivacy: "Privacy Portal",
    languageSelect: "Language",

    scannerTitle: "Multi-Channel AI Scam & Phishing Scanner",
    scannerSubtitle: "Detect zero-day banking frauds, fake job offers, spoofed SMS, and digital arrest calls with sub-second AI reasoning.",
    pastePlaceholder: "Paste suspicious SMS, Email text, WhatsApp message, or URL here...",
    analyzeBtn: "ANALYZE THREAT NOW",
    runAnalysisBtn: "RUN FULL SCAM ANALYSIS",
    analyzingBtn: "RUNNING 6-LAYER AI SCAN...",
    sampleScamsLabel: "Try Instant Sample Scams:",
    sampleSbiKyc: "SBI Bank KYC Suspension SMS",
    sampleDigitalArrest: "Digital Arrest Coercion Call",
    sampleTelegramJob: "Telegram Task Job Scam",
    sampleElectricityBill: "Electricity Power Disconnection",
    sampleKbcLottery: "KBC 25 Lakh WhatsApp Lottery",
    selectChannelLabel: "Vector / Channel",
    selectPersonaLabel: "User Risk Persona",
    uploadScreenshotBtn: "Scan Message Screenshot (OCR)",
    zeroRetentionBadge: "ZERO-DATA RETENTION • RAM-ONLY INFERENCE",

    analysisTitle: "Forensic Scam Threat Assessment",
    analysisSubtitle: "Detailed 6-Layer breakdown explaining how this message attempts to deceive you.",
    overallRiskScore: "Overall Risk Score",
    verdictSafe: "SAFE COMMUNICATION",
    verdictSuspicious: "SUSPICIOUS / UNVERIFIED",
    verdictMalicious: "CRITICAL MALICIOUS FRAUD",
    audioListenBtn: "Listen Analysis Audio",
    resetScanBtn: "Scan Another Message",
    layer1Title: "Layer 1: Privacy & PII Sanitization",
    layer2Title: "Layer 2: Rule Engine & Domain Phishing",
    layer3Title: "Layer 3: Multilingual Intent & Sentiment",
    layer4Title: "Layer 4: Zero-Day AI Reasoning",
    layer5Title: "Layer 5: Dynamic Threat Velocity",
    layer6Title: "Layer 6: Defensive Action Plan",
    highlightsTitle: "Manipulative Phrasal Highlights",
    suspiciousLinksTitle: "Flagged Suspicious Links & Domains",
    recommendedActionsTitle: "Immediate Action Guidelines",
    reportingPortalsTitle: "Official Indian Cyber Crime Portals",

    radarTitle: "Real-Time Active Scam Radar",
    radarSubtitle: "Live intelligence feed of ongoing scams and spoofed campaigns reported across regions.",
    geoMapTitle: "Geo-Spatial Regional Hotspot Map",
    geoMapSubtitle: "Visual D3.js heatmap tracking regional fraud concentrations, job scams, and digital arrest incidents.",
    filterAllCategories: "All Categories",
    filterJobFraud: "Job & Task Fraud",
    filterParcelCustoms: "Parcel & Customs Scam",
    filterDigitalArrest: "Digital Arrest",
    filterBankingKyc: "Banking & OTP",
    filterUtilityBill: "Utility & Power Cut",
    filterLottery: "Lottery & Prizes",
    hotspotIncidents: "Incidents",
    hotspotThreatLevel: "Threat Level",
    hotspotTopTarget: "Top Target Persona",
    reportScamBtn: "REPORT NEW SCAM",
    refreshFeedBtn: "Refresh Telemetry",
    searchRadarPlaceholder: "Search by keyword, bank, or state...",
    allRegions: "All Regions & States",
    allChannels: "All Channels",
    verifyBtn: "Verify Report",
    verifiedBadge: "VERIFIED SCAM",
    submitReportModalTitle: "Submit Zero-Day Scam to Live Radar",
    publishReportBtn: "Publish Scam Report",

    personaTitle: "Personalized Risk Profiler",
    personaSubtitle: "Tailored threat detection heuristics based on demographics and digital habits.",
    studentTitle: "Student / Youth",
    seniorTitle: "Senior Citizen (60+)",
    jobSeekerTitle: "Job Seeker",
    businessTitle: "Business Owner",
    generalTitle: "General Citizen",

    analyticsTitle: "Analytics & Cyber Incident Logs",
    analyticsSubtitle: "Global threat velocity metrics, vector breakdowns, and exportable incident logs.",
    totalScanned: "TOTAL MESSAGES SCANNED",
    scamsBlocked: "SCAMS BLOCKED",
    zeroDayCatchRate: "ZERO-DAY CATCH RATE",
    avgScanLatency: "AVG SCAN LATENCY",
    exportReportBtn: "EXPORT INCIDENT REPORT",

    downloadHubTitle: "Mobile App & Browser Extension",
    chromeExtension: "Chrome Browser Extension",
    mobileApp: "Android & iOS Mobile App",
    privacyTitle: "Privacy & Data Portal",
    privacySubtitle: "Complete user data privacy controls and zero-retention verification.",
    ephemeralMode: "Zero-Retention Ephemeral Mode"
  },
  hindi: {
    brandName: "ScramAway AI",
    tagline: "बहुभाषी त्वरित घोटाला सुरक्षा",
    tabScanner: "एआई स्कैम स्कैनर",
    tabExplainability: "6-स्तरीय विश्लेषण",
    tabRadar: "लाइव स्कैम रडार एवं मानचित्र",
    tabPersona: "व्यक्तिगत जोखिम प्रोफाइल",
    tabAnalytics: "विश्लेषण एवं इतिहास",
    tabDownloads: "ऐप एवं एक्सटेंशन",
    tabPrivacy: "गोपनीयता पोर्टल",
    languageSelect: "भाषा चुनें",

    scannerTitle: "बहु-चैनल एआई फ्रॉड एवं फ़िशिंग स्कैनर",
    scannerSubtitle: "बैंक धोखाधड़ी, नकली नौकरी के प्रस्ताव, फर्जी एसएमएस और डिजिटल अरेस्ट कॉल की तुरंत जांच करें।",
    pastePlaceholder: "संदेहास्पद एसएमएस, ईमेल, व्हाट्सएप संदेश या लिंक यहाँ पेस्ट करें...",
    analyzeBtn: "अभी खतरे की जांच करें",
    runAnalysisBtn: "पूर्ण एआई फ्रॉड जांच चलाएं",
    analyzingBtn: "6-स्तरीय एआई जांच जारी है...",
    sampleScamsLabel: "उदाहरण संदेश आज़माएं:",
    sampleSbiKyc: "एसबीआई बैंक केवाईसी सस्पेंशन एसएमएस",
    sampleDigitalArrest: "डिजिटल अरेस्ट धमकी कॉल",
    sampleTelegramJob: "टेलीग्राम पार्ट-टाइम जॉब स्कैम",
    sampleElectricityBill: "बिजली बिल कनेक्शन कटने का संदेश",
    sampleKbcLottery: "केबीसी 25 लाख व्हाट्सएप लॉटरी",
    selectChannelLabel: "माध्यम / चैनल",
    selectPersonaLabel: "उपयोगकर्ता वर्ग",
    uploadScreenshotBtn: "स्क्रीनशॉट स्कैन करें (ओसीआर)",
    zeroRetentionBadge: "शून्य-डेटा भंडारण • पूर्णतः गोपनीय",

    analysisTitle: "फॉरेंसिक स्कैम खतरा मूल्यांकन",
    analysisSubtitle: "जानें कि यह संदेश आपको कैसे धोखा देने का प्रयास कर रहा है।",
    overallRiskScore: "कुल जोखिम स्कोर",
    verdictSafe: "सुरक्षित संदेश",
    verdictSuspicious: "संदेहास्पद / असत्यापित",
    verdictMalicious: "गंभीर हानिकारक फ्रॉड",
    audioListenBtn: "विश्लेषण ऑडियो सुनें",
    resetScanBtn: "दूसरा संदेश स्कैन करें",
    layer1Title: "स्तर 1: गोपनीयता एवं निजी डेटा सुरक्षा",
    layer2Title: "स्तर 2: फ़िशिंग एवं डोमेन नियम",
    layer3Title: "स्तर 3: बहुभाषी मंशा एवं भाषा विश्लेषण",
    layer4Title: "स्तर 4: एआई तार्किक विश्लेषण",
    layer5Title: "स्तर 5: गतिशील खतरे का स्तर",
    layer6Title: "स्तर 6: सुरक्षात्मक उपाय",
    highlightsTitle: "संदेहास्पद वाक्य एवं शब्द",
    suspiciousLinksTitle: "फ्लैग किए गए संदिग्ध लिंक",
    recommendedActionsTitle: "तत्काल आवश्यक कदम",
    reportingPortalsTitle: "आधिकारिक साइबर अपराध पोर्टल",

    radarTitle: "लाइव सक्रिय स्कैम रडार",
    radarSubtitle: "विभिन्न क्षेत्रों में दर्ज किए जा रहे धोखाधड़ी के लाइव आंकड़े।",
    geoMapTitle: "भू-स्थानिक क्षेत्रीय हॉटस्पॉट मानचित्र (D3.js)",
    geoMapSubtitle: "विभिन्न राज्यों और शहरों में नौकरी फ्रॉड, पार्सल फ्रॉड और डिजिटल अरेस्ट के क्षेत्रीय हॉटस्पॉट।",
    filterAllCategories: "सभी श्रेणियां",
    filterJobFraud: "नौकरी व टास्क फ्रॉड",
    filterParcelCustoms: "पार्सल व कस्टम्स फ्रॉड",
    filterDigitalArrest: "डिजिटल अरेस्ट",
    filterBankingKyc: "बैंकिंग व ओटीपी",
    filterUtilityBill: "बिजली बिल व कटौती",
    filterLottery: "लॉटरी व पुरस्कार",
    hotspotIncidents: "कुल घटनाएं",
    hotspotThreatLevel: "खतरे का स्तर",
    hotspotTopTarget: "मुख्य लक्ष्य वर्ग",
    reportScamBtn: "नए स्कैम की रिपोर्ट करें",
    refreshFeedBtn: "डेटा ताज़ा करें",
    searchRadarPlaceholder: "कीवर्ड, बैंक या राज्य खोजें...",
    allRegions: "सभी क्षेत्र व राज्य",
    allChannels: "सभी माध्यम",
    verifyBtn: "सत्यापित करें",
    verifiedBadge: "सत्यापित स्कैम",
    submitReportModalTitle: "लाइव रडार में नया स्कैम जोड़ें",
    publishReportBtn: "रिपोर्ट प्रकाशित करें",

    personaTitle: "व्यक्तिगत जोखिम प्रोफाइलर",
    personaSubtitle: "आपकी डिजिटल आदतों और उम्र के अनुसार अनुकूलित सुरक्षा सुझाव।",
    studentTitle: "छात्र / युवा",
    seniorTitle: "वरिष्ठ नागरिक (60+)",
    jobSeekerTitle: "नौकरी चाहने वाले",
    businessTitle: "व्यवसायी",
    generalTitle: "सामान्य नागरिक",

    analyticsTitle: "विश्लेषण एवं साइबर घटना लॉग",
    analyticsSubtitle: "वैश्विक स्कैम आंकड़े, चैनल विभाजन और निर्यात योग्य रिपोर्ट।",
    totalScanned: "कुल स्कैन किए गए संदेश",
    scamsBlocked: "रोके गए स्कैम",
    zeroDayCatchRate: "सटीकता दर",
    avgScanLatency: "औसत स्कैन समय",
    exportReportBtn: "घटना रिपोर्ट डाउनलोड करें",

    downloadHubTitle: "मोबाइल ऐप एवं एक्सटेंशन",
    chromeExtension: "क्रोम ब्राउज़र एक्सटेंशन",
    mobileApp: "एंड्रॉइड एवं आईओएस ऐप",
    privacyTitle: "गोपनीयता एवं डेटा सुरक्षा",
    privacySubtitle: "पूर्ण उपयोगकर्ता डेटा नियंत्रण और शून्य-भंडारण गारंटी।",
    ephemeralMode: "शून्य-भंडारण तात्कालिक मोड"
  },
  tamil: {
    brandName: "ScramAway AI",
    tagline: "பலமொழி உடனடி மோசடி தடுப்பு",
    tabScanner: "AI மோசடி கண்டறிதல்",
    tabExplainability: "6-அடுக்கு விளக்கம்",
    tabRadar: "நேரலை மோசடி ரேடார் & வரைபடம்",
    tabPersona: "தனிநபர் அபாய சுயவிவரம்",
    tabAnalytics: "பகுப்பாய்வு & வரலாறு",
    tabDownloads: "செயலி & உலாவி நீட்டிப்பு",
    tabPrivacy: "தனியுரிமை மையம்",
    languageSelect: "மொழியைத் தேர்வுசெய்க",

    scannerTitle: "பல-சேவை AI மோசடி கண்டறிதல்",
    scannerSubtitle: "வங்கி மோசடிகள், போலி வேலை வாய்ப்புகள் மற்றும் குறுஞ்செய்திகளை உடனுக்குடன் கண்டறியவும்.",
    pastePlaceholder: "சந்தேகத்திற்குரிய குறுஞ்செய்தி, மின்னஞ்சல் அல்லது லிங்க்-ஐ இங்கே ஒட்டவும்...",
    analyzeBtn: "அபாயத்தை உடனடியாக ஆராய்க",
    runAnalysisBtn: "முழு AI மோசடி ஆய்வை இயக்கு",
    analyzingBtn: "6-அடுக்கு AI ஆய்வு நடைபெறுகிறது...",
    sampleScamsLabel: "மாதிரி குறுஞ்செய்திகளை சோதிக்கவும்:",
    sampleSbiKyc: "SBI வங்கி KYC முடக்க செய்தி",
    sampleDigitalArrest: "டிஜிட்டல் கைது மிரட்டல் அழைப்பு",
    sampleTelegramJob: "டெலிகிராம் பகுதி நேர வேலை மோசடி",
    sampleElectricityBill: "மின்சாரக் கட்டண இணைப்பு துண்டிப்பு",
    sampleKbcLottery: "KBC 25 லட்சம் லாட்டரி செய்தி",
    selectChannelLabel: "தொடர்பு வழி",
    selectPersonaLabel: "பயனர் வகை",
    uploadScreenshotBtn: "திரைப்படத்தை ஸ்கேன் செய் (OCR)",
    zeroRetentionBadge: "தகவல் சேமிக்கப்படாது • பாதுகாப்பானது",

    analysisTitle: "மோசடி அபாய விரிவான அறிக்கை",
    analysisSubtitle: "இந்த செய்தி உங்களை எவ்வாறு ஏமாற்ற முயல்கிறது என்பதன் விளக்கம்.",
    overallRiskScore: "மொத்த அபாய அளவு",
    verdictSafe: "பாதுகாப்பான செய்தி",
    verdictSuspicious: "சந்தேகத்திற்குரியது",
    verdictMalicious: "மிகவும் ஆபத்தான மோசடி",
    audioListenBtn: "ஒலி விளக்கத்தைக் கேட்க",
    resetScanBtn: "மற்றொரு செய்தியை ஆராய்க",
    layer1Title: "அடுக்கு 1: தனியுரிமை பாதுகாப்பு",
    layer2Title: "அடுக்கு 2: இணையதள அச்சுறுத்தல் விதிகள்",
    layer3Title: "அடுக்கு 3: மொழி நோக்க பகுப்பாய்வு",
    layer4Title: "அடுக்கு 4: AI தருக்க விளக்கம்",
    layer5Title: "அடுக்கு 5: நேரலை அபாய வேகம்",
    layer6Title: "அடுக்கு 6: பாதுகாப்பு நடவடிக்கைகள்",
    highlightsTitle: "சந்தேகத்திற்குரிய வார்த்தைகள்",
    suspiciousLinksTitle: "கண்டறியப்பட்ட போலி இணையதளங்கள்",
    recommendedActionsTitle: "உடனடி பரிந்துரைகள்",
    reportingPortalsTitle: "அரசு இணையக் குற்றப் புகார்கள்",

    radarTitle: "நேரலை மோசடி ரேடார்",
    radarSubtitle: "நாடு முழுவதும் பதிவாகும் மோசடிகளின் நேரலைத் தகவல்கள்.",
    geoMapTitle: "வட்டாரப் பகுதி அபாய வரைபடம் (D3.js)",
    geoMapSubtitle: "பல்வேறு மாவட்டங்கள் மற்றும் நகரங்களில் நடைபெறும் வேலை மோசடி, பார்சல் மோசடி மற்றும் டிஜிட்டல் கைது குறித்த வரைபடம்.",
    filterAllCategories: "அனைத்துப் பிரிவுகள்",
    filterJobFraud: "வேலை வாய்ப்பு மோசடி",
    filterParcelCustoms: "பார்சல் & சுங்கம் மோசடி",
    filterDigitalArrest: "டிஜிட்டல் கைது",
    filterBankingKyc: "வங்கி & OTP மோசடி",
    filterUtilityBill: "மின்சாரக் கட்டண மோசடி",
    filterLottery: "லாட்டரி & பரிசுப் போட்டி",
    hotspotIncidents: "சம்பவங்கள்",
    hotspotThreatLevel: "அபாய நிலை",
    hotspotTopTarget: "முக்கிய இலக்கு பிரிவு",
    reportScamBtn: "புதிய மோசடியைப் புகாரளி",
    refreshFeedBtn: "புதிய தகவல்களைப் பெறு",
    searchRadarPlaceholder: "வார்த்தை, வங்கி அல்லது மாநிலத்தைத் தேடுக...",
    allRegions: "அனைத்துப் பகுதிகள்",
    allChannels: "அனைத்து வழிகள்",
    verifyBtn: "உறுதிப்படுத்து",
    verifiedBadge: "உறுதிப்படுத்தப்பட்ட மோசடி",
    submitReportModalTitle: "புதிய மோசடியை ரேடாரில் சேர்க்க",
    publishReportBtn: "அறிக்கையை வெளியிடு",

    personaTitle: "தனிநபர் அபாய பகுப்பாய்வு",
    personaSubtitle: "உங்கள் வயது மற்றும் பழக்கவழக்கங்களுக்கு ஏற்ப பாதுகாப்பு ஆலோசனைகள்.",
    studentTitle: "மாணவர் / இளைஞர்",
    seniorTitle: "முதியவர் (60+)",
    jobSeekerTitle: "வேலை தேடுபவர்",
    businessTitle: "தொழிலதிபர்",
    generalTitle: "பொது குடிமகன்",

    analyticsTitle: "பகுப்பாய்வு & புள்ளிவிவரங்கள்",
    analyticsSubtitle: "தடுக்கப்பட்ட மோசடிகள் மற்றும் பதிவுகளின் விவரங்கள்.",
    totalScanned: "ஆராயப்பட்ட செய்திகள்",
    scamsBlocked: "தடுக்கப்பட்ட மோசடிகள்",
    zeroDayCatchRate: "துல்லிய விகிதம்",
    avgScanLatency: "சராசரி வேகம்",
    exportReportBtn: "அறிக்கையைப் பதிவிறக்கு",

    downloadHubTitle: "செயலி & உலாவி நீட்டிப்பு",
    chromeExtension: "குரோம் உலாவி நீட்டிப்பு",
    mobileApp: "ஆன்ட்ராய்டு & iOS செயலி",
    privacyTitle: "தனியுரிமை கொள்கை",
    privacySubtitle: "பயனர் தரவு பாதுகாப்பு மற்றும் சேமிப்பில்லா பாதுகாப்பு உறுதியளிப்பு.",
    ephemeralMode: "தகவல் சேமிக்கப்படா பயன்முறை"
  },
  telugu: {
    brandName: "ScramAway AI",
    tagline: "బహుభాషా తక్షణ స్కామ్ రక్షణ",
    tabScanner: "AI స్కామ్ స్కానర్",
    tabExplainability: "6-అంచెల విశ్లేషణ",
    tabRadar: "లైవ్ స్కామ్ రాడార్ & మ్యాప్",
    tabPersona: "వ్యక్తిగత ముప్పు ప్రొఫైల్",
    tabAnalytics: "విశ్లేషణ & చరిత్ర",
    tabDownloads: "యాప్ & ఎక్స్‌టెన్షన్",
    tabPrivacy: "గోప్యతా పోర్టల్",
    languageSelect: "భాషను ఎంచుకోండి",

    scannerTitle: "మల్టీ-ఛానల్ AI స్కామ్ & ఫిషింగ్ స్కానర్",
    scannerSubtitle: "బ్యాంకింగ్ ఫ్రాడ్‌లు, నకిలీ ఉద్యోగ ఆఫర్లు మరియు ఎస్‌ఎమ్‌ఎస్‌లను తక్షణమే గుర్తించండి.",
    pastePlaceholder: "అనుమానాస్పద మెసేజ్, ఈమెయిల్ లేదా లింక్‌ను ఇక్కడ పేస్ట్ చేయండి...",
    analyzeBtn: "ముప్పును విశ్లేషించండి",
    runAnalysisBtn: "పూర్తి AI మోసం విశ్లేషణను ప్రారంభించండి",
    analyzingBtn: "6-అంచెల AI విశ్లేషణ జరుగుతోంది...",
    sampleScamsLabel: "ఉదాహరణ మెసేజ్‌లను పరిశీలించండి:",
    sampleSbiKyc: "SBI బ్యాంక్ KYC నిలిపివేత ఎస్‌ఎమ్‌ఎస్",
    sampleDigitalArrest: "డిజిటల్ అరెస్ట్ బెదిరింపు కాల్",
    sampleTelegramJob: "టెలిగ్రామ్ పార్ట్-టైమ్ జాబ్ స్కామ్",
    sampleElectricityBill: "విద్యుత్ బిల్లు కనెక్షన్ నిలిపివేత",
    sampleKbcLottery: "KBC 25 లక్షల లాటరీ మెసేజ్",
    selectChannelLabel: "మాధ్యమం",
    selectPersonaLabel: "వినియోగదారు వర్గం",
    uploadScreenshotBtn: "స్క్రీన్‌షాట్ స్కాన్ చేయండి (OCR)",
    zeroRetentionBadge: "డేటా నిల్వ చేయబడదు • సంపూర్ణ రక్షణ",

    analysisTitle: "స్కామ్ ముప్పు విశ్లేషణ నివేదిక",
    analysisSubtitle: "ఈ మెసేజ్ మిమ్మల్ని ఎలా మోసం చేయడానికి ప్రయత్నిస్తుందో వివరంగా తెలుసుకోండి.",
    overallRiskScore: "మొత్తం ముప్పు స్కోరు",
    verdictSafe: "సురక్షితమైన సందేశం",
    verdictSuspicious: "అనుమానాస్పదం",
    verdictMalicious: "అత్యంత ప్రమాదకరమైన ఫ్రాడ్",
    audioListenBtn: "ఆడియో విశ్లేషణ వినండి",
    resetScanBtn: "మరొక మెసేజ్ స్కాన్ చేయండి",
    layer1Title: "అంచె 1: గోప్యతా రక్షణ",
    layer2Title: "అంచె 2: ఫిషింగ్ & డొమైన్ నిబంధనలు",
    layer3Title: "అంచె 3: భాషా ఉద్దేశ విశ్లేషణ",
    layer4Title: "అంచె 4: AI తార్కిక విశ్లేషణ",
    layer5Title: "అంచె 5: తక్షణ ముప్పు వేగం",
    layer6Title: "అంచె 6: రక్షణ చర్యలు",
    highlightsTitle: "అనుమానాస్పద పదాలు",
    suspiciousLinksTitle: "గుర్తించిన నకిలీ లింక్‌లు",
    recommendedActionsTitle: "తక్షణ జాగ్రత్తలు",
    reportingPortalsTitle: "ప్రభుత్వ సైబర్ నేరాల పోర్టల్స్",

    radarTitle: "లైవ్ స్కామ్ రాడార్",
    radarSubtitle: "దేశవ్యాప్తంగా నమోదవుతున్న మోసాల ప్రత్యక్ష సమాచారం.",
    geoMapTitle: "ప్రాంతీయ హాట్‌స్పాట్ మ్యాప్ (D3.js)",
    geoMapSubtitle: "వివిధ ప్రాంతాలలో నమోదవుతున్న జాబ్ ఫ్రాడ్, పార్శిల్ స్కామ్ మరియు డిజిటల్ అరెస్ట్ ఘటనల మ్యాప్.",
    filterAllCategories: "అన్ని వర్గాలు",
    filterJobFraud: "ఉద్యోగ మోసాలు",
    filterParcelCustoms: "పార్శిల్ & కస్టమ్స్ మోసం",
    filterDigitalArrest: "డిజిటల్ అరెస్ట్",
    filterBankingKyc: "బ్యాంకింగ్ & OTP మోసాలు",
    filterUtilityBill: "విద్యుత్ బిల్లు మోసాలు",
    filterLottery: "లాటరీ & బహుమతులు",
    hotspotIncidents: "సంఘటనలు",
    hotspotThreatLevel: "ముప్పు స్థాయి",
    hotspotTopTarget: "ప్రధాన లక్ష్య వర్గం",
    reportScamBtn: "కొత్త స్కామ్‌ను నివేదించండి",
    refreshFeedBtn: "సమాచారాన్ని రిఫ్రెష్ చేయండి",
    searchRadarPlaceholder: "కీవర్డ్, బ్యాంక్ లేదా రాష్ట్రం శోధించండి...",
    allRegions: "అన్ని ప్రాంతాలు",
    allChannels: "అన్ని మాధ్యమాలు",
    verifyBtn: "ధృవీకరించండి",
    verifiedBadge: "ధృవీకరించబడిన స్కామ్",
    submitReportModalTitle: "కొత్త స్కామ్‌ను నివేదించడానికి",
    publishReportBtn: "నివేదికను ప్రచురించండి",

    personaTitle: "వ్యక్తిగత ముప్పు ప్రొఫైలర్",
    personaSubtitle: "మీ వయస్సు మరియు ఆన్‌లైన్ అలవాట్లకు అనుగుణంగా భద్రతా సూచనలు.",
    studentTitle: "విద్యార్థి / యువత",
    seniorTitle: "సీనియర్ సిటిజన్ (60+)",
    jobSeekerTitle: "ఉద్యోగార్థి",
    businessTitle: "వ్యాపారవేత్త",
    generalTitle: "సాధారణ పౌరుడు",

    analyticsTitle: "విశ్లేషణ & సైబర్ లాగ్స్",
    analyticsSubtitle: "అరికట్టిన మోసాల వివరాలు మరియు డౌన్‌లోడ్ చేయదగిన నివేదికలు.",
    totalScanned: "స్కాన్ చేసిన మెసేజ్‌లు",
    scamsBlocked: "అరికట్టిన మోసాలు",
    zeroDayCatchRate: "ఖచ్చితత్వ శాతం",
    avgScanLatency: "సరాసరి వేగం",
    exportReportBtn: "నివేదికను డౌన్‌లోడ్ చేయండి",

    downloadHubTitle: "యాప్ & బ్రౌజర్ ఎక్స్‌టెన్షన్",
    chromeExtension: "క్రోమ్ బ్రౌజర్ ఎక్స్‌టెన్షన్",
    mobileApp: "ఆండ్రాయిడ్ & iOS యాప్",
    privacyTitle: "గోప్యతా పోర్టల్",
    privacySubtitle: "వినియోగదారు డేటా సంపూర్ణ రక్షణ మరియు నిల్వ లేని భద్రతా విధానం.",
    ephemeralMode: "డేటా నిల్వ లేని విధానం"
  },
  bengali: {
    brandName: "ScramAway AI",
    tagline: "বহুভাষিক তাৎক্ষণিক প্রতারণা সুরক্ষা",
    tabScanner: "এআই স্ক্যাম স্ক্যানার",
    tabExplainability: "৬-স্তরের বিশ্লেষণ",
    tabRadar: "লাইভ স্ক্যাম রাডার ও মানচিত্র",
    tabPersona: "ব্যক্তিগত ঝুঁকি প্রোফাইল",
    tabAnalytics: "বিশ্লেষণ ও ইতিহাস",
    tabDownloads: "অ্যাপ ও এক্সটেনশন",
    tabPrivacy: "গোপনীয়তা পোর্টাল",
    languageSelect: "ভাষা নির্বাচন করুন",

    scannerTitle: "মাল্টি-চ্যানেল এআই প্রতারণা স্ক্যানার",
    scannerSubtitle: "ব্যাংক প্রতারণা, ভুয়া চাকরির অফার এবং সন্দেহজনক মেসেজ তাৎক্ষণিকভাবে সনাক্ত করুন।",
    pastePlaceholder: "সন্দেহজনক এসএমএস, ইমেইল বা লিঙ্ক এখানে পেস্ট করুন...",
    analyzeBtn: "বিপদ বিশ্লেষণ করুন",
    runAnalysisBtn: "সম্পূর্ণ এআই প্রতারণা স্ক্যান চালান",
    analyzingBtn: "৬-স্তরের এআই বিশ্লেষণ চলছে...",
    sampleScamsLabel: "নমুনা মেসেজ পরীক্ষা করুন:",
    sampleSbiKyc: "এসবিআই ব্যাংক কেওয়াইসি সাসপেনশন এসএমএস",
    sampleDigitalArrest: "ডিজিটাল অ্যারেস্ট হুমকির কল",
    sampleTelegramJob: "টেলিগ্রাম পার্ট-টাইম চাকরি স্ক্যাম",
    sampleElectricityBill: "বিদ্যুৎ বিল সংযোগ বিচ্ছিন্নকরণ",
    sampleKbcLottery: "কেবিসি ২৫ লাখ লটারি মেসেজ",
    selectChannelLabel: "যোগাযোগের মাধ্যম",
    selectPersonaLabel: "ব্যবহারকারী শ্রেণী",
    uploadScreenshotBtn: "স্ক্রিনশট স্ক্যান করুন (OCR)",
    zeroRetentionBadge: "কোন ডাটা সংরক্ষিত হয় না • সম্পূর্ণ নিরাপদ",

    analysisTitle: "স্ক্যাম হুমকি বিশ্লেষণ রিপোর্ট",
    analysisSubtitle: "জানুন কীভাবে এই বার্তাটি আপনাকে প্রতারিত করার চেষ্টা করছে।",
    overallRiskScore: "মোট ঝুঁকি স্কোর",
    verdictSafe: "নিরাপদ বার্তা",
    verdictSuspicious: "সন্দেহজনক / যাচাইহীন",
    verdictMalicious: "গুরুতর ক্ষতিকারক প্রতারণা",
    audioListenBtn: "অডিও বিশ্লেষণ শুনুন",
    resetScanBtn: "অন্য বার্তা স্ক্যান করুন",
    layer1Title: "স্তর ১: গোপনীয়তা ও তথ্য সুরক্ষা",
    layer2Title: "স্তর ২: ফিশিং ও ডোমেইন নিয়মাবলী",
    layer3Title: "স্তর ৩: ভাষা উদ্দেশ্য বিশ্লেষণ",
    layer4Title: "স্তর ৪: এআই যুক্তিনির্ভর বিশ্লেষণ",
    layer5Title: "স্তর ৫: গতিশীল ঝুঁকির হার",
    layer6Title: "স্তর ৬: প্রতিরক্ষামূলক পদক্ষেপ",
    highlightsTitle: "সন্দেহজনক বাক্য ও শব্দসমূহ",
    suspiciousLinksTitle: "চিহ্নিত ভুয়া ওয়েবসাইটসমূহ",
    recommendedActionsTitle: "জরুরী করণীয় পদক্ষেপ",
    reportingPortalsTitle: "সরকারী সাইবার ক্রাইম পোর্টাল",

    radarTitle: "লাইভ সক্রিয় স্ক্যাম রাডার",
    radarSubtitle: "সারাদেশে রিপোর্ট হওয়া প্রতারণার তাজা তথ্য।",
    geoMapTitle: "আঞ্চলিক হটস্পট মানচিত্র (D3.js)",
    geoMapSubtitle: "বিভিন্ন রাজ্য ও শহরে চাকরি প্রতারণা, পার্সেল স্ক্যাম ও ডিজিটাল অ্যারেস্টের হটস্পট।",
    filterAllCategories: "সকল বিভাগ",
    filterJobFraud: "চাকরি প্রতারণা",
    filterParcelCustoms: "পার্সেল ও কাস্টমস প্রতারণা",
    filterDigitalArrest: "ডিজিটাল অ্যারেস্ট",
    filterBankingKyc: "ব্যাংকিং ও ওটিপি",
    filterUtilityBill: "বিদ্যুৎ বিল ও সংযোগ",
    filterLottery: "লটারি ও পুরষ্কার",
    hotspotIncidents: "ঘটনা সংখ্যা",
    hotspotThreatLevel: "ঝুঁকির মাত্রা",
    hotspotTopTarget: "প্রধান লক্ষ্যভিত্তিক শ্রেণী",
    reportScamBtn: "নতুন স্ক্যাম রিপোর্ট করুন",
    refreshFeedBtn: "তথ্য রিফ্রেশ করুন",
    searchRadarPlaceholder: "কীওয়ার্ড, ব্যাংক বা রাজ্য খুঁজুন...",
    allRegions: "সকল অঞ্চল ও রাজ্য",
    allChannels: "সকল মাধ্যম",
    verifyBtn: "যাচাই করুন",
    verifiedBadge: "যাচাইকৃত স্ক্যাম",
    submitReportModalTitle: "লাইভ রাডারে নতুন স্ক্যাম যোগ করুন",
    publishReportBtn: "রিপোর্ট প্রকাশ করুন",

    personaTitle: "ব্যক্তিগত ঝুঁকি প্রফাইলার",
    personaSubtitle: "আপনার বয়স ও অনলাইন অভ্যাসের ওপর ভিত্তি করে সুরক্ষা টিপস।",
    studentTitle: "ছাত্র / তরুণ",
    seniorTitle: "বয়স্ক নাগরিক (৬০+)",
    jobSeekerTitle: "চাকরিপ্রার্থী",
    businessTitle: "ব্যবসায়ী",
    generalTitle: "সাধারণ নাগরিক",

    analyticsTitle: "বিশ্লেষণ ও সাইবার লগসমূহ",
    analyticsSubtitle: "প্রতিরোধ করা প্রতারণার তথ্য ও ডাউনলোডযোগ্য রিপোর্ট।",
    totalScanned: "মোট স্ক্যান করা বার্তা",
    scamsBlocked: "আটকানো স্ক্যাম",
    zeroDayCatchRate: "সঠিকতার হার",
    avgScanLatency: "গড় স্ক্যান সময়",
    exportReportBtn: "রিপোর্ট ডাউনলোড করুন",

    downloadHubTitle: "মোবাইল অ্যাপ ও ব্রাউজার এক্সটেনশন",
    chromeExtension: "ক্রোম ব্রাউজার এক্সটেনশন",
    mobileApp: "অ্যান্ড্রয়েড ও আইওএস অ্যাপ",
    privacyTitle: "গোপনীয়তা পোর্টাল",
    privacySubtitle: "ব্যবহারকারীর তথ্যের সম্পূর্ণ সুরক্ষা ও শূন্য-সংরক্ষণ গ্যারান্টি।",
    ephemeralMode: "সংরক্ষণহীন তাৎক্ষণিক মোড"
  },
  french: {
    brandName: "ScramAway AI",
    tagline: "Bouclier Anti-Escroquerie Multilingue en Temps Réel",
    tabScanner: "Scanner de Fraude AI",
    tabExplainability: "Explicabilité 6 Couches",
    tabRadar: "Radar & Carte des Arnaques",
    tabPersona: "Profil de Risque",
    tabAnalytics: "Analytique & Historique",
    tabDownloads: "Centre de Téléchargement",
    tabPrivacy: "Portail Confidentialité",
    languageSelect: "Langue",

    scannerTitle: "Détecteur d'Escroqueries & Phishing Multi-Canaux",
    scannerSubtitle: "Détectez instantanément les fraudes bancaires, faux SMS, arnaques ANTAI et appels de coercition.",
    pastePlaceholder: "Collez ici un SMS, e-mail, message WhatsApp ou lien suspect...",
    analyzeBtn: "ANALYSER LA MENACE MAINTENANT",
    runAnalysisBtn: "LANCER L'ANALYSE COMPLÈTE DE LA FRAUDE",
    analyzingBtn: "ANALYSE AI EN COURS...",
    sampleScamsLabel: "Exemples d'escroqueries courantes :",
    sampleSbiKyc: "SMS Phishing Suspension Compte Bancaire",
    sampleDigitalArrest: "Faux Appel Arrestation & Amende",
    sampleTelegramJob: "Faux Emploi Partiel Telegram",
    sampleElectricityBill: "Coupure Électricité / Amende ANTAI",
    sampleKbcLottery: "Faux Gagneur Loterie WhatsApp",
    selectChannelLabel: "Vecteur / Canal",
    selectPersonaLabel: "Profil d'Utilisateur",
    uploadScreenshotBtn: "Scanner une Capture d'Écran (OCR)",
    zeroRetentionBadge: "RÉTENTION ZÉRO DONNÉE • TRAITEMENT EN RAM",

    analysisTitle: "Évaluation Médico-Légale de la Menace",
    analysisSubtitle: "Analyse détaillée en 6 couches expliquant le fonctionnement de la manipulation.",
    overallRiskScore: "Score Global de Risque",
    verdictSafe: "COMMUNICATION SÉCURISÉE",
    verdictSuspicious: "SUSPECT / NON VÉRIFIÉ",
    verdictMalicious: "FRAUDE MALVEILLANTE CRITIQUE",
    audioListenBtn: "Écouter l'Analyse Vocale",
    resetScanBtn: "Scanner un Autre Message",
    layer1Title: "Couche 1 : Anonymisation des Données",
    layer2Title: "Couche 2 : Règles Phishing & Domaines",
    layer3Title: "Couche 3 : Intention & Contexte Multilingue",
    layer4Title: "Couche 4 : Raisonnement IA Zéro-Day",
    layer5Title: "Couche 5 : Vélocité Dynamique des Menaces",
    layer6Title: "Couche 6 : Plan d'Action Défensif",
    highlightsTitle: "Expressions Manipulatrices Détectées",
    suspiciousLinksTitle: "Liens & Domaines Frauduleux Détectés",
    recommendedActionsTitle: "Recommandations Immédiates",
    reportingPortalsTitle: "Portails Officiels de Signalement",

    radarTitle: "Radar des Escroqueries en Temps Réel",
    radarSubtitle: "Flux d'intelligence en direct des fraudes et campagnes de phishing en cours.",
    geoMapTitle: "Carte Géospatiale des Points Chauds (D3.js)",
    geoMapSubtitle: "Visualisation D3 des concentrations de fraudes par région, faux emplois et fausses amandes.",
    filterAllCategories: "Toutes les Catégories",
    filterJobFraud: "Fraude à l'Emploi",
    filterParcelCustoms: "Arnaque Colis & Douane",
    filterDigitalArrest: "Faux Mandats & Coercition",
    filterBankingKyc: "Banque & Codes OTP",
    filterUtilityBill: "Factures & Électricité",
    filterLottery: "Loterie & Faux Gains",
    hotspotIncidents: "Incidents",
    hotspotThreatLevel: "Niveau de Menace",
    hotspotTopTarget: "Cible Principale",
    reportScamBtn: "SIGNALER UNE ESCROQUERIE",
    refreshFeedBtn: "Actualiser le Flux",
    searchRadarPlaceholder: "Rechercher par mot-clé, banque ou région...",
    allRegions: "Toutes les Régions",
    allChannels: "Tous les Canaux",
    verifyBtn: "Vérifier",
    verifiedBadge: "ESCROQUERIE CONFIRMÉE",
    submitReportModalTitle: "Soumettre une Menace au Radar",
    publishReportBtn: "Publier le Signalement",

    personaTitle: "Profil de Risque Personnalisé",
    personaSubtitle: "Conseils de sécurité adaptés à votre profil et habitudes numériques.",
    studentTitle: "Étudiant / Jeune",
    seniorTitle: "Senior (60+)",
    jobSeekerTitle: "Demandeur d'Emploi",
    businessTitle: "Chef d'Entreprise",
    generalTitle: "Citoyen Général",

    analyticsTitle: "Analytique & Historique des Incidents",
    analyticsSubtitle: "Statistiques mondiales, métriques de vélocité et rapports téléchargeables.",
    totalScanned: "MESSAGES SCANNÉS",
    scamsBlocked: "ESCROQUERIES BLOQUÉES",
    zeroDayCatchRate: "TAUX DE DÉTECTION",
    avgScanLatency: "LATENCE MOYENNE",
    exportReportBtn: "EXPORTER LE RAPPORT",

    downloadHubTitle: "Application Mobile & Extension",
    chromeExtension: "Extension Navigateur Chrome",
    mobileApp: "Application Android & iOS",
    privacyTitle: "Portail de Confidentialité",
    privacySubtitle: "Contrôle total sur vos données personnelles et zéro stockage.",
    ephemeralMode: "Mode Éphémère Zéro Stockage"
  },
  latin: {
    brandName: "ScramAway AI",
    tagline: "Scam & Phishing Tutela Linguae Multiplici",
    tabScanner: "AI Scam Inquisitor",
    tabExplainability: "6-Graduum Explicatio",
    tabRadar: "Live Fraudis Tabula",
    tabPersona: "Periculi Persona",
    tabAnalytics: "Analytica & Historia",
    tabDownloads: "App & Extensiones",
    tabPrivacy: "Privatitatis Porta",
    languageSelect: "Lingua",

    scannerTitle: "Multi-Canalis AI Phishing & Fraudis Detector",
    scannerSubtitle: "Noveris fraudes argentarias, falsa munera, et epistulas fraudulentas brevi tempore.",
    pastePlaceholder: "Hic adnecte epistulam vel nexum suspectum...",
    analyzeBtn: "INQUIRE PERICULUM NUNC",
    runAnalysisBtn: "INQUIRE FRAUDEM CUM PLENA AI",
    analyzingBtn: "6-GRADUUM AI ANALYSIS...",
    sampleScamsLabel: "Exempla Fraudum:",
    sampleSbiKyc: "Bank KYC Impostura SMS",
    sampleDigitalArrest: "Falsum Decretum Deportationis Call",
    sampleTelegramJob: "Telegram Munus Falsum",
    sampleElectricityBill: "Inopia Electricitatis SMS",
    sampleKbcLottery: "KBC Fortuna Premium Fraudis",
    selectChannelLabel: "Canalis / Via",
    selectPersonaLabel: "Persona Usuarii",
    uploadScreenshotBtn: "Imaginem Scannare (OCR)",
    zeroRetentionBadge: "NIL MEMORIAE RETENTUM • TUTISSIMUM",

    analysisTitle: "Forensis Fraudis Aestimatio",
    analysisSubtitle: "Noscas quomodo haec epistula te decipere conatur.",
    overallRiskScore: "Totius Periculi Gradus",
    verdictSafe: "EPISTULA TUTA",
    verdictSuspicious: "SUSPECTUM / INCERTUM",
    verdictMalicious: "PERICULOSISSIMA IMPOSTURA",
    audioListenBtn: "Audire Explanationem",
    resetScanBtn: "Aliam Epistulam Scannare",
    layer1Title: "Gradus 1: Arcani Protectio",
    layer2Title: "Gradus 2: Phishing & Domain Regulae",
    layer3Title: "Gradus 3: Linguisticus Intellectus",
    layer4Title: "Gradus 4: AI Ratiocinatio",
    layer5Title: "Gradus 5: Velocitas Periculi",
    layer6Title: "Gradus 6: Actiones Defensivae",
    highlightsTitle: "Verba Suspecta Flagitata",
    suspiciousLinksTitle: "Nexūs et Domini Fraudulenti",
    recommendedActionsTitle: "Actiones Commendatae",
    reportingPortalsTitle: "Publicae Magistratum Portae",

    radarTitle: "Live Scam Tabula Directa",
    radarSubtitle: "Informationes in tempore reali de fraudibus ubique repertis.",
    geoMapTitle: "Regionalis Hotspot Tabula (D3.js)",
    geoMapSubtitle: "D3.js tabula ostendens regiones ubi fraudes frequentissimae sunt.",
    filterAllCategories: "Omnes Categoriae",
    filterJobFraud: "Munera Falsa",
    filterParcelCustoms: "Sarcinae & Portus Fraudis",
    filterDigitalArrest: "Falsa Captivitas",
    filterBankingKyc: "Argentaria & OTP",
    filterUtilityBill: "Electricitas & Vectigalia",
    filterLottery: "Fortuna & Praemia",
    hotspotIncidents: "Casus",
    hotspotThreatLevel: "Periculi Gradus",
    hotspotTopTarget: "Praecipua Persona",
    reportScamBtn: "NOVA FRAUDIS REPORTATIO",
    refreshFeedBtn: "Renovare Data",
    searchRadarPlaceholder: "Quaere per verbum vel regionem...",
    allRegions: "Omnes Regiones",
    allChannels: "Omnes Canales",
    verifyBtn: "Verificare",
    verifiedBadge: "FRAUDIS VERIFICATA",
    submitReportModalTitle: "Mittere Novam Fraudis Reportationem",
    publishReportBtn: "Publicare Reportationem",

    personaTitle: "Persona Periculi Profiler",
    personaSubtitle: "Consilia tutamina accommodata ad aetatem et usum tuum.",
    studentTitle: "Studiosus / Iuvenis",
    seniorTitle: "Senior (60+)",
    jobSeekerTitle: "Quaerens Munus",
    businessTitle: "Negotiator",
    generalTitle: "Civis Generalis",

    analyticsTitle: "Analytica & Historia Cyber-Casuum",
    analyticsSubtitle: "Statisticae globales et documenta ad dechargandum.",
    totalScanned: "EPISTULAE SCANNATAE",
    scamsBlocked: "FRAUDES PROHIBITAE",
    zeroDayCatchRate: "ACCURATIO AI",
    avgScanLatency: "TEMPUS MEDIUM",
    exportReportBtn: "DECHARGARE REPORTATIONEM",

    downloadHubTitle: "App Mobile & Extensiones",
    chromeExtension: "Chrome Navigatri Extensio",
    mobileApp: "Android & iOS App Mobile",
    privacyTitle: "Porta Privatitatis",
    privacySubtitle: "Plena potestas super data tua et zero memoriae retentio.",
    ephemeralMode: "Modus Ephemerus Zero Memoriae"
  },
  spanish: {
    brandName: "ScramAway AI",
    tagline: "Escudo Anti-Estafas Multilingüe en Tiempo Real",
    tabScanner: "Escáner de Estafas AI",
    tabExplainability: "Explicabilidad 6 Capas",
    tabRadar: "Radar & Mapa de Estafas",
    tabPersona: "Perfil de Riesgo",
    tabAnalytics: "Analítica e Historial",
    tabDownloads: "Centro de Descargas",
    tabPrivacy: "Portal de Privacidad",
    languageSelect: "Idioma",

    scannerTitle: "Escáner de Estafas y Phishing Multicanal",
    scannerSubtitle: "Detecte fraudes bancarios, falsas ofertas de empleo, SMS suplantados y llamadas de coerción.",
    pastePlaceholder: "Pegue aquí un SMS, correo, mensaje de WhatsApp o enlace sospechoso...",
    analyzeBtn: "ANALIZAR AMENAZA AHORA",
    runAnalysisBtn: "EJECUTAR ANÁLISIS COMPLETO DE ESTAFA",
    analyzingBtn: "ANÁLISIS DE 6 CAPAS EN CURSO...",
    sampleScamsLabel: "Ejemplos de estafas comunes:",
    sampleSbiKyc: "SMS Phishing Suspensión Cuenta Bancaria",
    sampleDigitalArrest: "Llamada Falsa de Arresto Digital",
    sampleTelegramJob: "Falso Trabajo a Tiempo Parcial Telegram",
    sampleElectricityBill: "Corte de Luz / Factura Falsa",
    sampleKbcLottery: "Falso Ganador Lotería WhatsApp",
    selectChannelLabel: "Vector / Canal",
    selectPersonaLabel: "Perfil de Usuario",
    uploadScreenshotBtn: "Escanear Captura de Pantalla (OCR)",
    zeroRetentionBadge: "CERO RETENCIÓN DE DATOS • PROCESAMIENTO EN RAM",

    analysisTitle: "Evaluación Forense de Amenaza de Estafa",
    analysisSubtitle: "Análisis detallado en 6 capas que explica cómo este mensaje intenta engañarlo.",
    overallRiskScore: "Puntuación Global de Riesgo",
    verdictSafe: "COMUNICACIÓN SEGURA",
    verdictSuspicious: "SOSPECHOSO / NO VERIFICADO",
    verdictMalicious: "FRAUDE MALICIOSO CRÍTICO",
    audioListenBtn: "Escuchar Análisis en Audio",
    resetScanBtn: "Escanear Otro Mensaje",
    layer1Title: "Capa 1: Anonimización de Datos Personales",
    layer2Title: "Capa 2: Reglas de Phishing y Dominios",
    layer3Title: "Capa 3: Intención y Contexto Multilingüe",
    layer4Title: "Capa 4: Razonamiento IA Zero-Day",
    layer5Title: "Capa 5: Velocidad Dinámica de Amenazas",
    layer6Title: "Capa 6: Plan de Acción Defensivo",
    highlightsTitle: "Frases Manipuladoras Detectadas",
    suspiciousLinksTitle: "Enlaces y Dominios Sospechosos",
    recommendedActionsTitle: "Recomendaciones Inmediatas",
    reportingPortalsTitle: "Portales Oficiales de Denuncia",

    radarTitle: "Radar de Estafas en Tiempo Real",
    radarSubtitle: "Fuente de inteligencia en vivo de estafas activas reportadas en múltiples regiones.",
    geoMapTitle: "Mapa Geoespacial de Puntos Críticos (D3.js)",
    geoMapSubtitle: "Visualización en D3.js de concentraciones de fraude regional, trabajos falsos y extorsión.",
    filterAllCategories: "Todas las Categorías",
    filterJobFraud: "Fraude de Empleo y Tareas",
    filterParcelCustoms: "Estafa de Paquetes y Aduanas",
    filterDigitalArrest: "Arresto Digital / Falsa Autoridad",
    filterBankingKyc: "Banca y Códigos OTP",
    filterUtilityBill: "Facturas y Servicios Públicos",
    filterLottery: "Loterías y Premios",
    hotspotIncidents: "Incidentes",
    hotspotThreatLevel: "Nivel de Amenaza",
    hotspotTopTarget: "Objetivo Principal",
    reportScamBtn: "REPORTAR NUEVA ESTAFA",
    refreshFeedBtn: "Actualizar Datos",
    searchRadarPlaceholder: "Buscar por palabra clave, banco o región...",
    allRegions: "Todas las Regiones",
    allChannels: "Todos los Canales",
    verifyBtn: "Verificar",
    verifiedBadge: "ESTAFA VERIFICADA",
    submitReportModalTitle: "Publicar Amenaza en el Radar",
    publishReportBtn: "Publicar Reporte",

    personaTitle: "Perfil de Riesgo Personalizado",
    personaSubtitle: "Recomendaciones adaptadas a su perfil demográfico y hábitos digitales.",
    studentTitle: "Estudiante / Joven",
    seniorTitle: "Adulto Mayor (60+)",
    jobSeekerTitle: "Buscador de Empleo",
    businessTitle: "Empresario / Negocio",
    generalTitle: "Ciudadano General",

    analyticsTitle: "Analítica e Historial de Incidentes",
    analyticsSubtitle: "Métricas globales de velocidad de amenazas y reportes descargables.",
    totalScanned: "MENSAJES ESCANEADOS",
    scamsBlocked: "ESTAFAS BLOQUEADAS",
    zeroDayCatchRate: "TASA DE PRECISIÓN",
    avgScanLatency: "LATENCIA PROMEDIO",
    exportReportBtn: "EXPORTAR REPORTE",

    downloadHubTitle: "Aplicación Móvil y Extensión",
    chromeExtension: "Extensión para Navegador Chrome",
    mobileApp: "Aplicación Android e iOS",
    privacyTitle: "Portal de Privacidad",
    privacySubtitle: "Control total sobre sus datos personales y cero almacenamiento.",
    ephemeralMode: "Modo Efímero Cero Almacenamiento"
  }
};

export function t(key: keyof TranslationDict, lang: LanguageOption): string {
  const dict = translations[lang] || translations.english;
  return dict[key] || translations.english[key] || String(key);
}
