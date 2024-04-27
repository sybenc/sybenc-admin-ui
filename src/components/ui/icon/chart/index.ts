import {Component} from "vue";
import IconAppleOutlined from "@/components/ui/icon/soft/apple/IconApple.vue";
import IconGithubOutlined from "@/components/ui/icon/soft/IconGithubOutlined.vue";
import IconAlipayOutlined from "@/components/ui/icon/soft/alipay/IconAlipay.vue";
import IconOpenaiOutlined from "@/components/ui/icon/soft/chatgpt/IconChatGPT.vue";
import IconApiOutlined from "@/components/ui/icon/sys/api/IconApi.vue";

export const iconOutlinedComponents: { [key in IconName]: Component } = {
    apple: IconAppleOutlined,
    github: IconGithubOutlined,
    alipay: IconAlipayOutlined,
    openai: IconOpenaiOutlined,
    api: IconApiOutlined
}