<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import YourCollection from './YourCollection/YourCollection.vue'
import TabContent from './TabContent.vue'
import { tabs } from './tabs'

const currentTab = useStorage<string>('currentTab', 'washiTape')
</script>

<template>
    <PrimeTabs
        :pt="{
            root: 'shadow rounded-(--p-card-border-radius) overflow-hidden'
        }"
        :value="currentTab"
        @update:value="(value: string) => currentTab = value"
    >
        <PrimeTabList>
            <PrimeTab
                v-for="(tab) in tabs"
                :key="tab.data"
                :value="tab.data"
                :pt="{
                    root: 'first:mr-8! first:bg-zinc-100/50! first:dark:bg-zinc-800/50!'
                }"
            >
                {{ tab.title }}
            </PrimeTab>
        </PrimeTabList>
        <PrimeTabPanels>
            <PrimeTabPanel
                v-for="(tab) in tabs"
                :key="tab.data"
                :value="tab.data"
            >
                <TabContent
                    v-if="tab.data !== 'collection'"
                    :group="tab.data"
                />
                <YourCollection v-else />
            </PrimeTabPanel>
        </PrimeTabPanels>
    </PrimeTabs>
</template>
