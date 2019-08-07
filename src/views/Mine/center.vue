<template>
	<div>
		<div>个人中心</div>
		<!-- 用户名 -->
		<div>
			当前用户：{{$store.state.user.name}}
			<a href="javascript:;" @touchstart="handleToLogout">退出</a>
		</div>
		<!-- 用户身份 -->
		<div v-if="$store.state.user.isAdmin">
			用户身份：管理员<a href="/admin">进入管理页面</a>
		</div>
		<div v-else>用户身份：普通会员</div>
		<!-- 上传头像 -->
		<div>
			<input type="file" name='file' value="上传头像" @change="handleToUpload"/>
			<img class="userHead" :src="$store.state.user.userHead" />
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { messageBox } from '@/components/JS';
export default {
	name: 'Center',
	methods: {
		/* 
		退出方法，请求后台接口
		移除本地数据库存储的用户信息
		发送commit请求给store重新赋值
		页面跳转登录页
		*/
		handleToLogout () {
			this.axios.get('/api2/users/logout').then((res) => {
				var status = res.data.status;
				if(status === 0) {
					localStorage.removeItem('name');
					localStorage.removeItem('isAdmin');
					this.$store.commit('user/USER_NAME',{
							name : '',
							isAdmin: false,
							userHead: ''
						});
					this.$router.push('/mine/login');
				}
			})
		},
		// 上传头像方法
		handleToUpload (ev) {
			var file = ev.target.files[0];//将文件赋值给file
			var param = new FormData();// FormData对象用以将数据编译成键值对		
			param.append('file' , file ,file.name);//调用它的append()方法来添加字段
			var config = {
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			};
			// 发送post请求，将数据和配置信息发送到后段
			this.axios.post('/api2/users/uploadUserHead', param , config)
			.then((res) => {
				var status = res.data.status;
				var This = this;
				if(status === 0){
					messageBox({
						title: '信息',
						content: '上传头像成功',
						ok: '确定',
						//回调函数，更新store，user下的state
						handleOk() {
							This.$store.commit('user/USER_NAME',{
								name : This.$store.state.user.name,
								isAdmin: This.$store.state.user.isAdmin,
								userHead: res.data.data.userHead + '?' +Math.random()
							});
						}
					});
				}else{
					messageBox({
						title: '信息',
						content: '上传头像失败',
						ok: '确定'
					});
				}
			})
		}
	},
	//路由守卫，通过get请求看是否有用户在登录状态，如果存在就将用户的信息存到本地数据库，并发送请求给store赋值
	beforeRouteEnter (to, from, next) {
		axios.get('/api2/users/getUser').then((res) => {
			var status = res.data.status;
			if(status === 0){
				next(vm => {
					localStorage.setItem('name',res.data.data.username)
					localStorage.setItem('isAdmin',res.data.data.isAdmin)
					vm.$store.commit('user/USER_NAME',{
						name : res.data.data.username,
						isAdmin: res.data.data.isAdmin,
						userHead: res.data.data.userHead
					});
				});
			}else{
				next('/mine/login');
			}
		})
	}
}
</script>

<style scoped="">
.userHead{width: 100px;height: 100px;border-radius: 50%;overflow: hidden}
</style>
