---
title: Egret：反向遮罩
date: 2020-07-17
tags: [Egret]
categories: Egret
comments: true
---

### 原理
1. 先绘制需要高亮的区域
2. 绘制遮罩
3. 设置高亮区域的blendMode为擦除，此属性确定如何将一个源（新的）图像绘制到目标（已有）的图像上
4. 将遮罩及高亮区域都加入到同一个显示对象中，这样就会在遮罩中擦除出高亮的区域
5. 将显示对象绘制成纹理，再将纹理作为图片加入到显示列表


```
const container = new egret.DisplayObjectContainer();

// 遮罩
const mask = new egret.Shape();
mask.graphics.beginFill(0x000000, 0.5);
mask.graphics.drawRect(0, 0, width, height);
mask.graphics.endFill();

const displayArea = new egret.Shape();
displayArea.graphics.beginFill(0x00ff00);
displayArea.graphics.drawRoundRect(0, 0, width, height, 24, 24)

container.addChild(mask);
container.addChild(displayArea);

displayArea.blendMode = egret.BlendMode.ERASE;
const renderTexture: egret.RenderTexture = new egret.RenderTexture();
renderTexture.drawToTexture(container);

this.bitmap = new egret.Bitmap(renderTexture);
this.mainStage.addChild(this.bitmap);
        
this.bitmap.touchEnabled = true;  //遮罩允许点击
this.bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
         console.log('点击遮罩后回调')
		}, this);
//镂空区域不响应点击，这样可以穿透点击到下面的背景
this.bitmap.pixelHitTest = true;  
```
