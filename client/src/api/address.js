import { ENV, authFetch } from '@/utils';

export class Address {
  async create(data, userId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...data, user: userId } }),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (!response.ok) {
        console.error('Error:', result);
        throw result;
      }

      return result;
    } catch (error) {
      console.error('Catch Error:', error);
      throw error;
    }
  }

  async getAll(userId) {
    try {
      const filter = `filters[user][id][$eq]=${userId}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}?${filter}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (!response.ok) {
        console.error('Error:', result);
        throw result;
      }

      return result;
    } catch (error) {
      console.error('Catch Error:', error);
      throw error;
    }
  }

  async update(data, addressId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
      const params = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (!response.ok) {
        console.error('Error:', result);
        throw result;
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(addressId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
      const params = {
        method: 'DELETE',
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (!response.ok) {
        throw result;
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}
