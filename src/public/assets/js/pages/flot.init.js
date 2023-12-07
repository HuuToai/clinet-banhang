!(function (b) {
    'use strict';
    var o = function () {
        (this.$body = b('body')), (this.$realData = []);
    };
    (o.prototype.createPlotGraph = function (o, a, t, r, e, l, i) {
        b.plot(
            b(o),
            [
                { data: a, label: r[0], color: e[0] },
                { data: t, label: r[1], color: e[1] },
            ],
            {
                series: {
                    lines: {
                        show: !0,
                        fill: !0,
                        lineWidth: 2,
                        fillColor: {
                            colors: [
                                { opacity: 0 },
                                { opacity: 0.5 },
                                { opacity: 0.6 },
                            ],
                        },
                    },
                    points: { show: !1 },
                    shadowSize: 0,
                },
                grid: {
                    hoverable: !0,
                    clickable: !0,
                    borderColor: l,
                    tickColor: '#f9f9f9',
                    borderWidth: 1,
                    labelMargin: 10,
                    backgroundColor: i,
                },
                legend: {
                    position: 'ne',
                    margin: [0, -24],
                    noColumns: 0,
                    backgroundColor: 'transparent',
                    labelBoxBorderColor: null,
                    labelFormatter: function (o, a) {
                        return o + '&nbsp;&nbsp;';
                    },
                    width: 30,
                    height: 2,
                },
                yaxis: {
                    axisLabel: 'Daily Visits',
                    tickColor: 'rgba(108, 120, 151, 0.1)',
                    font: { color: '#6d868c' },
                },
                xaxis: {
                    axisLabel: 'Last Days',
                    tickColor: 'rgba(108, 120, 151, 0.1)',
                    font: { color: '#6d868c' },
                },
                tooltip: !0,
                tooltipOpts: {
                    content: '%s: Value of %x is %y',
                    shifts: { x: -60, y: 25 },
                    defaultTheme: !1,
                },
            },
        );
    }),
        (o.prototype.createPlotDotGraph = function (o, a, t, r, e, l, i) {
            b.plot(
                b(o),
                [
                    { data: a, label: r[0], color: e[0] },
                    { data: t, label: r[1], color: e[1] },
                ],
                {
                    series: {
                        lines: {
                            show: !0,
                            fill: !0,
                            lineWidth: 3,
                            fillColor: {
                                colors: [{ opacity: 0 }, { opacity: 0 }],
                            },
                        },
                        points: { show: !0 },
                        shadowSize: 0,
                    },
                    grid: {
                        hoverable: !0,
                        clickable: !0,
                        borderColor: l,
                        tickColor: '#f9f9f9',
                        borderWidth: 1,
                        labelMargin: 10,
                        backgroundColor: i,
                    },
                    legend: {
                        position: 'ne',
                        margin: [0, -24],
                        noColumns: 0,
                        backgroundColor: 'transparent',
                        labelBoxBorderColor: null,
                        labelFormatter: function (o, a) {
                            return o + '&nbsp;&nbsp;';
                        },
                        width: 30,
                        height: 2,
                    },
                    yaxis: {
                        axisLabel: 'Gold Price(USD)',
                        tickColor: 'rgba(108, 120, 151, 0.1)',
                        font: { color: '#6d868c' },
                    },
                    xaxis: {
                        axisLabel: 'Numbers',
                        tickColor: 'rgba(108, 120, 151, 0.1)',
                        font: { color: '#6d868c' },
                    },
                    tooltip: !0,
                    tooltipOpts: {
                        content: '%s: Value of %x is %y',
                        shifts: { x: -60, y: 25 },
                        defaultTheme: !1,
                    },
                },
            );
        }),
        (o.prototype.createPieGraph = function (o, a, t, r) {
            var e = [
                    { label: a[0], data: t[0] },
                    { label: a[1], data: t[1] },
                    { label: a[2], data: t[2] },
                    { label: a[3], data: t[3] },
                ],
                l = {
                    series: { pie: { show: !0 } },
                    legend: { show: !0, backgroundColor: 'transparent' },
                    grid: { hoverable: !0, clickable: !0 },
                    colors: r,
                    tooltip: !0,
                    tooltipOpts: { content: '%s, %p.0%' },
                };
            b.plot(b(o), e, l);
        }),
        (o.prototype.randomData = function () {
            for (
                0 < this.$realData.length &&
                (this.$realData = this.$realData.slice(1));
                this.$realData.length < 300;

            ) {
                var o =
                    (0 < this.$realData.length
                        ? this.$realData[this.$realData.length - 1]
                        : 50) +
                    10 * Math.random() -
                    5;
                o < 0 ? (o = 0) : 100 < o && (o = 100), this.$realData.push(o);
            }
            for (var a = [], t = 0; t < this.$realData.length; ++t)
                a.push([t, this.$realData[t]]);
            return a;
        }),
        (o.prototype.createRealTimeGraph = function (o, a, t) {
            return b.plot(o, [a], {
                colors: t,
                series: {
                    grow: { active: !1 },
                    shadowSize: 0,
                    lines: { show: !0, fill: !1, lineWidth: 2, steps: !1 },
                },
                grid: {
                    show: !0,
                    aboveData: !1,
                    color: '#dcdcdc',
                    labelMargin: 15,
                    axisMargin: 0,
                    borderWidth: 0,
                    borderColor: null,
                    minBorderMargin: 5,
                    clickable: !0,
                    hoverable: !0,
                    autoHighlight: !1,
                    mouseActiveRadius: 20,
                },
                tooltip: !0,
                tooltipOpts: {
                    content: 'Value is : %y.0%',
                    shifts: { x: -30, y: -50 },
                },
                yaxis: {
                    axisLabel: 'Response Time (ms)',
                    min: 0,
                    max: 100,
                    tickColor: 'rgba(108, 120, 151, 0.1)',
                    font: { color: '#6d868c' },
                },
                xaxis: {
                    axisLabel: 'Point Value (1000)',
                    show: !0,
                    tickColor: 'rgba(108, 120, 151, 0.1)',
                    font: { color: '#6d868c' },
                },
            });
        }),
        (o.prototype.createDonutGraph = function (o, a, t, r) {
            var e = [
                    { label: a[0], data: t[0] },
                    { label: a[1], data: t[1] },
                    { label: a[2], data: t[2] },
                    { label: a[3], data: t[3] },
                ],
                l = {
                    series: { pie: { show: !0, innerRadius: 0.7 } },
                    legend: {
                        show: !0,
                        labelFormatter: function (o, a) {
                            return (
                                '<div style="font-size:14px;">&nbsp;' +
                                o +
                                '</div>'
                            );
                        },
                        labelBoxBorderColor: null,
                        margin: 50,
                        width: 20,
                        padding: 1,
                        backgroundColor: 'transparent',
                    },
                    grid: { hoverable: !0, clickable: !0 },
                    colors: r,
                    tooltip: !0,
                    tooltipOpts: { content: '%s, %p.0%' },
                };
            b.plot(b(o), e, l);
        }),
        (o.prototype.createStackBarGraph = function (o, a, t, r) {
            var e = {
                bars: { show: !0, barWidth: 0.2, fill: 1 },
                grid: {
                    show: !0,
                    aboveData: !1,
                    labelMargin: 5,
                    axisMargin: 0,
                    borderWidth: 1,
                    minBorderMargin: 5,
                    clickable: !0,
                    hoverable: !0,
                    autoHighlight: !1,
                    mouseActiveRadius: 20,
                    borderColor: 'rgba(108, 120, 151, 0.1)',
                },
                series: { stack: 0 },
                legend: {
                    position: 'ne',
                    margin: [0, -24],
                    noColumns: 0,
                    labelBoxBorderColor: null,
                    backgroundColor: 'transparent',
                    labelFormatter: function (o, a) {
                        return o + '&nbsp;&nbsp;';
                    },
                    width: 30,
                    height: 2,
                },
                yaxis: a.y,
                xaxis: a.x,
                colors: t,
                tooltip: !0,
                tooltipOpts: {
                    content: '%s : %y.0',
                    shifts: { x: -30, y: -50 },
                },
            };
            b.plot(b(o), r, e);
        }),
        (o.prototype.createLineGraph = function (o, a, t, r) {
            var e = {
                series: { lines: { show: !0 }, points: { show: !0 } },
                legend: {
                    position: 'ne',
                    margin: [0, -24],
                    noColumns: 0,
                    labelBoxBorderColor: null,
                    backgroundColor: 'transparent',
                    labelFormatter: function (o, a) {
                        return o + '&nbsp;&nbsp;';
                    },
                    width: 30,
                    height: 2,
                },
                yaxis: a.y,
                xaxis: a.x,
                colors: t,
                grid: {
                    hoverable: !0,
                    borderColor: 'rgba(108, 120, 151, 0.1)',
                    borderWidth: 1,
                },
                tooltip: !0,
                tooltipOpts: {
                    content: '%s : %y.0',
                    shifts: { x: -30, y: -50 },
                },
            };
            return b.plot(b(o), r, e);
        }),
        (o.prototype.createCombineGraph = function (o, a, t, r) {
            var e = [
                    {
                        label: t[0],
                        data: r[0],
                        lines: { show: !0, fill: !0 },
                        points: { show: !0 },
                    },
                    {
                        label: t[1],
                        data: r[1],
                        lines: { show: !0 },
                        points: { show: !0 },
                    },
                    { label: t[2], data: r[2], bars: { show: !0 } },
                ],
                l = {
                    series: { shadowSize: 0 },
                    grid: {
                        hoverable: !0,
                        clickable: !0,
                        tickColor: '#f9f9f9',
                        borderWidth: 1,
                        borderColor: 'rgba(108, 120, 151, 0.1)',
                    },
                    colors: ['#458bc4', '#e2ab3b', '#3db9dc'],
                    tooltip: !0,
                    tooltipOpts: { defaultTheme: !1 },
                    legend: {
                        position: 'ne',
                        margin: [0, -24],
                        noColumns: 0,
                        backgroundColor: 'transparent',
                        labelBoxBorderColor: null,
                        labelFormatter: function (o, a) {
                            return o + '&nbsp;&nbsp;';
                        },
                        width: 30,
                        height: 2,
                    },
                    yaxis: {
                        axisLabel: 'Point Value (1000)',
                        tickColor: 'rgba(108, 120, 151, 0.1)',
                        font: { color: '#6d868c' },
                    },
                    xaxis: {
                        axisLabel: 'Daily Hours',
                        ticks: a,
                        tickColor: 'rgba(108, 120, 151, 0.1)',
                        font: { color: '#6d868c' },
                    },
                };
            b.plot(b(o), e, l);
        }),
        (o.prototype.init = function () {
            this.createPlotGraph(
                '#website-stats',
                [
                    [0, 5],
                    [1, 8],
                    [2, 10],
                    [3, 12],
                    [4, 9],
                    [5, 5],
                    [6, 7],
                    [7, 9],
                    [8, 8],
                    [9, 16],
                    [10, 14],
                    [11, 12],
                    [12, 10],
                ],
                [
                    [0, 2],
                    [1, 4],
                    [2, 7],
                    [3, 9],
                    [4, 6],
                    [5, 3],
                    [6, 10],
                    [7, 8],
                    [8, 5],
                    [9, 14],
                    [10, 10],
                    [11, 10],
                    [12, 8],
                ],
                ['Google', 'Yahoo'],
                ['#458bc4', '#3db9dc'],
                'rgba(108, 120, 151, 0.1)',
                'transparent',
            );
            this.createPlotDotGraph(
                '#website-stats1',
                [
                    [0, 2],
                    [1, 4],
                    [2, 7],
                    [3, 9],
                    [4, 6],
                    [5, 3],
                    [6, 10],
                    [7, 8],
                    [8, 5],
                    [9, 14],
                    [10, 10],
                    [11, 10],
                    [12, 8],
                ],
                [
                    [0, 1],
                    [1, 3],
                    [2, 6],
                    [3, 7],
                    [4, 4],
                    [5, 2],
                    [6, 8],
                    [7, 6],
                    [8, 4],
                    [9, 10],
                    [10, 8],
                    [11, 14],
                    [12, 5],
                ],
                ['Visits', 'Page views'],
                ['#3db9dc', '#d57171'],
                'rgba(108, 120, 151, 0.1)',
                'transparent',
            );
            this.createPieGraph(
                '#pie-chart #pie-chart-container',
                ['Series 1', 'Series 2', 'Series 3', 'Series 4'],
                [20, 30, 15, 32],
                ['#458bc4', '#4fc55b', '#3db9dc', '#ebeff2'],
            );
            var a = this.createRealTimeGraph(
                '#flotRealTime',
                this.randomData(),
                ['#23b195'],
            );
            a.draw();
            var t = this;
            !(function o() {
                a.setData([t.randomData()]),
                    a.draw(),
                    setTimeout(o, (b('html').hasClass('mobile-device'), 500));
            })();
            this.createDonutGraph(
                '#donut-chart #donut-chart-container',
                ['Series 1', 'Series 2', 'Series 3', 'Series 4'],
                [35, 20, 10, 20],
                ['#458bc4', '#4fc55b', '#3db9dc', '#ebeff2'],
            );
            var o = [
                [
                    [0, 201],
                    [1, 520],
                    [2, 337],
                    [3, 261],
                    [4, 157],
                    [5, 95],
                    [6, 200],
                    [7, 250],
                    [8, 320],
                    [9, 500],
                    [10, 152],
                    [11, 214],
                    [12, 364],
                    [13, 449],
                    [14, 558],
                    [15, 282],
                    [16, 379],
                    [17, 429],
                    [18, 518],
                    [19, 470],
                    [20, 330],
                    [21, 245],
                    [22, 358],
                    [23, 74],
                ],
                [
                    [0, 311],
                    [1, 630],
                    [2, 447],
                    [3, 371],
                    [4, 267],
                    [5, 205],
                    [6, 310],
                    [7, 360],
                    [8, 430],
                    [9, 610],
                    [10, 262],
                    [11, 324],
                    [12, 474],
                    [13, 559],
                    [14, 668],
                    [15, 392],
                    [16, 489],
                    [17, 539],
                    [18, 628],
                    [19, 580],
                    [20, 440],
                    [21, 355],
                    [22, 468],
                    [23, 184],
                ],
                [
                    [23, 727],
                    [22, 128],
                    [21, 110],
                    [20, 92],
                    [19, 172],
                    [18, 63],
                    [17, 150],
                    [16, 592],
                    [15, 12],
                    [14, 246],
                    [13, 52],
                    [12, 149],
                    [11, 123],
                    [10, 2],
                    [9, 325],
                    [8, 10],
                    [7, 15],
                    [6, 89],
                    [5, 65],
                    [4, 77],
                    [3, 600],
                    [2, 200],
                    [1, 385],
                    [0, 200],
                ],
            ];
            this.createCombineGraph(
                '#combine-chart #combine-chart-container',
                [
                    [0, '22h'],
                    [1, ''],
                    [2, '00h'],
                    [3, ''],
                    [4, '02h'],
                    [5, ''],
                    [6, '04h'],
                    [7, ''],
                    [8, '06h'],
                    [9, ''],
                    [10, '08h'],
                    [11, ''],
                    [12, '10h'],
                    [13, ''],
                    [14, '12h'],
                    [15, ''],
                    [16, '14h'],
                    [17, ''],
                    [18, '16h'],
                    [19, ''],
                    [20, '18h'],
                    [21, ''],
                    [22, '20h'],
                    [23, ''],
                ],
                ['Last 24 Hours', 'Last 48 Hours', 'Difference'],
                o,
            );
            for (var r = [], e = 0; e <= 10; e += 1)
                r.push([e, parseInt(30 * Math.random())]);
            var l = [];
            for (e = 0; e <= 10; e += 1)
                l.push([e, parseInt(30 * Math.random())]);
            var i = [];
            for (e = 0; e <= 10; e += 1)
                i.push([e, parseInt(30 * Math.random())]);
            var s = new Array();
            s.push({ label: 'Series One', data: r, bars: { order: 3 } }),
                s.push({ label: 'Series Two', data: l, bars: { order: 2 } }),
                s.push({ label: 'Series Three', data: i, bars: { order: 1 } }),
                this.createStackBarGraph(
                    '#ordered-bars-chart',
                    {
                        y: {
                            axisLabel: 'Sales Value (USD)',
                            tickColor: 'rgba(108, 120, 151, 0.1)',
                            font: { color: '#6d868c' },
                        },
                        x: {
                            axisLabel: 'Last 10 Days',
                            tickColor: 'rgba(108, 120, 151, 0.1)',
                            font: { color: '#6d868c' },
                        },
                    },
                    ['#458bc4', '#3db9dc', '#ebeff2'],
                    s,
                );
            var n = [],
                c = [];
            for (e = 0; e < 12; e += 0.2)
                n.push([e, Math.sin(e + 0)]), c.push([e, Math.cos(e + 0)]);
            var h = [
                { data: n, label: 'Google' },
                { data: c, label: 'Yahoo' },
            ];
            this.createLineGraph(
                '#line-chart-alt',
                {
                    y: {
                        min: -1.2,
                        max: 1.2,
                        tickColor: 'rgba(108, 120, 151, 0.1)',
                        font: { color: '#6d868c' },
                    },
                    x: {
                        tickColor: 'rgba(108, 120, 151, 0.1)',
                        font: { color: '#6d868c' },
                    },
                },
                ['#3db9dc', '#d57171'],
                h,
            );
        }),
        (b.FlotChart = new o()),
        (b.FlotChart.Constructor = o);
})(window.jQuery),
    (function (o) {
        'use strict';
        window.jQuery.FlotChart.init();
    })();
