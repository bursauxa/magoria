<template>
  <div class="dendogram">
    <h1>Dendogram (original: https://bl.ocks.org/mbostock/4063570)</h1>

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
	      Selected: {{ selected }}
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
        <g class="node" v-on:click="select(index, node)" v-for="(node, index) in nodes" :key="node.id" :style="node.style" :class="[node.className, {'highlight': node.highlight}]">
          <!-- Circles for each node -->  
          <circle :r="node.r" :style="{'fill': index == selected ? '#ff0000' : '#bfbfbf'}"></circle>
          <!-- Finally, text labels -->
          <text :dx="node.textpos.x" :dy="node.textpos.y" :style="node.textStyle">{{ node.text }}</text>
        </g>
    	</transition-group>
  	</svg>
	</div>
</template>

<script lang="ts">
import * as d3 from 'd3';
import { Component, Vue } from 'vue-property-decorator';
import * as flare from '@/assets/flare.csv';

@Component
export default class DendogramVue extends Vue {
  public csv: {id: string, value: number}[] = flare;
  public selected: any = null;
  public search: any = 'force';
  public settings: any = {
    strokeColor: '#19B5FF',
    width: 960,
    height: 2000
  };
    
  public get root(): any {
    if (this.csv) {
      var stratify = d3.stratify().parentId((d: any) => {
        return d.id.substring(0, d.id.lastIndexOf('.'));
      });

      // attach the tree to the Vue data object
      return this.tree(
        stratify(this.csv).sort(function(a: any, b: any) {
          return a.height - b.height || a.id.localeCompare(b.id);
        })
      );
    }
  }
    
  // the 'tree' is also a computed property so that it is always up to date when the width and height settings change   
  public get tree() {
    return d3
      .cluster()
      .size([this.settings.height, this.settings.width - 160]);
  }
    
  // Instead of enter, update, exit, we mainly use computed properties and instead of 'd3.data()' we can use array.map to create objects that hold class names, styles, and other attributes for each datum  
  public get nodes() {
    if (this.root) {
      return this.root.descendants().map((d: any) => {
        return {
          id: d.id,
          r: 2.5,
          className: 'node' +
            (d.children ? ' node--internal' : ' node--leaf'),
          text: d.id.substring(d.id.lastIndexOf('.') + 1),
          highlight: d.id.toLowerCase().indexOf(this.search.toLowerCase()) != -1 && this.search != '',
          style: {
            transform: 'translate(' + d.y + 'px,' + d.x + 'px)'
          },
          textpos: {
            x: d.children ? -8 : 8,
            y: 3
          },
          textStyle: {
            textAnchor: d.children ? 'end' : 'start'
          }
        };
      });
    }
  }
    
  // Instead of enter, update, exit, we mainly use computed properties and instead of 'd3.data()' we can use array.map to create objects that hold class names, styles, and other attributes for each datum   
  public get links() {
    if (this.root) {

      // here we’ll calculate the 'd' attribute for each path that is then used in the template where we use 'v-for' to loop through all of the links to create <path> elements
      return this.root.descendants().slice(1).map((d: any) => {
        return {
          id: d.id,
          d: 'M' + d.y + ',' + d.x + 'C' + (d.parent.y + 100) + ',' + d.x + ' ' + (d.parent.y + 100) + ',' + d.parent.x + ' ' + d.parent.y + ',' + d.parent.x,
          
          // here we could of course calculate colors depending on data but for now all links share the same color from the settings object that we can manipulate using UI controls and v-model    
          style: {
            stroke: this.settings.strokeColor
          }
        };
      });
    }
  }
  
  public add(): void {
    this.csv.push({
      id: 'flare.physics.Dummy',
      value: 0
    })
  }

  public select(index: any, node: any): void {
    this.selected = index;
  }
}
</script>

<style lang="less">
.dendogram {
  .node {
    opacity: 1;

    circle {
      fill: #999;
      cursor: pointer;
    }

    text {
      font: 10px sans-serif;
      cursor: pointer;
    }

    &:hover {
      pointer-events: all;
      stroke: #ff0000;
    }

    &.highlight {
      fill: red;
    }
  }

  .node--internal {
    circle {
      fill: #555;
    }

    text {
      text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
    }
  }

  .link {
    fill: none;
    stroke: #555;
    stroke-opacity: 0.4;
    stroke-width: 1.5px;
    stroke-dasharray: 1000;
  }

  .controls {
    position: fixed;
    top: 160px;
    left: 16px;
    background: #f8f8f8;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;

    > * + * {
      margin-top: 1rem;
    }

    label {
      display: block;
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .line-enter-active, .line-leave-active {
    transition: all 2s;
    stroke-dashoffset: 0;
  }

  .line-enter, .line-leave-to {
    stroke-dashoffset: 1000;
  }
}
</style>