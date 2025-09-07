/// <reference types="vite/client" />

// Declare module for Vue SFC files
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Extend Window interface to include custom properties
interface Window {
  // Add any global window properties here if needed
}

// Extend ImportMeta interface for Vite environment variables
interface ImportMeta {
  readonly env: {
    readonly VITE_APP_TITLE?: string;
    readonly VITE_API_URL?: string;
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
    // Add any other environment variables here
    [key: string]: any;
  };
}
