c3.chart.internal.fn.opacityForCircle = function(d) {
    var opacity = this.config.point_show ? 1 : 0;
    return c3.chart.internal.fn.isValue(d.value) ? (this.isScatterType(d) ? 0.5 : (d.value === 0 ? 0 : opacity)) : 0;
};


c3.chart.internal.axis.fn.constructor.prototype.generateTickValues = function generateTickValues(values, tickCount, forTimeSeries) {
    var tickValues = values,
        targetCount, start, end, count, interval, i, tickValue, $$ = this.owner;
    if (tickCount) {
        targetCount = $$.isFunction(tickCount) ? tickCount() : tickCount;
        // compute ticks according to tickCount
        if (targetCount === 1) {
            tickValues = [values[0]];
        } else if (targetCount === 2) {
            tickValues = [values[0], values[values.length - 1]];
        } else if (targetCount > 2) {
            count = targetCount - 2;
            start = values[0];
            end = values[values.length - 1];

            tickValues = [start];
            if (forTimeSeries) {
                interval = Math.floor(values.length / targetCount);
                var leftTickNum = values.length % targetCount + interval - 1;
                var tickIndex = 0;
                for (i = 0; i < count ; i++) {
                    if(leftTickNum > 0) {
                      tickIndex += interval + 1;
                      leftTickNum--;
                    }else {
                      tickIndex += interval;
                    }
                    console.log('Tick Index' + tickIndex);
                    tickValues.push(values[tickIndex]);
                }
            } else {
                interval = (end - start) / (count + 1);
                // re-construct unique values

                for (i = 0; i < count; i++) {
                    tickValue = +start + interval * (i + 1);
                    tickValues.push($$.isCategorized() ? Math.ceil(tickValue) : tickValue);
                }
            }

            tickValues.push(end);
        }
    }
    if (!forTimeSeries) {
        tickValues = tickValues.sort(function(a, b) {
            return a - b;
        });
    }
    return tickValues;
};
