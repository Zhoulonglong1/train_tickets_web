<template>
    <div class="register_page ">

        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="manage_tip">
                    <p>注册界面</p>
                </div>

                <el-form :model="registerUser" status-icon :rules="rules" ref="registerForm" style="background-color: #eee">
                    <el-form-item prop="uname">
                        <el-input v-model="registerUser.uname" placeholder="用户名" @blur="checkUserName"></el-input>
                    </el-form-item>
                    <el-form-item prop="upassword">
                        <!-- <el-input type="password" placeholder="密码" v-model="registerUser.u_password"></el-input> -->
                        <el-input type="password" placeholder="密码" v-model="registerUser.upassword" auto-complete="off">
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="upassword2">
                        <!-- <el-input type="password" placeholder="确认密码" v-model="registerUser.u_password2"></el-input> -->
                        <el-input type="password" placeholder="确认密码" v-model="registerUser.upassword2" auto-complete="off">
                        </el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="urealname">
                                <el-input v-model="registerUser.urealname" placeholder="真实姓名"><span>dsfsf</span>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="uemail">
                                <el-input v-model="registerUser.uemail" placeholder="邮箱"><span>dsfsf</span></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="uphone">
                                <el-input v-model="registerUser.uphone" placeholder="手机号"><span>dsfsf</span></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="user_type">
                                <el-input v-model="registerUser.user_type" placeholder="用户类型(成人/学生)"><span>dsfsf</span>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="ugender">
                                <!-- <el-input v-model="registerForm.user_gender" placeholder="性别"><span>dsfsf</span></el-input> -->
                                <el-select v-model="registerUser.ugender" placeholder="性别">
                                    <el-option v-for="item in options" :key="item.ugender" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="uadress">
                                <el-input v-model="registerUser.uadress" placeholder="地址"><span>dsfsf</span></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="register">注册</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.registerUser.upassword2 !== '') {
                    this.$refs.registerUser.validateField('u_password2');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerUser.upassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registerUser: {
                uname: '',
                upassword: '',
                upassword2: '',
                uphone: '',
                urealname: '',
                uemail: '',
                user_type: '',
                ugender: '',
                uadress: ''

            },
            options: [{
                value: '1',
                label: '男'
            }, {
                value: '0',
                label: '女'
            }],


            rules: {
                uname: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                upassword: [
                    { required: true,validator: validatePass, message: '请输入密码', trigger: 'blur' }
                ],
                upassword2: [
                    { required: true,validator: validatePass2, trigger: 'blur' },
                ],
                urealname: [
                    { required: false, message: '请输入真实姓名', trigger: 'blur' }
                ],
                uemail: [
                    { required: false, message: '请输入邮箱', trigger: 'blur' },
                ],
                uphone: [
                    { required: false, message: '请输入手机号', trigger: 'blur' }
                ],
                user_type: [
                    { required: false, message: '请输入用户类型（成人/学生）', trigger: 'blur' },
                ],
                ugender: [
                    { required: false, message: '请输入性别', trigger: 'blur' }
                ],
                uadress: [
                    { required: false, message: '请输入地址', trigger: 'blur' }
                ],
            },

        }
    },
    methods: {
        checkUserName() {
            this.$axios.post('UserInfoController/getUserByName', this.registerUser)
            .then((response) => {
                if(response.data != 0){
                    this.$message.error("此用户名已经存在,请重新输入！")
                    this.registerUser.uname = '';
                }
            }).catch((err) => {
                console.error(error);
            });
        },

        register() {
            console.log(this.registerUser);
           if(this.registerUser.uname == ''){
             this.$message.error("用户名不能为空！")
             return;
           }

           if(this.registerUser.upassword == ''){
            this.$message.error("用户密码不能为空！")
             return;
           }
           if(this.registerUser.upassword != this.registerUser.upassword2){
            this.$message.error("两次输入的密码不一致！无法注册")
             return;
           }

                 this.$axios.post('UserInfoController/saveUserInfo',this.registerUser)
                    .then((response) => {
                        if (response.data ==1) {
                                // alert('注册成功！');
                                this.$message.success("注册成功！");
                                this.$router.push('/login')
                            } else {
                                // alert('注册失败！');
                                this.$message.error("注册失败！");
                            }
                        
                    }).catch((err) => {
                        console.error(error);
                    });

        }
    }
}


</script>

<style lang="less" scoped>
@import '../style/mixin.less';

.register_page {
    background-color: #243654;
    height: 100%;
}

.manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;

    p {
        font-size: 34px;
        color: #fff;
    }
}

.form_contianer {
    .wh(400px, auto);
    .ctp(400px, 324px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #eee;

    .submit_btn {
        width: 100%;
        font-size: 16px;
    }
}

.tip {
    font-size: 12px;
    color: red;
}

.form-fade-enter-active,
.form-fade-leave-active {
    transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}

.el-row {
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}
</style>
