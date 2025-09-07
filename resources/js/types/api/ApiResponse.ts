import type { AxiosResponse, AxiosError } from 'axios';

export interface ApiResponse<T = any> extends AxiosResponse<T> {}

export interface ApiError extends AxiosError {
  response?: AxiosResponse & {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
