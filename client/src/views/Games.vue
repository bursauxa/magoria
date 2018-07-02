<template>
  <div class="games">
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
          <span>Nombre de joueurs</span>
          <input v-model.number="newGameCount" type="number"/>
        </div>
        <!-- <div class="add-box-row" v-show="expanded">
          <span>Joueur 1</span>
          <input v-model="player1"/>
          <span>Joueur 2</span>
          <input v-model="player2"/>
          <span>Joueur 3</span>
          <input v-model="player3"/>
          <span>Joueur 4</span>
          <input v-model="player4"/>
        </div> -->
      </div>
    </div>
    <ul>
      <li v-for="descriptor in descriptors" :key="descriptor.id">
        {{ descriptor.name }} - {{ descriptor.numberOfPlayers }} joueur(s)
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./Games.ts"/>

<style lang="less">
.games {
  .add-box-flex {
    display: flex;
    justify-content: center;
    text-align: left;
  }

  .add-box-border {
    border: 1px black solid;
    display: flex;
    flex-flow: column;
  }

  .add-box-row {
    > * {
      margin: 10px;
    }
    input {
      margin-right: 50px;
      font-size: 14px;
    }
  }
}
</style>
