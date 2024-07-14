<script setup>
import { ref } from 'vue';
import { AuthService } from "../../../service/AuthService";
import router from "../../../router/index.js"

const username = ref('');
const submitted = ref(false);
const email = ref('');
const password = ref('');
const checked = ref(false);
const authService = new AuthService;
const error = ref('');
const isError = ref(false);
const register = async () => {
    submitted.value = true;
    if(username.value && email.value && password.value) {
        const res = await authService.registerUser(username.value, email.value, password.value)
        if(res.response) {
            if(res.response.data.error.email) {
                error.value = res.response.data.error.email
                isError.value = true
            }
            else if(res.response.data.error.password) {
                error.value = res.response.data.error.password
                isError.value = true
            }
        }
        else {
            router.push('/auth/login2')
        }
    }
}
</script>

<template>
    <div class="bg-primary-reverse bg-primary-50">
        <div class="flex justify-content-center">
            <div class="w-full lg:w-5 h-screen text-center flex justify-content-center align-items-start">
                <div class="z-5 w-full lg:w-8 px-6 text-center mt-8" style="max-width: 400px">
                    <div class="w-full flex align-items-center justify-content-center">
                        <img src="/layout/images/pages/login/icon-login.svg" alt="avalon-layout" class="w-6rem" />
                    </div>
                    <h1 class="text-4xl font-light mt-4 text-primary-500">Register to Avalon</h1>
                    <p>Welcome, please use the form to Register</p>
                    <div class="mt-5 text-left">
                        <label for="username" class="block mb-2" style="color: #4c566a">Username</label>
                        <IconField class="block">
                            <InputIcon class="pi pi-user" />
                            <InputText id="username" v-model="username" type="text" class="w-full" />
                            <small class="p-invalid" v-if="submitted && !username">Username is required.</small>
                        </IconField>

                        <label for="email" class="block mb-2 mt-3" style="color: #4c566a">Email</label>
                        <IconField class="block">
                            <InputIcon class="pi pi-at" />
                            <InputText id="email" v-model="email" type="email" class="w-full" />
                            <small class="p-invalid" v-if="submitted && !email">Email is required.</small>
                        </IconField>

                        <label for="password" class="block mb-2 mt-3" style="color: #4c566a">Password</label>
                        <IconField class="block">
                            <InputIcon class="pi pi-lock" />
                            <InputText id="password" type="password" v-model="password" class="w-full" />
                            <small class="p-invalid" v-if="submitted && !password">Password is required.</small>
                        </IconField>

                        <div class="flex align-items-center justify-content-between mt-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                        </div>

                        <div class="flex align-items-center justify-content-between mt-4 gap-3">
                            <Button label="Register" @click="register(username, email, password)" class="w-full"></Button>
                        </div>
                        <small class="p-invalid" v-if="isError">{{error}}</small>
                    </div>
                </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="absolute bottom-0 w-screen" viewBox="0 0 1440 250">
                <defs>
                    <linearGradient id="c" x1="50%" x2="50%" y1="0%" y2="100%">
                        <stop offset="0%" stop-color="var(--primary-200)" />
                        <stop offset="99.052%" stop-color="var(--primary-300)" />
                    </linearGradient>
                    <path id="b" d="M0 202c142.333-66.667 249-90 320-70 106.5 30 122 83.5 195 83.5h292c92.642-106.477 190.309-160.81 293-163 102.691-2.19 216.025 47.643 340 149.5v155.5H0V202z" />
                    <filter id="a" width="105.1%" height="124.3%" x="-2.6%" y="-12.8%" filterUnits="objectBoundingBox">
                        <feOffset dy="-2" in="SourceAlpha" result="shadowOffsetOuter1" />
                        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="12" />
                        <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0" />
                    </filter>
                    <linearGradient id="d" x1="50%" x2="50%" y1="0%" y2="99.142%">
                        <stop offset="0%" stop-color="var(--primary-300)" />
                        <stop offset="100%" stop-color="var(--primary-500)" />
                    </linearGradient>
                </defs>
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(0 .5)">
                        <use fill="#000" filter="url(#a)" xlink:href="#b" />
                        <use fill="url(#c)" xlink:href="#b" />
                    </g>
                    <path fill="url(#d)" d="M0 107c225.333 61.333 364.333 92 417 92 79 0 194-79.5 293-79.5S914 244 1002 244s156-45 195-68.5c26-15.667 107-74.167 243-175.5v357.5H0V107z" transform="translate(0 .5)" />
                </g>
            </svg>
        </div>
    </div>
</template>
