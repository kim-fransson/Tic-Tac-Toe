<script setup>
import { computed, ref, watchEffect } from 'vue';
import GameBoard from './components/GameBoard.vue';
import HomePage from './components/Home.vue';
import PickPlayer1Mark from './components/PickPlayer1Mark.vue';
import Dialog from './components/Dialog.vue';
import { game } from './store/gameState';
import GameOverModal from './components/GameOverModal.vue';
import IconX from './components/icons/IconX.vue';
import IconO from './components/icons/IconO.vue';

const modal = ref();

watchEffect(() => {
    if (game.isGameOver) {
        modal.value?.show();
    }
})

const modalContent = computed(() => {
    const isTie = !game.winner;

    return {
        modalTitle: isTie
            ? "NOBODY WINS"
            : game.winner === game.player1Mark
                ? "YOU WON!"
                : "OH NO, YOU LOST...",

        modalText: isTie
            ? "THIS GAME IS A TIE"
            : "WON THIS ROUND",

        modalTextColor: isTie
            ? null
            : game.winner === 'X'
                ? 'blue'
                : 'orange',

        modalIcon: isTie
            ? null
            : game.winner === 'X'
                ? IconX
                : IconO
    };
});

</script>

<template>
    <div class="centered-container">
        <HomePage v-if="game.state === 'NEW_GAME'" />
        <PickPlayer1Mark v-if="game.state === 'PICK_PLAYER_1_MARK'" />
        <GameBoard v-if="game.state === 'GAME_BOARD'" />
    </div>
    <Dialog ref="modal">
        <GameOverModal :icon="modalContent.modalIcon" :title="modalContent.modalTitle" :text="modalContent.modalText"
            :textColor="modalContent.modalTextColor" @quit="game.quit()" @new-game="game.newGame()" />
    </Dialog>
</template>

<style>
.centered-container {
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color);
}
</style>
