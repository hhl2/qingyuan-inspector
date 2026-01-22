<template>
  <div class="bigpg">
    <router-view />
  </div>
</template>

<script>
import { ref, provide, onMounted, onUnmounted, readonly } from 'vue'
import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4'
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4'

// 默认配置
const DEFAULT_CONFIG = {
  pixelStreaming: {
    websocketURL: 'ws://192.168.31.143:88',
    ss: 'ws://192.168.31.143:88'
  }
}

export default {
  name: 'PlayerView',

  setup() {
    // 状态
    const ueData = ref(null)
    const clickPosition = ref({ x: 0, y: 0 })
    let pixelStreamingInstance = null
    let applicationInstance = null

    // ========== 配置加载 ==========
    const loadConfig = async () => {
      try {
        const res = await fetch('/config.json')
        return res.ok ? await res.json() : DEFAULT_CONFIG
      } catch {
        console.error('加载配置失败，使用默认配置')
        return DEFAULT_CONFIG
      }
    }

    // ========== PixelStreaming 初始化 ==========
    const initializePixelStreaming = async () => {
      try {
        const { pixelStreaming: psConfig } = await loadConfig()
        console.log('WebSocket配置:', psConfig)

        // 应用样式
        const styles = new PixelStreamingApplicationStyle()
        styles.applyStyleSheet()

        // 创建流实例
        const config = new Config({
          useUrlParams: true,
          initialSettings: {
            websocketURL: psConfig.websocketURL,
            ss: psConfig.ss,
            MatchViewportRes: true,
            HoveringMouse: true,
            OfferToReceive: true,
            WaitForStream: true,
            AutoPlayVideo: true,        // 自动播放视频
            AutoConnect: true,           // 自动连接
            StartVideoMuted: true        // 静音启动以符合浏览器自动播放策略
          }
        })

        const stream = new PixelStreaming(config)
        pixelStreamingInstance = stream
        stream.addResponseEventListener('handle_responses', handleResponse)

        // 创建应用
        const app = new Application({
          stream,
          onColorModeChanged: (isLight) => styles.setColorMode(isLight),
          settings: { showUI: false }
        })
        applicationInstance = app
        document.body.appendChild(app.rootElement)


      } catch (error) {
        console.error('PixelStreaming初始化失败:', error)
      }
    }

    // ========== 事件处理 ==========
    const handleCaptureClick = (e) => {
      clickPosition.value = { x: e.clientX, y: e.clientY }
    }

    const handleResponse = (res) => {
      try {
        // 清理控制字符并解析JSON
        const cleaned = res.replace(/[\x00-\x1F\x7F]/g, '')
        const json = JSON.parse(cleaned)
        console.log('UE响应:', json)

        ueData.value = {
          clickPosition: { ...clickPosition.value },
          json,
          showMenus: true
        }
      } catch (error) {
        console.error('解析UE响应失败:', error, res)
      }
    }

    // ========== 消息发送 ==========
    const sendMessage = (message) => {
      if (pixelStreamingInstance) {
        pixelStreamingInstance.emitUIInteraction(message)
      } else {
        console.warn('PixelStreaming未初始化')
      }
    }

    // ========== 清理 ==========
    const cleanup = () => {
      pixelStreamingInstance?.removeResponseEventListener('handle_responses', handleResponse)
      window.removeEventListener('click', handleCaptureClick)
      if (applicationInstance?.rootElement) {
        document.body.removeChild(applicationInstance.rootElement)
      }
    }

    // ========== 生命周期 ==========
    onMounted(() => {
      initializePixelStreaming()
      window.addEventListener('click', handleCaptureClick)
    })

    onUnmounted(cleanup)

    // ========== 提供给子组件 ==========
    provide('ueResponseData', readonly(ueData))
    provide('playerMethods', { sendMessage, getUeData: () => ueData.value })

    return { ueData, clickPosition }
  }
}
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  min-height: -webkit-fill-available;
  font-family: 'Montserrat';
  margin: 0;
}

/* PixelStreaming 容器全屏样式 */
#centreparent,
#playerUI,
.player-root,
[class*="Application-root"] {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 0 !important;
}

/* PixelStreaming 内的video元素全屏 */
#centreparent video,
#playerUI video,
.player-root video,
[class*="Application-root"] video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

/* 隐藏 PixelStreaming 播放按钮和所有UI控件 */
#overlay,
.UiFeature-play,
.play-overlay,
button[aria-label="Play"],
.player-overlay,
.controls-overlay,
.pauseOverlay,
.playOverlay {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
</style>