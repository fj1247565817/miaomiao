<template>
    <div id="main">
        <Header title="喵喵电影"/>
        <div id="content">
			<!-- 菜单栏 -->
            <div class="movie_menu">
                <router-link tag="div" to="/movie/city" class="city_name">
                    <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
                </router-link>
                <div class="hot_swtich">
                    <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
                    <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
                </div>
                <router-link tag="div" to="/movie/search" class="search_entry">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
            </div>
            <!-- 子路由视图 -->
			<keep-alive>
                <router-view/>
            </keep-alive>
        </div>
		<!-- 导航栏 -->
        <TabBar/>
		<!-- 详情页视图 -->
		<router-view name="detail" />
    </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { messageBox } from '@/components/JS';

export default {
    name : 'Movie',
    components : {
        Header,
        TabBar
    },
    mounted(){
		// 设置一个3秒的定时器
        setTimeout(()=>{
			// 发送位置请求
            this.axios.get('/api/getLocation').then((res)=>{
                var msg = res.data.msg;
                if(msg === 'ok'){
                    var nm = res.data.data.nm;
                    var id = res.data.data.id;
                    if( this.$store.state.city.id == id ){return;}
					// 调用消息盒子
                    messageBox({
                        title : '定位',
                        content : nm,
                        cancel : '取消',
                        ok : '切换定位',
						// 回调函数，将新的城市及id存到本地数据库，刷新页面函数location.reload()
                        handleOk(){
                            window.localStorage.setItem('nowNm',nm);
                            window.localStorage.setItem('nowId',id);
                            window.location.reload();
                        }
                    });
                }
            });
        },3000);
       
    }
}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 2.8125rem; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 1.25rem; height:100%; line-height: 2.8125rem;font-weight:500;color:#666;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 2.8125rem;}
.movie_menu .hot_item{ font-size: 0.9375rem; color:#666; width:5rem; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:1.25rem; height:100%; line-height: 2.8125rem;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:1.25rem;}

.slide-enter-active{ animation : 13s detailMove;}
@keyframes detailMove{
	0%{
		transform : translateX(100%);
	}
	100%{
		transform : translateX(0);
	}
}
</style>