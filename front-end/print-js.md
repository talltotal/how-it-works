# [print-js]()

使用`iframe`，通过`iframe.srcdoc`设置内容；在`onload`回调中，调整内容后`iframeElement.focus()`+`iframeElement.contentWindow.print()`。
需要注意等待图片完成加载。
打印内容为`pdf`时，`iframe.src`设为`window.URL.createObjectURL(new window.Blob([pdf.data], { type: 'application/pdf' }))`。
