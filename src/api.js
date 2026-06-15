import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Attach JWT token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('skylark_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ─────────────────────────────────────────────────────────
export const loginAdmin   = (data) => API.post('/auth/login', data);
export const getMe        = ()     => API.get('/auth/me');
export const seedAdmin    = ()     => API.post('/auth/seed');

// ── Packages ─────────────────────────────────────────────────────
export const getPackages  = (params) => API.get('/packages', { params });
export const getPackage   = (id)     => API.get(`/packages/${id}`);
export const createPackage= (data)   => API.post('/packages', data);
export const updatePackage= (id, data)=> API.put(`/packages/${id}`, data);
export const deletePackage= (id)     => API.delete(`/packages/${id}`);

// ── Inquiries ────────────────────────────────────────────────────
export const submitInquiry = (data) => API.post('/inquiries', data);
export const getInquiries  = (params)=> API.get('/inquiries', { params });
export const updateInquiry = (id, data)=> API.put(`/inquiries/${id}`, data);
export const deleteInquiry = (id)    => API.delete(`/inquiries/${id}`);

// ── Flights ──────────────────────────────────────────────────────
export const submitFlight  = (data) => API.post('/flights', data);
export const getFlights    = ()     => API.get('/flights');
export const updateFlight  = (id, data)=> API.put(`/flights/${id}`, data);
export const deleteFlight  = (id)   => API.delete(`/flights/${id}`);

// ── Testimonials ─────────────────────────────────────────────────
export const getTestimonials  = ()       => API.get('/testimonials');
export const createTestimonial= (data)   => API.post('/testimonials', data);
export const deleteTestimonial= (id)     => API.delete(`/testimonials/${id}`);

// ── FAQs ─────────────────────────────────────────────────────────
export const getFAQs   = ()       => API.get('/faqs');
export const createFAQ = (data)   => API.post('/faqs', data);
export const updateFAQ = (id, d)  => API.put(`/faqs/${id}`, d);
export const deleteFAQ = (id)     => API.delete(`/faqs/${id}`);

// ── Newsletter ───────────────────────────────────────────────────
export const subscribe      = (email) => API.post('/newsletter/subscribe', { email });
export const getSubscribers = ()      => API.get('/newsletter');
export const deleteSubscriber=(id)    => API.delete(`/newsletter/${id}`);

// ── Social ───────────────────────────────────────────────────────
export const getSocial    = ()     => API.get('/social');
export const upsertSocial = (data) => API.post('/social', data);
export const deleteSocial = (id)   => API.delete(`/social/${id}`);

export default API;
