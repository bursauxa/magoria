<template>
  <div class="tokens">
    <h1>Tokens</h1>
		<svg width=512 height=128 v-on-drag="onTokenDragInProgress" v-on-drag-aborted="onDragAborted">    
      <TokenComponent v-for="(datum, index) in data" :key="datum.id" :x="index * 128" :token="datum"
                      v-on:token-drop-completed="onTokenDropCompleted"
                      v-on:token-drag-in-progress="onTokenDragInProgress"/>
      <TokenComponent v-show="ghostToken.isVisible" :token="ghostToken" :x="ghostToken.x" :y="ghostToken.y" pointer-events="none"/>
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