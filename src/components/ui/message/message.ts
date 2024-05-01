import {ElMessage} from "element-plus";
import IconInfoFilled from "@/components/ui/icon/system/status/IconInfoFilled.vue";
import IconErrorFilled from "@/components/ui/icon/system/status/IconErrorFilled.vue";
import IconWarningFilled from "@/components/ui/icon/system/status/IconWarningFilled.vue";
import IconSuccessFilled from "@/components/ui/icon/system/status/IconSuccessFilled.vue";

interface Message {
    info: (msg: string) => void
    success: (msg: string) => void
    error: (msg: string) => void
    warning: (msg: string) => void
}

const message: Message = {
    info: (msg: string) => {
        ElMessage({
            icon: IconInfoFilled,
            type: 'info',
            message: msg,
        })
    },
    success: (msg: string) => {
        ElMessage({
            icon: IconSuccessFilled,
            type: 'success',
            message: msg,
        })
    },
    error: (msg: string) => {
        ElMessage({
            icon: IconErrorFilled,
            type: 'error',
            message: msg,
        })
    },
    warning: (msg: string) => {
        ElMessage({
            icon: IconWarningFilled,
            type: 'warning',
            message: msg,
        })
    }
}

export default message