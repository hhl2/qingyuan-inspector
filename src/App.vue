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
            WaitForStream: true
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

        // 监听视频播放
        document.querySelector('video')?.addEventListener('play', () => {
          console.log('✅ 视频开始播放')
          sendMessage({ code: 1, type: 'btn', data: { id: 0 } })
        })

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
</style>