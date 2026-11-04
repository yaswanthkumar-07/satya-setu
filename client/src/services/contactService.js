import { api, unwrap } from './api';

export const contactService = {
  async sendContact({ name, email, topic, message }) {
    return unwrap(await api.post('/contact', { name, email, topic, message }));
  },

  async sendFeedback({ rating, topic, message }) {
    return unwrap(await api.post('/feedback', { rating, topic, message }));
  },
};