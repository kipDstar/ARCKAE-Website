const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') || 'http://localhost:8000';

export interface Service {
  id: string;
  name: string;
  category: 'main' | 'auxiliary';
  icon_url?: string | null;
  short_description: string;
  long_description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Getting Started' | 'Admissions' | 'IELTS' | 'Visa & Travel' | 'After Arrival';
}

export interface Appointment {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  intended_destination?: string | null;
  preferred_course?: string | null;
  current_education_level?: string | null;
  message?: string | null;
  appointment_date?: string | null;
  mode?: 'Physical' | 'Virtual' | null;
  submitted_at: string;
  assigned_counsellor_id?: string | null;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'counsellor' | 'visitor';
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(errorBody || res.statusText);
  }

  return (await res.json()) as T;
}

export const api = {
  baseUrl: API_BASE_URL,

  async getServices(): Promise<Service[]> {
    return request<Service[]>('/api/services');
  },

  async getFaqs(): Promise<FAQ[]> {
    return request<FAQ[]>('/api/faqs');
  },

  async submitContact(payload: Record<string, unknown>) {
    return request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async staffGate(email: string, accessKey: string) {
    return request('/api/auth/staff-gate', {
      method: 'POST',
      body: JSON.stringify({ email, access_key: accessKey }),
    });
  },

  async login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || res.statusText);
    }

    return (await res.json()) as { access_token: string; token_type: string };
  },

  async getMe(token: string) {
    return request<User>('/api/auth/me', {}, token);
  },

  async getAppointments(token: string, status?: string) {
    const query = status ? `?status_filter=${encodeURIComponent(status)}` : '';
    return request<Appointment[]>(`/api/appointments${query}`, {}, token);
  },

  async updateAppointment(token: string, id: string, payload: Partial<Appointment>) {
    return request<Appointment>(`/api/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, token);
  },

  async createService(token: string, payload: Omit<Service, 'id'>) {
    return request<Service>('/api/services', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, token);
  },

  async updateService(token: string, id: string, payload: Partial<Service>) {
    return request<Service>(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, token);
  },

  async deleteService(token: string, id: string) {
    await request<unknown>(`/api/services/${id}`, { method: 'DELETE' }, token);
  },

  async createFaq(token: string, payload: Omit<FAQ, 'id'>) {
    return request<FAQ>('/api/faqs', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, token);
  },

  async updateFaq(token: string, id: string, payload: Partial<FAQ>) {
    return request<FAQ>(`/api/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, token);
  },

  async deleteFaq(token: string, id: string) {
    await request<unknown>(`/api/faqs/${id}`, { method: 'DELETE' }, token);
  },
};

