interface ImportMetaEnv {
    readonly VITE_TPS_API_KEY: string;
    readonly VITE_TRA_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
