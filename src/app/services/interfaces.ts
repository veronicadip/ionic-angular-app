export interface ApiResultI {
  page:          number;
  results:       MovieResultI[];
  total_pages:   number;
  total_results: number;
}

export interface MovieResultI {
  adult:             boolean;
  backdrop_path:     string;
  genre_ids:         number[];
  id:                number;
  original_language: string;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  release_date:      Date;
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
}

export interface MovieI {
  adult:                 boolean;
  backdrop_path:         string;
  belongs_to_collection: null;
  budget:                number;
  genres:                GenreI[];
  homepage:              string;
  id:                    number;
  imdb_id:               string;
  origin_country:        string[];
  original_language:     string;
  original_title:        string;
  overview:              string;
  popularity:            number;
  poster_path:           string;
  production_companies:  ProductionCompanyI[];
  production_countries:  ProductionCountryI[];
  release_date:          Date;
  revenue:               number;
  runtime:               number;
  spoken_languages:      SpokenLanguageI[];
  status:                string;
  tagline:               string;
  title:                 string;
  video:                 boolean;
  vote_average:          number;
  vote_count:            number;
}

export interface GenreI {
  id:   number;
  name: string;
}

export interface ProductionCompanyI {
  id:             number;
  logo_path:      string;
  name:           string;
  origin_country: string;
}

export interface ProductionCountryI {
  iso_3166_1: string;
  name:       string;
}

export interface SpokenLanguageI {
  english_name: string;
  iso_639_1:    string;
  name:         string;
}