import InputStyle from "@/components/lowcode/tool-bar/form/input/InputStyle.vue";
import InputProps from "@/components/lowcode/tool-bar/form/input/InputProps.vue";
import InputInteraction from "./input/InputInteraction.vue";
import RadioProps from "@/components/lowcode/tool-bar/form/radio/RadioProps.vue";
import RadioStyle from "@/components/lowcode/tool-bar/form/radio/RadioStyle.vue";
import RadioInteraction from "@/components/lowcode/tool-bar/form/radio/RadioInteraction.vue";

export const formLowCodeToolBarConfig = {
    Input: {
        InputStyle,
        InputProps,
        InputInteraction
    },
    Radio: {
        RadioStyle,
        RadioProps,
        RadioInteraction
    }
}