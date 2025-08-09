export type AppConfig = {
  contactWhatsApp: string | null;
  contactEmail: string | null;
};

export const config: AppConfig = {
  contactWhatsApp:
    (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_CONTACT_WHATSAPP) ||
    null,
  contactEmail:
    (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_CONTACT_EMAIL) || null,
};
