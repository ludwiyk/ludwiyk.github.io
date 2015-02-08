L.TileLegend = L.Class.extend({
    includes: L.Mixin.Events,

    initialize: function (map, tilelayer, container) {
        this._map = map;
        this._tilelayer = tilelayer;
        this._data = tilelayer.options.legend;
        this._container = container;
        L.DomUtil.addClass(this._container, 'leaflet-control-tilelegend');

        var toolbox = L.DomUtil.create('div', 'tilelegend-toolbox', this._container),
            minimize = L.DomUtil.create('a', 'tilelegend-minimize', toolbox),
            maximize = L.DomUtil.create('a', 'tilelegend-maximize', toolbox),
            close = L.DomUtil.create('a', 'tilelegend-close', toolbox);
        maximize.title = "Maximize";
        minimize.title = "Minimize";
        close.title = "关闭";
        this._maximizeClassName = "tilelegend-maximized";
        this._minimizeClassName = "tilelegend-expended";
        L.DomEvent.on(close, 'click', this.close, this).on(close, 'click', L.DomEvent.stop);
        L.DomEvent.on(maximize, 'click', this.maximize, this).on(close, 'click', L.DomEvent.stop);
        L.DomEvent.on(minimize, 'click', this.minimize, this).on(close, 'click', L.DomEvent.stop);
        this.on('open', this.build, this);
        if (tilelayer.options.openLegendOnLoad) {
            this._map.on('legendcontrolready', this.minimize, this);
        }
    },

    close: function () {
        L.DomUtil.removeClass(this._map._container, this._maximizeClassName);
        L.DomUtil.removeClass(this._map._container, this._minimizeClassName);
        this.fire('close');
    },

    maximize: function () {
        L.DomUtil.addClass(this._map._container, this._maximizeClassName);
        L.DomUtil.addClass(this._map._container, this._minimizeClassName);
        this.fire('open');
    },

    minimize: function () {
        L.DomUtil.removeClass(this._map._container, this._maximizeClassName);
        L.DomUtil.addClass(this._map._container, this._minimizeClassName);
        this.fire('open');
    },

    build: function () {
        if (this._content_container) { return; }
        this._content_container = L.DomUtil.create('div', 'tilelegend-content', this._container);
        var headerElt = L.DomUtil.create('div', 'tilelegend-header', this._content_container),
            title = L.DomUtil.create('h1', '', headerElt);
        title.innerHTML = this._data.title;
        if (this._data.description) {
            var descr = L.DomUtil.create('p', '', headerElt);
            descr.innerHTML = this._data.description;
        }

    },

    _cloneLayer: function (layer) {
        return new L.TileLayer(layer._url, layer.options);
    }

});


L.Control.TileLegend = L.Control.Attribution.extend({

    initialize: function (options) {
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-attribution');

        if (!L.Browser.touch) {
            L.DomEvent.disableClickPropagation(this._container);
            L.DomEvent.on(this._container, 'mousewheel', L.DomEvent.stopPropagation);
            L.DomEvent.on(this._container, 'MozMousePixelScroll', L.DomEvent.stopPropagation);
        } else {
            L.DomEvent.on(this._container, 'click', L.DomEvent.stopPropagation);
        }

        map
            .on('layeradd', this._update, this)
            .on('layerremove', this._update, this);

        this._update();

        return this._container;
    },

    addTo: function (map) {
        L.Control.Attribution.prototype.addTo.call(this, map);
        map.fire('legendcontrolready');
        return this;
    },

    onRemove: function (map) {
        map
            .off('layeradd', this._update, this)
            .off('layerremove', this._update, this);

    },

    setPrefix: function (prefix) {
        this.options.prefix = prefix;
        this._update();
        return this;
    },

    _update: function () {
        if (!this._map) { return; }

        var attribs = [],
            layers = this._map._layers;
        if (this.options.prefix) {
            var prefix = L.DomUtil.create('span', 'tilelegend-prefix', this._container);
            prefix.innerHTML = this.options.prefix + ' — ';
        }

        for (var i in layers) {
            this._addLayerAttribution(layers[i]);
        }
    },

    _addLayerAttribution: function (layer) {
        var container = L.DomUtil.create('span', 'tilelegend-attribution', this._container);
        if (layer.getAttribution()) {
            container.innerHTML = layer.getAttribution();
        }
        if (layer.options.legend) {
            var legend = new L.TileLegend(this._map, layer, this._container);
        }
    }

});