<template>
  <div class="dendrogram">
    <h1>Dendrogram (original: https://bl.ocks.org/mbostock/4063570)</h1>

    <!-- UI controls that can are used to manipulate the display of the chart -->   
    <div class="controls">      
      <div>
	      <label>Chart width</label>
  	    <input type="range" v-model="settings.width" min="0" max="1000" />
      </div>
     
      <div>
        <label>Stroke color</label>
	      <input type="color" v-model="settings.strokeColor" />
      </div>
      
      <div>
	      <label>Search…</label>
  	    <input type="text" v-model="search" />
			</div>
      
      <button v-on:click="add">Add node</button>
       
      <div>
	      Selected: {{ selected ? selected.id : 'none' }}
      </div>
    </div>

    <!-- SVG that renders the chart based on the "width" and "height" setting from the Vue instance’s data object -->   
		<svg :width="settings.width" :height="settings.height">
    
      <!-- In contrast to D3’s "select" methods, we define the graphical elements explicitely here and use the template syntax to loop through collections and bind properties such as "d" or "r" to those elements. -->
      <transition-group tag="g" name="line" >
        <!-- Links are represented as paths -->
        <path v-for="link in links" class="link" :key="link.id" :d="link.d" :style="link.style"></path>   
			</transition-group>

      <!-- We can now also use events to elements that will call respective methods on the Vue instance -->      
      <transition-group tag="g" name="list">
        <g class="node" v-on:click="select(node)" v-for="node in nodes" :key="node.id" :style="node.style" :class="[node.className, {'highlight': node.highlight}]">
          <!-- Circles for each node -->  
          <circle :r="node.r" :style="{'fill': node === selected ? '#ff0000' : '#bfbfbf'}"></circle>
          <!-- Finally, text labels -->
          <text :dx="node.textpos.x" :dy="node.textpos.y" :style="node.textStyle">{{ node.text }}</text>
        </g>
    	</transition-group>
  	</svg>
	</div>
</template>

<script lang="ts" src="./Dendrogram.vue.ts">
</script>

<style lang="less" src="./Dendrogram.vue.less">
</style>