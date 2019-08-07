<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
	// 组件名
	name: 'Scroller',
	// 父组件自定义的事件
	props:{
		handleToScroll : {
			type: Function,
			default : function(){}
		},
		handleToTouchEnd : {
			type: Function,
			default: function(){}
		}
	},
	mounted () {
		// 定义一个scroll变量，将BScroll对象赋值，ref是为操作dom元素的属性，通过$refs调用wrapper这个div
		var scroll = new BScroll(this.$refs.wrapper,{
			/*
			因为 better-scroll 会阻止原生的 click 事件，我们可以设置 tap 为 true，
			它会在区域被点击的时候派发一个 tap 事件，你可以像监听原生事件那样去监听它
			*/
			tap : true,
			/*
			有时候我们需要知道滚动的位置。
			当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件
			*/
			probeType: 1
		});
		
		this.scroll = scroll;
		// 监听自定义的事件
		scroll.on('scroll',(pos) => {
			this.handleToScroll(pos)
		});
		
		scroll.on('touchEnd', (pos) => {
			this.handleToTouchEnd(pos)
		})
	},
	methods: {
		// 滚动到指定的位置
		toScrollTop(y){
			this.scroll.scrollTo(0,y);
		}
	}
}
</script>

<style scoped>
.wrapper{
	height: 100%;
}
</style>
