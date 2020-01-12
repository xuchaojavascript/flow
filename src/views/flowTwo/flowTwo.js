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
      const data = {
        // 点集
        nodes: [
          {
            id: 'node1',
            shape: 'rect',
            label: 'node1',
            size: 100,
            x: 100,
            y: 200,
            linkPoints: {
              top: true,
              bottom: true,
              left: true,
              right: true,
              // ... 四个圆的样式可以在这里指定
            },
          },
          {
            shape: 'ellipse',
            id: 'node2',
            x: 300,
            y: 200
          }
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            label: '222',
            source: 'node1',
            target: 'node2'
          }
        ]
      }
      // 创建 G6 图实例
      const graph = new G6.Graph({
        container: 'mountNode', // 指定图画布的容器 id
        // 画布宽高
        width: '1000',
        height: '800',
        modes:{
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
          edit: ['click-select'],
        },
        defaultNode: {
          shape: 'node',
          labelCfg: {
            style: {
              fill: '#fff',
              fontSize: 14,
              fillOpacity: 1 // 透明度

            },
          },
          style: {
            stroke: '#000',  // 边框
            fill: '#000',
            fillOpacity: 1,
            cursor: 'pointer'
            
          },
          anchorPoints: [[0, 0.5], [1, 0.5]]
        },
        defaultEdge: {
          shape: 'line-with-arrow',
          // line-with-arrow 直线
          // quadratic 曲线
          style: {  // style 线的样式
            // fill: '#000',  
            stroke: 'pink', // 线的颜色
            width: 10,
            cursor: 'pointer',
            lineWidth: 10
            // lineAppendWidth: 0,
            // lineDash: [0, 5],
            // lineDashOffset: 0,
          },
          labelCfg: {  // 文本样式
            autoRotate: true, // 边上的标签文本根据边的方向旋转
            style: {
              // fill: '#000', // 文本颜色
            },
          },
        },
        nodeStateStyles: {
          // 各状态下的样式，仅在 keyShape 上生效
          hover: {
            fillOpacity: 0.1,
            lineWidth: 10,
          },
        },
      })
      // 读取数据
      console.log(G6)
      graph.data(data)
      // 渲染图
      graph.render()
      graph.on('node:mouseenter', evt => {
        const node = evt.item;
        // 激活该节点的 hover 状态
        graph.setItemState(node, 'hover', true);
      });
      // 监听鼠标离开节点事件
      graph.on('node:mouseleave', evt => {
        const node = evt.item;
        // 关闭该节点的 hover 状态
        graph.setItemState(node, 'hover', false);
      });
      graph.on('node:click', evt => {
        console.log(evt)
        // const node = evt.item;
        // // 关闭该节点的 hover 状态
        // graph.setItemState(node, 'hover', false);
      });
      console.log(graph)
    },
    initTwo () {
      const data = {
        nodes: [
          {
            shape: 'rect',
            id: 'node0',
            x: 500,
            y: 300,
            size: 50,
            // anchorPoints: [[0, 0.5], [1, 0.5]]
          },
        ],
        edges: [
          {
            source: 'node0',
            target: 'node0',
            shape: 'loop',
            label: 'loop',
          },
        ],
      };
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 800,
        height: 600,
        defaultEdge: {
          // shape: 'loop',  // 在数据中已经指定 shape，这里无需再次指定
          style: {
            endArrow: true,
            stroke: '#088',
            lineWidth: 3,
          },
        },
        defaultNode: {
          shape: 'none',
          // 全局设置节点的锚点控制点，分别在左侧中间和右侧中间
          anchorPoints: [[0, 0.5], [1, 0.5]]
        },
      });
      graph.data(data);
      graph.render();
    }
  }
}
