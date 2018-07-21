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

<script lang="ts">
import * as d3 from 'd3';
import { Component, Vue } from 'vue-property-decorator';
import * as csv from '@/assets/flare.csv';
import { HierarchyPointNode, HierarchyNode, ClusterLayout } from 'd3';

type FlareNode = {id: string, value: number};
type DendogramSettings = {strokeColor: string, width: number, height: number};

@Component
export default class DendogramVue extends Vue {

  public flareData: FlareNode[] = csv;
  public selected: any = null;
  public search: string = 'force';
  public settings: DendogramSettings = {
    strokeColor: '#19B5FF',
    width: 960,
    height: 2000
  };
    
  public get root(): HierarchyPointNode<FlareNode> {
    const stratify = d3
      .stratify<FlareNode>()
      .parentId(node => node.id.substring(0, node.id.lastIndexOf('.')));

    // attach the tree to the Vue data object
    return this.tree(stratify(this.flareData).sort(DendogramVue.compareNodes));
  }

  private static compareNodes(a: HierarchyNode<FlareNode>, b: HierarchyNode<FlareNode>): number {
    if (a.id === undefined || b.id === undefined) {
      throw 'Invalid comparison: nodes must have been created with stratify()';
    } else {
      return a.height - b.height || a.id.localeCompare(b.id);
    }
  }
    
  // the 'tree' is also a computed property so that it is always up to date when the width and height settings change   
  public get tree(): ClusterLayout<FlareNode> {
    return d3
      .cluster<FlareNode>()
      .size([this.settings.height, this.settings.width - 160]);
  }
    
  // Instead of enter, update, exit, we mainly use computed properties and instead of 'd3.data()' we can use array.map to create objects that hold class names, styles, and other attributes for each datum  
  public get nodes() {
    return this.root.descendants().map(node => this.mapNode(node));
  }

  private mapNode(node: HierarchyPointNode<FlareNode>) {
    if (node.id === undefined) {
      throw 'Invalid mapping: nodes must have been created with stratify()';
    }

    return {
      id: node.id,
      r: 2.5,
      className: 'node' + (node.children ? ' node--internal' : ' node--leaf'),
      text: node.id.substring(node.id.lastIndexOf('.') + 1),
      highlight: this.search != '' && node.id.toLowerCase().includes(this.search.toLowerCase()),
      style: {
        transform: 'translate(' + node.y + 'px,' + node.x + 'px)'
      },
      textpos: {
        x: node.children ? -8 : 8,
        y: 3
      },
      textStyle: {
        textAnchor: node.children ? 'end' : 'start'
      }
    };
  }
    
  // Instead of enter, update, exit, we mainly use computed properties and instead of 'd3.data()' we can use array.map to create objects that hold class names, styles, and other attributes for each datum   
  public get links() {
    // here we’ll calculate the 'd' attribute for each path that is then used in the template where we use 'v-for' to loop through all of the links to create <path> elements
    return this.root.descendants().slice(1).map(node => this.mapLink(node));
  }

  private mapLink(node: HierarchyPointNode<FlareNode>) {
    if (node.parent === null) {
      throw 'Invalid mapping: may not be used on root node';
    }
    
    return {
      id: node.id,
      d: 'M' + node.y + ',' + node.x + 'C' + (node.parent.y + 100) + ',' + node.x + ' ' + (node.parent.y + 100) + ',' + node.parent.x + ' ' + node.parent.y + ',' + node.parent.x,
      
      // here we could of course calculate colors depending on data but for now all links share the same color from the settings object that we can manipulate using UI controls and v-model    
      style: {
        stroke: this.settings.strokeColor
      }
    };
  }
  
  public add(): void {
    this.flareData.push({
      id: 'flare.physics.Dummy',
      value: 0
    })
  }

  public select(visualNode: any): void {
    this.selected = visualNode;
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