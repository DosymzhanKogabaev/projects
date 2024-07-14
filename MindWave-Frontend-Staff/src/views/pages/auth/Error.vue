<script setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();
const backgroundImage = ref('url(/layout/images/pages/exception/bg-error.png)');
const backgroundStyle = ref({
    background: backgroundImage.value
});

const navigateToDashboard = () => {
    router.push('/');
};
</script>

<template>
    <div class="overflow-hidden m-0 relative h-screen bg-cover bg-center" :style="backgroundStyle">
        <div class="text-center text-5xl pt-5 font-bold text-0">
            <div class="inline-block py-1 px-2 text-900 surface-ground">
                <span>Error</span>
            </div>
            <span>Occured</span>
        </div>
        <div class="w-full absolute bottom-0 text-center surface-900 h-14rem">
            <div class="w-full absolute text-center z-1" style="top: -36px">
                <img src="/layout/images/pages/exception/icon-error.png" alt="avalon-ng" />
            </div>
            <div class="w-29rem relative text-white" style="margin-left: -200px; left: 50%; top: 30px">
                <div class="p-3">
                    <h3 class="m-0 mb-2 text-0">An error occured.</h3>
                    <p class="m-0 text-0">Please contact system administrator.</p>
                </div>
                <Button @click="navigateToDashboard" label="Go To Dashboard"></Button>
            </div>
        </div>
    </div>
</template>
