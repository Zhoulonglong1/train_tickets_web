<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>列车信息查询</el-breadcrumb-item>
            <el-breadcrumb-item>接续换乘</el-breadcrumb-item>
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
                        <el-button type="primary" round @click="huanCheng()">搜索</el-button>
                    </el-col>
                </div>




                <!-- 火车列表区域 -->
                <el-table :data="trainTransferInfo" highlight-current-row v-show="this.change">
                    <!-- 展开列 -->
                    <!-- <el-table-column  type="expand" >
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                            <el-row>
                                <el-col :span="12"><div class="grid-content bg-purple">
                                     <el-form-item label="车次">
                                        <span>{{ props.row.train_number_1 }}</span>
                                    </el-form-item>
                                    <el-form-item label="特等座/软卧">
                                        <span>{{ props.row.high_seat_price_1 }}</span>
                                    </el-form-item>
                                    <el-form-item label="一等座/硬卧">
                                        <span>{{ props.row.medium_seat_price_1 }}</span>
                                    </el-form-item>
                                    <el-form-item label="二等座/硬座">
                                        <span>{{ props.row.low_seat_price_1 }}</span>
                                    </el-form-item>
                                </div></el-col>

                                <el-col :span="12"><div class="grid-content bg-purple-light">
                                         <el-form-item label="车次">
                                        <span>{{ props.row.train_number_1 }}</span>
                                    </el-form-item>
                                    <el-form-item label="特等座/软卧">
                                        <span>{{ props.row.high_seat_price_1 }}</span>
                                    </el-form-item>
                                    <el-form-item label="一等座/硬卧">
                                        <span>{{ props.row.medium_seat_price_1 }}</span>
                                    </el-form-item>
                                    <el-form-item label="二等座/硬座">
                                        <span>{{ props.row.low_seat_price_1 }}</span>
                                    </el-form-item>
                                    
                                </div></el-col>
                            </el-row>
                        </el-form>
                        </template>
                    </el-table-column> -->


                    <el-table-column prop="start_station_name" label="出发站" width="135px"></el-table-column>
                    <el-table-column prop="train_number_1" label="车次" width="135px"></el-table-column>
                    <el-table-column prop="start_time_1" label="出发时间" width="135px"></el-table-column>
                    <el-table-column prop="arrive_time_1" label="到达时间" width="135px"></el-table-column>
                    <el-table-column prop="transfer_station_name" label="换乘车站" width="135px"></el-table-column>
                    <el-table-column prop="parkingTime" label="换乘时间" width="135px"></el-table-column>
                    <el-table-column prop="train_number_2" label="车次" width="135px"></el-table-column>
                    <el-table-column prop="start_time_2" label="出发时间" width="135px"></el-table-column>
                    <el-table-column prop="arrive_time_2" label="到达时间" width="135px"></el-table-column>
                    <el-table-column prop="end_station_name" label="到达站" width="135px"></el-table-column>
                    <el-table-column prop="allParkingTime" label="总用时" width="135px"></el-table-column>
                    <el-table-column prop="" label="操作" width="300px">
                        <template slot-scope="props">
                            <el-button type="primary" icon="el-icon-search" @click="getRow2(props.row)">查余票</el-button>
                            <el-button type="warning" @click="getRow(props.row)"><i
                                    class="el-icon-upload el-icon--right">查票价</i></el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <!-- 查询当前车次的票价信息 -->
                <el-dialog title="票价信息" :visible.sync="dialogVisible" width="60%" height="70%"
                    :before-close="handleClose">

                    <el-table :data="trainMoney" highlight-current-row style="width: 100%">
                        <el-table-column prop="tid" label="车次" width="180">
                        </el-table-column>
                        <el-table-column prop="softBed" label="软卧" width="180">
                        </el-table-column>
                        <el-table-column prop="hardBed" label="硬卧">
                        </el-table-column>
                        <el-table-column prop="firstClassSeat" label="一等座">
                        </el-table-column>
                        <el-table-column prop="secondClassSeat" label="二等座">
                        </el-table-column>
                    </el-table>
                    <el-table :data="trainMoney2" highlight-current-row style="width: 100%">
                        <el-table-column prop="tid" label="车次" width="180">
                        </el-table-column>
                        <el-table-column prop="softBed" label="软卧" width="180">
                        </el-table-column>
                        <el-table-column prop="hardBed" label="硬卧">
                        </el-table-column>
                        <el-table-column prop="firstClassSeat" label="一等座">
                        </el-table-column>
                        <el-table-column prop="secondClassSeat" label="二等座">
                        </el-table-column>
                    </el-table>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- 查询当前车次的余票信息 -->
                <el-dialog title="余座数" :visible.sync="dialogTableVisible" width="40%" height="70%" :before-close="handleClose">
                    <el-table :data="trainTicket">
                        <el-table-column property="tid" label="车次" width="200"></el-table-column>
                        <el-table-column property="carriageNo" label="车厢号" width="200"></el-table-column>
                        <el-table-column property="seatType" label="类型" width="200"></el-table-column>
                        <el-table-column property="seatCount" label="数量" width="200"></el-table-column>
                    </el-table>

                    <el-table :data="trainTicket2">
                        <el-table-column property="tid" label="车次" width="200"></el-table-column>
                        <el-table-column property="carriageNo" label="车厢号" width="200"></el-table-column>
                        <el-table-column property="seatType" label="类型" width="200"></el-table-column>
                        <el-table-column property="seatCount" label="数量" width="200"></el-table-column>
                    </el-table>
                    <span slot="footer" class="dialog-footer2">
                        <el-button @click="dialogTableVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
                    </span>
                </el-dialog>

            </el-row>

        </el-card>
    </div>

</template>

<script>

export default {
    data() {
        return {
            dialogVisible: false,
            dialogTableVisible: false,
            train_start_station: "",
            train_end_station: "",
            trainTransferInfo: [
                {
                    arrive_time_1: '',
                    arrive_time_2: '',
                    end_running_time_1: '',
                    end_running_time_2: '',
                    end_station_name: '',
                    end_station_no: '',
                    start_running_time_1: '',
                    start_running_time_2: '',
                    start_station_name: '',
                    start_station_no: '',
                    start_time_1: '',
                    start_time_2: '',
                    train_number_1: '',
                    train_number_2: '',
                    transfer_station_name: '',
                    transfer_station_no_1: '',
                    transfer_station_no_2: '',
                    parkingTime:'',
                    allParkingTime:''
                }
            ],

            trainTicket: [{

                carriageNo: '',
                seatType: '',
                seatCount: '',
                tid: '',

            }],

            trainTicket2: [{

                carriageNo: '',
                seatType: '',
                seatCount: '',
                tid: '',

            }],

            trainMoney: [{
                id: '',
                departureStation: '',
                endStation: '',
                fromStation: '',
                toStation: '',
                departureTime: '',
                arrivalTime: '',
                useTime: '',
                softBed: '',
                hardBed: '',
                firstClassSeat: '',
                secondClassSeat: '',
                tid: ''
            }],
            trainMoney2: [{
                id: '',
                departureStation: '',
                endStation: '',
                fromStation: '',
                toStation: '',
                departureTime: '',
                arrivalTime: '',
                useTime: '',
                softBed: '',
                hardBed: '',
                firstClassSeat: '',
                secondClassSeat: '',
                tid: ''
            }],
            change: false

        }
    },
    methods:
    {
        getRow(row) {
            var a = row.train_number_1
            var b = row.train_number_2
            this.dialogVisible = true
            this.searchMoney(a)
            this.searchMoney2(b)
        },
        getRow2(row) {
            var a = row.train_number_1
            var b = row.train_number_2
            this.dialogTableVisible = true
            this.searchTicket(a)
            this.searchTicket2(b)
        },
        huanCheng() {
            this.$axios({
                method: 'post',
                url: 'TrainParkingController/GetTrainScheduleInfoList',
                params: { train_start_station: this.train_start_station, train_end_station: this.train_end_station }
            }).then(response => {
                console.log(response.data);
                this.trainTransferInfo = response.data
                this.change = true;
            })
        },

        searchMoney(a) {
            console.log(a)
            // console.log(this.trainTransferInfo[0]);
            this.$axios({
                method: 'post',
                url: 'ScheduleOfTrainController/SearchMoney',
                params: { trainNumber: a }
            }).then((response) => {

                this.trainMoney = response.data
                // console.log(this.trainMoney[0].tid);


            }).catch((err) => {
                console.error(error);
            });



        },

        searchMoney2(a) {
            console.log(a)
            // console.log(this.trainTransferInfo[0]);
            this.$axios({
                method: 'post',
                url: 'ScheduleOfTrainController/SearchMoney',
                params: { trainNumber: a }
            }).then((response) => {

                this.trainMoney2 = response.data

            }).catch((err) => {
                console.error(error);
            });

        },

        searchTicket(a) {
            this.$axios({
                method: 'post',
                url: 'SeatController/SearchSeat',
                params: { trainNumber: a }
            }).then((response) => {

                this.trainTicket = response.data

            }).catch((err) => {
                console.error(error);
            });
        },

        searchTicket2(a) {
            this.$axios({
                method: 'post',
                url: 'SeatController/SearchSeat',
                params: { trainNumber: a }
            }).then((response) => {

                this.trainTicket2 = response.data

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
        }




    }
}

</script>

<style lang="less" scoped>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

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
    // padding-left: 40px;

}

/deep/ .el-dialog {
    height: 56vh;
    overflow: auto;
}

.dialog-footer {
    position: absolute;
    left: 50%;
    // padding-top: 300px;
    transform: translateX(-50%);
}

.dialog-footer2{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding-bottom: 20px;
}
</style>


