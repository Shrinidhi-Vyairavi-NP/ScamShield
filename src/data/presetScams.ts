import { ScamChannel, LanguageOption, UserPersona } from '../types';

export interface PresetScam {
  id: string;
  title: string;
  channel: ScamChannel;
  language: LanguageOption;
  targetPersona: UserPersona;
  text: string;
  description: string;
  region: string;
}

export const PRESET_SCAMS: PresetScam[] = [
  {
    id: 'sbi-kyc-hindi',
    title: 'SBI / HDFC Bank KYC Account Block Fraud',
    channel: 'sms',
    language: 'hindi',
    targetPersona: 'general',
    region: 'India (Pan-India)',
    description: 'Impersonates major Indian bank claiming immediate account suspension unless KYC is completed on a phishing link.',
    text: 'Priya Graahak, Aapka SBI Khata KYC na hone ki wajah se AAJ RAAT 10 PM par SUSPEND kar diya jayega. Turant apna Aadhar aur PAN card link karein is official portal par: http://sbi-netbank-kyc-update.online/login ya call karein +91-9812345678 par.'
  },
  {
    id: 'tamil-wfh-telegram',
    title: 'Tamil Telegram Part-time Job Scam',
    channel: 'whatsapp',
    language: 'tamil',
    targetPersona: 'student',
    region: 'Tamil Nadu & Puducherry',
    description: 'Promises Rs 3,500/day for liking YouTube videos, targeting students & job seekers in Tamil.',
    text: 'Anbu nanbarae! Part-time WFH Job daily income Rs. 3500-5000. No experience needed. Youtube video like panna podhum. Registration fee Rs. 499 pay panni Telegram group join panna click: http://telegram-work-daily.xyz/join'
  },
  {
    id: 'cbi-digital-arrest',
    title: 'Digital Arrest / CBI Impersonation Threat',
    channel: 'call',
    language: 'english',
    targetPersona: 'senior',
    region: 'Delhi-NCR & Mumbai',
    description: 'High-tech psychological scam claiming a warrant for contraband shipment, demanding money via Skype/Zoom.',
    text: 'HIGH COURT NOTICE: Order for DIGITAL ARREST under section 420 IPC. A parcel containing 5 fake passports & illegal drugs was intercepted by Narcotics Bureau in Mumbai registered under your Aadhar. Do not disconnect this call or close this message. You must remain on video camera for clearance deposit of Rs 2,500,000 to RBI escrow account.'
  },
  {
    id: 'electricity-bill-cutoff',
    title: 'Electricity Board Power Disconnection Alert',
    channel: 'sms',
    language: 'hindi',
    targetPersona: 'senior',
    region: 'Maharashtra & Gujarat',
    description: 'Targets households and senior citizens with urgent power disconnection threats at night.',
    text: 'Dear Consumer, Your electricity supply will be DISCONNECTED tonight at 9:30 PM from Electricity Office because your previous month bill was not updated. Immediately contact Electricity Officer Mr. Sharma on +91-9876501234 or install APK app: http://bses-bill-pay.apk'
  },
  {
    id: 'kbc-lottery-whatsapp',
    title: 'KBC Kaun Banega Crorepati WhatsApp Draw',
    channel: 'whatsapp',
    language: 'hindi',
    targetPersona: 'general',
    region: 'North & East India',
    description: 'Fake lottery winning message using audio note clips and fake cheques.',
    text: 'Congratulations! Aapka WhatsApp number KBC Kismat Lottery mein 25 Lakh Rupees ka WINNER chuna gaya hai! Cash claim karne ke liye KBC Manager Rana Pratap Singh se WhatsApp call +91-9988776655 par baat karein. Processing charge Rs 2,500 Jama karayein.'
  },
  {
    id: 'french-gov-fine-phishing',
    title: 'French ANTAI Driving Fine Phishing',
    channel: 'sms',
    language: 'french',
    targetPersona: 'general',
    region: 'France & EU',
    description: 'Urgent notice regarding unpaid driving fine in France with a spoofed government URL.',
    text: 'INFO ANTAI: Vous avez un retard de paiement d\'amende stationnement de 35,00 €. Veuillez consigner votre dossier avant majoration sous 24h sur le site officiel: https://antai-gouv-amendes-paiement.site/ref3891'
  },
  {
    id: 'latin-bank-transfer-scam',
    title: 'Latin / European Legacy Inheritance Scam',
    channel: 'email',
    language: 'latin',
    targetPersona: 'general',
    region: 'Global / Europe',
    description: 'Classic advance fee scam translated in Latin style, asking for swift code verification.',
    text: 'Hereditas Regalis: Confirmare translatio pecuniae $50,000 USD via Western Union. Submit confirmation code at http://latin-bank-transfer.org antequam claudatur.'
  },
  {
    id: 'overseas-scholarship-student',
    title: 'Student Overseas Scholarship Phishing',
    channel: 'email',
    language: 'english',
    targetPersona: 'student',
    region: 'Global & Pan-India',
    description: 'Targets students with fake $12,000 overseas grant requiring small processing fee.',
    text: 'Congratulations Student! You have been selected for the PM Overseas Student Excellence Grant of $12,000 USD for 2026. To disburse your stipend, pay document verification fee of $49 within 6 hours at: http://pm-scholarships-apply-2026.org/verify'
  }
];
