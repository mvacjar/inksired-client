import { ENV } from '@/utils';

export class Saga {
  async allSagas(page, text) {
    try {
      const pagination = `pagination[page]=${page}&pagination[pageSize]=10`;
      const filters = `filters[saga_title][$contains]=${text}`;
      const populate = `populate[0]=books.cover&populate[1]=books.authors&populate[2]=books.sagas`;

      const urlParams = [filters, pagination, populate]
        .filter((param) => param)
        .join('&');
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SAGAS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      if (result.data) {
        result.data.forEach((saga) => {
          if (saga.attributes.books && saga.attributes.books.data) {
            saga.attributes.books.data.sort(
              (a, b) => a.attributes.order_in_saga - b.attributes.order_in_saga
            );
          }
        });
      }

      return result;
    } catch (error) {
      console.error('Error fetching sagas:', error);
      throw error;
    }
  }

  async getSagaBySlug(slug) {
    try {
      const filters = `filters[saga_name][$eq]=${slug}`;
      const populate = `populate[0]=books.cover&populate[1]=books.authors`;
      const urlParams = [filters, populate].filter((param) => param).join('&');

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SAGAS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      const saga = result.data[0];

      saga.attributes.books.data.sort((a, b) => {
        return a.attributes.order_in_saga - b.attributes.order_in_saga;
      });

      return saga;
    } catch (error) {
      console.error('Error fetching saga:', error);
      throw error;
    }
  }
}
