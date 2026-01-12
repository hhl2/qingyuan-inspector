<template>
  <div class="bigpg">
    <router-view />
  </div>
</template>

<script>
import { ref, provide, onMounted, onUnmounted, readonly, nextTick } from 'vue'
import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4'
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4'
import { useRouter } from 'vue-router'
export default {
  name: 'PlayerView',

  setup() {
    const router = useRouter()
    const ueData = ref(null)
    const clickPosition = ref({ x: 0, y: 0 })
    let pixelStreamingInstance = null
    let applicationInstance = null
    // 初始化 PixelStreaming
    const initializePixelStreaming = () => {
      try {
        const PixelStreamingApplicationStyles = new PixelStreamingApplicationStyle()
        PixelStreamingApplicationStyles.applyStyleSheet()

        const config = new Config({
          useUrlParams: true,
          // 添加 WebSocket 配置
          initialSettings: {
            // 方法1：使用完整的websocketURL（包含端口）
            // websocketURL: 'ws://192.168.31.37:88',
            // websocketHost: '192.168.31.143',
            // websocketPort: 88,
            HoveringMouse: true,
            // AutoPlayVideo: true,
            // AutoConnect: true,
            // StartVideoMuted: true,    // 开始时静音，避免播放按钮
            // 其他可能需要的配置
            // ss: 'ws://192.168.31.37:88', // 有些版本需要这个参数
            // 连接优化
            OfferToReceive: true,     // 主动提供接收能力
            WaitForStream: true       // 等待流准备就绪
          }
        })

        const stream = new PixelStreaming(config)
        pixelStreamingInstance = stream



        const application = new Application({
          stream,
          onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode),
          settings: { showUI: false }
        })

        applicationInstance = application
        stream.addResponseEventListener('handle_responses', handleResponse)
        document.body.appendChild(application.rootElement)

      } catch (error) {
        console.error('初始化 PixelStreaming 失败:', error)
      }
    }

    // 事件处理函数
    const handleCaptureClick = (event) => {
      clickPosition.value = {
        x: event.clientX,
        y: event.clientY
      }
    }

    const handleResponse = (res) => {
      try {
        const jsonRes = JSON.parse(res)
        console.log('UE呼我的:', jsonRes)

        const data = {
          clickPosition: { ...clickPosition.value },
          json: jsonRes,
          showMenus: true
        }

        ueData.value = data

        // 处理特定类型的响应
        handleSpecificResponse(jsonRes)

      } catch (error) {
        console.error('解析 UE 响应失败:', error)
      }
    }

    const handleSpecificResponse = (jsonRes) => {
      // if (jsonRes.id === 'JCZX') {
      //   console.log('打开检测中心1:', jsonRes)
      //   localStorage.setItem('roadinfo', JSON.stringify(jsonRes))

      //   nextTick(() => {
      //     router.push('/kb')
      //   })
      // }
      // if (jsonRes.id === 'JCGW') {
      //   console.log('打开检测工位2:', jsonRes)
      //   localStorage.setItem('roadinfo', JSON.stringify(jsonRes))
      //   nextTick(() => {
      //     router.push('/inspection')
      //   })
      // }
    }




    const sendMessage = (message) => {
      if (pixelStreamingInstance) {
        pixelStreamingInstance.emitUIInteraction(message)
      } else {
        console.warn('PixelStreaming 实例未初始化')
      }
    }

    // 清理函数
    const cleanup = () => {
      if (pixelStreamingInstance) {
        pixelStreamingInstance.removeResponseEventListener('handle_responses', handleResponse)
      }
      window.removeEventListener('click', handleCaptureClick)

      if (applicationInstance?.rootElement) {
        document.body.removeChild(applicationInstance.rootElement)
      }
    }

    // 生命周期
    onMounted(() => {
      initializePixelStreaming()
      window.addEventListener('click', handleCaptureClick)
    })

    // setTimeout(() => {
    //   console.log("触发了")
    //   sendMessage({ "code": 1, "type": "btn", "data": { "id": 1 } })

    // }, 4000);

    onUnmounted(() => {
      cleanup()
    })

    // 提供响应式数据和方法
    provide('ueResponseData', readonly(ueData))
    provide('playerMethods', {
      sendMessage,
      getUeData: () => ueData.value
    })

    return {
      ueData,
      clickPosition
    }
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