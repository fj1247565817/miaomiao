<template>
	<div class="password_body">
		<div class="password_email">
			<p>邮箱：</p><input v-model="email" class="password_text" type="text" /><button @click="handleToVerify">发送验证码</button>
		</div>
		<div>
			<p>新密码：</p><input v-model="password" class="password_text" type="password"/>
		</div>
		<div>
			<p>验证码：</p><input v-model="verify" class="password_text" type="text"/>
		</div>
		<div  class="password_btn">
			<button @click="handleTofindPassword">修改密码</button>
		</div>
		<div class="password_link">
		    <router-link to='/mine/login'>立即登录</router-link>
		    <router-link to='/mine/register'>立即注册</router-link>
		</div>
	</div>
</template>

<script>
import {messageBox} from '@/components/JS';
export default {
	name: 'FindPassword',
	data () {
		return {
			email: '',
			password: '',
			verify: ''
		}
	},
	methods: {
		// 向邮箱发送验证码
		handleToVerify() {
			this.axios.get('/api2/users/verify?email='+this.email).then((res) => {
				var status = res.data.status;
				if(status === 0){
					messageBox({
						title: '验证码',
						content: '验证码已发送',
						ok: '确定'
					});
				}else{
					messageBox({
						title: '验证码',
						content: '验证码已失败',
						ok: '确定'
					});
				}
			})
		},
		// 发送post请求并将相应的参数传送，调用后端findPassword接口，并返回结果
		handleTofindPassword() {
			this.axios.post('/api2/users/findPassword',{
				email: this.email,
				password: this.password,
				verify: this.verify
			}).then((res) => {
				var status = res.data.status;
				var This = this;
				if(status === 0){
					messageBox({
						title: '修改密码',
						content: '修改密码成功',
						ok: '确定',
						// 回调函数成功后返回登录界面
						handleOk() {
							This.$router.push('/mine/login')
						}
					});
				}else{
					messageBox({
						title: '修改密码',
						content: res.data.msg + '请重新修改',
						ok: '确定'
					});
				}
			})
		}
	}
}
</script>

<style scoped="">
#content .password_body {width: 100%;}
.password_body .password_email{position: relative;}
.password_body p{position: relative;left: 5px;}
.password_body .password_email button{position: absolute;right: 10px;top: 10px;height: 40px; border: none;border-bottom: 1px #ccc solid;border-radius: 3px}
.password_body .password_text{width: 100%; height: 40px;border: none;border-bottom: 1px #ccc solid;margin-bottom: 5px;outline: none;padding-left: 8px;}
.password_body .password_btn{height: 50px;margin: 10px;}
.password_body .password_btn button{width: 100%;height: 100%;background: #E54847;border-radius: 3px;border: none;display: block;}
.password_body .password_link{display: flex;justify-content: space-between;}
.password_body .password_link a{text-decoration: none;margin: 0 5px; font-size: 12px;color: #E54847;}
</style>
