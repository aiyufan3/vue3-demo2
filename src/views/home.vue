<template>
    <div>
        This is home pages , Welcome!
        
        {{ userInfo.username  }} Login
        <br />
        <span @click="handleClick" style="margin-top: 30px;display: block; cursor: pointer;">Sign Out</span>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const userInfo = ref<string>(JSON.parse(localStorage.getItem('userInfo')) || '')

const handleClick = () => {
    store.commit('clearUserInfo',)
    router.push('/login')
}




</script>