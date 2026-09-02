<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import * as dataStorage from '@/data'
import type { Item } from '@/components/Tabs/Item/item'
import { default as ItemList } from '@/components/Tabs/Item/ItemList.vue'
import type { Collection } from '@/components/Tabs/YourCollection/collection.ts'

const props = defineProps<{
    group: string
}>()

const collection = useStorage<Collection>('collection', {})

/** Get the items for the current data. */
const items = computed((): Item[] => {
    return ((dataStorage as Record<string, Item[]>)[props.group] ?? [])
        .map(function (v) {
            return {
                ...v,
                count: collection.value[props.group].find((i) => i.name === v.name)?.count ?? 0
            }
        })
})
</script>

<template>
    <ItemList
        :group="group"
        :items="items"
    />
</template>
