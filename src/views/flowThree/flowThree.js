/* eslint-disable */
import G6 from '@antv/g6'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 学习一
    init () {
      // 1
      const data = {
        nodes: [{
          id: 'node1',
          x: 100,
          y: 200
       },{
          id: 'node2',
          x: 300,
          y: 200
       },{
          id: 'node3',
          x: 300,
          y: 300
       }],
        edges: [{
          id: 'edge1',
          target: 'node2',
          source: 'node1'
       }]
      };
      // 2
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 500,
        height: 500,
        // 交互模式集合
        modes: {
          // 默认交互模式
          default: ['drag-node', 'click-select'],
          // 增加节点交互模式
          addNode: ['click-add-node', 'click-select'],
          // 增加边交互模式
          addEdge: ['click-add-edge', 'click-select'],
        },
      });
      
      graph.data(data);
      graph.render();
      
      // 监听左上角下拉菜单的变化，根据其变化切换图的交互模式
      document.getElementById('selector').addEventListener('change', e => {
        const value = e.target.value;
        // 切换交互模式
        graph.setMode(value);
      });

      //
      // 封装点击添加节点的交互
      G6.registerBehavior('click-add-node', {
        // 设定该自定义行为需要监听的事件及其响应函数
        getEvents() {
          // 监听的事件为 canvas:click，响应函数是 onClick
          return {
            'canvas:click': 'onClick',
          };
        },
        // 点击事件
        onClick(ev) {
          const graph = this.graph;
          // 在图上新增一个节点
          const node = graph.addItem('node', {
            x: ev.x,
            y: ev.y,
            id: G6.Util.uniqueId(), // 生成唯一的 id
          });
        },
      });

      //
      // 封装点击添加边的交互
      G6.registerBehavior('click-add-edge', {
        // 设定该自定义行为需要监听的事件及其响应函数
        getEvents() {
          return {
            'node:click': 'onClick', // 监听事件 node:click，响应函数时 onClick
            mousemove: 'onMousemove', // 监听事件 mousemove，响应函数时 onMousemove
            'edge:click': 'onEdgeClick', // 监听事件 edge:click，响应函数时 onEdgeClick
          };
        },
        // getEvents 中定义的 'node:click' 的响应函数
        onClick(ev) {
          const node = ev.item;
          const graph = this.graph;
          // 鼠标当前点击的节点的位置
          const point = { x: ev.x, y: ev.y };
          const model = node.getModel();
          if (this.addingEdge && this.edge) {
            graph.updateItem(this.edge, {
              target: model.id,
            });

            this.edge = null;
            this.addingEdge = false;
          } else {
            // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
            this.edge = graph.addItem('edge', {
              source: model.id,
              target: point,
              style: {
                endArrow: true
              }
            });
            this.addingEdge = true;
          }
        },
        // getEvents 中定义的 mousemove 的响应函数
        onMousemove(ev) {
          // 鼠标的当前位置
          const point = { x: ev.x, y: ev.y };
          if (this.addingEdge && this.edge) {
            // 更新边的结束点位置为当前鼠标位置
            this.graph.updateItem(this.edge, {
              target: point,
            });
          }
        },
        // getEvents 中定义的 'edge:click' 的响应函数
        onEdgeClick(ev) {
          const currentEdge = ev.item;
          // 拖拽过程中，点击会点击到新增的边上
          if (this.addingEdge && this.edge == currentEdge) {
            graph.removeItem(this.edge);
            this.edge = null;
            this.addingEdge = false;
          }
        },
      })
    }
  }
}
