<script setup>
import { computed } from 'vue';
import IconO from './icons/IconO.vue';
import IconX from './icons/IconX.vue';


const props = defineProps(['value', 'color', 'disabled', 'enableHover'])

const tileClass = computed(() => `tile tile-${props.color}`)

</script>

<template>
    <div :class="tileClass" :data-disabled="disabled || value !== undefined"
        :data-cpu-thinking="enableHover">
        <IconO v-if="value === 'O'" />
        <IconX v-if="value === 'X'" />
    </div>
</template>

<style scoped>
.tile {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 200ms ease-in-out;
}

.tile[data-disabled="false"]::after, .tile[data-cpu-thinking="true"]::after {
    content: "";
    position: absolute;
    display: flex;
    width: 0px;
    height: 0px;
    justify-content: center;
    align-items: center;
    transition: all 200ms ease-in-out;
}

.tile[data-disabled="false"]:hover {
    cursor: pointer;
}

.tile:hover:after, .tile[data-cpu-thinking="true"]::after {
    width: 104px;
    height: 104px;
    border-radius: 16px;
}

.tile-blue:after {
    background: var(--blue-16);
}

.tile-orange:after {
    background: var(--orange-16);
}
</style>