<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import type { Collection } from '@/components/Tabs/YourCollection/collection.ts'
import CollectionGroup from '@/components/Tabs/YourCollection/CollectionGroup.vue'

const collection = useStorage<Collection>('collection', {})
</script>

<template>
    <CollectionGroup
        v-for="(items, name) in collection"
        :key="name"
        :items="items"
        :name="name"
    />
</template>
