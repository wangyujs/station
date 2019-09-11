// 模态层
var hxsd_tools={};
hxsd_tools.modal=function(){
	var oModal=$("<div>");
	oModal.css({
		width:"100%",
		height:"100%",
		background:"#999",
		opacity:0.3,
		position:"fixed",
		"z-index":1
	});
	$("body").append(oModal);
	return function(){
		oModal.remove();
	}
};
//调用  用 $.modal();


//居中JQ
hxsd_tools.showCenter=function(obj){
	function center(){
		var l=($(window).width()-obj.outerWidth())/2;
		var t=($(window).height()-obj.outerHeight())/2;
		obj.css({
			"left":l,
			"top":t
		});
	}
	center();
	$(window).resize(function(){
		center()
	})
}
//调用  用 $.showCenter();

//模态层和居中BOX一起实现
hxsd_tools.alertBox=function(txt){
			var alertBox=$('<div class="alertBox"><h4 class="title">警告</h4><a class="closeBtn" href="javascript:;">×</a><div class="popCont"><p>'+txt+'</p></div><div class="btnBar"><button type="button" class="okBtn">确定</button></div></div>')
			alertBox.appendTo($("body"));
			$.showCenter(alertBox)
			var oModal=$.modal();
			$(".alertBox .closeBtn,.alertBox .okBtn").click(function(){
				alertBox.remove();
				oModal();
			})
		}
//调用  用 $.alertBox();


//div屏幕内移动
hxsd_tools.drag=function(obj,title){	
			title= title||obj;  //如果没传title,就title=obj,传了title,就是title触发
			title.mousedown(function(ev){
				ev.preventDefault();
				var disX=ev.pageX-obj.position().left;
				var disY=ev.pageY-obj.position().top;
				$(document).mousemove(function(ev){
					var l=ev.pageX-disX;
					var t=ev.pageY-disY;
					if(l<0){l=0};
					if(t<0){t=0};
					if(l>$(window).width()-obj.outerWidth())
						l=$(window).width()-obj.outerWidth();
					if(t>$(window).height()-obj.outerHeight())
						t=$(window).height()-obj.outerHeight();
					obj.css({
						"left":l,
						"top":t
					});
				});
				$(document).mouseup(function(){
					$(document).off("mousemove")
				});
			});
		}
//调用  用 $.drag();

// 提示选择是或者否
hxsd_tools.confrimBox=function(txt,fn){  //txt提示语句,fn是指点击确定以后要做的事
	var confrimBox=$('<div class="alertBox confrimBox"><h4 class="title">请确认</h4><a class="closeBtn" href="javascript:;">×</a><div class="popCont"><p>'+txt+'</p></div><div class="btnBar"><button type="button" class="okBtn">确定</button><button type="button" class="cancelBtn">取消</button></div></div>')
			$("body").append(confrimBox);
			$.showCenter(confrimBox);
			var oM=$.modal()   //执行
			$(".okBtn, .closeBtn, .cancelBtn").click(function(){
				confrimBox.remove()
				oM()
			});
			$(".okBtn").click(function(){
				fn&&fn();
			})
}
//调用  用 $.confrimBox();

$.extend(hxsd_tools);




//-------------------------------------------------------------
$.fn.extend({
	shake:function(set,fn){
		var def={ //默认值对象
			mode:"left",
			num:10
		}
		var opt=$.extend(def,set);
		return this.each(function(){
			var _this=$(this)
			clearInterval(_this.timer);
			//var maxleft=maxleft||20
			var arr=[];
			for(var i=opt.num;i>1;i-=1){
			 	arr.push(-i);
			 	arr.push(i);
			};
			arr.push(0);
			var n=0;
			var objT=opt.mode=="top" ? _this.position().top:_this.position().left;
			_this.timer= setInterval(function(){
				_this.css(opt.mode,objT+arr[n])
				n++
				if(n==arr.length){
					clearInterval(_this.timer)
					fn&&fn()
					n=0;
				}
			 	
		 	},30)
		})
  	},
  
  	showCenter:function(){
  		return this.each(function(){
  			var _this=$(this)
			function center(){
				var l=($(window).width()-_this.outerWidth())/2;
				var t=($(window).height()-_this.outerHeight())/2;
				_this.css({
					"left":l,
					"top":t
				});
			};
			center();
			$(window).resize(function(){
				center()
			})
  		})
	},
	
	drag:function(set){	
		 var def={ //默认值对象
			title:"",
		};
		var opt=$.extend(def,set);
		return this.each(function(){
			var _this=$(this)
			title= opt.title||_this;  //如果没传title,就title=obj,传了title,就是title触发
			title.mousedown(function(ev){
				if (opt.title) {
					opt.title.css("cursor","move")
				}
				ev.preventDefault();
				var disX=ev.pageX-_this.position().left;
				var disY=ev.pageY-_this.position().top;
				$(document).mousemove(function(ev){
					var l=ev.pageX-disX;
					var t=ev.pageY-disY;
					if(l<0){l=0};
					if(t<0){t=0};
					if(l>$(window).width()-_this.outerWidth())
						l=$(window).width()-_this.outerWidth();
					if(t>$(window).height()-_this.outerHeight())
						t=$(window).height()-_this.outerHeight();
					_this.css({
						"left":l,
						"top":t
					});
				});
				$(document).mouseup(function(){
					$(document).off("mousemove")
				});
			});
		})
	},
	
})

