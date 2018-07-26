import * as d3 from 'd3';
import { Component, Vue } from 'vue-property-decorator';
// @ts-ignore -> csv-loader does not produce proper ES modules (but it is valid enough for webpack/node)
import * as csv from '@/assets/flare.csv';
import { HierarchyPointNode, HierarchyNode, ClusterLayout } from 'd3';

interface FlareNode {
    id: string;
    value: number;
}

interface DendogramSettings {
    strokeColor: string;
    width: number;
    height: number;
}

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
      throw new Error('Invalid comparison: nodes must have been created with stratify()');
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

  // Instead of enter, update, exit, we mainly use computed properties and
  // instead of 'd3.data()' we can use array.map to create objects that hold
  // class names, styles, and other attributes for each datum
  public get nodes() {
    return this.root.descendants().map(node => this.mapNode(node));
  }

  private mapNode(node: HierarchyPointNode<FlareNode>) {
    if (node.id === undefined) {
      throw new Error('Invalid mapping: nodes must have been created with stratify()');
    }

    return {
      id: node.id,
      r: 2.5,
      className: 'node' + (node.children ? ' node--internal' : ' node--leaf'),
      text: node.id.substring(node.id.lastIndexOf('.') + 1),
      highlight: this.search !== '' && node.id.toLowerCase().includes(this.search.toLowerCase()),
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

  // Instead of enter, update, exit, we mainly use computed properties and
  // instead of 'd3.data()' we can use array.map to create objects that hold
  // class names, styles, and other attributes for each datum
  public get links() {
    // here we’ll calculate the 'd' attribute for each path that is then used in the template
    // where we use 'v-for' to loop through all of the links to create <path> elements
    return this.root.descendants().slice(1).map(node => this.mapLink(node));
  }

  private mapLink(node: HierarchyPointNode<FlareNode>) {
    if (node.parent === null) {
      throw new Error('Invalid mapping: may not be used on root node');
    }

    return {
      id: node.id,
      d: 'M' + node.y + ','
        + node.x + 'C' + (node.parent.y + 100) + ','
        + node.x + ' ' + (node.parent.y + 100) + ','
        + node.parent.x + ' ' + node.parent.y + ','
        + node.parent.x,
      style: {
        stroke: this.settings.strokeColor
      }
    };
  }

  public add(): void {
    this.flareData.push({
      id: 'flare.physics.Dummy',
      value: 0
    });
  }

  public select(visualNode: any): void {
    this.selected = visualNode;
  }
}
