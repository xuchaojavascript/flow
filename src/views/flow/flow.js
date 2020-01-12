/* eslint-disable */
import G6 from '@antv/g6';
export default {
  name: "flow",
  components: {},
  mounted() {
    this.initG6();
  },
  props: {
    actionList: {
      type: Array,
      default: () => {
        return []
      }
    },
    funcList: {
      type: Array,
      default: () => {
        return []
      }
    },
    accountList: {
      type: Array,
      default: () => {
        return []
      }
    },
    workflowList: {
      type: Array,
      default: () => {
        return []
      }
    },
    nodeTypeList: {
      type: Array, default: () => {
        return [
          {id: 0, label: '普通节点'},
          {id: 1, label: '入口节点'},
          {id: 2, label: '出口节点'}
        ]
      }
    }
  },
  data() {
    return {
      action: '',
      name: '',
      func: '',
      account: '',
      workflow: '',
      nodeType: 0,
      color: '',

      net: '',
      Util: '',
      workflowName: '',
      activation: '', //当前激活的节点
      isNode: false, //当前是节点
      isBlank: true,   //当前是空白区
      checked: true,  //网格对齐
      infoTitle: '画布',//属性标题
      oldColor: '',    //获取节点本身颜色
      type: '',        //有值为编辑状态
    }
  },
  methods: {
    initG6() {
      let self = this;
      self.Util = G6.Util;
      let grid;
      if (self.checked) {
        grid = {
          forceAlign: true, // 是否支持网格对齐
          cell: 25,         // 网格大小
        };
      } else {
        grid = null;
      }
      self.net = new G6.Graph({
        container: 'flowChart',      // 容器ID
        mode: 'edit',
        grid: grid,
        /*width: 500,    // 画布宽*/
        height: 800    // 画布高
      });
      /*self.net.tooltip({
        title: '信息', // @type {String} 标题
        split: ':',  // @type {String} 分割符号
        dx: 0,       // @type {Number} 水平偏移
        dy: 0        // @type {Number} 竖直偏移
      });*/

      /**
       *点击空白处
       */
      self.net.on('click', (ev) => {
        if (!self.Util.isNull(ev.item)) {
          self.isBlank = false
        } else {
          self.isBlank = true;
          self.infoTitle = '画布'
        }
      });
      /**
       *点击节点
       */
      self.net.on('itemclick', function (ev) {
        self.isNode = self.Util.isNode(ev.item);   //是否为Node
        self.activation = ev.item;
        if (self.isNode) {
          /* 激活节点后节点名称input聚焦*/
          self.$nextTick(()=>{
            self.$refs.inputFocus.$el.querySelector('input').focus();
          });
          self.infoTitle = '节点';
          self.name = ev.item.get('model').label;
          self.func = ev.item.get('model').func;
          self.account = ev.item.get('model').account || [];
          self.workflow = ev.item.get('model').workflow;
          self.nodeType = ev.item.get('model').nodeType;
        } else {
          self.infoTitle = '边';
          self.action = ev.item.get('model').action;
        }
        self.color = self.oldColor;
      });
      /**
       * 鼠标移入移出事件改变颜色
       */
      self.net.on('itemmouseenter', ev => {
        const item = ev.item;
        self.oldColor = item.get('model').color;     //获取节点颜色
        self.net.update(item, {
          color: '#108EE9',
        });
        self.net.refresh();
      });
      self.net.on('itemmouseleave', ev => {
        const item = ev.item;
        self.net.update(item, {
          color: self.oldColor
        });
        self.net.refresh();
      });
      /**
       * 提示信息
       */
     /* self.net.node().tooltip(['label', 'func', 'role', 'color']);
      self.net.edge().tooltip(['label', 'color']);*/
      /**
       * 渲染
       */
      /*self.net.source(self.nodes, self.edges);*/  //加载资源数据
      // self.net.render();
    },
    addCircle() {
      this.net.beginAdd('node', {
        shape: 'circle',
        nodeType: 0
      })
    },//添加起始节点
    addRect() {
      console.log(this)
      this.addRect('rect', {
        attrs: {
          fill: 'red',
          shadowOffsetX: 10,
          shadowOffsetY: 10,
          shadowColor: 'blue',
          shadowBlur: 10,
          opacity: 0.8,
        },
      })
      // this.net.beginAdd('node', {
      //   shape: 'rect',
      //   nodeType: 0
      // })
    },//添加常规节点
    addRhombus() {
      this.net.beginAdd('node', {
        shape: 'rhombus',
        nodeType: 0
      })
    }, //添加条件节点
    addLine() {
      this.net.beginAdd('edge', {
        shape: 'line'
      });
    }, //添加直线
    addSmooth() {
      this.net.beginAdd('edge', {
        shape: 'smooth'
      })
    },  //添加曲线
    addArrowSmooth() {
      this.net.beginAdd('edge', {
        shape: 'smoothArrow'
      })
    }, //添加箭头曲线
    addArrowLine() {
      this.net.beginAdd('edge', {
        shape: 'arrow'
      });
    }, //添加箭头直线
    addPolyLine() {
      this.net.beginAdd('edge', {
        shape: 'polyLineFlow'
      });
    }, //添加折线
    changeMode(mode) {
      this.net.changeMode(mode)
    }, //拖拽与编辑模式的切换
    del() {
      this.net.del()
    },//删除
    save() {
      /* 验证流图名称*/
      if (this.workflowName !== '') {
        let data = this.net.save();
        if (data.source.nodes.length === 0) {
          this.$message({type: 'error', message: '流图内容不能为空'});
          return false
        }
        /* 验证节点名称*/
        for (let item of data.source.nodes) {
          if (item.label === '' || item.label === null || item.label === undefined) {
            this.$message({type: 'error', message: '节点名称不能为空'});
            return false
          }
        }
        data.source['name'] = this.workflowName;
        /*let json = JSON.stringify(data, null, 2);*/
        this.$emit('saveData', data.source, this.type);
      } else {
        this.$message({type: 'error', message: '流图名称不能为空'})
      }
      /*console.log(saveData, json);*/
    },//保存
    update() {
      if (this.activation.get('type') === 'node') {
        this.net.update(this.activation, {
          label: this.name,
          func: this.func,
          account: this.account,
          workflow: this.workflow,
          nodeType: this.nodeType,
          color: this.color
        });
      } else {
        /* 根据ID取出label*/
        let label = this.actionList.map(item => {
          if (item.id === this.action) {
            return item.label
          }
        }).join('');
        this.net.update(this.activation, {
          label: label,
          color: this.color,
          action: this.action
        });
      }
    },  //更新节点
    clearView() {
      this.type = '';
      this.workflowName = '';
      this.net.changeData()
    },   //清空视图
    source(nodes, edges, name, type) {
      this.type = type;
      this.workflowName = name;
      this.net.changeData(nodes, edges)
    },  //更新数据
  },
  watch: {
    /**
     * 监听输入框
     */
    action: function () {
      this.update()
    },
    name: function () {
      this.update()
    },
    func: function () {
      this.update()
    },
    account: function () {
      this.update()
    },
    workflow: function () {
      this.update()
    },
    nodeType: function () {
      this.update()
    },
    color: function () {
      this.update()
    },
    /**
     * 网格切换
     */
    checked: function () {
      let _saveData = this.net.save();
      this.net.destroy();  //销毁画布
      this.initG6();
      this.net.read(_saveData);
      this.net.render()
    }
  }
}