<template>
    <div class="page-a">

        <iframe ref="streamIframe" class="pixel-streaming-iframe" src="http://192.168.31.37:8083/#/PixelStreamingIframe"
            frameborder="0" @load="onIframeLoad" />

        <div class="page-content">
            <h1>页面 A</h1>


            <div class="ue-info">
                <h3>UE 响应数据:</h3>
                <pre>{{ ueData ? JSON.stringify(ueData, null, 2) : '暂无数据' }}</pre>
            </div>


            <div class="control-panel">
                <h3>控制面板</h3>
                <button @click="sendTestMessage">发送测试消息</button>
                <button @click="sendMoveCommand">移动命令</button>
                <button @click="sendColorChange">改变颜色</button>
                <button @click="sendCustomCommand">自定义命令</button>
            </div>

            <div class="click-info">
                <h3>点击位置:</h3>
                <p>X: {{ clickPosition.x }}, Y: {{ clickPosition.y }}</p>
            </div>
        </div>
    </div>

</template>

<script>
import { usePixelStreaming } from '@/components/usePixelStreaming'
import { watch } from 'vue'

export default {
    name: 'PageA',

    setup() {
        const {
            ueData,
            clickPosition,
            streamIframe,
            iframeSrc,
            onIframeLoad,
            sendMessage
        } = usePixelStreaming()

        // 监听 UE 数据变化
        watch(ueData, (newData) => {
            if (newData) {
                console.log('页面A收到UE数据:', newData)

                // 根据不同的响应类型进行处理
                handleUEResponse(newData.json)
            }
        })

        // 处理特定的 UE 响应
        const handleUEResponse = (jsonRes) => {
            if (!jsonRes) return

            switch (jsonRes.type) {
                case 'OBJECT_SELECTED':
                    console.log('页面A: 对象被选中', jsonRes.data)
                    break
                case 'ANIMATION_COMPLETE':
                    console.log('页面A: 动画完成', jsonRes.data)
                    break
                case 'ERROR_OCCURRED':
                    console.error('页面A: UE发生错误', jsonRes.data)
                    break
                default:
                    console.log('页面A: 收到未知类型消息', jsonRes)
            }
        }

        // 向 UE 发送各种命令
        const sendTestMessage = () => {
            sendMessage({
                type: 'TEST_COMMAND',
                message: '这是来自页面A的测试消息',
                timestamp: new Date().toISOString()
            })
        }

        const sendMoveCommand = () => {
            sendMessage({
                type: 'MOVE_OBJECT',
                objectId: 'player_001',
                position: { x: 100, y: 200, z: 50 },
                speed: 2.5
            })
        }

        const sendColorChange = () => {
            sendMessage({
                type: 'CHANGE_COLOR',
                objectId: 'target_object',
                color: '#FF0000',
                duration: 1.0
            })
        }

        const sendCustomCommand = () => {
            sendMessage({
                type: 'CUSTOM_ACTION',
                action: 'special_effect',
                parameters: {
                    intensity: 0.8,
                    duration: 3.0,
                    target: 'all'
                }
            })
        }

        return {
            ueData,
            clickPosition,
            streamIframe,
            iframeSrc,
            onIframeLoad,
            sendTestMessage,
            sendMoveCommand,
            sendColorChange,
            sendCustomCommand
        }
    }
}
</script>

<style>
.pixel-streaming-iframe {
    width: 100vw;
    height: 100vh;

}
</style>