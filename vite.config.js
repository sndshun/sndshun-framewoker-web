import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    // 获取 .env 环境配置文件
    const env = loadEnv(mode, process.cwd());
    return {
        base: env.VITE_BASE_PATH,
        server: {
            port: 3000,
            proxy: {
                '/api': {
                    target: env.VITE_PROXY_PATH,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        },
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        resolve: {
            alias: [
                {
                    /* 设置@替换为./src */
                    find: '@',
                    replacement: resolve(__dirname, './src')
                }
            ]
        }
    }
})
