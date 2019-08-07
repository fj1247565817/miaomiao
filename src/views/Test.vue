<template>
	<div class="test">
		<div class="box">
			<Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd" ref="list">
				<div class="item" ref="test">	
					<ul >
						<li class="pullDown">{{ pullDownMsg }}</li>
						<li v-for="(item,index) in 15" :key="index">
							<h2 style="height:30px;background:#ccc;">{{index}}</h2>
							<p v-for="(v,index) in 30" :key="index">{{v}}</p>
						</li>
					</ul>
				</div>
			</Scroller>
		</div>
		<div class="index">
		    <ul>
		        <li v-for="(item,index) in 15" :key="index" @touchstart="handleToIndex(index)">{{index}}</li>
		    </ul>
		</div>
	</div>
</template>

<script>
export default {
    name : 'Test',
    data(){
        return {
			pullDownMsg: ''
        }
    },
    activated(){
		setTimeout(()=>{
			this.isLoading = false;
		},1000)
    },
	methods: {
		handleToScroll(pos){
		    if( pos.y > 30 ){
		        this.pullDownMsg = '正在更新中';
		    }
		},
		// 下拉结束，更新页面数据，将下拉消息清空
		handleToTouchEnd(pos){
		    if( pos.y > 30 ){
				window.location.reload();//重新加载页面
				this.pullDownMsg = '更新成功';
				setTimeout(()=>{
					this.movieList = res.data.data.movieList;
					this.pullDownMsg = '';
				},1000);
		    }
		},
		handleToIndex (index) {
			// console.log(index)
			
			var h2 = this.$refs.test.getElementsByTagName('h2')
			
			// 原生的方法
			// this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
			
			// better-scroll 的方法
			this.$refs.list.toScrollTop(-h2[index].offsetTop);
		}
	}
}
</script>

<style scoped>
.test{
	display: flex;
	height:100%;
	width: 100%;
}
.box{
	height: 617px;
	flex: 1;
}
.item{
	border-bottom: 1px solid #ddd;
}
.index{ 
	width:20px; 
	display: flex; 
	flex-direction:column; 
	justify-content:center; 
	text-align: center;
}
</style>
