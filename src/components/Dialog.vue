<script setup>
import { ref } from 'vue';

const dialog = ref();
const visible = ref(false);

const showModal = () => {
    dialog.value?.showModal();
    visible.value = true;
};

defineExpose({
    show: showModal,
    close: (returnVal) => dialog.value?.close(returnVal),
    visible,
});

</script>

<template>
    <dialog @cancel.prevent class="base-modal" ref="dialog" @close="visible = false">
        <form v-if="visible" method="dialog">
            <slot />
        </form>
    </dialog>
</template>

<style scoped>
.base-modal {
    border: none;
    width: 100%;
    max-width: 100vw;
    outline: none;
    background: var(--dark-gray);
    color: var(--white);
}

.base-modal::backdrop {
    background: rgba(0, 0, 0, 0.16);
    backdrop-filter: blur(12px);
}
</style>
