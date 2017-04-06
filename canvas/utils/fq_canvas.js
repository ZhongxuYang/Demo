/**
 * canvas 工具函数
 * vasion 1.0.1
 * data 2017-02-09
 */

const fq = {};

/**
 * 用来判断是否为pc端
 * @return {Boolean} 如果是返回true
 */
fq.isPc = function (){
  let ret = true;
  let agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  let userInfo = window.navigator.userAgent;
  agents.forEach((item, i) => {
    if(userInfo.indexOf(item) !== -1){
      ret = false;
      return;
    }
  });
  return ret;
}

/**
 * 获取鼠标在画布上的坐标
 * @param {object}
 */
fq.mouse = function (ele){
  let mouse = null;
  let rect = ele.getBoundingClientRect();
  if(this.isPc()){
    mouse = {x: 0, y:0};
    ele.addEventListener('mousemove', function (e){
      // e = e || window.event;
      if(typeof e.offsetX !== 'undefined' && typeof e.offsetY !== 'undefined'){
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
      }else{
        mouse.x = e.pageX - rect.left;
        mouse.y = e.pageY - rect.top;
      }
    });
  }else{  // 对移动端的兼容可能会有点问题
    let fn = function (e){
      let touch = e.touches[0];
      mouse.x = touch.pageX - rect.left;
      mouse.y = touch.pageY - rect.top;
    }
    mouse = {x: null, y:null, isTouched: false};
    ele.addEventListener('touchstart', function (e){
      fn(e);
      mouse.isTouched = true;
    });
    ele.addEventListener('touchend', function (e){
      mouse.isTouched = false;
      mouse.x = mouse.y = null;
    });
    ele.addEventListener('touchmove', function (e){
      fn(e);
    });
  }
  return mouse;
};

/**
 * 角度转弧度
 */
fq.toRad = function (angle){
  return angle * Math.PI / 180;
};
/**
 * 弧度转角度
 */
fq.toAngle = function (rad){
  return rad * 180 / Math.PI;
}

/**
 * 拷贝继承
 * @param  {目标参数} target 原目标
 * @param  {数据参数} data   源目标
 * @param  {严格模式} strict 默认false
 * @return {继承源目标的新对象}
 */
fq.extend = function extend(target, data, strict){
  let obj = target || {};
  for(let key in data){
    if(data.hasOwnProperty(key)){
      if(strict && typeof data[key] === 'object'){
        target[key] = Array.isArray(data[key]) ? [] : {};
        this.extend(target[key], data[key], true);
      }else{
        target[key] = data[key];
      }
    }
  }
  return obj;
};


// 两点间距离
fq.distance = function (x1, y1, x2, y2){
  let len = arguments.length;
  let dx = len === 4 ? x2 - x2 : x1;
  let dy = len === 4 ? y2 - y1 : y1;
  return Math.sqrt(dx*dx + dy*dy);
};