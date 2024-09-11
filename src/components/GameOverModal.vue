<script setup>
import Button from "@/components/Button.vue"

defineProps(['title', 'text', 'textColor', 'icon'])
defineEmits(['quit', 'new-game'])
</script>

<template>
    <div class="modal-container">
        <h1 class="text">{{ title }}</h1>
        <div class="icon-text-container">
            <component :is="icon" class="modal-icon" />
            <h2 :class="`heading-xl text-${textColor}`">{{ text }}</h2>
        </div>
        <div class="button-group">
            <Button @click="$emit('quit')" variant="tertiary">Quit</Button>
            <Button @click="$emit('new-game')" variant="primary">New Game</Button>
        </div>
    </div>
</template>

<style scoped>

.modal-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-items: center;
    align-items: center;
    padding: 48px;
}

.icon-text-container {
    display: flex;
    align-items: center;
}

.button-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.modal-icon {
    margin-top: 8px;
}

.modal-icon>svg {
    height: 104px;
    width: 104px;
}

.text-blue {
    color: var(--light-blue)
}

.text-orange {
    color: var(--orange)
}
</style>