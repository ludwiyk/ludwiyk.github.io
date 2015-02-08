/**
 * Created with PyCharm.
 * User: jibt
 * Date: 13-11-18
 * Time: 下午8:28
 * To change this template use File | Settings | File Templates.
 */
function drawChart() {
    require(
        [
            'echarts'  ,
            'echarts/chart/bar'  ,
            'echarts/chart/line',
            'echarts/chart/pie',
            'echarts/chart/map'
        ],
        function (ec) {
            var myChart = ec.init(document.getElementById('chartArea'));
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [  '婚庆'  , '美食','汽车','丽人','亲子','休闲娱乐'  , '商业设施','生活设施','运动','酒店'  ]
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: true,
                        dataView: {readOnly: false  },
                        magicType: [  'line'  , 'bar'  ],
                        restore: true,
                        saveAsImage: true
                    }
                },
                calculable: true,
                dataZoom: {
                    show: true,
                    realtime: true,
                    //orient: 'vertical',   // 'horizontal'
                    //x: 0,
                    y: 36,
                    //width: 400,
                    height: 20,
                    backgroundColor: 'rgba(221,160,221,0.5)',
                    dataBackgroundColor: 'rgba(138,43,226,0.5)',
                    fillerColor: 'rgba(38,143,26,0.6)',
                    handleColor: 'rgba(128,43,16,0.8)',
                    //xAxisIndex:[],
                    //yAxisIndex:[],
                    start: 40,
                    end: 60
                },
                xAxis: [
                    {
                        type: 'category',
//                        data: [  '1月'  , '2月'  , '3月'  , '4月'  , '5月'  , '6月'  , '7月'  , '8月'  , '9月'  , '10月'  , '11月'  , '12月'  ]
                        data: years
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitArea: {show: true  }
                    }
                ],
                series: [
                    {
                        name: '婚庆',
                        type: 'bar',
                        smooth: true,
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
//                        data: [  2.0  , 4.9  , 7.0  , 23.2  , 25.6  , 76.7  , 135.6  , 162.2  , 32.6  , 20.0  , 6.4  , 3.3  ]
                        data:score1
                    },
                     {
                        name: '美食',
                        type: 'bar',
                        smooth: true,
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:score2
                    },
                     {
                        name: '汽车',
                        type: 'bar',
                        smooth: true,
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:score3
                    },
                     {
                        name: '丽人',
                        type: 'bar',
                        smooth: true,
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:score4
                    },
                     {
                        name: '亲子',
                        type: 'bar',
                        smooth: true,
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:score5
                    },
                     {
                        name: '休闲娱乐',
                        type: 'bar',
                        smooth: true,
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:score6
                    },
                     {
                        name: '商业设施',
                        type: 'bar',
                        smooth: true,
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:score7
                    },
                     {
                        name: '生活设施',
                        type: 'bar',
                        smooth: true,
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:score8
                    },
                     {
                        name: '运动',
                        type: 'bar',
                        smooth: true,
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:score9
                    },
                     {
                        name: '酒店',
                        type: 'bar',
                        smooth: true,
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:score10
                    }
                ]
            };

            myChart.setOption(option);

            var mymap = ec.init(document.getElementById('chartMap'));
            option2 = {
                title: {
                    text: 'iphone销量',
                    subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['iphone3', 'iphone4', 'iphone5']
                },
                dataRange: {
                    min: 0,
                    max: 2500,
                    text: ['高', '低'],           // 文本，默认为数值文本
                    calculable: true,
                    textStyle: {
                        color: 'orange'
                    }
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    feature: {
                        mark: true,
                        dataView: {readOnly: false},
                        restore: true,
                        saveAsImage: true
                    }
                },
                series: [
                    {
                        name: 'iphone3',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {label: {show: true}, color: '#ffd700'},// for legend
                            emphasis: {label: {show: true}}
                        },
                        data: [
                            {name: '北京', value: Math.round(Math.random() * 1000)},
                            {name: '天津', value: Math.round(Math.random() * 1000)},
                            {name: '上海', value: Math.round(Math.random() * 1000)},
                            {name: '重庆', value: Math.round(Math.random() * 1000)},
                            {name: '河北', value: Math.round(Math.random() * 1000)},
                            {name: '河南', value: Math.round(Math.random() * 1000)},
                            {name: '云南', value: Math.round(Math.random() * 1000)},
                            {name: '辽宁', value: Math.round(Math.random() * 1000)},
                            {name: '黑龙江', value: Math.round(Math.random() * 1000)},
                            {name: '湖南', value: Math.round(Math.random() * 1000)},
                            {name: '安徽', value: Math.round(Math.random() * 1000)},
                            {name: '山东', value: Math.round(Math.random() * 1000)},
                            {name: '新疆', value: Math.round(Math.random() * 1000)},
                            {name: '江苏', value: Math.round(Math.random() * 1000)},
                            {name: '浙江', value: Math.round(Math.random() * 1000)},
                            {name: '江西', value: Math.round(Math.random() * 1000)},
                            {name: '湖北', value: Math.round(Math.random() * 1000)},
                            {name: '广西', value: Math.round(Math.random() * 1000)},
                            {name: '甘肃', value: Math.round(Math.random() * 1000)},
                            {name: '山西', value: Math.round(Math.random() * 1000)},
                            {name: '内蒙古', value: Math.round(Math.random() * 1000)},
                            {name: '陕西', value: Math.round(Math.random() * 1000)},
                            {name: '吉林', value: Math.round(Math.random() * 1000)},
                            {name: '福建', value: Math.round(Math.random() * 1000)},
                            {name: '贵州', value: Math.round(Math.random() * 1000)},
                            {name: '广东', value: Math.round(Math.random() * 1000)},
                            {name: '青海', value: Math.round(Math.random() * 1000)},
                            {name: '西藏', value: Math.round(Math.random() * 1000)},
                            {name: '四川', value: Math.round(Math.random() * 1000)},
                            {name: '宁夏', value: Math.round(Math.random() * 1000)},
                            {name: '海南', value: Math.round(Math.random() * 1000)},
                            {name: '台湾', value: Math.round(Math.random() * 1000)},
                            {name: '香港', value: Math.round(Math.random() * 1000)},
                            {name: '澳门', value: Math.round(Math.random() * 1000)}
                        ]
                    },
                    {
                        name: 'iphone4',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {label: {show: true}, color: '#ff8c00'},// for legend
                            emphasis: {label: {show: true}}
                        },
                        data: [
                            {name: '北京', value: Math.round(Math.random() * 1000)},
                            {name: '天津', value: Math.round(Math.random() * 1000)},
                            {name: '上海', value: Math.round(Math.random() * 1000)},
                            {name: '重庆', value: Math.round(Math.random() * 1000)},
                            {name: '河北', value: Math.round(Math.random() * 1000)},
                            {name: '安徽', value: Math.round(Math.random() * 1000)},
                            {name: '新疆', value: Math.round(Math.random() * 1000)},
                            {name: '浙江', value: Math.round(Math.random() * 1000)},
                            {name: '江西', value: Math.round(Math.random() * 1000)},
                            {name: '山西', value: Math.round(Math.random() * 1000)},
                            {name: '内蒙古', value: Math.round(Math.random() * 1000)},
                            {name: '吉林', value: Math.round(Math.random() * 1000)},
                            {name: '福建', value: Math.round(Math.random() * 1000)},
                            {name: '广东', value: Math.round(Math.random() * 1000)},
                            {name: '西藏', value: Math.round(Math.random() * 1000)},
                            {name: '四川', value: Math.round(Math.random() * 1000)},
                            {name: '宁夏', value: Math.round(Math.random() * 1000)},
                            {name: '香港', value: Math.round(Math.random() * 1000)},
                            {name: '澳门', value: Math.round(Math.random() * 1000)}
                        ]
                    },
                    {
                        name: 'iphone5',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {label: {show: true}, color: '#da70d6'},// for legend
                            emphasis: {label: {show: true}}
                        },
                        data: [
                            {name: '北京', value: Math.round(Math.random() * 1000)},
                            {name: '天津', value: Math.round(Math.random() * 1000)},
                            {name: '上海', value: Math.round(Math.random() * 1000)},
                            {name: '广东', value: Math.round(Math.random() * 1000)},
                            {name: '台湾', value: Math.round(Math.random() * 1000)},
                            {name: '香港', value: Math.round(Math.random() * 1000)},
                            {name: '澳门', value: Math.round(Math.random() * 1000)}
                        ]
                    }
                ]
            };
            mymap.setOption(option2);
        }
    );
}
