# 关于图片压缩

## 图片信息
1. 扩展名不能通过图片的名称进行判断,要通过图片的内部格式判断,安全准确
2. 图片的名称不能通过字符串分隔处理,因为 / 标记也可用作图片名称
3. 上传的图片扩展名为 jpg,但内部的扩展名却是 jpeg, 两者是一个东西
   1. jpg 与 jpeg 在实际使用上是完全等价的，它们都是指同一种图片格式：JPEG（Joint Photographic Experts Group），只是扩展名不同
   2. 对文件保存：建议统一使用 .jpg（更短，更兼容旧系统）




## 设置功能
1. 小于多少 KB 图片不压缩,用于默认的 base64 处理 --- 好像没什么作用



## 技术文档
1. [react-toastify](https://fkhadra.github.io/react-toastify/icons)