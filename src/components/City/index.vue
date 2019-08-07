<template>
    <div class="city_body">
        <div class="city_list">
			<Loading v-if="isLoading"></Loading>
            <Scroller v-else ref="city_list">
				<div>
					<div class="city_now">
						<h2>当前城市</h2>
						<ul class="clearfix">
							<li>{{$store.state.city.nm}}</li>
						</ul>
					</div>
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm , item.id)">{{item.nm}}</li>
						</ul>
					</div>
					<!-- 城市列表 -->
					<div class="city_sort" ref="city_sort">
						<div v-for="item in cityList" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="v in item.list" :key="v.id" @tap="handleToCity(v.nm , v.id)">{{v.nm}}</li>
							</ul>
						</div>
					</div>
				</div>
			</Scroller>
        </div>
		<!-- 城市索引 -->
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="index" @touchstart="handleToIndex(index)">{{item.index}}</li>
            </ul>
        </div>
		
    </div>
</template>

<script>
export default {
    name: "City",
	data () {
		return {
			cityList: [],
			hotList: [],
			isLoading: true
		}
	},
	mounted () {
		const cityList = window.localStorage.getItem('cityList');
		const hotList = window.localStorage.getItem('hotList');
		// 判断本地数据库是否有值
		if(cityList && hotList){
			// 将本地数据库的字符串通过JSON.parse还原成数组并赋值给data定义的数组
			this.cityList = JSON.parse(cityList);
			this.hotList = JSON.parse(hotList);
			this.isLoading = false;
		}else{
			// 发送axios请求对结果进行处理
			this.axios.get('/api/cityList').then((res)=>{
				const msg = res.data.msg;
				if(msg === 'ok'){
					this.isLoading = false;
					const data = res.data.data.cities;
					const {cityList,hotList} = this.formatCityList(data);
					this.cityList = cityList;
					this.hotList = hotList;
					// 将接口整理的数组存到本地数据库，用JSON.stringify将数组转成字符串
					window.localStorage.setItem('cityList' , JSON.stringify(cityList));
					window.localStorage.setItem('hotList' , JSON.stringify(hotList));
				}
			});
		}
		
	},
	methods: {
		// 数据整理
		formatCityList(cities){
			const cityList = []
			const hotList = []
			// 热门城市列表
			for(var i=0;i<cities.length;i++){
				if(cities[i].isHot === 1){
					hotList.push(cities[i])
				}
			}
			/* 
			按字母顺序存储城市列表
			将cities数组每一项的拼音取首字母转成大写如果首字母不存在，
			则将首字母存到citiList数组的index再将城市名及id存到index下的list数组
			如果首字母存在则进行else
			再遍历citiList的index等于当前的首字母，将该项存到对应的index的list数组
			*/
			for(var i=0;i<cities.length;i++){
				var firstLetter = cities[i].py.substring(0,1).toUpperCase()
				if(toCom(firstLetter)){
					cityList.push({index:firstLetter,list:[{nm:cities[i].nm, id:cities[i].id}]})
				}else{
					for(var j=0;j<cityList.length;j++){
						if(cityList[j].index === firstLetter){
							cityList[j].list.push({nm:cities[i].nm, id:cities[i].id})
						}
					}
				}
			}
			// 排序
			cityList.sort((n1,n2)=>{
				if(n1.index > n2.index){
					return 1
				}else if(n1.index < n2.index){
					return -1
				}else{
					return 0
				}
			})
			// 判断城市拼音首字母是否在cityList数组的index项
			function toCom(firstLetter){
				for(var i=0;i<cityList.length;i++){
					if(cityList[i].index === firstLetter){
						return false
					}
				}
				return true
			}
			console.log(cityList)
			return{
				cityList,
				hotList
			}
		},
		//索引点击的方法
		handleToIndex (index) {
			// console.log(index)
			var h2 = this.$refs.city_sort.getElementsByTagName('h2')
			// 原生的方法
			// this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
			// better-scroll 的方法
			this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
		},
		// 跳转到点击的城市
		handleToCity (nm , id){
			this.$store.commit('city/CITY_INFO',{ nm , id });
			window.localStorage.setItem('nowNm',nm);
			window.localStorage.setItem('nowId',id);
			this.$router.push('/movie/nowPlaying');
		}
	}
}
</script>

<style scoped>
    #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
    .city_body .city_list{ flex:1; overflow: auto; background: #fff;}
    .city_body .city_list::-webkit-scrollbar{
        background-color:transparent;
        width:0;
    }
	.city_body .city_now h2{padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_now ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
	.city_body .city_hot{ margin-top: 20px;}
    .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
    .city_body .city_sort div{ margin-top: 20px;}
    .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
    .city_body .city_sort ul li{ line-height: 30px;border-bottom: 1px solid #e6e6e6;}
    .city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center;}
</style>