<template>
  <div class="k-dialog-wrapper" v-show="visible">
    <div class="k-dialog">
      <div class="k-title">
        {{title}}
        <div class="close-btn" @click="hide">x</div>
      </div>
      <div class="k-body">{{message}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Notice',
  props: {
    duration: {
      type: Number,
      default: 2000
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
      // setTimeout(() => { this.visible = false }, this.duration)
    },
    hide () {
      this.visible = false
    }
  }
}
</script>
<style scoped>
  .k-dialog-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #0000007F;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .k-dialog {
    width: 400px;
    height: 300px;
    background: #fff;
    border-radius: 5px;
    /* margin: auto */
  }
  .k-title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    border-bottom: 1px solid #b9b9b9;
    height: 48px;
    padding: 12px 0;
    box-sizing: border-box
  }
  .k-boday {
    text-align: center;
  }
  .close-btn {
    float: right;
    font-weight: normal;
    width: 16px;
    margin-right: 8px;
    cursor: pointer;
  }
</style>
