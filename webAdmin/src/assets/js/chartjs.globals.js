/**
 * Chart.js global configurations
 *
 * This file includes all global configuration for Charts.js library
 * TODO: Create a directive and include this file and any possible extension to be used.
 *       This file uses plain hardcoded values for the values (specially the colors) it'd be great to get those values from the styles.service
 *       So far this file is imported in ChartModule.ts
 **/

Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;

// Default
Chart.defaults.global['defaultColor'] = '#869ab8';
Chart.defaults.global.defaultFontColor = '#869ab8';
Chart.defaults.global.defaultFontSize = 13;

// Layout
Chart.defaults.global.layout.padding = 0;

// Legend
Chart.defaults.global.legend.display = false;
Chart.defaults.global.legend.position = 'bottom';
Chart.defaults.global.legend.labels.usePointStyle = true;
Chart.defaults.global.legend.labels.padding = 16;

// Point
Chart.defaults.global.elements.point.radius = 0;
Chart.defaults.global.elements.point.hoverRadius = 5;
Chart.defaults.global.elements.point.backgroundColor = '#cd92ff';

// Line
Chart.defaults.global.elements.line.tension = 0.4;
Chart.defaults.global.elements.line.borderWidth = 3;
Chart.defaults.global.elements.line.borderColor = '#5533ff';
Chart.defaults.global.elements.line.backgroundColor = 'transparent';
Chart.defaults.global.elements.line.borderCapStyle = 'rounded';

// Rectangle
Chart.defaults.global.elements.rectangle.backgroundColor = '#f4b4ff';

// Arc
Chart.defaults.global.elements.arc.backgroundColor = '#f4b4ff';
Chart.defaults.global.elements.arc.borderColor = '#ffffff';
Chart.defaults.global.elements.arc.borderWidth = 4;
Chart.defaults.global.elements.arc['hoverBorderColor'] = '#ffffff';

// Tooltips
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.tooltips.mode = 'index';
Chart.defaults.global.tooltips.intersect = false;
Chart.defaults.global.tooltips.custom = function(model) {
  var tooltip = document.getElementById('chart-tooltip');

  if (!tooltip) {
    tooltip = document.createElement('div');

    tooltip.setAttribute('id', 'chart-tooltip');
    tooltip.setAttribute('role', 'tooltip');
    tooltip.classList.add('chart-tooltip');
    tooltip.classList.add('popover');
    tooltip.classList.add('bs-popover-top');

    document.body.appendChild(tooltip);
  }

  if (model.opacity === 0) {
    tooltip.style.visibility = 'hidden';
    return;
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  if (model.body) {
    var titleLines = model.title || [];
    var bodyLines = model.body.map(getBody);
    var html = '';
    var lines = '';

    html += '<div class="arrow"></div>';

    titleLines.forEach(function(title) {
      html += '<h3 class="popover-header text-center">' + title + '</h3>';
    });

    bodyLines.forEach(function(body, i) {
      var colors = model.labelColors[i];
      var styles = 'background-color: ' + colors.backgroundColor;
      var indicator =
        '<span class="popover-body-indicator" style="' + styles + '"></span>';
      var align =
        bodyLines.length > 1
          ? 'justify-content-left'
          : 'justify-content-between';

      lines +=
        '<li class="list-group-item d-flex align-items-center ' +
        align +
        '">' +
        indicator +
        body +
        '</li>';
    });

    // Popover body
    html +=
      '<div class="popover-body"><ul class="list-group list-group-flush">' +
      lines +
      '</ul></div>';

    tooltip.innerHTML = html;
  }

  var canvas = this._chart.canvas;
  var canvasRect = canvas.getBoundingClientRect();

  var canvasWidth = canvas.offsetWidth;
  var canvasHeight = canvas.offsetHeight;

  var scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  var scrollLeft =
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    0;

  var canvasTop = canvasRect.top + scrollTop;
  var canvasLeft = canvasRect.left + scrollLeft;

  var tooltipWidth = tooltip.offsetWidth;
  var tooltipHeight = tooltip.offsetHeight;

  var top = canvasTop + model.caretY - tooltipHeight - 16;
  var left = canvasLeft + model.caretX - tooltipWidth / 2;

  tooltip.style.top = top + 'px';
  tooltip.style.left = left + 'px';
  tooltip.style.visibility = 'visible';
};

Chart.defaults.global.tooltips.callbacks.label = function(item, data) {
  var label = data.datasets[item.datasetIndex].label || '';
  var yLabel = item.yLabel;
  var content = '';

  if (data.datasets.length > 1) {
    content += '<span class="popover-body-label mr-auto">' + label + '</span>';
  }

  content += '<span class="popover-body-value">' + yLabel + '</span>';

  return content;
};

// Doughnut
Chart.defaults.doughnut.cutoutPercentage = 83;
Chart.defaults.doughnut.tooltips.callbacks.title = function(item, data) {
  var title = data.labels[item[0].index];
  return title;
};

Chart.defaults.doughnut.tooltips.callbacks.label = function(item, data) {
  var value = data.datasets[0].data[item.index];
  var content = '';

  content += '<span class="popover-body-value">' + value + '</span>';
  return content;
};

Chart.defaults.doughnut.legendCallback = function(chart) {
  var data = chart.data;
  var content = '';

  data.labels.forEach(function(label, index) {
    var bgColor = data.datasets[0].backgroundColor[index];

    content += '<span class="chart-legend-item">';
    content +=
      '<i class="chart-legend-indicator" style="background-color: ' +
      bgColor +
      '"></i>';
    content += label;
    content += '</span>';
  });

  return content;
};

// yAxes
Chart.scaleService.updateScaleDefaults('linear', {
  gridLines: {
    borderDash: [2],
    borderDashOffset: [2],
    color: '#d9e2ef',
    drawBorder: false,
    drawTicks: false,
    zeroLineColor: '#d9e2ef',
    zeroLineBorderDash: [2],
    zeroLineBorderDashOffset: [2]
  },
  ticks: {
    beginAtZero: true,
    padding: 10,
    callback: function(value) {
      if (!(value % 10)) {
        return value;
      }
    }
  }
});

// xAxes
Chart.scaleService.updateScaleDefaults('category', {
  gridLines: {
    drawBorder: false,
    drawOnChartArea: false,
    drawTicks: false
  },
  ticks: {
    padding: 20
  },
  maxBarThickness: 10
});
