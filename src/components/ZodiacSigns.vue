<script setup>
import {onMounted} from "vue";

const coordinatePoint = {
  Aries: {
    name: "白羊座",
    offsetX: 100,
    offsetY: 0,
    point: [
      {x: 0, y: 220},
      {x: 120, y: 250},
      {x: 170, y: 280},
      {x: 180, y: 300},
    ],
  },
  Taurus: {
    name: "Taurus",
    offsetX: 400,
    offsetY: 0,
    point: [
      {x: 180, y: 300},
      {x: 178, y: 285},
      {x: 120, y: 235},
      {x: 90, y: 205},
      {x: 75, y: 195},
      {x: 60, y: 185},
      {x: -10, y: 115},
      {x: 60, y: 185},
      {x: 75, y: 195},
      {x: 90, y: 205},
      {x: 95, y: 185},
      {x: 85, y: 180},
      {x: 85, y: 165},
      {x: 70, y: 130},
      {x: 30, y: 70},
    ],
  },
  Gemini: {
    name: "Gemini",
    offsetX: 700,
    offsetY: 0,
    point: [
      {x: 160, y: 300},
      {x: 170, y: 270},
      {x: 50, y: 230},
      {x: 0, y: 210},
      {x: -5, y: 185},
      {x: 15, y: 140},
      {x: 30, y: 140},
      {x: 55, y: 145},
      {x: 150, y: 185},
      {x: 190, y: 195},
      {x: 210, y: 190},
      {x: 190, y: 195},
      {x: 170, y: 270},
    ],
  },
  Cancer: {
    name: "Cancer",
    offsetX: 1000,
    offsetY: 0,
    point: [
      {x: 70, y: 270},
      {x: 65, y: 210},
      {x: 150, y: 240},
      {x: 65, y: 210},
      {x: 50, y: 190},
      {x: 15, y: 150},
    ],
  },
  Leo: {
    name: "Leo",
    offsetX: 1300,
    offsetY: 0,
    point: [
      {x: 80, y: 50},
      {x: 60, y: 55},
      {x: 55, y: 100},
      {x: 70, y: 120},
      {x: 100, y: 115},
      {x: 130, y: 135},
      {x: 40, y: 235},
      {x: 10, y: 285},
      {x: 10, y: 200},
      {x: 70, y: 120},
    ],
  },
  virgo: {
    name: "virgo",
    offsetX: 1600,
    offsetY: 0,
    point: [
      {x: 80, y: 50},
      {x: 85, y: 90},
      {x: 75, y: 120},
      {x: 40, y: 130},
      {x: -10, y: 120},
      {x: 40, y: 130},
      {x: 45, y: 190},
      {x: 10, y: 220},
      {x: -20, y: 280},
      {x: 10, y: 220},
      {x: 45, y: 190},
      {x: 100, y: 210},
      {x: 80, y: 260},
      {x: 60, y: 255},
      {x: 45, y: 305},
      {x: 60, y: 255},
      {x: 80, y: 260},
      {x: 100, y: 210},
      {x: 80, y: 175},
      {x: 75, y: 120},
    ],
  },
  Libra: {
    name: "Libra",
    offsetX: 100,
    offsetY: 400,
    point: [
      {x: 30, y: 220},
      {x: 60, y: 210},
      {x: 70, y: 200},
      {x: 90, y: 160},
      {x: 130, y: 200},
      {x: 120, y: 260},
      {x: 80, y: 280},
      {x: 78, y: 300},
      {x: 80, y: 280},
      {x: 120, y: 260},
      {x: 90, y: 160},
    ],
  },
  Scorpio: {
    name: "Scorpio",
    offsetX: 400,
    offsetY: 400,
    point: [
      {x: 30, y: 220},
      {x: 10, y: 240},
      {x: 0, y: 250},
      {x: 20, y: 270},
      {x: 60, y: 275},
      {x: 90, y: 265},
      {x: 100, y: 240},
      {x: 110, y: 210},
      {x: 150, y: 160},
      {x: 160, y: 150},
      {x: 180, y: 140},
      {x: 220, y: 120},
      {x: 210, y: 100},
      {x: 220, y: 120},
      {x: 225, y: 140},
      {x: 225, y: 160},
    ],
  },
  Sagittarius: {
    name: "Sagittarius",
    offsetX: 700,
    offsetY: 400,
    point: [
      {x: 100, y: 250},
      {x: 70, y: 270},
      {x: 105, y: 280},
      {x: 70, y: 270},
      {x: 45, y: 230},
      {x: 20, y: 180},
      {x: 25, y: 165},
      {x: 55, y: 130},
      {x: 105, y: 150},
      {x: 130, y: 140},
      {x: 110, y: 100},
      {x: 95, y: 95},
      {x: 65, y: 75},
      {x: 95, y: 95},
      {x: 110, y: 100},
      {x: 125, y: 85},
      {x: 110, y: 100},
      {x: 130, y: 140},
      {x: 145, y: 140},
      {x: 145, y: 140},
      {x: 180, y: 130},
      {x: 195, y: 80},
      {x: 180, y: 130},
      {x: 190, y: 160},
      {x: 220, y: 170},
      {x: 225, y: 160},
      {x: 265, y: 130},
      {x: 225, y: 160},
      {x: 220, y: 170},
      {x: 190, y: 160},
      {x: 190, y: 190},
      {x: 200, y: 200},
      {x: 190, y: 190},
      {x: 190, y: 160},
      {x: 180, y: 130},
      {x: 145, y: 140},
      {x: 120, y: 170},
      {x: 105, y: 150},
    ],
  },
  Gapricorn: {
    name: "Gapricorn",
    offsetX: 1000,
    offsetY: 400,
    point: [
      {x: 30, y: 290},
      {x: 35, y: 270},
      {x: 50, y: 250},
      {x: 70, y: 220},
      {x: 100, y: 120},
      {x: 150, y: 220},
      {x: 155, y: 240},
      {x: 130, y: 250},
      {x: 90, y: 275},
      {x: 55, y: 280},
      {x: 30, y: 290},
    ],
  },
  Aquarius: {
    name: "Aquarius",
    offsetX: 1300,
    offsetY: 400,
    point: [
      {x: 150, y: 280},
      {x: 110, y: 250},
      {x: 100, y: 240},
      {x: 60, y: 245},
      {x: 55, y: 280},
      {x: 0, y: 200},
      {x: 5, y: 185},
      {x: 20, y: 170},
      {x: 15, y: 140},
      {x: 70, y: 160},
      {x: 120, y: 150},
      {x: 70, y: 160},
      {x: 15, y: 140},
      {x: 80, y: 90},
      {x: 150, y: 30},
    ],
  },
  Pisces: {
    name: "双鱼座",
    offsetX: 1600,
    offsetY: 400,
    point: [
      {x: -40, y: 300},
      {x: -20, y: 320},
      {x: 0, y: 295},
      {x: 60, y: 295},
      {x: 100, y: 295},
      {x: 150, y: 310},
      {x: 110, y: 260},
      {x: 80, y: 230},
      {x: 65, y: 200},
      {x: 40, y: 130},
      {x: 30, y: 100},
      {x: 15, y: 80},
      {x: 20, y: 50},
      {x: 40, y: 35},
      {x: 70, y: 55},
      {x: 75, y: 80},
      {x: 60, y: 105},
      {x: 30, y: 100},
    ],
  },
}

function draw() {
  const constellation = document.getElementById("constellation")
  constellation.width=window.innerWidth
  constellation.height=window.innerHeight
  if (!constellation.getContext("2d")) return;
  var ctx = constellation.getContext("2d");
  // 设置连线颜色，填充颜色
  ctx.font = "40px sans-serif"//文字字体
  ctx.strokeStyle = '#bedff8' //连线颜色
  ctx.fillStyle = '#96d0fc' //坐标点颜色
  ctx.shadowBlur = 10; //设置坐标点阴影的模糊级别
  ctx.shadowColor = "#fff" //设置模糊颜色
  Constellation(ctx, coordinatePoint.Aries) //白羊座
  Constellation(ctx, coordinatePoint.Taurus) //金牛座
  Constellation(ctx, coordinatePoint.Gemini) //双子座
  Constellation(ctx, coordinatePoint.Cancer) //巨蟹座
  Constellation(ctx, coordinatePoint.Leo) //狮子座
  Constellation(ctx, coordinatePoint.virgo) //处女座
  Constellation(ctx, coordinatePoint.Libra) //天秤座
  Constellation(ctx, coordinatePoint.Scorpio) //天蝎座
  Constellation(ctx, coordinatePoint.Sagittarius) //射手座
  Constellation(ctx, coordinatePoint.Gapricorn) //摩羯座
  Constellation(ctx, coordinatePoint.Aquarius) //水瓶座
  Constellation(ctx, coordinatePoint.Pisces) //双鱼座
}

//绘制图形
function Constellation(ctx, coordinate) {
  // 绘制文字
  ctx.fillText(coordinate.name, coordinate.offsetX, coordinate.offsetY + 400);
  // 绘制点
  for (let i of coordinate.point) {
    ctx.beginPath()
    ctx.arc(coordinate.offsetX + i.x, coordinate.offsetY + i.y, 4, 0, Math.PI * 2, true)
    ctx.fill(); //填充
  }

  // 绘制线
  ctx.beginPath()
  // 绘制线必须有起点，这里直接使用的【0】的坐标
  ctx.moveTo(coordinate.offsetX + coordinate.point[0].x, coordinate.offsetY + coordinate.point[0].Y)
  // 在下面的循环中，一样绘制了【0】的坐标，由于坐标重合，页面无变化
  // 在星座图形中，有多个分叉的连线，也是使用的重复坐标
  for (let i of coordinate.point) {
    ctx.lineTo(coordinate.offsetX + i.x, coordinate.offsetY + i.y)
  }
  ctx.stroke(); //连线
}

//------------------------------------------------------------------背景
var canvas = null,
    ctx = null,
    w = null,
    h = null,
    hue = 217,
    stars = [],
    count = 0,
    maxStars = 1400;

var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');

function backInit() {
  canvas = document.getElementById('back');
  ctx = canvas.getContext('2d');
  w = canvas.width=window.innerWidth;
  h = canvas.height=window.innerHeight;

  canvas2.width = 100;
  canvas2.height = 100;
  var half = canvas2.width / 2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
  gradient2.addColorStop(0.025, '#fff');
  gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
  gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
  gradient2.addColorStop(1, 'transparent');

  ctx2.fillStyle = gradient2;
  ctx2.beginPath();
  ctx2.arc(half, half, half, 0, Math.PI * 2);//画一个圆（x,y,半径，起始弧度，结束弧度）
  ctx2.fill();
  var Star = function () {

    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 12;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 50000;
    this.alpha = random(2, 10) / 10;//0.2-1之间的透明度

    count++;
    stars[count] = this;
  }

  Star.prototype.draw = function (i) {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,//sin和cos可能只是想要个-1～1之间的随机数
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,//orbitRadius越大，越靠近边缘，w和h越有可能大，因此大的星星都在四周（也存在小的）
        twinkle = random(10);

    // 增加一些闪烁的效果
    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;//设置图像的透明度
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);//在canvas绘制canvas2（img,x,y,w,h）
    this.timePassed += this.speed;//转起来
  }

  for (var i = 0; i < maxStars; i++) {
    new Star();
  }
  animation()
}


function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }//如果只传了一个min，则max取min，min取0

  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }//min>max，互换

  return Math.floor(Math.random() * (max - min + 1)) + min;//在[min,max]随机取一个整数(包括min,max)
}

function maxOrbit(x, y) {
  var max = Math.max(x, y),
      // diameter = Math.round(Math.sqrt(max * max + max * max));//Math.round取整
      diameter = Math.round(Math.sqrt(x * x + y * y))
  return diameter / 2;//矩形对角线的一半
}


function animation() {
  ctx.globalCompositeOperation = 'source-over';//图像合成，源图形不透明地方显示源图形，其余显示目标图形
  ctx.globalAlpha = 0.8;//图像透明度
  ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
  ctx.fillRect(0, 0, w, h)

  ctx.globalCompositeOperation = 'lighter';//显示源图像+目标图像
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw(i);
  }
  window.requestAnimationFrame(animation);
}

onMounted(() => {
  backInit()
  draw()
})
</script>

<template>
  <div class="zbody sm:w-full xl:w-1/4">
    <canvas id="back" style="width: 100%;height: 100%">
      你的浏览器不支持canvas,请升级你的浏览器
    </canvas>
    <canvas id="constellation" style="width: 100%;height: 100%">
      你的浏览器不支持canvas,请升级你的浏览器
    </canvas>
  </div>
</template>

<style scoped>
.zbody{
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  height: 100vh;
}
.zbody canvas{
  position: absolute;
}
</style>