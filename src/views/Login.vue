<template>
	<div class="login_page">
		<div class="login_box">
			<div class="manage_tip">
				<p>登陆界面</p>
			</div>

			<div class="avatar_box">
				<img src="../assets/logo.png" alt="" srcset="">
			</div>

			<!-- 表单区域 -->
			<el-form label-width="0px" class="login_form" :model="user" :rules="rules" ref="loginFormRef">
				<el-form-item prop="uname">
					<el-input prefix-icon="el-icon-user-solid" placeholder="用户名" v-model="user.uname"></el-input>
				</el-form-item>

				<el-form-item prop="upassword">
					<el-input prefix-icon="el-icon-lock" type="password" placeholder="密码" v-model="user.upassword">
					</el-input>
				</el-form-item>

				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="toRegister">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: {
				uname: '',
				upassword: ''
			},

			// 校验规则
			rules: {
				uname: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				upassword: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			},

		}
	},
	methods: {
		login() {
			//先获取到表单的引用对象，然后拿着这个对象调用validate函数,valid是一个布尔值，判断是否通过
			this.$refs.loginFormRef.validate((valid) => {
				// console.log(valid);  
				if (!valid) {
					return;
				} else {
					
					this.$axios.post('UserInfoController/getUserInfoByNameByPass', this.user)
						.then((response) => {
							let u = response.data;
							console.log(this.user);
							if (u == null || u == '') {
								// alert('用户名或密码不正确');
								this.$message.error("用户名或密码错误！");
								this.user.uname = '',
								this.user.upassword = ''
							} else {
								this.$setSessionStorage('user', u);
								this.$router.push('/home')
							}


						}).catch((err) => {

						});
				}
			})

		},
		toRegister() {
			this.$router.push('/register')
		}
	}



}
</script>

<style lang="less" scoped>
// @import '../style/mixin.less';

.login_page {
	background-color: #2b4b6b;
	height: 100%;
}

.login_box {
	width: 450px;
	height: 300px;
	background-color: #fff;
	//圆角
	border-radius: 3px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	.avatar_box {
		height: 130px;
		width: 130px;
		border: 1px solid #eee;
		border-radius: 50%;
		padding: 10px;
		box-shadow: 0 0 10px #ddd;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;

		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background-color: aquamarine;
			
		}
	}
}

.manage_tip {
	position: absolute;
	width: 100%;
	top: -160cpx;
	left: 0;
	text-align: center;

	p {
		font-size: 34px;
		color: #fff;
	}

}

.login_form {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0 20px;
	box-sizing: border-box;
}

.btns {
	display: flex;
	justify-content: center;
}
</style>