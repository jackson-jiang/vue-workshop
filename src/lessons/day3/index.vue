<template>
  <div>
  <div>
    <h2>day3-2020/08/05 手写Vue源码</h2>
    <div id="kapp">
      <div>
        Compile text: <span>[[counter]]</span>
      </div>
      <div>
        k-text: <span k-text="counter"></span>
      </div>
      <div>
        k-bind: <span><input type="text" k-bind:value="val"></span>
      </div>
      <div>
        k-on: <span><button k-on:click="add">Add one</button></span>
      </div>
      <div>@<input type="text" _input="handleInput"/> <span>[[inputVal]]</span></div>
      <div>model<input type="text" k-model="mvalue"/> <span>[[mvalue]]</span></div>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from './kvue'
export default {
  mounted () {
    const vm = new Vue({
      el: '#kapp',
      data: {
        counter: 0,
        val: 'hello bind',
        inputVal: '',
        mvalue: '',
      },
      methods: {
        add () {
          this.counter++
          this.val = 'haha ' + this.counter
        },
        handleInput(e) {
          this.inputVal = e.target.value
        }
      }
    })
    setTimeout(()=> {
      vm.counter++
      vm.val = 'haha ' + vm.counter
    }, 1000)
  }
}
</script>
