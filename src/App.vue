<script setup lang="ts">
import { Header, Tabs } from './components'
</script>

<template>
    <div :class="[
            'min-h-screen max-w-screen',
            'p-8',
            'bg-mauve-50 text-mauve-950 dark:bg-mauve-950 dark:text-mauve-50',
            'flex flex-col gap-4'
        ]"
    >
        <Header />
        <Tabs />
    </div>
</template>
