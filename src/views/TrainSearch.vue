<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>列车信息查询</el-breadcrumb-item>
            <el-breadcrumb-item>列车查询</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区 -->
        <el-card>

            <el-row :gutter="40">

                <div style="margin-left: 300px;margin-top: 10px">
                    <el-col :span="6">
                        <el-input placeholder="请输入始发站名称" width="100px" v-model="train_start_station">
                        </el-input>
                    </el-col>

                    <el-col :span="6">
                        <el-input placeholder="请输入终点站名称" width="100px" v-model="train_end_station">
                        </el-input>
                    </el-col>

                    <el-col :span="6">
                        <el-button type="primary" round @click="showByStartEnd">搜索</el-button>
                    </el-col>
                </div>



                <!-- <el-switch style="margin-top: 30px;margin-left: 20px" inactive-text="按开车时间排序" active-text="按运行时间排序">
                </el-switch> -->

                <!-- 火车列表区域 -->
                <el-table :data="trainInfo" highlight-current-row>
                    <el-table-column prop="train_number" label="车次" width="300px"></el-table-column>
                    <el-table-column prop="start_station" label="途经始发站" width="300px"></el-table-column>
                    <el-table-column prop="end_station" label="途经终点站" width="300px"></el-table-column>
                    <el-table-column prop="start_time" label="开车时间" width="300px"></el-table-column>
                    <el-table-column prop="arrive_time" label="到达时间" width="300px"></el-table-column>
                    
                </el-table>

            </el-row>

            <el-row style="margin-top: 30px;margin-left: 800px">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="toTrainTransfer">接续换乘</el-button>
                    </div>
                </el-col>
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
                    train_number: '',
                    start_station: '',
                    end_station: '',
                    start_no: '',
                    end_no: '',
                    start_time: '',
                    arrive_time: '',
                    start_running_time: '',
                    end_running_time: ''
                }
            ],

            train_start_station: "",
            train_end_station: "",


        }
    },
    methods:
    {
        showByStartEnd() {
            console.log(this.train_start_station)
            console.log(this.train_end_station)
            this.$axios({
                method: 'post',
                url: 'TrainParkingController/SearchTrainSchedule',
                params: { train_start_station: this.train_start_station, train_end_station: this.train_end_station }
            }).then(response => {
                console.log(response.data);
                this.trainInfo=response.data
            })
        },
        toTrainTransfer(){
            this.$router.push('/trainTransfer')
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
    padding-left: 40px;

}
</style>


