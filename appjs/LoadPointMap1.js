

Ext.define('Ext.ux.LeafletMapView', {
    extend: 'Ext.Component',
    alias: 'widget.leafletmapview',
    config: {
        map: null
    },
    afterRender: function (t, eOpts) {
        this.callParent(arguments);

        var leafletRef = window.L;
        if (leafletRef == null) {
            this.update('No leaflet library loaded');
        } else {
            var map = L.map(this.getId());
            map.setView([40.02997, 116.29832], 14);
            map.on('contextmenu', function (e) {
            });
            this.setMap(map);
            lc = L.control.locate({
                follow: true,
                stopFollowingOnDrag: true
            }).addTo(map);
            //加载google底图
            map.tileLayer = L.tileLayer('http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
                subdomains: '0123'
            }).addTo(map);
            //-----------------------------------
            //热力图类heatMap
            var heatmapLayer = L.TileLayer.heatMap({
                radius: 14,
                // radius could be absolute or relative
                // absolute: radius in meters, relative: radius in pixels
                //radius: { value: 15000, absolute: true },
                opacity: 0.8,
                gradient: {
                    0.35: "rgb(255,0,255)",
                    0.45: "rgb(0,0,255)",
                    0.55: "rgb(0,255,255)",
                    0.65: "rgb(0,255,0)",
                    0.95: "yellow",
                    1.0: "rgb(255,0,0)"
                },
                legend: {
                    position: 'bl',
                    title: 'legend'
                }
            });
            //新建一个点聚类Group
            var markers = L.markerClusterGroup({
                spiderfyOnMaxZoom: false,
                disableClusteringAtZoom: 12,
                polygonOptions: {
                    color: "#2d84c8",
                    weight: 4,
                    opacity: 1,
                    fillOpacity: 0.5
                },
                //设置不同层级圆环的样式，它是根据数字位数来确定css的
                iconCreateFunction: function (cluster) {
                    // get the number of items in the cluster
                    var count = cluster.getChildCount();
                    var digits = (count + "").length;
                    return new L.DivIcon({
                        html: count,
                        className: "cluster digits-" + digits,
                        iconSize: null
                    });
                }
            });
            Ext.Ajax.request({
				url : 'http://localhost:3000/SNSShop/BusinessSubtype/自助餐',
				method : 'GET',
				success : function(resp, opts) {
					var respText = Ext.JSON.decode(resp.responseText);

					heatmapLayer.addData(respText.features);
					heatmapLayer.redraw();

					// 点聚类
					var ms = [];
                    //采用了awesome插件的多符号Marker
                    var colors = ['red', 'blue', 'green', 'purple', 'orange', 'darkred', 'darkblue', 'darkgreen', 'cadetblue', 'darkpurple'];
                    var awesomeIcons = ['font', 'cloud-download', 'medkit', 'github-alt', 'coffee', 'food', 'bell-alt', 'question-sign', 'star'];
					for (var i = 0; i < respText.features.length; i++) {
						var a = respText.features[i];
                        var awesomeIcon = awesomeIcons[5];
                        var color = colors[Math.floor(Math.random() * colors.length)];
						var m = new L.Marker(new L.LatLng(a["lat"], a["lng"]), {
							value: parseInt(a['avg_rating']),
                            title: 'ss',
                            icon: L.AwesomeMarkers.icon({
                                icon: awesomeIcon,
                                color: color
                            })
						});
						var popupText = "<div style=' max-height:250px;'>";
						popupText += "<b>设施名称</b>: " + a["BusinessName"] + "<br>";
						popupText += "<b>地址</b>: " + a["Address"]+ "<br>";
						popupText += "<b>评分</b>: " + a["avg_rating"]+ "<br>";
						popupText += "<b>设施类型</b>: " + a["BusinessSubtype"]+ "<br>";
                        popupText += "<b>电话</b>: " + a["tel"]+ "<br>";
						popupText += "</div>";
						m.bindPopup(popupText);
						ms.push(m);
						//markers.addLayer(m);
                        var circle = L.circle([a["lat"], a["lng"]], 500, {
                            color: 'red',
                            fillColor: '#f03',
                            fillOpacity: 0.3
                        }).addTo(map);
					}
					markers.addLayers(ms);

				},
				failure : function(resp, opts) {
					//alert(resp.responseText);
				}
			});
            heatmapLayer.addTo(map);
            map.addLayer(markers);

            drawChart();
        }
    },
    onResize: function (w, h, oW, oH) {
        this.callParent(arguments);
        var map = this.getMap();
        if (map) {
            map.invalidateSize();
        }
    }
});
