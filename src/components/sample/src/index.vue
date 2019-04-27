<template>
  <div class="sample">
    <h1 :style="styles">
      {{ message }}
    </h1>
    <small v-command:cyan>{{ tip }}</small>
    <br />
    <input v-model="message" />
    &nbsp;
    <button @click="printf">Click Me To Double Plus</button>
  </div>
</template>

<script>
import "../style.less";
import mixin from "@component/mixin";

export default {
  // 命名
  name: "Sample",

  // 混合
  mixins: [mixin],

  // 参数
  props: {
    source: {
      type: [Object],
      default() {
        return {};
      }
    },
    styles: {
      type: [Object],
      default() {
        return {};
      }
    },
    options: {
      type: [Object],
      default() {
        return {};
      }
    }
  },

  // 数据
  data() {
    return {
      message: "Sample"
    };
  },

  // 计算
  computed: {
    tip() {
      return `! Unbelievable: ${this.message}`;
    }
  },

  // 指令
  directives: {
    command: {
      bind() {},
      unbind() {},
      inserted(el, binding) {
        el.style.backgroundColor = binding.value;
      },
      update() {},
      componentUpdated() {}
    }
  },

  // 方法
  methods: {
    printf() {
      this.message = this.plus(this.message);
    }
  },

  /**
   * 生命周期钩子
   * ======== ======== ========
   *  Create: 实例 创建
   *   Mount: 实例 挂载
   *  Update: 实例 更新
   * Destroy: 实例 销毁
   * ======== ======== ========
   */
  beforeCreate() {
    console.log("in beforeCreate");
  },
  created() {
    console.log("in created");
  },

  beforeMount() {
    console.log("in beforeMount");
  },
  mounted() {
    console.log("in mounted");
  },

  beforeUpdate() {
    console.log("in beforeUpdate");
  },
  updated() {
    console.log("in updated");
  },

  beforeDestroy() {
    console.log("in beforeDestroy");
  },
  destroyed() {
    console.log("in destroyed");
  }
};
</script>
