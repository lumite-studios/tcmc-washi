import vue from '@vitejs/plugin-vue'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    base: '/tcmc-washi/',
    plugins: [
        Components({
            resolvers: [
                PrimeVueResolver({
                    components: {
                        prefix: 'Prime'
                    }
                })
            ]
        }),
        tailwindcss(),
        vue()
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@public": fileURLToPath(new URL("./public", import.meta.url)),
        }
    }
})
