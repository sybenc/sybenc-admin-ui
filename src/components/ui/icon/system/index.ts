import {Component} from "vue";
import IconAccessibility from "@/components/ui/icon/system/accessibility/IconAccessibility.vue";
import IconAccessibilityFilled from "@/components/ui/icon/system/accessibility/IconAccessibilityFilled.vue";
import IconAdd from "@/components/ui/icon/system/add/IconAdd.vue";
import IconAddFilled from "@/components/ui/icon/system/add/IconAddFilled.vue";
import IconAddCircle from "@/components/ui/icon/system/add/IconAddCircle.vue";
import IconAddCircleFilled from "@/components/ui/icon/system/add/IconAddCircleFilled.vue";
import IconAddSquare from "@/components/ui/icon/system/add/IconAddSquare.vue";
import IconAddSquareFilled from "@/components/ui/icon/system/add/IconAddSquareFilled.vue";
import IconApi from "@/components/ui/icon/system/api/IconApi.vue";
import IconApiFilled from "@/components/ui/icon/system/api/IconApiFilled.vue";
import IconBell from "@/components/ui/icon/system/bell/IconBell.vue";
import IconBellFilled from "@/components/ui/icon/system/bell/IconBellFilled.vue";
import IconBellOff from "@/components/ui/icon/system/bell/IconBellOff.vue";
import IconBellOffFilled from "@/components/ui/icon/system/bell/IconBellOffFilled.vue";
import IconDelete from "@/components/ui/icon/system/delete/IconDelete.vue";
import IconDeleteFilled from "@/components/ui/icon/system/delete/IconDeleteFilled.vue";
import IconDesktopPulse from "@/components/ui/icon/system/desktop/IconDesktopPulse.vue";
import IconDesktopPulseFilled from "@/components/ui/icon/system/desktop/IconDesktopPulseFilled.vue";
import IconFullScreen from "@/components/ui/icon/system/fullscreen/IconFullScreen.vue";
import IconGlobe from "@/components/ui/icon/system/globe/IconGlobe.vue";
import IconHistory from "@/components/ui/icon/system/history/IconHistory.vue";
import IconHistoryFilled from "@/components/ui/icon/system/history/IconHistoryFilled.vue";
import IconRedo from "@/components/ui/icon/system/history/IconRedo.vue";
import IconUndo from "@/components/ui/icon/system/history/IconUndo.vue";
import IconHome from "@/components/ui/icon/system/home/IconHome.vue";
import IconHomeFilled from "@/components/ui/icon/system/home/IconHomeFilled.vue";
import IconLocation from "@/components/ui/icon/system/location/IconLocation.vue";
import IconLocationFilled from "@/components/ui/icon/system/location/IconLocationFilled.vue";
import IconLocationArrow from "@/components/ui/icon/system/location/IconLocationArrow.vue";
import IconLocationArrowFilled from "@/components/ui/icon/system/location/IconLocationArrowFilled.vue";
import IconLocationRipple from "@/components/ui/icon/system/location/IconLocationRipple.vue";
import IconLocationRippleFilled from "@/components/ui/icon/system/location/IconLocationRippleFilled.vue";
import IconLockClosed from "@/components/ui/icon/system/lock/IconLockClosed.vue";
import IconLockClosedFilled from "@/components/ui/icon/system/lock/IconLockClosedFilled.vue";
import IconLockOpen from "@/components/ui/icon/system/lock/IconLockOpen.vue";
import IconLockOpenFilled from "@/components/ui/icon/system/lock/IconLockOpenFilled.vue";
import IconMail from "@/components/ui/icon/system/mail/IconMail.vue";
import IconMailFilled from "@/components/ui/icon/system/mail/IconMailFilled.vue";
import IconSave from "@/components/ui/icon/system/save/IconSave.vue";
import IconSaveFilled from "@/components/ui/icon/system/save/IconSaveFilled.vue";
import IconSearch from "@/components/ui/icon/system/search/IconSearch.vue";
import IconSearchFilled from "@/components/ui/icon/system/search/IconSearchFilled.vue";
import IconSetting from "@/components/ui/icon/system/setting/IconSetting.vue";
import IconSettingFilled from "@/components/ui/icon/system/setting/IconSettingFilled.vue";
import IconShieldCheck from "@/components/ui/icon/system/shield/IconShieldCheck.vue";
import IconShieldcheckFilled from "@/components/ui/icon/system/shield/IconShieldcheckFilled.vue";
import IconMoon from "@/components/ui/icon/system/theme/IconMoon.vue";
import IconSun from "@/components/ui/icon/system/theme/IconSun.vue";

export const iconSystemNameList: IconSystemName[] = ['system.accessibility'
    , 'system.accessibility.filled'
    , 'system.add'
    , 'system.add.circle'
    , 'system.add.circle.filled'
    , 'system.add.filled'
    , 'system.add.square'
    , 'system.add.square.filled'
    , 'system.api'
    , 'system.api.filled'
    , 'system.bell'
    , 'system.bell.filled'
    , 'system.bell.off'
    , 'system.bell.off.filled'
    , 'system.delete'
    , 'system.delete.filled'
    , 'system.desktop.pulse'
    , 'system.desktop.pulse.filled'
    , 'system.fullscreen'
    , 'system.globe'
    , 'system.history'
    , 'system.history.filled'
    , 'system.redo'
    , 'system.undo'
    , 'system.home'
    , 'system.home.filled'
    , 'system.location'
    , 'system.location.filled'
    , 'system.location.arrow'
    , 'system.location.arrow.filled'
    , 'system.location.ripple'
    , 'system.location.ripple.filled'
    , 'system.lock.closed'
    , 'system.lock.closed.filled'
    , 'system.lock.open'
    , 'system.lock.open.filled'
    , 'system.mail'
    , 'system.mail.filled'
    , 'system.save'
    , 'system.save.filled'
    , 'system.search'
    , 'system.search.filled'
    , 'system.setting'
    , 'system.setting.filled'
    , 'system.shield.check'
    , 'system.shield.check.filled'
    , 'system.theme.moon'
    , 'system.theme.sun']

export type IconSystemName = 'system.accessibility'
    | 'system.accessibility.filled'
    | 'system.add'
    | 'system.add.circle'
    | 'system.add.circle.filled'
    | 'system.add.filled'
    | 'system.add.square'
    | 'system.add.square.filled'
    | 'system.api'
    | 'system.api.filled'
    | 'system.bell'
    | 'system.bell.filled'
    | 'system.bell.off'
    | 'system.bell.off.filled'
    | 'system.delete'
    | 'system.delete.filled'
    | 'system.desktop.pulse'
    | 'system.desktop.pulse.filled'
    | 'system.fullscreen'
    | 'system.globe'
    | 'system.history'
    | 'system.history.filled'
    | 'system.redo'
    | 'system.undo'
    | 'system.home'
    | 'system.home.filled'
    | 'system.location'
    | 'system.location.filled'
    | 'system.location.arrow'
    | 'system.location.arrow.filled'
    | 'system.location.ripple'
    | 'system.location.ripple.filled'
    | 'system.lock.closed'
    | 'system.lock.closed.filled'
    | 'system.lock.open'
    | 'system.lock.open.filled'
    | 'system.mail'
    | 'system.mail.filled'
    | 'system.save'
    | 'system.save.filled'
    | 'system.search'
    | 'system.search.filled'
    | 'system.setting'
    | 'system.setting.filled'
    | 'system.shield.check'
    | 'system.shield.check.filled'
    | 'system.theme.moon'
    | 'system.theme.sun'

export const iconSystemComponents: { [key in IconSystemName]: Component } = {
    'system.accessibility': IconAccessibility,
    'system.accessibility.filled': IconAccessibilityFilled,
    'system.add': IconAdd,
    'system.add.circle': IconAddFilled,
    'system.add.circle.filled': IconAddCircle,
    'system.add.filled': IconAddCircleFilled,
    'system.add.square': IconAddSquare,
    'system.add.square.filled': IconAddSquareFilled,
    'system.api': IconApi,
    'system.api.filled': IconApiFilled,
    'system.bell': IconBell,
    'system.bell.filled': IconBellFilled,
    'system.bell.off': IconBellOff,
    'system.bell.off.filled': IconBellOffFilled,
    'system.delete': IconDelete,
    'system.delete.filled': IconDeleteFilled,
    'system.desktop.pulse': IconDesktopPulse,
    'system.desktop.pulse.filled': IconDesktopPulseFilled,
    'system.fullscreen': IconFullScreen,
    'system.globe': IconGlobe,
    'system.history': IconHistory,
    'system.history.filled': IconHistoryFilled,
    'system.redo': IconRedo,
    'system.undo': IconUndo,
    'system.home': IconHome,
    'system.home.filled': IconHomeFilled,
    'system.location': IconLocation,
    'system.location.filled': IconLocationFilled,
    'system.location.arrow': IconLocationArrow,
    'system.location.arrow.filled': IconLocationArrowFilled,
    'system.location.ripple': IconLocationRipple,
    'system.location.ripple.filled': IconLocationRippleFilled,
    'system.lock.closed': IconLockClosed,
    'system.lock.closed.filled': IconLockClosedFilled,
    'system.lock.open': IconLockOpen,
    'system.lock.open.filled': IconLockOpenFilled,
    'system.mail': IconMail,
    'system.mail.filled': IconMailFilled,
    'system.save': IconSave,
    'system.save.filled': IconSaveFilled,
    'system.search': IconSearch,
    'system.search.filled': IconSearchFilled,
    'system.setting': IconSetting,
    'system.setting.filled': IconSettingFilled,
    'system.shield.check': IconShieldCheck,
    'system.shield.check.filled': IconShieldcheckFilled,
    'system.theme.moon': IconMoon,
    'system.theme.sun': IconSun,

}