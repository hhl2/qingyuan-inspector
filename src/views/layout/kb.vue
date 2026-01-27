<template>
  <div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch, inject, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
/* 触发ue5 */
// 注入父组件提供的方法
const playerMethods = inject('playerMethods')
// 封装调用逻辑
const callParentMethod = (message) => {
  if (playerMethods?.getUeData) {
    console.log(message)
  }
  if (playerMethods?.sendMessage) {
    playerMethods.sendMessage(message)
  } else {
    console.error('方法未成功注入')
  }
}
// 获取路由实例和当前路由对象
const router = useRouter();
const route = useRoute();
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
  if (newVal) {
    console.log('接收到新数据:', newVal)
    const jsonRes = newVal?.json
    if (jsonRes && jsonRes.type === 'JCGW') {
      console.log('打开检测工位:', jsonRes)
      localStorage.setItem('roadinfo', JSON.stringify(jsonRes))
      nextTick(() => {
        router.push('/inspection')
      })
    }

  }
})

onMounted(async () => {

  callParentMethod({ "code": 1, "type": "btn", "data": { "id": 0 } });

})


</script>

<style>
.pixel-streaming-iframe {
  width: 100vw;
  height: 100vh;
}
</style>