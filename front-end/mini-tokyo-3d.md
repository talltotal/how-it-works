# [mini-tokyo-3d](https://github.com/nagix/mini-tokyo-3d)
> 东京地铁实时 3D 地图
> 数据来源：[Public Transportation Open Data Center](https://www.odpt.org)


## 地图能力
[mapbox-gl](https://github.com/mapbox/mapbox-gl-js#readme)：
使用 WebGL 绘制3d地图样式。(需申请 Access Token)

[turf](https://github.com/Turfjs/turf)：
地理空间分析引擎。

[GeoJSON](https://geojson.org)：
地理数据格式。


## 数据获取
- 地铁实时数据
    - `https://api.odpt.org/api/v4/odpt:Train?odpt:operator=odpt.Operator:Toei&acl:consumerKey=${Key}`
    - `https://mini-tokyo.appspot.com/tid`
    - `https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TWR,Toei,YokohamaMunicipal,MIR,TamaMonorai&acl:consumerKey=${Key}`
- 飞机航班数据
    - `https://mini-tokyo.appspot.com/atisinfo`
    - `https://api.odpt.org/api/v4/odpt:FlightInformationArrival?odpt:operator=odpt.Operator:JAL,ANA&acl:consumerKey=${Key}`
    - `https://api.odpt.org/api/v4/odpt:FlightInformationDeparture?odpt:operator=odpt.Operator:JAL,ANA&acl:consumerKey=${Key}`
- 路线搜索
    - `https://search.minitokyo3d.com/api/v1/routes?origin=JR-East.Yamanote.Osaki&destination=JR-East.ChuoRapid.Shinjuku&type=departure&month=4&date=26&hours=10&minutes=1`
- 日本假期
    - [japanese-holidays](https://github.com/osamutake/japanese-holidays-js)


## 文档框架
[vuepress](https://vuepress.vuejs.org/zh/)
