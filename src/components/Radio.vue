<script setup>
const props = defineProps(['selected'])
const emit = defineEmits(['selection-change'])

const handleSelectionChange = () => {
    emit('selection-change', !props.selected);
};

</script>

<template>
    <label tabindex="0" @click="handleSelectionChange" @keyup.enter="handleSelectionChange"
        @keyup.space="handleSelectionChange" :data-selected="selected">
        <span />
        <slot />
    </label>
</template>

<style>
label {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

label:focus-visible {
    outline-style: solid;
    outline-offset: 1px;
    outline-width: 2px;
    outline-color: var(--orange);
}

label[data-selected="true"]>span {
    border-color: var(--light-blue);
}

label[data-selected="true"]>span::after {
    content: "";
    display: block;
    border-radius: inherit;
    width: 20px;
    height: 20px;
    background: var(--light-blue);
}

label>span::after {
    content: "";
    display: block;
    border-radius: inherit;
    width: 0px;
    height: 0px;
    transition: all 200ms ease-in-out;
}

label>span {
    display: grid;
    box-sizing: border-box;
    justify-items: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border: 3px solid var(--gray);
    border-radius: 100%;
    transition: all 200ms ease-in-out;
}
</style>