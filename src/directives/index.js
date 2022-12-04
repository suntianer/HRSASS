export const imageError = {
  // 指令对象，会在当前的dom 元素插入到节点之后执行
  inserted(dom, options) {
    // dom 表示当前指令作用的dom对象 对应手册中的el
    // options 指令中的变量解释，手册中的binding，获取指令绑定的值 options.value

    // dom.onload = function(){} 资源加载成功
    // 在js原生语法中， onerror这个事件的触发时机，是资源加载失败， 一般指图片
    // 添加资源加载失败事件
    dom.onerror = function() {
      // v-imageError="地址" 当图片出现异常，会将指令配置的默认图片设置为该图片的内容
      dom.src = options.value
    }
  }
}
