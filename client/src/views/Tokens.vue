<template>
  <div class="tokens">
    <h1>Tokens</h1>
		<svg class="tokens-svg" width=512 height=256 v-on-drag="onTokenDragInProgress" v-on-drag-aborted="onDragAborted">    
      <TokenComponent v-for="(datum, index) in data" :key="datum.id" :x="index * 128" :token="datum"
                      v-draggable="datum"
                      v-on-drop="evt => onTokenDropCompleted(evt, datum)"
                      v-on-drag="evt => onTokenDragInProgress(evt, datum)"/>
      <TokenComponent class="ghost" v-show="ghostToken.isVisible" :token="ghostToken" :x="ghostToken.x" :y="ghostToken.y"/>
      <foreignObject width=512 height=128 y=128>
        <div class="delete-area-flex">
          <div class="delete-area-border" v-on-drop="onDroppedInTrash">
            [delete area]
          </div>
        </div>
      </foreignObject>
  	</svg>
	</div>
</template>

<script lang="ts" src="./Tokens.vue.ts">
</script>

<style lang="css" src="./Tokens.vue.css" scoped>
</style>