<script setup>
import GameBoard from './components/GameBoard.vue';
import HomePage from './components/Home.vue';
import PickPlayer1Mark from './components/PickPlayer1Mark.vue';
import { game } from './store/gameState';


</script>

<template>
    <div class="centered-container">
        <HomePage v-if="game.state === 'NEW_GAME'"  />
        <PickPlayer1Mark v-if="game.state === 'PICK_PLAYER_1_MARK'" />
        <GameBoard v-if="game.state === 'GAME_RUNNING'" />
    </div>
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
