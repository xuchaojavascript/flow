<template>
  <div id="flowChart">
    <div class="operating">
      <div class="btn-group">
        <div class="btn" @click="addCircle" title="起始节点">
          <i class="iconfont icon-circle-oeps"></i>
        </div>
        <div class="btn" @click="addRect" title="常规节点">
          <i class="iconfont icon-square-oeps"></i>
        </div>
        <div class="btn" @click="addRhombus" title="条件节点">
          <i class="iconfont icon-square-ling"></i>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn" @click="addLine" title="直线">
          <i class="iconfont icon-zhixian"></i>
        </div>
        <div class="btn" @click="addSmooth" title="曲线">
          <i class="iconfont icon-quxian"></i>
        </div>
        <div class="btn" @click="addArrowLine" title="箭头直线">
          <i class="iconfont icon-jiantouzhixian"></i>
        </div>
        <div class="btn" @click="addArrowSmooth" title="箭头曲线">
          <i class="iconfont icon-jiantouquxian"></i>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn" @click="changeMode('edit')" title="选择模式">
          <i class="iconfont icon-chose"></i>
        </div>
        <div class="btn" @click="changeMode('drag')" title="拖拽模式">
          <i class="iconfont icon-move"></i>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn" @click="del" style="margin-top: 5px;" title="删除">
          <i class="el-icon-delete"></i>
        </div>
        <div class="btn" @click="save" title="保存">
          <i class="iconfont icon-baocun"></i>
        </div>
      </div>
      <div class="btn-group">
        <el-input size="mini" v-model="workflowName" placeholder="请输入流图名称..."></el-input>
      </div>
    </div>
    <div class="info">
      <div class="title">
        <span>{{infoTitle}}属性</span>
      </div>
      <div class="content">
        <el-checkbox v-if="isBlank === true" v-model="checked">网格对齐</el-checkbox>
        <el-form v-else label-position="left" label-width="60px">
          <el-form-item v-if="isNode !== true" label="动作">
            <el-select v-model="action" size="mini" filterable placeholder="绑定动作" value="">
              <el-option
                v-for="item in actionList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>   <!-- 线-->
          <el-form-item v-if="isNode === true" label="名称">
            <el-input size="mini" v-model="name"></el-input>
          </el-form-item>
          <el-form-item v-if="isNode === true" label="功能">
            <el-select v-model="func" size="mini" filterable placeholder="绑定功能" value="">
              <el-option
                v-for="item in funcList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="isNode === true" label="账号">
            <el-select v-model="account" size="mini" filterable multiple
                       collapse-tags placeholder="绑定账号" value="">
              <el-option
                v-for="item in accountList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="isNode === true" label="流图">
            <el-select v-model="workflow" size="mini" filterable clearable placeholder="绑定流图" value="">
              <el-option
                v-for="item in workflowList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="isNode === true" label="类型">
            <el-select v-model="nodeType" size="mini" filterable placeholder="请选择类型" value="">
              <el-option
                v-for="item in nodeTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="颜色">
            <el-color-picker v-model="color"></el-color-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script src="./flow.js">
</script>

<style lang="scss" src="./flow.scss" scoped>
</style>
