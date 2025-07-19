import api from '@app/lib/api';

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

export async function sendContact({ name, email, message, phone, subject }: ContactRequest) {
  return api.post('/contact', { name, email, message, phone, subject });
} 