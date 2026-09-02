<script setup lang="ts">
import type { Filters } from '@/components/Tabs/Item/item'
import { filtersState } from '@/components/Tabs/Item/item'
import { text } from './item'

const props = withDefaults(defineProps<{
    filters: Filters
    hideStateFilter?: boolean
    tags?: string[]
}>(), {
    tags: () => []
})
</script>

<template>
    <div class="flex justify-end gap-2">
        <PrimeSelect
            v-if="!hideStateFilter"
            v-model="filters.state"
            :options="filtersState"
            :pt="{ root: 'w-30' }"
        />
        <PrimeInputText
            v-model="filters.name"
            :placeholder="text.filters.name"
            type="search"
        />
        <PrimeSelect
            v-model="filters.tags"
            checkmark
            multiple
            :options="tags"
            :placeholder="text.filters.tags"
            :pt="{ root: 'w-48' }"
            show-clear
        >
            <template #value="{ value, placeholder }">
                <div v-if="value && value.length > 0" class="flex gap-1">
                    <PrimeChip
                        v-for="v in value"
                        :label="v"
                    />
                </div>
                <span v-else>{{ placeholder }}</span>
            </template>
        </PrimeSelect>
    </div>
</template>
