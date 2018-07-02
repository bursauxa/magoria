<template>
  <div class="games">
    <span>Name</span>
    <input v-model="newGameName"/>
    <span>Players</span>
    <input v-model.number="newGameCount" type="number"/>
    <button v-on:click="addGame">KLIK</button>
    <ul>
      <li v-for="descriptor in descriptors" :key="descriptor.id">
        {{ descriptor.name }} - {{ descriptor.numberOfPlayers }} players
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./Games.ts"/>
