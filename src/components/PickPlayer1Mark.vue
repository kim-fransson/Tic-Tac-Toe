<script setup>
import Button from "@/components/Button.vue"
import Radio from "./Radio.vue";
import IconX from "./icons/IconX.vue";
import IconO from "./icons/IconO.vue";
import { game } from "@/store/gameState";
import { computed } from "vue";

const isXMarkSelected = computed(() => game.player1Mark === 'X');

</script>

<template>
    <div class="container">
        <h1 class="heading-s">Pick player 1st mark</h1>
        <div class="selection-box">
            <div class="radio-group">
                <Radio :selected="isXMarkSelected"
                    @selection-change="(val) => val && game.setPlayer1Mark('X')">
                    <IconX />
                </Radio>

                <Radio :selected="!isXMarkSelected"
                    @selection-change="(val) => val && game.setPlayer1Mark('O')">
                    <IconO />
                </Radio>
            </div>
            <p class="text">Remember: X is going first</p>
        </div>
        <Button @on-press="game.startGame()">Start game</Button>
    </div>
</template>

<style>
.radio-group {
    display: flex;
    justify-content: space-around;
}

.container {
    display: grid;
    text-align: center;
    gap: 40px;
    align-items: center;
    min-width: 520px;
}

.selection-box {
    background: var(--white);
    border-radius: 16px;
    padding: 40px 4px;
}

.selection-box>p {
    text-transform: uppercase;
    margin-top: 32px;
}
</style>
