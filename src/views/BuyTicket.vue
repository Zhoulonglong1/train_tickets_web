<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>车票查询及购买</el-breadcrumb-item>
            <el-breadcrumb-item>车票购买</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区 -->
        <el-card>
            <el-steps :active="active" align-center style="margin-top: 10px" finish-status="success">
                <el-step title="添加乘客"></el-step>
                <el-step title="选择座位"></el-step>
                <el-step title="付款"></el-step>
                <el-step title="订票成功"></el-step>
            </el-steps>

            <el-button type="success" plain @click="addPassenger" v-show="active === 0">添加乘客</el-button>

            <el-table :data="passengerInfo" style="width: 1000px;margin-left: 80px;margin-top: 20px"
                v-show="change && active === 0">

                <el-table-column prop="passengerRealName" label="乘客姓名"></el-table-column>
                <el-table-column prop="passengerPhoneNumber" label="乘客电话号码"></el-table-column>
                <el-table-column prop="passengerIdNumber" label="身份证号"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="props">
                        <el-button size="mini" type="danger" @click="getRow(props.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>


            <el-dialog title="请填写乘客信息" :visible.sync="dialogTableVisible" width="40%" height="70%"
                :before-close="handleClose">
                <el-form :model="passenger" status-icon :rules="rules" ref="passengerForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="真实姓名" prop="passengerRealName">
                        <el-input v-model="passenger.passengerRealName"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="passengerPhoneNumber">
                        <el-input v-model="passenger.passengerPhoneNumber" @blur="checkPassengerPhoneNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="用户类型" prop="passengerType">
                        <el-input v-model="passenger.passengerType"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="passengerIdNumber">
                        <el-input v-model="passenger.passengerIdNumber" @blur="checkPassengerIdNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="passengerAddress">
                        <el-input v-model="passenger.passengerAddress"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer2">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitPassenger">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 买票区 -->
            <el-table :data="passengerInfo" style="width: 1000px;margin-left: 80px;margin-top: 20px"
                v-show="change && active === 1">

                <el-table-column prop="passengerRealName" label="乘客姓名"></el-table-column>
                <el-table-column prop="passengerPhoneNumber" label="乘客电话号码"></el-table-column>
                <el-table-column prop="passengerIdNumber" label="身份证号"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="props2">
                        <el-button size="mini" type="success" @click="getRow2(props2.row)">买票</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <span class="foot" v-show="change">
                <el-button style="margin-top: 12px; " @click="prev">上一步</el-button>
                <el-button style="margin-top: 12px; " @click="next">下一步</el-button>
            </span>

            <!-- 点击购买时的弹框 -->
            <el-dialog title="选座" :visible.sync="buyChange" width="40%" height="40%" :before-close="handleClose">
                <el-form status-icon ref="passengerForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="车次" prop="passengerRealName">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option v-for="item in options1" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="始发站" >
                        <el-input placeholder="请输入始发站名称" v-model="startStationName">
                        </el-input>
                    </el-form-item>

                     <el-form-item label="终点站" >
                        <el-input placeholder="请输入终点站名称" v-model="endStationName">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="车厢号" >
                        <el-cascader :options="options" v-model="selectedOptions" >
                        </el-cascader>
                    </el-form-item>


                </el-form>
                <span slot="footer" class="dialog-footer2">
                    <el-button @click="buyChange = false">取 消</el-button>
                    <el-button type="primary" @click="submitOrder">确 定</el-button>
                </span>
            </el-dialog>

        </el-card>
    </div>


</template>

<script>

export default {
    data() {
        return {
            active: 0,
            change: false,
            buyChange: false,
            dialogTableVisible: false,
            passengerInfo: [{
                passengerPhoneNumber: '',
                uPhone: '',
                passengerRealName: '',
                passengerIdNumber: '',
                passengerType: '',
                passengerAddress: ''
            }],
            passenger: {
                passengerPhoneNumber: '',
                uPhone: '',
                passengerRealName: '',
                passengerIdNumber: '',
                passengerType: '',
                passengerAddress: ''
            },
            rules: {
                passengerPhoneNumber: [
                    { required: true, message: '请输入乘客电话', trigger: 'blur' },
                ],
                passengerRealName: [
                    { required: true, message: '请输入乘客真实姓名', trigger: 'blur' },
                ],
                passengerIdNumber: [
                    { required: true, message: '请输入乘客身份证号', trigger: 'blur' },
                ],
                passengerType: [
                    { required: true, message: '请输入乘客类型', trigger: 'blur' },
                ],
                passengerAddress: [
                    { required: true, message: '请输入乘客地址', trigger: 'blur' },
                ],
            },
            options: [{
                value: '1',
                label: '1号车厢',
                children: [
                    { value: 'A1', label: 'A1' },
                    { value: 'A2', label: 'A2' },
                    { value: 'A3', label: 'A3' },
                    { value: 'A4', label: 'A4' },
                    { value: 'A5', label: 'A5' },
                    { value: 'B1', label: 'B1' },
                    { value: 'B2', label: 'B2' },
                    { value: 'B3', label: 'B3' },
                    { value: 'B4', label: 'B4' },
                    { value: 'B5', label: 'B5' }
                ]
            }, {
                value: '2',
                label: '2号车厢',
                children: [
                   { value: 'A1', label: 'A1' },
                    { value: 'A2', label: 'A2' },
                    { value: 'A3', label: 'A3' },
                    { value: 'A4', label: 'A4' },
                    { value: 'A5', label: 'A5' },
                    { value: 'B1', label: 'B1' },
                    { value: 'B2', label: 'B2' },
                    { value: 'B3', label: 'B3' },
                    { value: 'B4', label: 'B4' },
                    { value: 'B5', label: 'B5' }
                ]
            }, {
                value: '3',
                label: '3号车厢',
                children: [
                    { value: 'A1', label: 'A1' },
                    { value: 'A2', label: 'A2' },
                    { value: 'A3', label: 'A3' },
                    { value: 'A4', label: 'A4' },
                    { value: 'A5', label: 'A5' },
                    { value: 'B1', label: 'B1' },
                    { value: 'B2', label: 'B2' },
                    { value: 'B3', label: 'B3' },
                    { value: 'B4', label: 'B4' },
                    { value: 'B5', label: 'B5' },
                    { value: 'C1', label: 'C1' },
                    { value: 'C2', label: 'C2' },
                    { value: 'C3', label: 'C3' },
                    { value: 'C4', label: 'C4' },
                    { value: 'C5', label: 'C5' },
                    { value: 'D1', label: 'D1' },
                    { value: 'D2', label: 'D2' },
                    { value: 'D3', label: 'D3' },
                    { value: 'D4', label: 'D4' },
                    { value: 'D5', label: 'D5' }
                ]
            },
            {
                value: '4',
                label: '4号车厢',
                children: [
                    { value: 'A1', label: 'A1' },
                    { value: 'A2', label: 'A2' },
                    { value: 'A3', label: 'A3' },
                    { value: 'A4', label: 'A4' },
                    { value: 'A5', label: 'A5' },
                    { value: 'B1', label: 'B1' },
                    { value: 'B2', label: 'B2' },
                    { value: 'B3', label: 'B3' },
                    { value: 'B4', label: 'B4' },
                    { value: 'B5', label: 'B5' },
                    { value: 'C1', label: 'C1' },
                    { value: 'C2', label: 'C2' },
                    { value: 'C3', label: 'C3' },
                    { value: 'C4', label: 'C4' },
                    { value: 'C5', label: 'C5' },
                    { value: 'D1', label: 'D1' },
                    { value: 'D2', label: 'D2' },
                    { value: 'D3', label: 'D3' },
                    { value: 'D4', label: 'D4' },
                    { value: 'D5', label: 'D5' }
                ]
            },
            {
                value: '5',
                label: '5号车厢',
                children: [
                   { value: 'A1', label: 'A1' },
                    { value: 'A2', label: 'A2' },
                    { value: 'A3', label: 'A3' },
                    { value: 'A4', label: 'A4' },
                    { value: 'A5', label: 'A5' },
                    { value: 'B1', label: 'B1' },
                    { value: 'B2', label: 'B2' },
                    { value: 'B3', label: 'B3' },
                    { value: 'B4', label: 'B4' },
                    { value: 'B5', label: 'B5' }
                ]
            }, {
                value1: '6',
                label: '6号车厢',
                children: [
                    { value: 'A1', label: 'A1' },
                    { value: 'A2', label: 'A2' },
                    { value: 'A3', label: 'A3' },
                    { value: 'A4', label: 'A4' },
                    { value: 'A5', label: 'A5' },
                    { value: 'B1', label: 'B1' },
                    { value: 'B2', label: 'B2' },
                    { value: 'B3', label: 'B3' },
                    { value: 'B4', label: 'B4' },
                    { value: 'B5', label: 'B5' }
                ]
            },
            {
                value: '7',
                label: '7号车厢',
                children: [
                     { value: 'A1', label: 'A1' },
                    { value: 'A2', label: 'A2' },
                    { value: 'A3', label: 'A3' },
                    { value: 'A4', label: 'A4' },
                    { value: 'A5', label: 'A5' },
                    { value: 'B1', label: 'B1' },
                    { value: 'B2', label: 'B2' },
                    { value: 'B3', label: 'B3' },
                    { value: 'B4', label: 'B4' },
                    { value: 'B5', label: 'B5' },
                    { value: 'C1', label: 'C1' },
                    { value: 'C2', label: 'C2' },
                    { value: 'C3', label: 'C3' },
                    { value: 'C4', label: 'C4' },
                    { value: 'C5', label: 'C5' },
                    { value: 'D1', label: 'D1' },
                    { value: 'D2', label: 'D2' },
                    { value: 'D3', label: 'D3' },
                    { value: 'D4', label: 'D4' },
                    { value: 'D5', label: 'D5' }
                ]
            },
            {
                value: '8',
                label: '8号车厢',
                children: [
                    { value: 'A1', label: 'A1' },
                    { value: 'A2', label: 'A2' },
                    { value: 'A3', label: 'A3' },
                    { value: 'A4', label: 'A4' },
                    { value: 'A5', label: 'A5' },
                    { value: 'B1', label: 'B1' },
                    { value: 'B2', label: 'B2' },
                    { value: 'B3', label: 'B3' },
                    { value: 'B4', label: 'B4' },
                    { value: 'B5', label: 'B5' },
                    { value: 'C1', label: 'C1' },
                    { value: 'C2', label: 'C2' },
                    { value: 'C3', label: 'C3' },
                    { value: 'C4', label: 'C4' },
                    { value: 'C5', label: 'C5' },
                    { value: 'D1', label: 'D1' },
                    { value: 'D2', label: 'D2' },
                    { value: 'D3', label: 'D3' },
                    { value: 'D4', label: 'D4' },
                    { value: 'D5', label: 'D5' }
                ]
            }],
            selectedOptions: [],
            options1: [{
                value: 'K100',
                label: 'K100'
            }, {
                value: 'K200',
                label: 'K200'
            }, {
                value: 'K300',
                label: 'K300'
            }, {
                value: 'W100',
                label: 'W100'
            }, {
                value: 'Z100',
                label: 'Z100'
            }],
            value: '',
                startStationName:'',
                endStationName:'',
            order:{
                userPhoneNumber:'',
                passengerPhoneNumber:'',
                passengerIdNumber:'',
                tId:'',
                startStationName:'',
                endStationName:'',
                carriageNo:'',
                seatNo:'',
                orderMoney:'',
                orderCreateTime:'',
                orderStatus:''
            }
        }
    },
    methods:
    {
        prev() {
            --this.active;
            if (this.active < 0) this.active = 0;
        },
        next() {
            if (this.active++ > 3) this.active = 0;
        },
        addPassenger() {
            // this.change = true
            this.dialogTableVisible = true
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        submitPassenger() {

            this.user = this.$getSessionStorage('user')
            // console.log(this.user);

            this.passenger.uPhone = this.user.uphone;
            console.log(this.passenger);

            if (this.passenger.passengerRealName == '') {
                this.$message.error("乘客真实姓名不能为空！")
                return;
            }

            if (this.passengerPhoneNumber == '') {
                this.$message.error("乘客电话不能为空！")
                return;
            }
            if (this.passenger.passengerType == '') {
                this.$message.error("乘客类型不能为空！")
                return;
            }
            if (this.passenger.passengerIdNumber == '') {
                this.$message.error("乘客身份证号不能为空！")
                return;
            }
            if (this.passenger.passengerAddress == '') {
                this.$message.error("乘客地址不能为空！")
                return;
            }

            this.$axios.post('PassengerController/InsertPassenger', this.passenger)
                .then((response) => {
                    if (response.data == 1) {
                        this.dialogTableVisible = false;
                        this.change = true
                        this.$message.success("添加乘客成功！");
                        this.selectAllByUphone(this.passenger.uPhone);
                        this.passenger.passengerAddress = ''
                        this.passenger.passengerIdNumber = ''
                        this.passenger.passengerPhoneNumber = ''
                        this.passenger.passengerRealName = ''
                        this.passenger.passengerType = ''

                    } else {

                        this.$message.error("添加乘客失败！");
                    }

                }).catch((err) => {
                    console.error(error);
                });

        },
        selectAllByUphone(a) {
            this.$axios({
                method: 'post',
                url: 'PassengerController/SelectAllByUPhone',
                params: { uPhone: a }
            }).then((response) => {

                this.passengerInfo = response.data
                console.log(this.passengerInfo);



            }).catch((err) => {
                console.error(error);
            });
        },
        deletePassenger(b) {
            this.$axios({
                method: 'post',
                url: 'PassengerController/DeleteByPassengerPhoneNumber',
                params: { passengerPhoneNumber: b }
            }).then((response) => {
                if (response.data == 1) {
                    this.$message.success("删除乘客成功！");
                    this.selectAllByUphone(this.passenger.uPhone);
                } else {
                    this.$message.error("删除乘客失败！");
                }

            }).catch((err) => {
                console.error(error);
            });
        },
        getRow(row) {
            var b = row.passengerPhoneNumber
            this.deletePassenger(b)

        },
        checkPassengerPhoneNumber() {
            this.$axios.post('PassengerController/SelectAllByPassengerPhoneNumber', this.passenger)
                .then((response) => {
                    if (response.data != 0) {
                        this.$message.error("此手机号已经存在,请重新输入！")
                        this.passenger.passengerPhoneNumber = '';
                    }
                }).catch((err) => {
                    console.error(error);
                });
        },
        checkPassengerIdNumber() {
            this.$axios.post('PassengerController/SelectAllByPassengerIdNumber', this.passenger)
                .then((response) => {
                    if (response.data != 0) {
                        this.$message.error("此手机号已经存在,请重新输入！")
                        this.passenger.passengerIdNumber = '';
                    }
                }).catch((err) => {
                    console.error(error);
                });
        },
        getRow2(row) {
            this.buyChange = true
            this.order.passengerPhoneNumber=row.passengerPhoneNumber
            this.order.passengerIdNumber=row.passengerIdNumber
            this.user = this.$getSessionStorage('user')
            this.order.userPhoneNumber = this.user.uphone
            
            console.log(this.startStationName);
            
        },

        buyTicket() {
           
        },
       submitOrder(){
            this.order.tId=this.value
            this.order.startStationName=this.startStationName
            this.order.endStationName=this.endStationName
            this.order.carriageNo=this.selectedOptions[0]
            this.order.seatNo=this.selectedOptions[1]
            this.order.orderStatus=0
            console.log(this.order);
            
             this.$axios.post('OrderListController/AddOrder', this.order)
                .then((response) => {
                    if (response.data == 1) {
                       this.$message.success("生成订单成功！");
                    }
                }).catch((err) => {
                    console.error(error);
                });

            // console.log(this.order);
            
            
            
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
    left: 50%;
    transform: translateX(-50%);

}

.foot {
    padding-left: 50%;
}
</style>


