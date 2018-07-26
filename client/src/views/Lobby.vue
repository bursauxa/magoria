<template>
  <div class="lobby">
    <h1>Lobby</h1>
    <div class="add-box-flex">
      <div class="add-box-border">
        <div class="add-box-row">
          <span>Nom de la partie</span>
          <input v-model="newGameName"/>
          <button v-on:click="addGame">AJOUTER</button>
          <button v-on:click="expanded = true" v-if="!expanded">&#x2193;</button>
          <button v-on:click="expanded = false" v-if="expanded">&#x2191;</button>
        </div>
        <div class="add-box-row" v-show="expanded">
          <span>Joueur 1</span>
          <input v-model="player1"/>
          <span>Joueur 2</span>
          <input v-model="player2"/>
          <span>Joueur 3</span>
          <input v-model="player3"/>
          <span>Joueur 4</span>
          <input v-model="player4"/>
        </div>
      </div>
    </div>
    <div>
      <div v-for="descriptor in descriptors" :key="descriptor.id">
        <GameComponent :game-descriptor="descriptor"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Lobby.vue.ts">
</script>

<style lang="less" src="./Lobby.vue.less">
</style>
