import { ENV } from '@/utils';

export class Author {
  async searchAuthors(text, page) {
    try {
      const filters = `filters[name_author][$contains]=${text}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=10`;
      const sort = `sort[name_author]=desc`;
      const populate = `populate[0]=books&populate[1]=books.cover&populate[2]=books.sagas`;

      const urlParams = [filters, pagination, populate, sort]
        .filter((param) => param)
        .join('&');

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTHORS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw error;

      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getAuthorBySlug(slug) {
    try {
      const filter = `filters[author_slug][$eq]=${slug}`;
      const populate =
        'populate[0]=literary_genres&populate[1]=literary-genres.title&populate[2]=books&populate[3]=books.cover&populate[4]=sagas&populate[5]=sagas.saga_title&populate[6]=books&populate[7]=books.sagas';
      const urlParams = [filter, populate].filter((param) => param).join('&');

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTHORS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }
}
