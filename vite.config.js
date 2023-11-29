import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    // 获取 .env 环境配置文件
    const env = loadEnv(mode, process.cwd());
    return {
        base: env.VITE_BASE_PATH,
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:8080',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        },
        plugins: [vue()],
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
