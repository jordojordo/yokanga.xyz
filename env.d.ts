/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DAPHINE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}