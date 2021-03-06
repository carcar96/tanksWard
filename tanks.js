
var oBox = document.getElementsByTagName('div')[0];
var oUl = document.getElementsByTagName('ul')[0];
var oTarget = document.getElementsByClassName('enemy')[0];

var speed = 2;
var key=1;
var timer=null;
var idx=0;
var t_width = window.innerWidth || document.documentElement.clientWidth;
var t_height = window.innerHeight || document.documentElement.clientHeight;

var w = oTarget.clientWidth;
var h = oTarget.clientHeight;

window.onkeydown = function(ev){
	var oEv = ev || event;
	var keyCode = oEv.keyCode;

	//左37 右39 上38 下40 确认 13
	switch(keyCode){
		case 13://确认
			bullet();
			break;
		case 37://左37
			key=0;	
			oBox.style.left = oBox.offsetLeft - speed + 'px';
			borderEnd();			
			break;
		case 39://右39
			key=1;
			oBox.style.left = oBox.offsetLeft + speed + 'px';
			borderEnd();
			break;
		case 38://上38
			key=2;
			oBox.style.top = oBox.offsetTop - speed + 'px';
			borderEnd();
			break;
		case 40://下40
			key=3;
			oBox.style.top = oBox.offsetTop + speed + 'px';
			borderEnd();
			break;
	}
}

function borderEnd(){
	changeBox();
	//到左边边界
	if(oBox.offsetLeft <= 0){
		oBox.style.left = "0px";
	}
	//到右边边界
	else if(oBox.offsetLeft >= t_width - oBox.clientWidth){
		oBox.style.left = t_width - oBox.clientWidth + "px";
	}

	//到上边界
	if(oBox.offsetTop <= 0){
		oBox.style.top = "0px";
	}
	//到下边界
	else if(oBox.offsetTop >= t_height - oBox.clientHeight){
		oBox.style.top = t_height - oBox.clientHeight + "px";
	}
}

function changeBox(){
	for(var i=0;i<oBox.children.length;i++){
		oBox.children[i].style.display = 'none';
	}
	oBox.children[key].style.display = 'block';
}
//生成子弹
function bullet(){

	//获取每个方向上的span标签的位置
	var oSpan = oBox.children[key].getElementsByTagName('span')[0];
	var oP = oBox.children[key].getElementsByTagName('p')[0];
	var oLi = document.createElement('li');
	var x=0,y=0;
	switch(key){
		case 0:
			x = oBox.offsetLeft;
			y = oBox.offsetTop + 30;
			break;
		case 1:
			x = oBox.offsetLeft + oP.clientWidth;
			y = oBox.offsetTop + 30;
			break;				
		case 2:
			x = oBox.offsetLeft + 30;
			y = oBox.offsetTop;
			break;
		case 3:
			x = oBox.offsetLeft + 30;
			y = oBox.offsetTop + oP.clientHeight;
			break;
	}
	oLi.style.left = x + 'px';
	oLi.style.top = y + 'px';
	oLi.index = idx;
	idx++;
	oUl.append(oLi)
	launch(oLi);
}

//发射子弹
function launch(obj){
	switch(key){
		case 0:
			bulletMove(obj,'left',-obj.clientWidth);
			break;
		case 1:
			bulletMove(obj,'left',t_width);
			break;				
		case 2:
			bulletMove(obj,'top',-obj.clientHeight);
			break;
		case 3:
			bulletMove(obj,'top',t_height);
			break;
	}
}

function bulletMove(obj,attr,iTarget){

	if(key == 0){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			over(obj);
			obj.style[attr] = obj.offsetLeft -speed + 'px';
			if(obj.offsetLeft <= iTarget){
				clearInterval(obj.timer)
				oUl.removeChild(obj)
			}			
		},30)

	}else if(key == 1){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			over(obj)
			obj.style[attr] = obj.offsetLeft +speed + 'px';
			if(obj.offsetLeft >= iTarget){
				clearInterval(obj.timer)
				oUl.removeChild(obj)
			}
		},30)
	}else if(key == 2){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			over(obj)
			obj.style[attr] = obj.offsetTop -speed + 'px';
			if(obj.offsetTop <= iTarget){
				clearInterval(obj.timer)
				oUl.removeChild(obj)
			}
		},30)
	}else if(key == 3){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			over(obj);
			obj.style[attr] = obj.offsetTop +speed + 'px';
			if(obj.offsetTop >= iTarget){
				clearInterval(obj.timer)
				oUl.removeChild(obj)
			}
		},30)	
	}
}

function over(o){	

	if(document.body.children.length<4){
		return;
	}else{
		var oLeft = o.offsetLeft;
		var oTop = o.offsetTop;
		var tLeft = oTarget.offsetLeft;
		var tTop = oTarget.offsetTop;
		switch(key){
			case 0://左
				if(oLeft>tLeft && (oLeft-tLeft)<oTarget.clientWidth){
					if(((oTop-tTop)<0 &&(tTop-oTop)<o.clientHeight )|| ((oTop-tTop)>0 && (oTop-tTop)<oTarget.clientHeight)){
						clearInterval(o.timer)
						oTarget.style.display = 'none';
						oUl.removeChild(o)
					}
				}
				break;
			case 1://右
				if(tTop>oTop && (tTop-oTop)<o.clientHeight || oTop>tTop && (oTop-tTop)<oTarget.clientHeight){
					if(oLeft<tLeft && (tLeft-oLeft)<o.clientWidth){
						clearInterval(o.timer)
						oTarget.style.display = 'none';
						oUl.removeChild(o)
					}
				}
				break;				
			case 2://上
				if(tLeft>oLeft && (tLeft-oLeft)< o.clientWidth || oLeft>tLeft && (oLeft-tLeft)<oTarget.clientWidth){
					if(oTop>tTop && (oTop-tTop)<oTarget.clientHeight){
						clearInterval(o.timer)
						oTarget.style.display = 'none';
						oUl.removeChild(o)
					}
				}
				break;
			case 3://下
				if(tLeft>oLeft && (tLeft-oLeft)< o.clientWidth || oLeft>tLeft && (oLeft-tLeft)<oTarget.clientWidth){
					if(tTop>oTop && (tTop-oTop)<o.clientHeight){
						clearInterval(o.timer)
						oTarget.style.display = 'none';
						oUl.removeChild(o)
					}
				}
				break;
		}
	}
}

setInterval(function(){
	var timer2=null;
	if(oTarget.style.display == 'none'){
		clearInterval(timer2);
		timer2 = setInterval(function(){
			var x = Math.ceil(Math.random()*(t_width-w));
			var y = Math.ceil(Math.random()*(t_height-h));

			if(Math.abs(x-oBox.offsetLeft)> oBox.clientWidth || Math.abs(x-oBox.offsetLTop)> oBox.clientHeight){
				clearInterval(timer2);
				oTarget.style.left = x +'px';
				oTarget.style.top = y +'px';
				oTarget.style.display = 'block';
			}
		},10)			
	}
},5000)