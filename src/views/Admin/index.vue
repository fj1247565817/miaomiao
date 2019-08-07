<template>
	<el-container>
	  <el-header>
		  喵喵网管理后台，欢迎您{{$store.state.user.name}}
		  <a href="javascript:;" @touchstart="handleToLogout" @click="handleToLogout">退出</a>
	  </el-header>
	  <el-container>
		<el-aside width="200px">
			
			<el-menu
			  default-active="1"
			  class="el-menu-vertical-demo">
			  <el-menu-item index="1">
				<i class="el-icon-menu"></i>
				<router-link to="/admin/users" tag="span" slot="title">用户管理</router-link>
			  </el-menu-item>
			  <el-menu-item index="2">
				<i class="el-icon-document"></i>
				<router-link to="/admin/movie" tag="span" slot="title">电影管理</router-link>
			  </el-menu-item>
			  <el-menu-item index="3">
				<i class="el-icon-setting"></i>
				<router-link to="/admin/cinema" tag="span" slot="title">影院管理</router-link>
			  </el-menu-item>
			</el-menu>
			
		</el-aside>
		<el-main>
			<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
import axios from 'axios'
export default {
	name: 'admin',
	beforeRouteEnter (to, from, next) {
		axios.get('/api2/admin').then((res) => {
			var status = res.data.status;
			if(status === 0){
				next(vm => {
					next();
				});
			}else{
				next('/mine/login');
			}
		})
	},
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
		}
	}
}
</script>

<style scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
