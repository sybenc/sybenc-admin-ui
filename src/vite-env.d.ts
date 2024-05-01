/// <reference types="vite/client" />

export interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_BASE_URL: string
    readonly VITE_APP_TOKEN_KEY?: string
    readonly VITE_UPLOAD_URL?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

export type StatusType = 'success' | 'info' | 'error' | 'warning'


