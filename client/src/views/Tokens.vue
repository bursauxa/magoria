<template>
  <div class="tokens">
    <h1>Tokens</h1>
		<svg class="tokens-svg" width=512 height=384 v-on-drag="drawGhost" v-on-drag-aborted="onDragAborted">    
      <TokenComponent v-for="(datum, index) in data" :key="datum.id" :x="index % 4 * 128" :y="Math.floor(index / 4) * 128" :token="datum"
                      v-draggable="datum"
                      v-on-drop="evt => onTokenDropCompleted(evt, datum)"
                      v-on-drag="evt => highlightToken(evt, datum)"/>
      <foreignObject width=512 height=128 y=256>
        <div class="delete-area-flex">
          <div class="delete-area-border" v-on-drop="onDroppedInTrash">
            🚮
          </div>
        </div>
      </foreignObject>
      <TokenComponent class="ghost" v-show="ghostToken.isVisible" :token="ghostToken" :x="ghostToken.x" :y="ghostToken.y"/>
  	</svg>
	</div>
</template>

<script lang="ts" src="./Tokens.vue.ts">
</script>

<style lang="css" src="./Tokens.vue.css" scoped>
</style>