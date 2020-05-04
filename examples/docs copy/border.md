<!--
 * @Author: Victor wang
 * @Date: 2020-04-26 18:43:28
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-27 16:33:36
 * @Description:
 -->

<script lang='ts'>
  export default {
    data() {
      return {
        borderRadiusBase: '4px',
        borderRadiusSmall: '2px',
        boxShadowLight: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
        boxShadowBase: '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)',
      }
    },
  }
</script>

## Border 边框

对边框进行统一规范，可用于按钮、卡片、弹窗等组件里。

### 边框

<div class="demo-border">
<table class="table">
  <tbody>
    <tr>
      <td class="text">名称</td>
      <td class="text">粗细</td>
      <td class="line">举例</td>
    </tr>
    <tr>
      <td class="text">实线</td>
      <td class="text">1px</td>
      <td class="line">
        <div></div>
      </td>
    </tr>
    <tr>
      <td class="text">虚线</td>
      <td class="text">2px</td>
      <td class="line">
        <div class="dashed"></div>
      </td>
    </tr>
  </tbody>
</table>
</div>

### 圆角

<mu-row :gutter="12" class="demo-border">
  <mu-col :span="6" :xs="{span: 12}">
    <div class="title">无圆角</div>
    <div class="value">border-radius: 0px</div>
    <div class="radius"></div>
  </mu-col>
  <mu-col :span="6" :xs="{span: 12}">
    <div class="title">小圆角</div>
    <div class="value">border-radius: {{borderRadiusSmall}}</div>
    <div 
      class="radius" 
      :style="{ borderRadius: borderRadiusSmall }"
    ></div>
  </mu-col>
  <mu-col :span="6" :xs="{span: 12}">
    <div class="title">大圆角</div>
    <div class="value">border-radius: {{borderRadiusBase}}</div>
    <div 
      class="radius"
      :style="{ borderRadius: borderRadiusBase }"
    ></div>
  </mu-col>
  <mu-col :span="6" :xs="{span: 12}">
    <div class="title">圆形圆角</div>
    <div class="value">border-radius: 30px</div>
    <div class="radius radius-30"></div>
  </mu-col>
</mu-row>

### 投影

<div class="demo-border">
  <div 
    class="demo-shadow"
    :style="{ boxShadow: boxShadowBase }"
  >
    <span class="demo-shadow-text">基础投影 box-shadow: {{boxShadowBase}}</span>
  </div>
  <div 
    class="demo-shadow"
    :style="{ boxShadow: boxShadowLight }"
  >
    <span class="demo-shadow-text">浅色投影 box-shadow: {{boxShadowLight}}</span>
  </div>
</div>
