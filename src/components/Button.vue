<script setup>
import { computed } from 'vue';

defineEmits(['on-press'])


const props = defineProps({
    variant: {
        type: String,
        default: 'primary'
    }
})

const buttonClass = computed(() => `btn btn-${props.variant}`)

</script>

<template>
    <button :class="buttonClass" @click="$emit('on-press')">
        <slot />
    </button>
</template>

<style>
.btn {
    position: relative;
    background: var(--btn-bg-color);
    font-weight: 500;
    font-size: 20px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
    gap: 10px;
    padding: 16px 96px;
    transition: transform 200ms ease-in-out, background 200ms ease-in-out, box-shadow 200ms ease-in-out;
}

.btn:hover {
    background: var(--btn-hover-color);
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.14);
}

/* Styles for mobile devices */
@media only screen and (max-width: 767px) {
    .btn {
        font-size: 18px;
    }
}

.btn:focus-visible {
    outline-style: solid;
    outline-offset: 1px;
    outline-width: 2px;
    outline-color: var(--btn-focus-color);
}

.btn:active {
    transform: scale(0.95);
}

.btn-primary {
    --btn-bg-color: var(--light-blue);
    --btn-focus-color: var(--orange);
    --btn-hover-color: #81d4fa;
    /* not provided from designs */
}

.btn-tertiary {
    --btn-bg-color: var(--gray);
    --btn-focus-color: var(--orange);
    --btn-hover-color: #ebebeb;
    /* not provided from designs */
}
</style>
