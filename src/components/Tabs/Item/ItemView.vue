<script setup lang="ts">
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { svgStyles } from '@/Constants'
import type { Item } from '@/components/Tabs/Item/item'
import type { Collection } from '@/components/Tabs/YourCollection/collection.ts'

const props = defineProps<{
    group: string
    item: Item
}>()

const collection = useStorage<Collection>('collection', {})
// const slugCollection = ref<Item[]>(collection.value[props.group] ?? [])
const visible = ref<boolean>(false)

/**
 * Add an item to the collection.
 * @returns {void}
 */
const addItem = (): void => {
    const collectionItem = getItem(props.item)
    if(collectionItem) {
        collectionItem.count = (collectionItem.count ?? 0) + 1
    } else {
        if(!Object.hasOwn(collection.value, props.group)) {
            collection.value[props.group] = []
        }
        collection.value[props.group].push({
            ...props.item,
            count: 1
        })
    }
}
/**
 * Check if an item already exists in the collection.
 * @param {Item} item
 * @returns {boolean}
 */
const getItem = (item: Item): Item|null => {
    return collection.value[props.group]?.find((i) => i.name.toLowerCase() === item.name.toLowerCase()) ?? null
}
/**
 * Remove an item from the collection.
 * @returns {void}
 */
const removeItem = (): void => {
    const collectionItem = getItem(props.item)
    if(collectionItem) {
        collectionItem.count = (collectionItem.count ?? 0) - 1
    }
}
</script>

<template>
    <div class="text-sm">
        <div class="relative group">
            <img class="shadow rounded" :src="`images/${item.image}.webp`">
            <PrimeTag
                :pt="{
                    root: 'absolute bottom-2 right-2'
                }"
                severity="secondary"
                :value="`Has: ${item.count}`"
            />
            <div :class="[
                'absolute top-0 left-0 h-full w-full bg-zinc-200/50 dark:bg-zinc-800/50',
                'opacity-0 group-hover:opacity-100 transition-all',
                'flex flex-col justify-between',
                'p-2'
            ]">
                <PrimeButton
                    label="View"
                    :pt="{
                        root: 'place-self-end'
                    }"
                    severity="contrast"
                    size="small"
                    @click="() => visible = true"
                >
                    <template #icon>
                        <svg :class="[svgStyles]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"/></svg>
                    </template>
                </PrimeButton>
                <div class="flex justify-center gap-2">
                    <PrimeButton
                        label="Add"
                        severity="success"
                        size="small"
                        @click="addItem"
                    />
                    <PrimeButton
                        :disabled="(item.count ?? 0) === 0"
                        label="Remove"
                        severity="danger"
                        size="small"
                        @click="removeItem"
                    />
                </div>
                <div />
            </div>
        </div>
        <div class="p-1">
            <div class="font-medium">{{ item.name }}</div>
            <div class="text-xs opacity-60">{{ item.additional }}</div>
            <div class="flex mt-1 gap-1" v-if="item.tags">
                <PrimeTag
                    v-for="tag in item.tags"
                    :key="tag"
                    severity="secondary"
                    :value="tag"
                />
            </div>
            <div>{{ item.description }}</div>
        </div>
    </div>
    <PrimeDialog
        v-model:visible="visible"
        dismissable-mask
        modal
        :pt="{
            content: 'h-full flex justify-center',
            root: 'h-[90%] max-w-9/12'
        }"
    >
        <img class="h-full" :src="`images/${item.image}.webp`">
    </PrimeDialog>
</template>
