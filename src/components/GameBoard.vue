<script setup>
import Button from './Button.vue';
import IconX from './icons/IconX.vue';
import PointsPill from './PointsPill.vue';
import { game } from '@/store/gameState';
import Tile from './Tile.vue';
import IconO from './icons/IconO.vue';
import { computed, useTemplateRef } from 'vue';

const gridElement = useTemplateRef('grid');

const tileDisabled = computed(() => game.isGameOver || game.currentMark === game.cpuMark)

function getTileSize() {
    const tileElement = gridElement.value.querySelector('.tile');
    return tileElement.getBoundingClientRect();
}

function getTileEdgeCoordinates(tileId) {
    const tileSize = getTileSize();
    const row = Math.floor(tileId / 3); // Row of the tile
    const col = tileId % 3; // Column of the tile

    // Calculate edge coordinates of the tile
    const centerX = col * tileSize.width + tileSize.width / 2;
    const centerY = row * tileSize.height + tileSize.height / 2;
    const topLeftX = col * tileSize.width;
    const topLeftY = row * tileSize.height;
    const topRightX = topLeftX + tileSize.width;
    const bottomRightX = topLeftX + tileSize.width;
    const bottomRightY = topLeftY + tileSize.height;

    return {
        centerX, centerY, topLeftX, topLeftY, bottomRightX, bottomRightY, topRightX
    };
}

function calculateAngle(start, end) {
    const dx = end.centerX - start.centerX;
    const dy = end.centerY - start.centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
}

function getLineStyle(winningCombination) {
    const tileSize = getTileSize(); // Fetch tile size dynamically

    // Get the coordinates of the first and last tiles in the winning combination
    const startTileEdges = getTileEdgeCoordinates(winningCombination[0]);
    const endTileEdges = getTileEdgeCoordinates(winningCombination[2]);

    // Calculate the angle
    const angle = calculateAngle(startTileEdges, endTileEdges);

    let distance, top, left, xTranslate = 0, yTranslate = 0;

    if (startTileEdges.centerY === endTileEdges.centerY) {
        // Horizontal line
        distance = endTileEdges.bottomRightX - startTileEdges.topLeftX;
        top = startTileEdges.centerY; // Center vertically
        left = startTileEdges.topLeftX - tileSize / 2;
    } else if (startTileEdges.centerX === endTileEdges.centerX) {
        // Vertical line
        distance = endTileEdges.bottomRightY - startTileEdges.topLeftY;
        top = startTileEdges.topLeftY;
        left = startTileEdges.topLeftX + tileSize.width / 2;
    } else {
        // Diagonal line
        let dx, dy;
        if (angle < 90) {
            // left -> right
            dx = endTileEdges.topRightX - startTileEdges.topLeftX;
            dy = endTileEdges.bottomRightY - startTileEdges.topLeftY;
            top = startTileEdges.topLeftY;
            left = startTileEdges.topLeftY;
            xTranslate = -50;
        } else {
            // right -> left
            dx = startTileEdges.topRightX - endTileEdges.topLeftX;
            dy = startTileEdges.topLeftY - endTileEdges.bottomRightY;
            top = startTileEdges.topLeftY;
            left = startTileEdges.bottomRightX;
            xTranslate = 50;
        }
        distance = Math.sqrt(dx * dx + dy * dy);
    }

    return {
        position: 'absolute',
        border: 'none',
        borderRadius: '999px',
        top: `${top}px`,
        left: `${left}px`,
        width: `${distance}px`,
        height: '10px',
        backgroundColor: game.winner === 'X' ? 'var(--dark-blue)' : 'var(--dark-orange)',
        transformOrigin: '0 50%',
        transform: `rotate(${angle}deg) translate(${yTranslate}%, ${xTranslate}%)`,
        zIndex: 10,
    };
}

const pointsX = computed(() => (game.cpuMark === 'X' ? game.cpuPoints : game.player1Points));
const labelX = computed(() => 'X ' + (game.cpuMark === 'X' ? '(CPU)' : '(YOU)'));

const pointsO = computed(() => (game.player1Mark === 'O' ? game.player1Points : game.cpuPoints));
const labelO = computed(() => 'O ' + (game.player1Mark === 'O' ? '(YOU)' : '(CPU)'));

</script>

<template>
    <div class="container">
        <img alt="Tic Tac Toe logo" src="../assets/logo.svg" height="32" width="67" />

        <div class="turn-container text">
            <IconX v-if="game.currentMark === 'X'" />
            <IconO v-else />
            <p>TURN</p>
        </div>

        <div class="grid-container">
            <div class="grid" ref="grid">
                <Tile v-for="tile in game.board" :key="tile.id" :enableHover="game.cpuThinkingOfTile?.id === tile.id"
                    :disabled="tileDisabled" :value="tile.value" :color="game.currentMark === 'X' ? 'blue' : 'orange'"
                    @click="(!tileDisabled && !tile.value) && game.addMark(tile.id)" />

                <div v-if="game.isGameOver && game.winningCombination" :style="getLineStyle(game.winningCombination)"
                    class="winning-line"></div>
            </div>
        </div>

        <PointsPill :points="pointsX" :label="labelX" color="blue" />
        <PointsPill :points="pointsO" :label="labelO" color="orange" />

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

.grid-container {
    grid-column: span 2;
    background: var(--white);
    border-radius: 16px;
    padding: 32px;
}

.grid {
    width: 520px;
    height: 520px;
    display: grid;
    position: relative;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
}

/* Styles for mobile devices */
@media only screen and (max-width: 767px) {

    .grid {
        width: 320px;
        height: 320px;
    }
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