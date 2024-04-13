<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Label} from '@/components/ui/label'

const props = defineProps({
  grouping: {type: Boolean},
  placeholder: {type: String},
  label: {type: String, required: true},
  item: {type: Object as () => { [key: string]: string[] }, required: true}
})
const {grouping, placeholder, item} = props
const model = defineModel({type: String, required: true})
</script>

<template>
  <div class="flex flex-col gap-1.5 px-2">
    <Label class="justify-start text-xs">{{label}}</Label>
    <Select v-model="model">
      <SelectTrigger  class="h-6 px-2">
        <SelectValue :placeholder="placeholder"/>
      </SelectTrigger>
      <SelectContent>
        <template v-if="grouping">
          <template v-for="(value, index) in item" :key="index">
            <SelectGroup>
              <SelectLabel>{{index}}</SelectLabel>
              <template v-for="(itemValue, _) in value" :key="itemValue">
                <SelectItem :value="itemValue">
                  {{itemValue}}
                </SelectItem>
              </template>
            </SelectGroup>
          </template>
        </template>
        <template v-else>
          <template v-for="(value, _) in item" :key="value">
            <template v-for="(itemValue, _) in value" :key="itemValue">
              <SelectItem :value="itemValue">
                {{itemValue}}
              </SelectItem>
            </template>
          </template>
        </template>
      </SelectContent>
    </Select>
  </div>
</template>