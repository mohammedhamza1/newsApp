import axios from 'axios';
import { NYTimesResponse, TimeFilter } from '../types';
import { NY_TIMES_CONFIG } from '../config/api';

export const fetchMostViewedArticles = async (
  period: TimeFilter,
): Promise<NYTimesResponse> => {
  try {
    const response = await axios.get(
      `${NY_TIMES_CONFIG.BASE_URL}/${period}.json?api-key=${NY_TIMES_CONFIG.API_KEY}`,
      {},
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching NY Times articles:', error);
    throw error;
  }
};

export const searchArticles = (
  articles: NYTimesResponse['results'],
  searchTerm: string,
) => {
  if (!searchTerm.trim()) {
    return articles;
  }

  return articles.filter(
    article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};
