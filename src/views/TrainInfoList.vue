<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>列车信息查询</el-breadcrumb-item>
            <el-breadcrumb-item>列车信息</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区 -->
        <el-card>


            <!-- <el-row :gutter="450"> -->
             <!-- 搜索与添加区域 -->
                <!-- <el-col :span="15">
                   
                    <el-input placeholder="请输入要查询的列车名称" v-model="train.tid">
                        <el-button slot="append" icon="el-icon-search" @click="showById"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAll">显示全部列车</el-button>
                </el-col> -->
                <el-row :gutter="20" style="margin-top: 10px">
                <el-col :span="12">
                    <el-input placeholder="请输入要查询的列车名称" v-model="train.tid">
                    </el-input>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" round @click="showById">搜索</el-button>
                </el-col>

                <!-- 火车列表区域 -->
                <el-table :data="trainInfo" highlight-current-row style="width: 100% ;margin-top: 40px" >
                    <el-table-column prop="tid" label="车次" width="300px"></el-table-column>
                    <el-table-column prop="ttype" label="列车类型" width="300px"></el-table-column>
                    <el-table-column prop="tstartStation" label="始发站" width="300px"></el-table-column>
                    <el-table-column prop="tendStation" label="终点站" width="300px"></el-table-column>
                    <el-table-column prop="tstarttime" label="开车时间" width="300px"></el-table-column>
                    <el-table-column prop="tendtime" label="到达时间" width="300px"></el-table-column>
                    <el-table-column prop="tarrivalTime" label="到达日期" width="200px"></el-table-column>
                </el-table>

            </el-row>

        </el-card>
    </div>

</template>

<script>

export default {
    data() {
        return {
            trainInfo: [
                {
                    tid: '',
                    tstarttime: '',
                    tendStation: '',
                    tendtime: '',
                    tarrivalTime: '',
                    tstartStation: '',
                    ttype: ''
                }
            ],
            showList:false,
            train:{
                    tid: '',
                    tstarttime: '',
                    tendStation: '',
                    tendtime: '',
                    tarrivalTime: '',
                    tstartStation: '',
                    ttype: ''
            }


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
        },
        showById() {
            this.$axios.post('TrainInfoController/showAllById',this.train)
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


