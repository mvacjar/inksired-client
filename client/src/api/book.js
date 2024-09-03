import { ENV } from '@/utils';

export class Book {
  async getLastBookPublished() {
    try {
      const sort = 'sort=publishedAt:desc';
      const pagination = 'pagination[limit]=3';
      const populate = 'populate=*';
      const urlParams = [pagination, sort, populate]
        .filter((param) => param)
        .join('&');

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOKS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async obentoBooks({ limit = 100, literaryGenresId = null }) {
    try {
      const pagination = `pagination[limit]=${limit}`;
      const sort = `sort[0]=publishedAt:desc`;
      const populate = `populate=*`;
      const filters = literaryGenresId
        ? `filters[literary-genres][id][$eq]=${literaryGenresId}`
        : '';

      const urlParams = [sort, pagination, filters, populate]
        .filter((param) => param)
        .join('&');

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOKS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getByGenreSlug(slug, page) {
    try {
      const filters = `filters[literary_genres][slug_genres][$eq]=${slug}`;
      const populate = `populate=*`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=5`;

      const urlParams = [filters, populate, pagination]
        .filter((param) => param)
        .join('&');

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOKS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async searchBooks(text, page) {
    try {
      const filters = `filters[title][$contains]=${text}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
      const populate = `populate=*`;

      const urlParams = [filters, pagination, populate]
        .filter((param) => param)
        .join('&');

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOKS}?${urlParams}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    try {
      const filter = `filters[slug_title][$eq]=${slug}`;
      const populate =
        'populate[0]=cover&populate[1]=authors&populate[2]=sagas&populate[3]=literary_genres';

      const urlParams = [filter, populate].filter((param) => param).join('&');

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOKS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async getByAuthors(slug) {
    try {
      const filter = `filters[author][author_slug][$eq]=${slug}`;
      const populate =
        'populate[0]=books&populate[1]=cover&populate[2]=sagas&populate[3]=literary_genres';

      const urlParams = [filter, populate].filter((param) => param).join('&');

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOKS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0] || null; // Asegúrate de devolver null si no hay datos
    } catch (error) {
      console.error('Error fetching author data:', error);
      return null; // En caso de error, devuelve null para evitar `undefined`
    }
  }

  async getBySaga(slug) {
    try {
      const filter = `filters[saga][author_slug][$eq]=${slug}`;
      const populate =
        'populate[0]=cover&populate[1]=authors&populate[2]=sagas&populate[3]=literary_genres';

      const urlParams = [filter, populate].filter((param) => param).join('&');
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOKS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async getBookById(id) {
    try {
      const populate = `populate[0]=cover&populate[1]=sagas&populate[2]=authors.name_author`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOKS}/${id}?${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
