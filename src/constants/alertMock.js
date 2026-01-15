/**
 * AlertManagement 组件 Mock 数据
 * 用于开发测试以及 API 无数据时的兜底显示
 */

// 告警统计默认数据
export const DEFAULT_ALERT_STATS = []

// 告警统计 - 兜底测试数据
export const MOCK_ALERT_STATS = [
    {
        alarmTypeName: "设备故障",
        alarmTypeCount: 0,
    },
    {
        alarmTypeName: "通信异常",
        alarmTypeCount: 0,
    },
    {
        alarmTypeName: "安防异常",
        alarmTypeCount: 0,
    },
    {
        alarmTypeName: "环境故障",
        alarmTypeCount: 0,
    },
]

// 告警列表默认数据
export const DEFAULT_ALERT_LIST = []

// 告警列表 - 兜底测试数据
export const MOCK_ALERT_LIST = [
    {
        alarmTimeStr: "2025-10-15 10:30:00",
        alarmContent: "变压器温度过高告警",
        alarmTypeName: "设备故障",
        alarmLevelName: "紧急",
    },
    {
        alarmTimeStr: "2025-10-15 09:15:00",
        alarmContent: "通信模块连接中断",
        alarmTypeName: "通信异常",
        alarmLevelName: "重要",
    },
    {
        alarmTimeStr: "2025-10-14 16:45:00",
        alarmContent: "门禁系统异常开启",
        alarmTypeName: "安防异常",
        alarmLevelName: "一般",
    },
]
