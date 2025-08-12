export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

export interface NewsArticle {
  title: string;
  abstract: string;
  url: string;
  published_date: string;
  byline: string;
  media?: {
    'media-metadata': {
      url: string;
      format: string;
      height: number;
      width: number;
    }[];
  }[];
}

export interface NYTimesResponse {
  status: string;
  copyright: string;
  num_results: number;
  results: NewsArticle[];
}

export type RootStackParamList = {
  Splash: undefined;
  Registration: undefined;
  MainTabs: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  More: undefined;
};

export type TimeFilter = '1' | '7' | '30';