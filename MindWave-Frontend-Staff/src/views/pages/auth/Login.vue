<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToDashboard = () => {
    router.push('/');
};
</script>

<template>
    <div class="overflow-hidden margin-0 relative h-screen">
        <div class="bg-cover bg-center" style="background: url('/layout/images/pages/login/bg-login.jpg'); height: calc(100% - 370px)"></div>
        <div class="w-full absolute mb-0 bottom-0 text-center surface-900 border-noround p-fluid h-27rem">
            <div class="px-6 md:p-0 w-29rem relative text-white" style="margin-left: -200px; top: 30px; left: 50%">
                <div class="grid">
                    <div class="col-3 text-left">
                        <img src="/layout/images/pages/login/icon-login.svg" alt="avalon-ng" />
                    </div>
                    <div class="col-9 text-left">
                        <h2 class="mb-0 text-0">Welcome Guest</h2>
                        <span class="text-500 text-sm">Sign in to Avalon Network</span>
                    </div>
                    <div class="col-12 text-left">
                        <label class="text-400 mb-1">Username</label>
                        <div class="mt-1">
                            <InputText type="text" placeholder="Username" />
                        </div>
                    </div>
                    <div class="col-12 text-left">
                        <label class="text-400 mb-1">Password</label>
                        <div class="mt-1">
                            <InputText type="password" placeholder="Password" />
                        </div>
                    </div>
                    <div class="col-12 md:col-6">
                        <Button @click="navigateToDashboard" label="Sign In"></Button>
                    </div>
                    <div class="col-12 md:col-6">
                        <Button class="text-gray-300 flex justify-content-center" text>Forgot Password?</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
