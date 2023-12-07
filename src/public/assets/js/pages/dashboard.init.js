!(function (e) {
    'use strict';
    var a = function () {};
    (a.prototype.createLineChart = function (e, a, r, t, i, o, b, n, y) {
        Morris.Line({
            element: e,
            data: a,
            xkey: r,
            ykeys: t,
            labels: i,
            fillOpacity: o,
            pointFillColors: b,
            pointStrokeColors: n,
            behaveLikeLine: !0,
            gridLineColor: 'rgba(108, 120, 151, 0.1)',
            hideHover: 'auto',
            lineWidth: '3px',
            pointSize: 0,
            preUnits: '$',
            resize: !0,
            lineColors: y,
        });
    }),
        (a.prototype.createStackedChart = function (e, a, r, t, i, o) {
            Morris.Bar({
                element: e,
                data: a,
                xkey: r,
                ykeys: t,
                stacked: !0,
                labels: i,
                hideHover: 'auto',
                resize: !0,
                gridLineColor: 'rgba(108, 120, 151, 0.1)',
                barColors: o,
            });
        }),
        (a.prototype.init = function () {
            this.createLineChart(
                'dashboard-line-chart',
                [
                    { y: '2008', a: 50, b: 0 },
                    { y: '2009', a: 75, b: 50 },
                    { y: '2010', a: 30, b: 80 },
                    { y: '2011', a: 50, b: 50 },
                    { y: '2012', a: 75, b: 10 },
                    { y: '2013', a: 50, b: 40 },
                    { y: '2014', a: 75, b: 50 },
                    { y: '2015', a: 100, b: 70 },
                ],
                'y',
                ['a', 'b'],
                ['Mobiles', 'Tablets'],
                ['0.1'],
                ['#ffffff'],
                ['#999999'],
                ['#458bc4', '#23b195'],
            );
            this.createStackedChart(
                'dashboard-bar-stacked',
                [
                    { y: '2005', a: 45, b: 180 },
                    { y: '2006', a: 75, b: 65 },
                    { y: '2007', a: 100, b: 90 },
                    { y: '2008', a: 75, b: 65 },
                    { y: '2009', a: 100, b: 90 },
                    { y: '2010', a: 75, b: 65 },
                    { y: '2011', a: 50, b: 40 },
                    { y: '2012', a: 75, b: 65 },
                    { y: '2013', a: 50, b: 40 },
                    { y: '2014', a: 75, b: 65 },
                    { y: '2015', a: 100, b: 90 },
                ],
                'y',
                ['a', 'b'],
                ['Series A', 'Series B'],
                ['#458bc4', '#ebeff2'],
            );
        }),
        (e.Dashboard = new a()),
        (e.Dashboard.Constructor = a);
})(window.jQuery),
    (function (e) {
        'use strict';
        window.jQuery.Dashboard.init();
    })();
