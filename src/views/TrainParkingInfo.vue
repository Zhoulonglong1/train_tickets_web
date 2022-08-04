<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>列车信息查询</el-breadcrumb-item>
            <el-breadcrumb-item>列车时刻表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区 -->
        <el-card>

            <el-row :gutter="20" style="margin-top: 10px">
                <el-col :span="12">
                    <el-input placeholder="请输入要查询的列车号" v-model="train.tid">

                    </el-input>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" round @click="showAllById">搜索</el-button>
                </el-col>

                <!-- 火车列表区域 -->
                <el-table :data="trainParkInfo" highlight-current-row style="width: 100% ;margin-top: 40px">
                    <el-table-column type="index" label="站序"  width="180px"></el-table-column>
                    <el-table-column prop="sname1" label="车站名" ></el-table-column>
                    <el-table-column prop="tid" label="车次" ></el-table-column>
                    <el-table-column prop="stime1" label="到站时间" ></el-table-column>
                    <el-table-column prop="sname2" label="下一站" ></el-table-column>
                    <el-table-column prop="stime2" label="本站发车时间" ></el-table-column>
                    
                </el-table>

            </el-row>

        </el-card>
    </div>

</template>

<script>

export default {
    data() {
        return {
            trainParkInfo:[
                {
                    tid:'',
                    sname1:'',
                    stime1:'',
                    sname2:'',
                    stime2:''
                }
            ],
            train:{
                tid:'',
                sname1:'',
                stime1:'',
                sname2:'',
                stime2:''
            }
        }
    },

    created() {
        this.selectAll();
    },
    methods:
    {
        selectAll(){
            this.$axios.post('/TrainParkingStationController/selectAll')
            .then((response) => {
                this.trainParkInfo=response.data;
                console.log(this.trainParkInfo);
                
            }).catch((err) => {
                console.error(error);
            });
        },
        showAllById(){
            this.$axios.post('/TrainParkingStationController/selectAllById',this.train)
            .then((response) => {
                this.trainParkInfo=response.data;
                console.log(this.trainParkInfo);
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
    // margin-left: 200px

}
</style>


