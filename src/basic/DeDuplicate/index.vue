<template>
  <div>
    deduplicate
    <!-- <input name="text" id="text" v-text-warning="{a:1}" @text-warning:scan-dup="handleScan"/> -->
    <jinput v-text-warning="{selector: 'input'}" @text-warning="handleScan"></jinput>
  </div>
</template>
<script>
export default {
  componentName: 'deduplicate',
  components: {
    'jinput': {
      template: `
        <div><input></div>
      `
    }
  },
  directives: {
    // TODO 清理数据
    'text-warning': {
      bind(el, binding, vnode) {
        vnode
        let {
          scan = true,
          scanPeriod = 1000,
          duplicateLen = 10,
          textLen=50,
          selector
        } = binding.value || {}

        let isScanning = false,
            lastInputTimeStamp,
            scanHistory = [],
            scantext = '',
            interval

        let elms = [el]

        if (selector) {
          elms = el.querySelectorAll(selector)
        }
        Array.from(elms).forEach(function (el) {
          bind(el)
        })
        function emit(vnode, type, text) {
          const vm = vnode.componentInstance || vnode.context
          vm.$emit('text-warning', { type, text})
        }
        function log (...args) {
          // if (process.env.NODE === 'development') {
            console.log(...args);
          // }
        }
        function bind(el) {
          el.addEventListener('input', inputHandler )
        }
        function inputHandler(e) {
            // debugger
            // e.inputType: insertText, deleteByCut, insertByPaste, deleteContentBackward, deleteContentForward
            if (e.inputType === 'insertText') {
              // 扫描检测
              if (scan) {
                // 如果没在扫描, 开始扫描
                const timestamp = new Date().getTime()
                if (isScanning === false) {
                  log('【开始扫描】 终止判定：>'+scanPeriod+'ms')
                  log('【输入】+间隔, 字符'+scantext);
                  isScanning = true
                  lastInputTimeStamp = timestamp
                  scantext = e.data
                  interval = setInterval(() => {
                    const timestamp = new Date().getTime()
                    if (timestamp -lastInputTimeStamp > scanPeriod) {
                      log('【扫描结束】 字符串：' + scantext);
                      const index = scanHistory.findIndex(item => item === scantext)
                      if (~index) {
                        log('检测到重复扫描：' + scantext + '; index='+index)
                        // vnode.context.$emit('text-warning:scan-dup', scantext)
                        emit(vnode, 'scan-dup', scantext)
                        scanHistory = []
                      } else {
                        scanHistory.push(scantext)
                      }

                      scantext = ''
                      isScanning=false
                      clearInterval(interval)
                    }
                  }, scanPeriod);
                } else { // 扫描中
                  // 两次间隔过长，扫描结束
                  const period = timestamp - lastInputTimeStamp
                  // 扫描继续，添加字符到scantext
                  if (period <= scanPeriod) {
                    lastInputTimeStamp = timestamp
                    scantext += e.data
                    log('【输入】+间隔'+period+'字符'+scantext);
                  }
                }
              }
            }
            if (duplicateLen) {
              const text = e.target.value
              if (text.length  < duplicateLen*2) {
                return
              }
              for (let idx = 0; idx < text.length - duplicateLen; idx++) {
                const str = text.slice(idx, duplicateLen+idx);
                if (text.includes(str,idx+str.length)) {
                  log('找到相同字符串:'+str)
                  // vnode.context.$emit('text-warning:text-dup', str)
                  emit(vnode, 'text-dup', str)
                  break
                }
              }
            }
            if (textLen) {
              const text = e.target.value
              if (text.length > textLen) {
                log('超出最大长度:'+textLen)
                // vnode.context.$emit('text-warning:text-2-long', textLen)
                emit(vnode, 'text-long', textLen)
              }
            }
          }
      }
    }
  },
  methods: {
    handleScan (value) {
      console.log(value, 'emitted');
    }
  },
  mounted() {
    this.$on('text-warning:scan-dup', this.handleScan.bind(this))
    // 配置项：如果有重复的字符
    // scan: true
    // scan-period: 300ms
    // scanMinCount: 3,
    // longtext: false
    // longTextLen: 50
    // duplicate: false
    // duplicateLen: 10

    // 扫描
    // isScanning: 是否正在扫描
    // 连续输入扫描间隔少于300ms，计数超过scanStartCount:
    // scantext:


    // const text = document.getElementById('text')

  },
}
</script>
