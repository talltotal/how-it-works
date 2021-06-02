# [@vitalets/google-translate-api](https://github.com/vitalets/google-translate-api)
使用 google 翻译能力。

1. 通过请求 `https://translate.google.com` 页面，获取 token 数据：`FdrFJe` 和 `cfb2h`；
2. 使用 token 数据，拼接翻译 post 请求 `https://translate.google.com/_/TranslateWebserverUi/data/batchexecute`
    - 返回内容解析：
        - 忽略前6个字符
        - 以数字+json的组合，数字表示json字符长度
        - 取第一个 json 数据的 `json[0][2]`
        - 在用JSON解析此字符串数据，得到翻译结果 `json[1][0][0][5]`


query:
```js
{
    'rpcids': 'MkEWBc',
    'f.sid': extract('FdrFJe', res),
    'bl': extract('cfb2h', res),
    'hl': 'en-US',
    'soc-app': 1,
    'soc-platform': 1,
    'soc-device': 1,
    '_reqid': Math.floor(1000 + (Math.random() * 9000)),
    'rt': 'c'
}
```

body:
```js
// 'application/x-www-form-urlencoded;charset=UTF-8'
'f.req=' + encodeURIComponent(JSON.stringify([[['MkEWBc', JSON.stringify([['你好', 'zh-CN', 'en', true], [null]]), null, 'generic']]])) + '&'
```

response body:
```json
)]}'

525
[["wrb.fr","MkEWBc","[[\"你好\",null,null,[null,6]\n]\n,[[[null,null,null,null,null,[[\"Hello there\",[\"Hello there\",\"Hello\",\"Hi\"]\n]\n]\n]\n]\n,\"en\",1,\"zh-CN\",[\"ni hao\",\"zh-CN\",\"en\",true]\n]\n,null,[\"你好!\",null,null,null,null,[[[\"感叹词\",[[\"Hello!\",null,[\"你好!\",\"喂!\"]\n,1,true]\n,[\"Hi!\",null,[\"嗨!\",\"你好!\"]\n,1,true]\n,[\"Hallo!\",null,[\"你好!\"]\n,3,true]\n]\n,\"en\",\"zh-CN\"]\n]\n,3]\n,null,null,\"zh-CN\",1]\n]\n",null,null,null,"generic"]
,["di",38]
,["af.httprm",37,"-3118378067308674861",2]
]
26
[["e",4,null,null,592]
]
```

format response body:
```json
[
  [
    "你好", null, null, [ null, 6 ]
  ],
  [
    [
      [
        null,
        null,
        null,
        null,
        null,
        // 翻译结果
        [
          [
            "Hello there",
            [
              "Hello there",
              "Hello",
              "Hi"
            ]
          ]
        ]
      ]
    ],
    "en",
    1,
    "zh-CN",
    [
      "ni hao",
      "zh-CN",
      "en",
      true
    ]
  ],
  null,
  [
    "你好!",
    null,
    null,
    null,
    null,
    [
      [
        [
          "感叹词",
          [
            [
              "Hello!",
              null,
              [
                "你好!",
                "喂!"
              ],
              1,
              true
            ],
            [
              "Hi!",
              null,
              [
                "嗨!",
                "你好!"
              ],
              1,
              true
            ],
            [
              "Hallo!",
              null,
              [
                "你好!"
              ],
              3,
              true
            ]
          ],
          "en",
          "zh-CN"
        ]
      ],
      3
    ],
    null,
    null,
    "zh-CN",
    1
  ]
]
```

