<script setup lang="ts">
import { ToggleDark } from '@/components'
import { text } from './header.ts'
</script>

<template>
    <PrimeCard>
        <template #title>{{ text.title }}</template>
        <template #subtitle>{{ text.subtitle }}</template>
        <template #content>
            <div class="flex flex-col md:flex-row gap-4">
                <div class="grow">
                    <div class="mb-2">{{ text.content }}</div>
                    <ToggleDark/>
                </div>
                <div class="shrink-0 md:max-w-1/2">
                    <div class="font-bold">{{ text.credits.title }}</div>
                    <div
                        v-for="(link, index) in text.credits.links"
                        :key="index"
                    >
                        <span v-html="link.content" />
                        <a class="text-blue-500" :href="link.href" target="_blank">{{ link.title }}</a>
                    </div>
                </div>
            </div>
        </template>
    </PrimeCard>
</template>
