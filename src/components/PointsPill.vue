<script setup>
import { computed } from 'vue';

const props = defineProps(['points', 'label', 'color'])

const pillClass = computed(() => `pill pill-${props.color}`)

</script>

<template>
    <div :class="pillClass">
        <p class="subtext">{{  label  }}</p>
        <p class="text">{{  points  }}</p>
    </div>
</template>

<style scoped>

.pill {
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 16px 4px;
}

.pill-blue {
    background: var(--light-blue);
}

.pill-orange {
    background: var(--orange);
}

</style>
