<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单信息</el-breadcrumb-item>
            <el-breadcrumb-item>全部信息</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区 -->
        <el-card>
            
        </el-card>
    </div>

</template>

<script>

export default {
    data() {
        return {
           

        }
    },
    created() {
        this.showAll();
    },
    methods:
    {
        showAll() {
            this.$axios.post('TrainInfoController/showAllTrainInfo')
                .then((response) => {
                    this.trainInfo = response.data
                    console.log(this.trainInfo);

                }).catch((err) => {
                    console.error(error);
                });
        }
    }
}

</script>

<style lang="less" scoped>
.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 20px;
}

.el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

.el-table {
    font-size: 18px;
    padding-top: 40px;
    // margin-left: 210px

}
</style>


