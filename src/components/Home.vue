<script setup>
import { game } from "@/store/gameState";
import Button from "@/components/Button.vue"
</script>

<template>
    <div class="container">
        <img alt="Tic Tac Toe logo" src="../assets/logo.svg" height="128" width="267" />
        <h1 class="heading-xl">Tic Tac Toe</h1>
        <p class="heading-m">Dive into the excitement now and experience
            the timeless joy of this classic game!</p>
        <Button @on-press="game.pickPlayer()">New game</Button>
    </div>
</template>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 650px;
    text-align: center;
}

.container > h1 {
    margin-top: 68px;
}

.container > p {
    margin-top: 16px;
}

.container > button {
    width: 100%;
    max-width: 520px;
    margin-top: 56px;
}

</style>
