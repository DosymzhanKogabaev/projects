<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';

const { changeColorScheme } = useLayout();

const router = useRouter();

const backgroundImage = ref('url(/layout/images/pages/exception/bg-404.png');
const backgroundStyle = ref({
    background: backgroundImage.value
});

onBeforeMount(() => {
    changeColorScheme('light');
});

const navigateToDashboard = () => {
    router.push('/');
};
</script>

<template>
    <div class="overflow-hidden m-0 relative h-screen bg-cover bg-center" :style="backgroundStyle">
        <div class="text-center text-5xl pt-5 font-bold text-white">
            <div class="inline-block py-1 px-2 text-white surface-900">
                <span>Page</span>
            </div>
            <span class="text-color">Not Found</span>
        </div>
        <div class="w-full absolute bottom-0 text-center surface-900 h-14rem">
            <div class="w-full absolute text-center z-1" style="top: -36px">
                <img src="/layout/images/pages/exception/icon-error.png" alt="avalon-ng" />
            </div>
            <div class="w-29rem relative text-white" style="margin-left: -200px; left: 50%; top: 30px">
                <div class="p-3">
                    <h3 class="m-0 mb-2 text-white">Page Not Found.</h3>
                    <p class="m-0">Please contact system administrator.</p>
                </div>
                <Button @click="navigateToDashboard" label="Go To Dashboard"></Button>
            </div>
        </div>
    </div>
</template>
