<template>
    <div v-if="showMenus" class="context-menu" ref="menuRef">
        <div class="context_tan">

            <div class="sxtmName">

                <div class="close-popup" @click="closeSingleVideoPopup">×</div>
            </div>


        </div>
    </div>
</template>


<script setup>
import { onMounted, onUnmounted, watch, inject, ref, nextTick } from "vue";
import { querySampleDetectionDetail } from "@/api/user";
import {
    MOCK_FAngZhen

} from "@/constants/deviceMock";
const showMenus = ref(true);


const currentContractPartId = ref("");
const currentStationCode = ref("");
const gjtjList = ref([]);
const querySampleDetectionDetails = async () => {
    const res = await querySampleDetectionDetail({
        contractPartId: currentContractPartId.value,
        uniqueCode: currentStationCode.value,
    });
    if (res?.code === 200 && res.data) {
        gjtjList.value = res.data;
    } else {
        gjtjList.value = [...MOCK_FAngZhen];
    }
}


// 当前选中的摄像头信息
const currentCamera = ref({
    id: '',
    name: '',
    videoUrl: '',
    location: '',
    status: 'online'
});

const closeSingleVideoPopup = () => {
    showMenus.value = false;
};

onMounted(() => {
    querySampleDetectionDetails()

})
</script>


<style scoped>
.context-menu {
    width: 680px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url("@/assets/弹窗.png") no-repeat 0 0;
    background-size: 100% 100%;
    z-index: 32;
    overflow-y: auto;
    overflow-x: hidden;
}


.context_tan {
    margin: 45px 0px 0px 30px;
    height: 455px;
    overflow-y: auto;

}

.sxtmName {
    font-family: "Microsoft YaHei", sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: #FFFFFF;

    background: #61B3FF;
    background: -webkit-linear-gradient(0deg, #61B3FF 0.4150390625%, rgba(255, 255, 255, 0.11) 100%);
    background: linear-gradient(0deg, #61B3FF 0.4150390625%, rgba(255, 255, 255, 0.11) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 45px;
    position: relative;
    cursor: pointer;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 45px;
    z-index: 9999;
}

/* 关闭按钮 */
.close-popup {
    position: absolute;
    right: 25px;
    top: -5px;
    width: 34px;
    height: 34px;
    line-height: 20px;
    border-radius: 50%;
    background: rgba(255, 100, 100, 0.8);
    color: #fff;
    /* 覆盖父元素的透明文字填充，确保关闭按钮文字可见 */
    -webkit-text-fill-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
}

.close-popup:hover {
    background: rgba(255, 60, 60, 1);
    transform: scale(1.1);
}
</style>