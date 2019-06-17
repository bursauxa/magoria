<template>
  <div class="tokens">
    <h1>Tokens</h1>
		<svg width=512 height=128>    
      <TokenComponent v-for="(datum, index) in data" :key="datum.id" :x="index * 128" :token="datum"
                      v-on:token-drop-completed="onTokenDropCompleted"/>
  	</svg>
    <div class="delete-area-flex">
      <div class="delete-area-border" v-on-drop="onDroppedInTrash">
        [delete area]
      </div>
    </div>
	</div>
</template>

<script lang="ts" src="./Tokens.vue.ts">
</script>

<style lang="css" src="./Tokens.vue.css" scoped>
</style>