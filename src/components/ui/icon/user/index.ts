import {Component} from "vue";
import IconUser from "@/components/ui/icon/user/IconUser.vue";
import IconUserFilled from "@/components/ui/icon/user/IconUserFilled.vue";
import IconMale from "@/components/ui/icon/user/IconMale.vue";
import IconFemale from "@/components/ui/icon/user/IconFemale.vue";
import IconUserAvailable from "@/components/ui/icon/user/IconUserAvailable.vue";
import IconUserAvailableFilled from "@/components/ui/icon/user/IconUserAvailableFilled.vue";
import IconUserBanned from "@/components/ui/icon/user/IconUserBanned.vue";
import IconUserBannedFilled from "@/components/ui/icon/user/IconUserBannedFilled.vue";
import IconUserKey from "@/components/ui/icon/user/IconUserKey.vue";
import IconUserKeyFilled from "@/components/ui/icon/user/IconUserKeyFilled.vue";
import IconUserLock from "@/components/ui/icon/user/IconUserLock.vue";
import IconUserLockFilled from "@/components/ui/icon/user/IconUserLockFilled.vue";
import IconUserSilent from "@/components/ui/icon/user/IconUserSilent.vue";
import IconUserSilentFilled from "@/components/ui/icon/user/IconUserSilentFilled.vue";
import IconUserWarning from "@/components/ui/icon/user/IconUserWarning.vue";
import IconUserWarningFilled from "@/components/ui/icon/user/IconUserWarningFilled.vue";

export const iconUserNameList: IconUserName[] = ['user'
    , 'user.filled'
    , 'user.female'
    , 'user.male'
    , 'user.available'
    , 'user.available.filled'
    , 'user.banned'
    , 'user.banned.filled'
    , 'user.key'
    , 'user.key.filled'
    , 'user.lock'
    , 'user.lock.filled'
    , 'user.silent'
    , 'user.silent.filled'
    , 'user.warning'
    , 'user.warning.filled']
export type IconUserName = 'user'
    | 'user.filled'
    | 'user.female'
    | 'user.male'
    | 'user.available'
    | 'user.available.filled'
    | 'user.banned'
    | 'user.banned.filled'
    | 'user.key'
    | 'user.key.filled'
    | 'user.lock'
    | 'user.lock.filled'
    | 'user.silent'
    | 'user.silent.filled'
    | 'user.warning'
    | 'user.warning.filled'

export const iconUserComponents: { [key in IconUserName]: Component } = {
    "user": IconUser,
    "user.filled": IconUserFilled,
    "user.male": IconMale,
    "user.female": IconFemale,
    "user.available": IconUserAvailable,
    "user.available.filled": IconUserAvailableFilled,
    "user.banned": IconUserBanned,
    "user.banned.filled": IconUserBannedFilled,
    "user.key": IconUserKey,
    "user.key.filled": IconUserKeyFilled,
    "user.lock": IconUserLock,
    "user.lock.filled": IconUserLockFilled,
    "user.silent": IconUserSilent,
    "user.silent.filled": IconUserSilentFilled,
    "user.warning": IconUserWarning,
    "user.warning.filled": IconUserWarningFilled
}