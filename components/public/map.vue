<template>
  <div
    id="map"
    :style="{width:width+'px',height:height+'px'}"
    :class="['m-map',{ mapFixed: mapFixed }]"
  />
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default: () => {
        return []
      }
    },
    mapFixed: {
      type: Boolean
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      key: 'a743d19e328ce576a17a9e7beff10dfa',
      iconRed: 'https://s0.meituan.net/bs/fe-web-meituan/5058856/img/location_red.png',
      iconOrigin: 'https://s0.meituan.net/bs/fe-web-meituan/5058856/img/location_orange.png'
    }
  },
  watch: {
    currentIndex (val) {
      const longitude = this.point[val].longitude
      const latitude = this.point[val].latitude
      if (this.map !== undefined) {
        this.map.setCenter([longitude, latitude])
        // 清除标记点
        this.map.clearMap()
        this.drawMarker(this.map)
        /* eslint-disable no-new */
        new window.AMap.Marker({
          map: this.map,
          position: [longitude, latitude],
          content: `<div class="custom-content-marker">
                      <img src="${this.iconOrigin}">
                      <div class="close-btn">${val}</div>
                      <div class="map-text-wrap">
                        <div class="map-text">${this.point[val].title}</div>
                        <div class="arrow"></div>
                      </div>
                    </div>`
        })
      }
    }
  },
  mounted () {
    // mounted可以拿到window
    window.onmaploaded = () => {
      const map = new window.AMap.Map('map', {
        resizeEnable: true,
        zoom: 11,
        center: [this.point[0].longitude, this.point[0].latitude]
      })
      this.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        const toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
      })

      // 绘制index
      this.drawMarker(map)
    }
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${this.key}&callback=onmaploaded`
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
  methods: {
    drawMarker (map) {
      this.point.forEach((marker, index) => {
        /* eslint-disable no-new */
        new window.AMap.Marker({
          map,
          position: [marker.longitude, marker.latitude],
          content: `<div class="custom-content-marker"><img src="${this.iconRed}"><div class="close-btn">${index +
            1}</div></div>`
        })
      })
    }
  }
}
</script>
<style>
.m-map {
  margin-top: 34px;
  margin-left: 8px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  transition: box-shadow 0.3s;
}

.mapFixed {
  position: fixed !important;
  top: 0;
  margin-top: 0;
  box-shadow: 0 5px 14px 0 rgba(0, 0, 0, 0.19);
}

.custom-content-marker {
  position: relative;
  width: 20px;
  height: 28px;
}

.custom-content-marker img {
  width: 100%;
  height: 100%;
}

.custom-content-marker .close-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 20px;
}

.map-text-wrap {
  position: absolute;
  width: 100px;
  left: -40px;
  top: -28px;
  border-radius: 4px;
  box-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.1);
}

.map-text-wrap .map-text {
  text-align: center;
  border-radius: 4px;
  padding: 0 8px;
  background-color: #fff;
  line-height: 22px;
  font-size: 12px;
  color: #333;
  height: 22px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.map-text-wrap .arrow {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-width: 5px 5px 0;
  border-color: #fff transparent transparent;
  border-style: solid;
  left: 45px;
  top: 22px;
}
</style>
