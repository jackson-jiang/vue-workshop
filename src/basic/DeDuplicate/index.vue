<template>
  <div>
    deduplicate
    <input name="text" id="text"/>
  </div>
</template>
<script>
export default {
  mounted() {
    // 配置项：如果有重复的字符
    // scan: true
    // scan-period: 300ms
    // scanMinCount: 3,
    // longtext: false
    // duplicate: false
    // duplicateLen: 10

    // 扫描
    // isScanning: 是否正在扫描
    // 连续输入扫描间隔少于300ms，计数超过scanStartCount:
    // scantext:
    let scan = true, isScanning = false, lastInputTimeStamp, scanPeriod = 1000, scanHistory = [],
    scantext = '', interval // 单次扫描的字符串

    const text = document.getElementById('text')
    text.addEventListener('input', function (e) {
      debugger
      // e.inputType: insertText, deleteByCut, insertByPaste, deleteContentBackward, deleteContentForward
      if (e.inputType === 'insertText') {
        // 扫描检测
        if (scan) {
          // 如果没在扫描, 开始扫描
          const timestamp = new Date().getTime()
          if (isScanning === false) {
            console.log('【开始扫描】 终止判定：>'+scanPeriod+'ms')
            console.log('【输入】+间隔, 字符'+scantext);
            isScanning = true
            lastInputTimeStamp = timestamp
            scantext = e.data
            interval = setInterval(() => {
              const timestamp = new Date().getTime()
              if (timestamp -lastInputTimeStamp > scanPeriod) {
                console.log('【扫描结束】 字符串：' + scantext);
                const index = scanHistory
                if (condition) {
                  console.log('检测到重复扫描：' + scantext + '; index=')
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
              console.log('【输入】+间隔'+period+'字符'+scantext);
            }
          }
        }
      }
      debugger
    })
  },
}
</script>
