//点的聚类可视化
function pointCluster(data, map) {
	//新建一个点聚类Group
	var markers = L.markerClusterGroup({
		spiderfyOnMaxZoom : false,
		disableClusteringAtZoom : 18,
		polygonOptions : {
			color : "#2d84c8",
			weight : 4,
			opacity : 1,
			fillOpacity : 0.5
		},
		//设置不同层级圆环的样式，它是根据数字位数来确定css的
		iconCreateFunction : function(cluster) {
			// get the number of items in the cluster
			var count = cluster.getChildCount();
			var digits = (count + "").length;
			return new L.DivIcon({
				html : count,
				className : "cluster digits-" + digits,
				iconSize : null
			});
		}
	});
	//采用了awesome插件的多符号Marker
	var colors = ['red', 'blue', 'green', 'purple', 'orange', 'darkred', 'darkblue', 'darkgreen', 'cadetblue', 'darkpurple'];
	var awesomeIcons = ['font', 'cloud-download', 'medkit', 'github-alt', 'coffee', 'food', 'bell-alt', 'question-sign', 'star'];
	for (var i = 0; i < data.length; i++) {
		var color = colors[Math.floor(Math.random() * colors.length)];
		var awesomeIcon = awesomeIcons[Math.floor(Math.random() * awesomeIcons.length)];
		var a = addressPoints[i];
		var title = a[2];
		//这里的icon没有采用原生的baseballIcon而是换成了L.AwesomeMarkers.icon对象
		var marker = L.marker(new L.LatLng(a[0], a[1]), {
			value : parseInt(a[2]),
			title : title,
			icon : L.AwesomeMarkers.icon({
				icon : awesomeIcon,
				color : color
			})
		});
		//绑定tooltip
		marker.bindPopup(a[2].toString());
		markers.addLayer(marker);
	}
	map.addLayer(markers);
}

//随机点的聚类可视化
function randomPointCluster(ptCount, map) {
	var baseballIcon = L.icon({
		iconUrl : '../css/img/hut1.png',
		iconSize : [32, 37],
		iconAnchor : [16, 37],
		popupAnchor : [0, -28]
	});
	var markers = new L.MarkerClusterGroup({
		spiderfyOnMaxZoom : false,
		disableClusteringAtZoom : 18,
		animateAddingMarkers : true,
		polygonOptions : {
			color : "#2d84c8",
			weight : 4,
			opacity : 1,
			fillOpacity : 0.5
		},
		iconCreateFunction : function(cluster) {
			// get the number of items in the cluster
			var count = cluster.getChildCount();

			// figure out how many digits long the number is
			var digits = (count + "").length;
			return new L.DivIcon({
				html : count,
				className : "cluster digits-" + digits,
				iconSize : null
			});
		}
	});
	
	var markersList = [];

	function populate() {
		for (var i = 0; i < ptCount; i++) {
			var m = new L.Marker(getRandomLatLng(map), {
				icon : baseballIcon,
				value : 1
			});
			m.bindPopup("title");
			markersList.push(m);
			markers.addLayer(m);
		}
		return false;
	}

	function populateRandomVector() {
		for (var i = 0, latlngs = [], len = 20; i < len; i++) {
			latlngs.push(getRandomLatLng(map));
		}
		var path = new L.Polyline(latlngs);
		map.addLayer(path);
	}

	function getRandomLatLng(map) {
		var bounds = map.getBounds(), southWest = bounds.getSouthWest(), northEast = bounds.getNorthEast(), lngSpan = northEast.lng - southWest.lng, latSpan = northEast.lat - southWest.lat;
		lngSpan = 0.02;
		latSpan = 0.02;
		return new L.LatLng(southWest.lat + latSpan * Math.random(), southWest.lng + lngSpan * Math.random());
	}


	markers.on('clusterclick', function(a) {
		//alert('cluster ' + a.layer.getAllChildMarkers().length);
	});
	markers.on('click', function(a) {
		//alert('marker ' + a.layer);
	});

	populate();
	map.addLayer(markers);
}

//GeoJSON多边形属性数值可视化
function geoJSONbyNumeric(data, map) {
	function getColor(d) {
		return d > 1000 ? '#800026' : d > 500 ? '#BD0026' : d > 200 ? '#E31A1C' : d > 100 ? '#FC4E2A' : d > 50 ? '#FD8D3C' : d > 20 ? '#FEB24C' : d > 10 ? '#FED976' : '#FFEDA0';
	}

	function style(feature) {
		return {
			fillColor : getColor(feature.properties.density),
			weight : 2,
			opacity : 1,
			color : 'white',
			dashArray : '3',
			fillOpacity : 0.5
		};
	}

	//-----------------------------------
	function highlightFeature(e) {
		var layer = e.target;
		layer.setStyle({
			weight : 5,
			color : '#666',
			dashArray : '',
			fillOpacity : 0.7
		});
		if (!L.Browser.ie && !L.Browser.opera) {
			layer.bringToFront();
		}
		info.update(layer.feature.properties);
	}

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	var geojson;
	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover : highlightFeature,
			mouseout : resetHighlight,
			click : zoomToFeature
		});
	}

	geojson = L.geoJson(data, {
		style : style,
		onEachFeature : onEachFeature
	}).addTo(map);
	//新建了一个用户自定义可视化信息控件
	var info = L.control();
	info.onAdd = function(map) {
		this._div = L.DomUtil.create('div', 'info');
		// create a div with a class "info"
		this.update();
		return this._div;
	};
	// method that we will use to update the control based on feature properties passed
	info.update = function(props) {
		this._div.innerHTML = '<h4>美国人口密度数据</h4>' + ( props ? '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>' : 'Hover over a state');
	};
	info.addTo(map);
	//-----------------------------------------------
	//图例控件
	var legend = L.control({
		position : 'bottomright'
	});
	legend.onAdd = function(map) {
		var div = L.DomUtil.create('div', 'info legend'), grades = [0, 10, 20, 50, 100, 200, 500, 1000], labels = [];
		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < grades.length; i++) {
			div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
		}
		return div;
	};
	legend.addTo(map);
}
