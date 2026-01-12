<template>
    <div id="pixel-streaming-container"></div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4'
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4'

export default {
    name: 'PixelStreamingIframe',

    setup() {
        let pixelStreaming = null
        let application = null

        const initializePixelStreaming = () => {
            try {
                const config = new Config({
                    useUrlParams: true,
                    // initialSettings: {
                    //     AutoConnect: true,
                    //     AutoPlayVideo: true,
                    //     HoveringMouse: true
                    // }
                })

                const stream = new PixelStreaming(config)
                pixelStreaming = stream

                const applicationStyles = new PixelStreamingApplicationStyle()
                applicationStyles.applyStyleSheet()

                const app = new Application({
                    stream,
                    onColorModeChanged: (isLightMode) => applicationStyles.setColorMode(isLightMode),
                    settings: { showUI: false }
                })

                application = app
                stream.addResponseEventListener('handle_responses', handleResponse)

                // 添加到容器
                document.body.appendChild(application.rootElement)
                // const container = document.getElementById('pixel-streaming-container')
                // container.appendChild(app.rootElement)

                // // 监听响应并发送给父窗口
                // stream.addResponseEventListener('handle_responses', (res) => {
                //     try {
                //         const jsonRes = JSON.parse(res)
                //         window.parent.postMessage({
                //             type: 'UE_RESPONSE',
                //             payload: jsonRes
                //         }, window.location.origin)
                //     } catch (error) {
                //         console.error('解析响应失败:', error)
                //     }
                // })

            } catch (error) {
                console.error('初始化失败:', error)
            }
        }
        const handleResponse = (res) => {
            // try {
            //     const jsonRes = JSON.parse(res)
            //     console.log('UE呼我的:', jsonRes)

            //     const data = {
            //         clickPosition: { ...clickPosition.value },
            //         json: jsonRes,
            //         showMenus: true
            //     }

            //     ueData.value = data

            //     // 处理特定类型的响应
            //     handleSpecificResponse(jsonRes)

            // } catch (error) {
            //     console.error('解析 UE 响应失败:', error)
            // }
        }
        onMounted(() => {
            initializePixelStreaming()
        })

        onUnmounted(() => {
            if (pixelStreaming) {
                // 清理资源
            }
        })
    }
}
</script>

<style scoped>
/* #pixel-streaming-container {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
} */
</style>