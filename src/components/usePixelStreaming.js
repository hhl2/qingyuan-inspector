import { ref, provide, onMounted, onUnmounted, readonly } from 'vue'
import { useRouter } from 'vue-router'

export function usePixelStreaming() {
    const router = useRouter()
    const ueData = ref(null)
    const clickPosition = ref({ x: 0, y: 0 })

    // iframe 相关
    const streamIframe = ref(null)
    const iframeSrc = ref('/dist/?ss=ws://192.168.31.42:88&HoveringMouse=true&AutoConnect=true')

    const onIframeLoad = () => {
        console.log('PixelStreaming iframe 加载完成')
    }

    const handleCaptureClick = (event) => {
        clickPosition.value = {
            x: event.clientX,
            y: event.clientY
        }

        sendMessageToIframe({
            type: 'CLICK_POSITION',
            position: clickPosition.value
        })
    }

    const handleIframeMessage = (event) => {
        if (event.origin !== 'http://192.168.31.42') return

        try {
            const data = event.data
            console.log('收到来自 iframe 的消息:', data)

            if (data.type === 'UE_RESPONSE') {
                handleResponse(data.payload)
            }
        } catch (error) {
            console.error('处理 iframe 消息失败:', error)
        }
    }

    const handleResponse = (jsonRes) => {
        try {
            console.log('UE响应:', jsonRes)

            const data = {
                clickPosition: { ...clickPosition.value },
                json: jsonRes,
                showMenus: true
            }

            ueData.value = data
            handleSpecificResponse(jsonRes)

        } catch (error) {
            console.error('解析 UE 响应失败:', error)
        }
    }

    const handleSpecificResponse = (jsonRes) => {
        if (jsonRes.id === 'JCZX') {
            console.log('打开检测工位:', jsonRes)
            localStorage.setItem('roadinfo', JSON.stringify(jsonRes.data))
            router.push('/kb')
        }
    }

    const sendMessageToIframe = (message) => {
        if (streamIframe.value && streamIframe.value.contentWindow) {
            streamIframe.value.contentWindow.postMessage(message, 'http://192.168.31.42')
        } else {
            console.warn('iframe 未就绪')
        }
    }

    const sendMessage = (message) => {
        sendMessageToIframe({
            type: 'UE_INTERACTION',
            payload: message
        })
    }

    // 生命周期
    onMounted(() => {
        window.addEventListener('message', handleIframeMessage)
        window.addEventListener('click', handleCaptureClick)
    })

    onUnmounted(() => {
        window.removeEventListener('message', handleIframeMessage)
        window.removeEventListener('click', handleCaptureClick)
    })

    // 提供给子组件使用
    provide('ueResponseData', readonly(ueData))
    provide('playerMethods', {
        sendMessage,
        getUeData: () => ueData.value
    })

    return {
        ueData,
        clickPosition,
        streamIframe,
        iframeSrc,
        onIframeLoad,
        sendMessage
    }
}