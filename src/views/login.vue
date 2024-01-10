<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="button" text @click="TYPE = 'DL'">Log in Page</span>
        <span class="button" text @click="TYPE = 'ZC'">Sign Up Page</span>
      </div>
    </template>
    <div>
        <el-form :model="form" :rules="rules" label-width="120px"
        ref="fromRef"
        >
            <el-form-item label="Account Name" prop="username" clearable >
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model="form.password" type="password"  clearable />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm">
            {{  TYPE == 'DL' ? 'Login':'Sign up' }}
            </el-button>
            <el-button @click="resetForm">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
    <template #footer>
        <span @click="toPath('/forgotPassword')" class="footer">Retrieve Password</span>
    </template>
  </el-card>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
const fromRef = ref<any>(null)

const toPath = (path: string) => {
    console.log('path', path)
    router.push(path)
}

const router = useRouter()
const store = useStore()

const form = reactive({
    username: '',
    password: ''
})

const rules = ref({
    username: [
        { required: true, message: 'Enter your account name', trigger: 'blur' },
     
    ],
    password: [
        { required: true, message: 'Enter your password', trigger: 'blur' },
     
    ]
});

const TYPE = ref<string>('DL')

const userList = ref<any>(localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [])

const submitForm = () => {
    fromRef.value.validate((valid: any) => {
        if (valid) {
            //Get the user list to determine whether the user is registered
            if(TYPE.value == 'ZC'){
                let isRegister = userList.value.some((item:any) => item.username == form.username)
                if(isRegister){
                    ElMessage({
                        message: 'Account Exist',
                        type: 'warning'
                    })
                    return false
                }
                userList.value.push(form)
                localStorage.setItem('userList',JSON.stringify(userList.value))
                ElMessage({
                    message: 'Sign up successfully',
                    type: 'success'
                })
                //Refresh page
                window.location.reload()
                return false
            }
            //Login 
            if(TYPE.value == 'DL'){
                let isRegister = userList.value.some((item:any) => item.username == form.username && item.password == form.password)
                if(!isRegister){
     
                    ElMessage({
                    message: 'User does not exist or password is wrong',
                    type: 'error'
                })
                    return false
                }

                ElMessage({
                    message: 'Login successful',
                    type: 'success'
                })

                store.commit('setUserInfo', form)
                router.push('/')
                return false
            }

        } else {
            console.log('error submit!!');
            return false;
        }
    });
}

const resetForm = () => {
    if(fromRef.value) fromRef.value.resetFields()
};






</script>
<style scoped>
/* Add a background image */
.el-card {
  background-image: url('/background_image.jpg'); 
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center center; 
}

.card-header {
  display: flex;
  justify-content: flex-end; 
  padding: 10px; 
}
.card-header>span {
  margin-left: 30px; /* left some space for each button */
  cursor: pointer;
}
.footer{
    /* float: right;
    margin-right: 10px;
    cursor: pointer; */
    /* Remove the default style of a */
    text-decoration: none;
    color: #000;
    margin-left: 10px;
    cursor: pointer;
}

.footer:hover{
    color: #409EFF;
}
</style>