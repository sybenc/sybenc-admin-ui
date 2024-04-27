import IconAlipay from "@/components/ui/icon/soft/alipay/IconAlipay.vue";
import IconAlipayCircle from "@/components/ui/icon/soft/alipay/IconAlipayCircle.vue";
import IconAlipaySquare from "@/components/ui/icon/soft/alipay/IconAlipaySquare.vue";
import IconAmazon from "@/components/ui/icon/soft/amazon/IconAmazon.vue";
import IconAmazonCircle from "@/components/ui/icon/soft/amazon/IconAmazonCircle.vue";
import IconAmazonSquare from "@/components/ui/icon/soft/amazon/IconAmazonSquare.vue";
import IconAndroid from "@/components/ui/icon/soft/os/IconAndroid.vue";
import IconBiliBili from "@/components/ui/icon/soft/bilibili/IconBiliBili.vue";
import IconBiliBiliSquare from "@/components/ui/icon/soft/bilibili/IconBiliBiliSquare.vue";
import IconDiscord from "@/components/ui/icon/soft/discord/IconDiscord.vue";
import IconDiscordFilled from "@/components/ui/icon/soft/discord/IconDiscordFilled.vue";
import IconGithub from "@/components/ui/icon/soft/github/IconGithubCircle.vue";
import IconChatGPTFilled from "@/components/ui/icon/soft/chatgpt/IconChatGPTFilled.vue";
import IconChatGPT from "@/components/ui/icon/soft/chatgpt/IconChatGPT.vue";
import IconTikTok from "@/components/ui/icon/soft/tiktok/IconTikTok.vue";
import IconTikTokSquare from "@/components/ui/icon/soft/tiktok/IconTikTokSquare.vue";
import IconWechat from "@/components/ui/icon/soft/IconWechat.vue";
import IconWeibo from "@/components/ui/icon/soft/IconWeibo.vue";
import IconWindows from "@/components/ui/icon/soft/os/IconWindows.vue";
import IconIE from "@/components/ui/icon/soft/IconIE.vue";
import IconKubernetes from "@/components/ui/icon/soft/IconKubernetes.vue";
import IconLinkedin from "@/components/ui/icon/soft/linkedin/IconLinkedin.vue";
import IconLinkedinFilled from "@/components/ui/icon/soft/linkedin/IconLinkedinFilled.vue";
import IconLinux from "@/components/ui/icon/soft/os/IconLinux.vue";
import IconQQ from "@/components/ui/icon/soft/qq/IconQQ.vue";
import IconSpotify from "@/components/ui/icon/soft/spotify/IconSpotify.vue";
import IconSpotifyFilled from "@/components/ui/icon/soft/spotify/IconSpotifyFilled.vue";
import IconTaobao from "@/components/ui/icon/soft/taobao/IconTaobao.vue";
import IconTaobaoSquare from "@/components/ui/icon/soft/taobao/IconTaobaoSquare.vue";
import IconTaobaoCircle from "@/components/ui/icon/soft/taobao/IconTaobaoCircle.vue";
import IconWindowsFilled from "@/components/ui/icon/soft/os/IconWindowsFilled.vue";
import IconX from "@/components/ui/icon/soft/IconX.vue";
import IconYoutube from "@/components/ui/icon/soft/youtube/IconYoutube.vue";
import IconYoutubeFilled from "@/components/ui/icon/soft/youtube/IconYoutubeFilled.vue";
import IconZhihu from "@/components/ui/icon/soft/zhihu/IconZhihu.vue";
import IconZhihuSquare from "@/components/ui/icon/soft/zhihu/IconZhihuSquare.vue";
import IconZhihuCircle from "@/components/ui/icon/soft/zhihu/IconZhihuCircle.vue";
import IconWhatsapp from "@/components/ui/icon/soft/IconWhatsapp.vue";
import {Component} from "vue";
import IconApple from "@/components/ui/icon/soft/apple/IconApple.vue";
import IconAppleFilled from "@/components/ui/icon/soft/apple/IconAppleFilled.vue";
import IconDebian from "@/components/ui/icon/soft/os/IconDebian.vue";
import IconKali from "@/components/ui/icon/soft/os/IconKali.vue";
import IconUbuntu from "@/components/ui/icon/soft/os/IconUbuntu.vue";
import IconUbuntuFilled from "@/components/ui/icon/soft/os/IconUbuntuFilled.vue";
import IconMacOS from "@/components/ui/icon/soft/os/IconMacOS.vue";
import IconQQCircle from "@/components/ui/icon/soft/qq/IconQQCircle.vue";
import IconQQSquare from "@/components/ui/icon/soft/qq/IconQQSquare.vue";
import IconTelegram from "@/components/ui/icon/soft/telegram/IconTelegram.vue";
import IconTelegramFilled from "@/components/ui/icon/soft/telegram/IconTelegramFilled.vue";
import IconTelegramCircle from "@/components/ui/icon/soft/telegram/IconTelegramCircle.vue";

export const iconSoftNameList: IconSoftName[] = ['soft.alipay'
    , 'soft.alipay.circle'
    , 'soft.alipay.square'
    , 'soft.amazon'
    , 'soft.amazon.circle'
    , 'soft.amazon.square'
    , 'soft.apple'
    , 'soft.apple.filled'
    , 'soft.android'
    , 'soft.bilibili'
    , 'soft.bilibili.square'
    , 'soft.chatgpt'
    , 'soft.chatgpt.filled'
    , 'soft.discord'
    , 'soft.discord.filled'
    , 'soft.github'
    , 'soft.ie'
    , 'soft.kubernetes'
    , 'soft.linkedin'
    , 'soft.linkedin.filled'
    , 'soft.linux'
    , 'soft.qq'
    , 'soft.qq.circle'
    , 'soft.qq.square'
    , 'soft.spotify'
    , 'soft.spotify.filled'
    , 'soft.taobao'
    , 'soft.taobao.circle'
    , 'soft.taobao.square'
    , 'soft.tiktok'
    , 'soft.tiktok.square'
    , 'soft.wechat'
    , 'soft.weibo'
    , 'soft.whatsapp'
    , 'soft.windows'
    , 'soft.windows.filled'
    , 'soft.x'
    , 'soft.youtube'
    , 'soft.youtube.filled'
    , 'soft.zhihu'
    , 'soft.zhihu.circle'
    , 'soft.zhihu.square'
    , 'soft.debian'
    , 'soft.kali'
    , 'soft.ubuntu'
    , 'soft.ubuntu.filled'
    , 'soft.macos'
    , 'soft.telegram'
    , 'soft.telegram.circle'
    , 'soft.telegram.filled']

export type IconSoftName = 'soft.alipay'
    | 'soft.alipay.circle'
    | 'soft.alipay.square'
    | 'soft.amazon'
    | 'soft.amazon.circle'
    | 'soft.amazon.square'
    | 'soft.apple'
    | 'soft.apple.filled'
    | 'soft.android'
    | 'soft.bilibili'
    | 'soft.bilibili.square'
    | 'soft.chatgpt'
    | 'soft.chatgpt.filled'
    | 'soft.discord'
    | 'soft.discord.filled'
    | 'soft.github'
    | 'soft.ie'
    | 'soft.kubernetes'
    | 'soft.linkedin'
    | 'soft.linkedin.filled'
    | 'soft.linux'
    | 'soft.qq'
    | 'soft.qq.circle'
    | 'soft.qq.square'
    | 'soft.spotify'
    | 'soft.spotify.filled'
    | 'soft.taobao'
    | 'soft.taobao.circle'
    | 'soft.taobao.square'
    | 'soft.tiktok'
    | 'soft.tiktok.square'
    | 'soft.wechat'
    | 'soft.weibo'
    | 'soft.whatsapp'
    | 'soft.windows'
    | 'soft.windows.filled'
    | 'soft.x'
    | 'soft.youtube'
    | 'soft.youtube.filled'
    | 'soft.zhihu'
    | 'soft.zhihu.circle'
    | 'soft.zhihu.square'
    | 'soft.debian'
    | 'soft.kali'
    | 'soft.ubuntu'
    | 'soft.ubuntu.filled'
    | 'soft.macos'
    | 'soft.telegram'
    | 'soft.telegram.circle'
    | 'soft.telegram.filled'

export const iconSoftComponents: { [key in IconSoftName]: Component } = {
    'soft.alipay': IconAlipay,
    'soft.alipay.circle': IconAlipayCircle,
    'soft.alipay.square': IconAlipaySquare,
    'soft.amazon': IconAmazon,
    'soft.amazon.circle': IconAmazonCircle,
    'soft.amazon.square': IconAmazonSquare,
    'soft.android': IconAndroid,
    'soft.apple': IconApple,
    'soft.apple.filled': IconAppleFilled,
    'soft.bilibili': IconBiliBili,
    'soft.bilibili.square': IconBiliBiliSquare,
    'soft.chatgpt': IconChatGPT,
    'soft.chatgpt.filled': IconChatGPTFilled,
    'soft.discord': IconDiscord,
    'soft.discord.filled': IconDiscordFilled,
    'soft.github': IconGithub,
    'soft.ie': IconIE,
    'soft.kubernetes': IconKubernetes,
    'soft.linkedin': IconLinkedin,
    'soft.linkedin.filled': IconLinkedinFilled,
    'soft.linux': IconLinux,
    'soft.qq': IconQQ,
    'soft.qq.circle': IconQQCircle,
    "soft.qq.square": IconQQSquare,
    'soft.spotify': IconSpotify,
    'soft.spotify.filled': IconSpotifyFilled,
    'soft.taobao': IconTaobao,
    'soft.taobao.circle': IconTaobaoCircle,
    'soft.taobao.square': IconTaobaoSquare,
    'soft.tiktok': IconTikTok,
    'soft.tiktok.square': IconTikTokSquare,
    'soft.wechat': IconWechat,
    'soft.weibo': IconWeibo,
    'soft.whatsapp': IconWhatsapp,
    'soft.windows': IconWindows,
    'soft.windows.filled': IconWindowsFilled,
    'soft.x': IconX,
    'soft.youtube': IconYoutube,
    'soft.youtube.filled': IconYoutubeFilled,
    'soft.zhihu': IconZhihu,
    'soft.zhihu.circle': IconZhihuCircle,
    'soft.zhihu.square': IconZhihuSquare,
    "soft.debian": IconDebian,
    "soft.kali": IconKali,
    "soft.ubuntu": IconUbuntu,
    "soft.ubuntu.filled": IconUbuntuFilled,
    "soft.macos": IconMacOS,
    "soft.telegram": IconTelegram,
    "soft.telegram.filled": IconTelegramFilled,
    "soft.telegram.circle": IconTelegramCircle,
}