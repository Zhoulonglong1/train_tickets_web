<template>
    <el-container class="home_container">
        <!-- 头部区 -->
        <el-header>
            <span>火车售票系统</span>
            <el-button type='info' @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px':'200px'" >
                <el-menu text-color="#fff" background-color="#333744" active-text-color="#409EFF" unique-opened
                    :collapse="isCollapse" :collapse-transition="false" >
                    
                    <el-menu-item index="1" @click="toggleCollapse">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <!-- 一级菜单 -->
                    <el-submenu index="2">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>列车信息查询</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="2-1" @click="toTrainInfoList">列车信息</el-menu-item>
                        <el-menu-item index="2-2" @click="toTrainParkingInfo">列车时刻表</el-menu-item>
                        <el-menu-item index="2-3" @click="toTrainSearch">列车查询</el-menu-item>
                        <el-menu-item index="2-4" @click="toTrainTransfer">接续换乘</el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-plus"></i>
                            <span>车票查询及购买</span>
                        </template>
                        <el-menu-item index="3-1">余票查询</el-menu-item>
                        <el-menu-item index="3-2" @click="toBuyTicket">车票购买</el-menu-item>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>
                            <span>订单信息</span>
                        </template>
                        <el-menu-item index="4-1" @click="toAllOrder">全部订单</el-menu-item>
                        <el-menu-item index="4-2">未支付订单</el-menu-item>
                    </el-submenu>


                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">个人信息</span>
                        </template>
                        <el-menu-item index="5-1" @click="toUserInfo">查看个人信息</el-menu-item>
                        <el-menu-item index="5-2">修改密码</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主体区 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {

            isCollapse: false
        }

    },
    methods: {
        //点击按钮切换菜单的折叠与展开
        toggleCollapse() {
            this.isCollapse=! this.isCollapse
        },
        //跳转到火车信息查询界面
        toTrainInfoList(){

            this.$router.push('/trainInfoList')
        },
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        toUserInfo(){
            this.$router.push('/userInfo')
        },
        toTrainParkingInfo(){
            this.$router.push('/trainParkingInfo')
        },
        toTrainSearch(){
            this.$router.push('/trainSearch')
        },
        toTrainTransfer(){
             this.$router.push('/trainTransfer')
        },
        toBuyTicket(){
            this.$router.push('/buyTicket')
        },
        toAllOrder(){
            this.$router.push('/allOrder')
        }
    }
}
</script>

<style lang="less" scoped>
.home_container {
    height: 100%;
}

.el-header {
    background-color: #2b4b6b;
    display: flex;
    justify-content: space-between;
    padding-left: 0%;
    align-items: center;
    color: #fff;
    font-size: 30px;
}

.el-aside {
    background-color: #1d67b1;
   

    .el-menu {
        border-right: none;
       
    }
}

.el-main {
    background-color: #eaedf1;
}
</style>