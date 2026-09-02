<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Item, Filters, Pagination } from '@/components/Tabs/Item/item'
import { default as ItemView } from '@/components/Tabs/Item/ItemView.vue'
import { default as ItemFilters } from '@/components/Tabs/Item/ItemFilters.vue'

const props = withDefaults(defineProps<{
    group: string
    hideStateFilter?: boolean
    items: Item[]
    justify?: string
    rows?: number
}>(), {
    justify: 'center',
    rows: 18
})

const filters = ref<Filters>({
    name: '',
    state: 'any',
    tags: []
})
const pagination = ref<Pagination>({
    first: 0,
    rows: props.rows,
})

/** The filtered items. */
const filteredItems = computed((): Item[] => {
    return props.items
        .filter(function (v) {
            if(filters.value.state === 'any') { return true }
            else if(filters.value.state === 'owned') { return v.count! > 0 }
            else if(filters.value.state === 'unowned') { return v.count! === 0 }
        })
        .filter((v) => filters.value.name.length === 0 ? true : v.name.toLowerCase().indexOf(filters.value.name) >= 0)
        .filter((v) => filters.value.tags.length === 0 ? true : filters.value.tags.map((t) => v.tags?.includes(t)).filter(Boolean).length > 0)
})
/** The paginated items. */
const paginatedItems = computed((): Item[] => {
    return filteredItems.value
        .filter((_, i) => i >= pagination.value.first && i < (pagination.value.first + pagination.value.rows))
})
/** The unique tags form the collection. */
const tags = computed((): string[] => {
    return props.items.flatMap((i) => i.tags ?? [])
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort()
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <ItemFilters
            :filters="filters"
            :hide-state-filter="hideStateFilter"
            :tags="tags"
        />
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <ItemView
                v-for="(item, index) in paginatedItems"
                :key="index"
                :group="group"
                :item="item"
            />
        </div>
        <div class="flex" :style="{ justifyContent: justify }">
            <PrimePaginator v-model:first="pagination.first" v-model:rows="pagination.rows" :totalRecords="filteredItems.length" />
        </div>
    </div>
</template>
