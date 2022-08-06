<template>
    <div>
        <el-card class="box-card" style="width: 1000px;margin-left: 80px;margin-top: 20px">
            <div slot="header" class="clearfix">
                <span>个人信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toChangeInfo">修改个人信息</el-button>
            </div>

            <div class="text item">
                <span>真实姓名：</span><span>{{ userInfo.uRealname }}</span>
            </div>
            <div class="text item">
                <span>电话号码：</span><span>{{ userInfo.uPhone }}</span>
            </div>
            <div class="text item">
                <span>邮箱：</span><span>{{ userInfo.uEmail }}</span>
            </div>
            <div class="text item">
                <span>用户类型：</span><span>{{ this.type }}</span>
            </div>
            <div class="text item">
                <span>性别：</span><span>{{ uGender }}</span>
            </div>
            <!-- <div  class="text item">
                    <span>身份证号：</span><span>{{}}</span>
                </div> -->
            <div class="text item">
                <span>地址：</span><span>{{ userInfo.uAdress }}</span>
            </div>

            <!-- 点击修改信息时的弹窗 -->
            <el-dialog title="修改信息" :visible.sync="change" width="40%" height="40%" :before-close="handleClose">
                <el-form status-icon ref="passengerForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="真实姓名">
                        <el-input v-model="userInfo.uRealname">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="电话号码">
                        <el-input v-model="userInfo.uPhone">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="邮箱">
                        <el-input v-model="userInfo.uEmail">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="用户类型">
                        <el-input v-model="this.type">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-input v-model="uGender">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="地址">
                        <el-input v-model="userInfo.uAdress">
                        </el-input>
                    </el-form-item>


                </el-form>
                <span slot="footer" class="dialog-footer2">
                    <el-button @click="change = false">取 消</el-button>
                    <el-button type="primary" @click="changeInfo">确 定</el-button>
                </span>
            </el-dialog>

        </el-card>

    </div>

</template>

<script>
export default {
    data() {

        return {
            user: {
            },
            type: "成人",
            uGender:'男',
            change: false,
            userInfo: {
                uName: '',
                uAdress: '',
                uRealname: '',
                uPhone: '',
                uEmail: '',
                uType: '',
                uGender: '',
                uPassword: '',
                userId: '',
            }
        }


    },
    created() {
        this.initData();
    },
    methods:
    {
        initData() {
            this.userInfo.uName = this.$getSessionStorage('user').uName
            this.userInfo.uPassword = this.$getSessionStorage('user').uPassword
            this.$axios.post('UserInfoController/getUserInfoByNameByPass', this.userInfo)
                .then((response) => {
                    this.userInfo = response.data
                    if (this.userInfo.uGender === 1) {
                        this.userInfo.uGender = '男'
                    } else {
                        this.userInfo.uGender = '女'
                    }
                }).catch((err) => {
                    console.error(error);
                });





        },
        toChangeInfo() {
            this.change = true
        },
        changeInfo() {
            console.log(this.userInfo);
            if (this.userInfo.uGender === '男') {
                        this.userInfo.uGender = 1
                    } else {
                        this.userInfo.uGender = 0
                    }

            this.$axios.post('UserInfoController/updateUserInfo', this.userInfo)

                .then((response) => {
                    if (response.data == 1) {
                        this.$message.success("信息更新成功！");
                        this.change = false
                    } else {
                        this.$message.error("信息更新失败！");
                    }
                }).catch((err) => {
                    console.error(error);
                });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },

        // selectAllByName(){
        //     this.$axios.post('UserInfoController/getUserInfoByNameByPass', this.userInfo)
        //         .then((response) => {
        //            this.user=response.data
        //         }).catch((err) => {
        //             console.error(error);
        //         });
        // }

    }
}


</script>

<style lang="less">
@import '../style/mixin';

.explain_text {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #333;
}

.admin_set {
    width: 60%;
    background-color: #F9FAFC;
    min-height: 400px;
    margin: 20px auto 0;
    border-radius: 10px;

    ul>li {
        padding: 20px;

        span {
            color: #666;
        }
    }
}

.admin_title {
    margin-top: 20px;
    .sc(24px, #666);
    text-align: center;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    margin-top: 10px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}

.avatar {
    width: 120px;
    height: 120px;
    display: block;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
}
</style>
