import { CompanyConfig, PhoneContact } from '../types';

/**
 * Generate a .vcf (vCard) file for Al-Mekawy Home UPVC so customers can save all numbers in 1 tap
 */
export function generateVCard(config: CompanyConfig): string {
  const primaryPhone = config.phones.find(p => p.isPrimary) || config.phones[0];
  
  let vcard = `BEGIN:VCARD
VERSION:3.0
N:UPVC;Al-Mekawy;Home;;
FN:${config.companyNameAr} (${config.companyNameEn})
ORG:${config.companyNameAr};
TITLE:شبابيك وأبواب UPVC عازلة للصوت والحرارة
EMAIL;TYPE=INTERNET,WORK:${config.officialEmail}
`;

  config.phones.forEach((phone, idx) => {
    const type = idx === 0 ? 'PREF,WORK,VOICE' : 'WORK,VOICE';
    vcard += `TEL;TYPE=${type}:${phone.number}\n`;
  });

  vcard += `ADR;TYPE=WORK:;;${config.mainAddressAr};;;;
URL:${config.googleMapsUrl}
NOTE:شركة المكاوي هوم لقطاعات UPVC - شبابيك وأبواب عازلة للصوت 95% والحرارة - ضمان 10 سنوات
END:VCARD`;

  return vcard;
}

export function downloadVCard(config: CompanyConfig): void {
  const vcardContent = generateVCard(config);
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Al-Mekawy-Home-UPVC.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Format WhatsApp click to chat URL
 */
export function createWhatsAppUrl(phone: string, message: string): string {
  // Strip non-digit characters
  let cleanPhone = phone.replace(/\D/g, '');
  
  // If starts with 01 (Egypt standard), prepend 2
  if (cleanPhone.startsWith('01')) {
    cleanPhone = '2' + cleanPhone;
  } else if (cleanPhone.startsWith('1') && cleanPhone.length === 10) {
    cleanPhone = '20' + cleanPhone;
  }

  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

/**
 * Copy text with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy', err);
    return false;
  }
}
