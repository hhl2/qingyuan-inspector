const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const express = require('express')

/**
 * 如果项目启动时出现内存不足问题，请使用以下命令启动：
 * 
 * Windows PowerShell:
 * $env:NODE_OPTIONS="--max-old-space-size=8192"; npm run serve
 * 
 * Windows CMD:
 * set NODE_OPTIONS=--max-old-space-size=8192 && npm run serve
 */

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    host: '0.0.0.0',
    port: 8081,

    // 静态资源配置（单一对象格式）
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
      watch: false,
    },

    // 使用 setupMiddlewares 添加外部视频目录
    setupMiddlewares: (middlewares, devServer) => {
      // 添加外部视频目录的静态文件服务
      devServer.app.use(
        '/external-videos',
        express.static(path.join(__dirname, '../external-videos'), {
          // 设置大文件传输相关选项
          maxAge: 0,
          setHeaders: (res) => {
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Cache-Control', 'no-cache');
          }
        })
      );
      return middlewares;
    },

    // 完全禁用文件监听以节省内存
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        ignored: ['**/node_modules/**', '**/*.mp4', '**/*.zip'],
        usePolling: false,
      }
    },

    proxy: {
      '/api': {
        target: 'http://10.151.223.230:8081',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api/jadp': '/api/jadp',
          '^/api': ''
        }
      },
      // 203服务器代理 - 用于视频相关接口
      '/api203': {
        target: 'http://10.151.223.203:8081',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api203': ''
        }
      },
    },

    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false,
      },
      progress: false,
    },

    // 关闭热重载，减少内存占用
    hot: false,
    liveReload: false,

    // 配置请求头，支持大文件传输
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'Access-Control-Expose-Headers': 'Content-Length, Content-Range',
    },

    // 开发中间件配置
    devMiddleware: {
      writeToDisk: false,
      stats: 'minimal',
    },

    setupExitSignals: true,
  },

  outputDir: 'dist',
  assetsDir: 'assets',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,

  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      scss: {}
    }
  },

  // Webpack 配置优化
  configureWebpack: {
    // 忽略大文件警告
    performance: {
      hints: false,
      maxAssetSize: 1024 * 1024 * 100,
      maxEntrypointSize: 1024 * 1024 * 100,
    },
    // 排除大文件的解析
    module: {
      noParse: /\.(mp4|avi|mkv|mov|wmv|flv|webm|zip|rar|7z)$/i,
    },
    optimization: {
      removeEmptyChunks: true,
    },
  },

  // 链式 Webpack 配置
  chainWebpack: config => {
    // 配置视频文件处理
    config.module
      .rule('media')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .set('type', 'asset/resource')
      .set('generator', {
        filename: 'media/[name][ext]'
      });
  }
})