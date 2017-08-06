var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { return window.setTimeout(callback, 1000/60); };

// 缓动算法
var easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

/**
 * 滚动函数
 * @param {HTMLDocument} element - 需要滚动的元素
 * @param {Number} to - 目标位置
 * @param {Number} duration - 动画持续时间
 * @param {Function} callback - 回调函数
 */
var animatedScrollTo = function (element, to, duration, callback) {
  var beginPos = element.scrollTop,
      change = to - beginPos,
      startTime = +new Date(), // 滚动开始时间
      runTime = null; // 每次执行滚动动画的初始时间
  
  var animate = function () {
    runTime = +new Date();
    if((runTime - startTime) <= duration) {
      element.scrollTop = Math.floor(easeInOutQuad((runTime - startTime), beginPos, change, duration));
      requestAnimationFrame(animate);
    } else {
      element.scrollTop = to;
      if (callback) return callback();
    }
  };
  requestAnimationFrame(animate);
};
