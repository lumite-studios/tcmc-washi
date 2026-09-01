<script setup lang="ts">
import { computed } from 'vue'
import { useStorage, useDark } from '@vueuse/core' // @ts-ignore
import washiList from '@/washi.json'
import type { Washi, Year } from './types.d.ts'

const buttonStyles = 'rounded px-2 py-1 text-white cursor-pointer capitalize tracking-wide font-medium disabled:opacity-60 disabled:cursor-auto'
const svgStyles = 'h-3 text-white inline-block align-baseline'
const savedWashi = useStorage<Record<string, number>>('washi', {})
const isDark = useDark()

/** Reverse the order of the washi list and convert to array. */
const reversedWashiList = computed((): Year[] => {
    const output: Year[] = []
    Object.keys(washiList).reverse().forEach((i) => output.push({ year: i, washis: washiList[i] }))
    return output
})

/**
 * Add a washi to storage.
 * @param {Washi} washi
 * @returns {void}
 */
const add = (washi: Washi): void => {
    const currentAmount = has(washi) ? savedWashi.value[washi.image] : 0
    savedWashi.value[washi.image] = currentAmount + 1
}
/**
 * Check if a washi is already saved.
 * @param {Washi} washi
 * @returns {boolean}
 */
const has = (washi: Washi): boolean => {
    return Object.keys(savedWashi.value).includes(washi.image)
}
/**
 * Remove a washi from storage.
 * @param {Washi} washi
 * @returns {void}
 */
const remove = (washi: Washi): void => {
    const currentAmount = has(washi) ? savedWashi.value[washi.image] : 0
    savedWashi.value[washi.image] = currentAmount === 0 ? 0 : currentAmount - 1
}
</script>

<template>
    <div class="p-8 bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <div :class="[
            'px-8 py-4 bg-zinc-200 rounded mb-2 dark:bg-zinc-800',
            'flex flex-col md:flex-row gap-2'
        ]">
            <div class="grow">
                <div class="text-2xl font-bold">
                    {{ 'TheCoffeeMonsterzCO Washi Tracker' }}
                </div>
                <div>{{ 'Track the washi tape from TheCoffeeMonsterzCO that you currently have in your collection!' }}</div>
                <div>{{ 'This application uses localstorage, meaning it will save your changes to the device you are currently using. You cannot transfer saved data between devices.' }}</div>
            </div>
            <div class="shrink-0">
                <div class="text-right">
                    <button :class="['bg-zinc-300 text-inherit! dark:bg-zinc-700', buttonStyles]" @click="() => isDark = isDark ? false : true">
                        <svg v-if="!isDark" :class="['text-blue-400!', svgStyles]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256S114.6 512 256 512c68.8 0 131.3-27.2 177.3-71.4 7.3-7 9.4-17.9 5.3-27.1s-13.7-14.9-23.8-14.1c-4.9 .4-9.8 .6-14.8 .6-101.6 0-184-82.4-184-184 0-72.1 41.5-134.6 102.1-164.8 9.1-4.5 14.3-14.3 13.1-24.4S322.6 8.5 312.7 6.3C294.4 2.2 275.4 0 256 0z"/></svg>
                        <svg v-if="isDark" :class="['text-yellow-500', svgStyles]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288-32c8.4 0 16.3 4.4 20.6 11.7L364.1 72.3 468.9 46c8.2-2 16.9 .4 22.8 6.3S500 67 498 75.1l-26.3 104.7 92.7 55.5c7.2 4.3 11.7 12.2 11.7 20.6s-4.4 16.3-11.7 20.6L471.7 332.1 498 436.8c2 8.2-.4 16.9-6.3 22.8S477 468 468.9 466l-104.7-26.3-55.5 92.7c-4.3 7.2-12.2 11.7-20.6 11.7s-16.3-4.4-20.6-11.7L211.9 439.7 107.2 466c-8.2 2-16.8-.4-22.8-6.3S76 445 78 436.8l26.2-104.7-92.6-55.5C4.4 272.2 0 264.4 0 256s4.4-16.3 11.7-20.6L104.3 179.9 78 75.1c-2-8.2 .3-16.8 6.3-22.8S99 44 107.2 46l104.7 26.2 55.5-92.6 1.8-2.6c4.5-5.7 11.4-9.1 18.8-9.1zm0 144a144 144 0 1 0 0 288 144 144 0 1 0 0-288zm0 240a96 96 0 1 1 0-192 96 96 0 1 1 0 192z"/></svg>
                        {{ isDark ? 'light' : 'dark' }}
                    </button>
                </div>
                <div class="font-bold">{{ 'Credits' }}</div>
                <div>
                    {{ 'All washi tapes and images &copy;' }}
                    <a class="text-blue-500" href="https://thecoffeemonsterzco.com/" target="_blank">thecoffeemonsterzco</a>
                </div>
                <div>
                    {{ 'All code &copy;' }}
                    <a class="text-blue-500" href="https://lumitestudios.com" target="_blank">Lumite Studios</a>
                </div>
                <div class="mt-3">
                    {{ 'View the full website source code on' }}
                    <a class="text-blue-500" href="https://github.com/lumite-studios/tcmc-washi" target="_blank">GitHub</a>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-8">
            <div v-for="(year, index) in reversedWashiList" :key="index">
                <div class="px-8 py-2 bg-zinc-200 rounded mb-2 dark:bg-zinc-800">
                    <div class="text-2xl font-bold">
                        {{ year.year }}
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mx-2">
                    <div v-for="(washi, _index) in year.washis" :key="_index" class="text-sm">
                        <div class="relative group">
                            <img class="shadow rounded" :src="`images/${washi.image}.webp`">
                            <div :class="[
                                'absolute top-0 left-0 h-full w-full bg-zinc-200/50',
                                'opacity-0 group-hover:opacity-100 transition-all',
                                'flex flex-col items-center justify-center gap-2'
                            ]">
                                    <div class="flex justify-center gap-2">
                                        <button :class="['bg-green-500', buttonStyles]" @click="() => add(washi)">{{ 'add' }}</button>
                                        <button :class="['bg-red-500', buttonStyles]" @click="() => remove(washi)" :disabled="(savedWashi[washi.image] ?? 0) === 0">{{ 'remove' }}</button>
                                    </div>
                                    <button :class="['bg-blue-500', buttonStyles]" command="show-modal" :commandfor="`washi-${washi.image}`">
                                        <svg :class="[svgStyles]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"/></svg>
                                        {{ 'View' }}
                                    </button>
                            </div>
                            <div class="absolute right-1 bottom-1">
                                <div :class="[
                                    'bg-zinc-500 text-xs text-white rounded px-2',
                                    {
                                        'opacity-50': (savedWashi[washi.image] ?? 0) === 0,
                                    }
                                ]">
                                    {{ `Has: ${savedWashi[washi.image] ?? 0}` }}
                                </div>
                            </div>
                        </div>
                        <div class="p-1">
                            <div class="font-medium">{{ washi.name }}</div>
                            <div class="text-xs opacity-60">{{ washi.size }}</div>
                            <div>{{ washi.description }}</div>
                        </div>
                        <dialog :id="`washi-${washi.image}`" :class="[
                            'fixed top-1/2 left-1/2 -translate-1/2 w-1/2 h-full transition-all',
                            'rounded shadow-xl',
                            'p-8 text-center',
                            'bg-zinc-50 dark:bg-zinc-900',
                        ]">
                            <div>
                                <form method="dialog" class="absolute right-4 top-4">
                                    <button :class="['bg-zinc-500', buttonStyles]">{{'Close'}}</button>
                                </form>
                                <img class="max-h-full inline-block" :src="`images/${washi.image}.webp`">
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
