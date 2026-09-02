<script setup lang="ts">
import { computed } from 'vue'
import { default as ItemList } from '@/components/Tabs/Item/ItemList.vue'
import type { Item } from '@/components/Tabs/Item/item'
import { camelCaseToTitleCase } from '@/composables/useString'

const props = defineProps<{
    items: Item[]
    name: string
}>()

const filteredItems = computed(() => {
    return props.items
        .filter((v) => v.count! > 0)
})
const title = computed((): string => {
    return camelCaseToTitleCase(props.name)
})
</script>

<template>
    <div v-if="filteredItems.length > 0" class="flex flex-col gap-2">
        <div class="text-xl font-medium tracking-wide">{{ title }}</div>
        <ItemList :group="name" hide-state-filter :items="filteredItems" :rows="6" />
    </div>
</template>
