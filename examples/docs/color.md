<script>
  export default {
    data() {
      return {
        global: {},
        primary: '#EF99AF',
        auxiliary:'#FFF9F9',
        black: '#000000',
        white:'#FFFFFF',
        textPrimary: '#222222',
        textRegular: '#4D4D4D',
        textSecondary: '#7D7D7D',
        textPlaceholder: '#CCCCCC',
        borderBase: '#DDDDDD',
        borderLight: '#EEEEEE',
        borderLighter: '#F9F9F9',
      }
    },
    methods:{
      tintColor(c, tint) {
        const color = c.replace('#', '');
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red += Math.round(tint * (255 - red));
        green += Math.round(tint * (255 - green));
        blue += Math.round(tint * (255 - blue));
        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);
        return `#${ red }${ green }${ blue }`;
      }
    }

}
</script>

# Color 色彩

使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

### 主色

网站主色调。

<mu-row :gutter="12">
  <mu-col :span="10" :xs="{span: 12}">
    <div class="demo-color-box" :style="{ background: primary }">Primary Color
      <div class="value">{{primary}}</div>
      <div class="bg-color-sub" :style="{ background: tintColor(primary, 0.9) }">
        <div
          class="bg-blue-sub-item"
          v-for="(item, key) in Array(8)"
          :key="key"
          :style="{ background: tintColor(primary, (key + 1) / 10) }"
        ></div>
      </div>
    </div>
  </mu-col>
</mu-row>

### 文本、背景和边框

<mu-row :gutter="12">
  <mu-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textPrimary }"
      >主要文字<div class="value">{{textPrimary}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textRegular }"
      >
      常规文字<div class="value">{{textRegular}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textSecondary }"
      >次要文字<div class="value">{{textSecondary}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textPlaceholder }"
      >占位文字<div class="value">{{textPlaceholder}}</div></div>
    </div>
  </mu-col>
  <mu-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderBase }"
      >一级边框<div class="value">{{borderBase}}</div></div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderLight }"
      >二级边框<div class="value">{{borderLight}}</div></div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderLighter }"
      >三级边框<div class="value">{{borderLighter}}</div></div>
    </div>
  </mu-col>
  <mu-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div 
      class="demo-color-box demo-color-box-other"
      :style="{ background: black }"
      >基础黑色<div class="value">{{black}}</div></div>
      <div
      class="demo-color-box demo-color-box-other"
      :style="{ background: white, color: '#303133', border: '1px solid #eee' }"
      >基础白色<div class="value">{{white}}</div></div>
      <div class="demo-color-box demo-color-box-other bg-transparent">透明<div class="value">Transparent</div>
      </div>
    </div>
  </mu-col>
</mu-row>
