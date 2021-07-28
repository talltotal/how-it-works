# [XSwitch](https://github.com/yize/xswitch)

- 用户配置
- background 请求捕捉

## background
- 在`manifest.json`配置`background.scripts`
- `chrome.webRequest.onBeforeRequest.addListener(cb, { urls:['<all_urls>'] }, ['blocking'])` 捕获所有请求
- 在`cb`中判断`url`与用户配置的匹配，返回`{ redirectUrl }`重定向请求
- 原请求返回`states: 307`
