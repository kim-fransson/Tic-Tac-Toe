<script setup>
import Button from './Button.vue';
import IconX from './icons/IconX.vue';
import PointsPill from './PointsPill.vue';
import { game } from '@/store/gameState';
import Tile from './Tile.vue';
import IconO from './icons/IconO.vue';

</script>

<template>
    <div class="container">
        <img alt="Tic Tac Toe logo" src="../assets/logo.svg" height="32" width="67" />

        <div class="turn-container text">
            <IconX v-if="game.currentMark === 'X'" />
            <IconO v-else />
            <p>TURN</p>
        </div>

        <div class="grid">
            <Tile v-for="tile in game.board" :key="tile.id" :enableHover="game.cpuThinkingOfTile?.id === tile.id"
                :disabled="game.currentMark === game.cpuMark" :value="tile.value"
                :color="game.currentMark === 'X' ? 'blue' : 'orange'" @click="!tile.value && game.addMark(tile.id)" />
        </div>

        <PointsPill points="0" :label="'X ' + (game.cpuMark === 'X' ? '(CPU)' : '(YOU)')" color="blue" />
        <PointsPill points="0" :label="'O ' + (game.player1Mark === 'O' ? '(YOU)' : '(CPU)')" color="orange" />

        <Button @on-press="game.resetGame()" variant="tertiary">Reset game</Button>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    gap: 24px;
    align-items: start;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
}

.grid {
    grid-column: span 2;
    background: var(--white);
    border-radius: 16px;
    padding: 32px;
    width: 520px;
    height: 520px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
}


/* First two rows (1-3 and 4-6) should have a border-bottom */
.grid>div:nth-child(-n+6) {
    border-bottom: 2px solid var(--gray);
}

/* The first two children in every row should have a border-right */
.grid>div:nth-child(3n+1),
.grid>div:nth-child(3n+2) {
    border-right: 2px solid var(--gray);
}

.container>img {
    align-self: center;
}

.container>button {
    grid-column: span 2;
}

.turn-container {
    display: flex;
    justify-content: center;
    gap: 2px;
    background: var(--white);
    border-radius: 16px;
    padding: 16px 4px;
}

.turn-container>svg {
    width: 36px;
    height: 36px;
}

.turn-container>p {
    margin-top: 4px;
}
</style>