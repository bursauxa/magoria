<template>
  <div class="games">
    <input v-model="newGameName"/>
    <button v-on:click="addGame">KLIK</button>
    <ul>
      <li v-for="descriptor in descriptors" :key="descriptor.id">
        {{ descriptor.name }} - {{ descriptor.numberOfPlayers }} players
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./Games.ts"/>
