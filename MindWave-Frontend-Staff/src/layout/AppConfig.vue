<script setup>
import { ref, watch, computed } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import RadioButton from 'primevue/radiobutton';
import { usePrimeVue } from 'primevue/config';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import Sidebar from 'primevue/sidebar';

defineProps({
    simple: {
        type: Boolean,
        default: false
    }
});

const $primevue = usePrimeVue();
const rippleActive = computed(() => $primevue.config.ripple);
const inputStyle = computed(() => $primevue.config.inputStyle || 'outlined');

const selectedScene = ref(null);
const componentThemes = ref([
    { name: 'purple', color: '#6f42c1' },
    { name: 'indigo', color: '#6610f2' },
    { name: 'pink', color: '#d63384' },
    { name: 'blue', color: '#0d6efd' },
    { name: 'cyan', color: '#0dcaf0' },
    { name: 'teal', color: '#20c997' },
    { name: 'green', color: '#198754' },
    { name: 'yellow', color: '#ffc107' },
    { name: 'orange', color: '#fd7e14' },
    { name: 'black', color: '#000000' }
]);
const menuThemes = ref([
    { name: 'light', color: '#ffffff' },
    { name: 'dark', color: '#212529' }
]);
const topbarThemes = ref([
    { name: 'light', color: '#FFFFFF' },
    { name: 'dark', color: '#212529' },
    { name: 'blue', color: '#1565C0' },
    { name: 'purple', color: '#6A1B9A' },
    { name: 'pink', color: '#AD1457' },
    { name: 'cyan', color: '#0097A7' },
    { name: 'teal', color: '#00796B' },
    { name: 'green', color: '#43A047' },
    { name: 'yellow', color: '#FBC02D' },
    { name: 'orange', color: '#FB8C00' },
    { name: 'indigo', color: '#3F51B5' }
]);
const scenes = ref([
    {
        sceneName: 'Green Light',
        colorScheme: 'light',
        colorSchemeColor: '#EFEFEF',
        menuTheme: 'light',
        menuThemeColor: '#ffffff',
        componentTheme: 'green',
        componentThemeColor: '#198754',
        topbarTheme: 'green',
        topbarThemeColor: '#43A047',
        menuMode: 'static',
        cardColor: '#ffffff'
    },
    {
        sceneName: 'Dark Sea',
        colorScheme: 'dark',
        colorSchemeColor: '#20262e',
        menuTheme: 'dark',
        menuThemeColor: '#2a323d',
        componentTheme: 'cyan',
        componentThemeColor: '#0dcaf0',
        topbarTheme: 'cyan',
        topbarThemeColor: '#0097A7',
        menuMode: 'static',
        cardColor: '#2a323d'
    },
    {
        sceneName: 'Blue Marble',
        colorScheme: 'light',
        colorSchemeColor: '#EFEFEF',
        menuTheme: 'light',
        menuThemeColor: '#ffffff',
        componentTheme: 'blue',
        componentThemeColor: '#0d6efd',
        topbarTheme: 'blue',
        topbarThemeColor: '#1565C0',
        menuMode: 'static',
        cardColor: '#ffffff'
    },
    {
        sceneName: 'Emerald',
        colorScheme: 'dark',
        colorSchemeColor: '#20262e',
        menuTheme: 'dark',
        menuThemeColor: '#2a323d',
        componentTheme: 'teal',
        componentThemeColor: '#20c997',
        topbarTheme: 'teal',
        topbarThemeColor: '#00796B',
        menuMode: 'static',
        cardColor: '#2a323d'
    },
    {
        sceneName: 'Piano Black',
        colorScheme: 'light',
        colorSchemeColor: '#EFEFEF',
        menuTheme: 'light',
        menuThemeColor: '#ffffff',
        componentTheme: 'black',
        componentThemeColor: '#000000',
        topbarTheme: 'light',
        topbarThemeColor: '#FFFFFF',
        menuMode: 'static',
        cardColor: '#ffffff'
    },
    {
        sceneName: 'Bolt',
        colorScheme: 'dark',
        colorSchemeColor: '#20262e',
        menuTheme: 'dark',
        menuThemeColor: '#2a323d',
        componentTheme: 'yellow',
        componentThemeColor: '#ffc107',
        topbarTheme: 'yellow',
        topbarThemeColor: '#FBC02D',
        menuMode: 'static',
        cardColor: '#2a323d'
    },
    {
        sceneName: 'Amber',
        colorScheme: 'light',
        colorSchemeColor: '#EFEFEF',
        menuTheme: 'dark',
        menuThemeColor: '#212529',
        componentTheme: 'yellow',
        componentThemeColor: '#ffc107',
        topbarTheme: 'yellow',
        topbarThemeColor: '#FBC02D',
        menuMode: 'horizontal',
        cardColor: '#ffffff'
    },
    {
        sceneName: 'Kingdom',
        colorScheme: 'dark',
        colorSchemeColor: '#20262e',
        menuTheme: 'dark',
        menuThemeColor: '#2a323d',
        componentTheme: 'indigo',
        componentThemeColor: '#6610f2',
        topbarTheme: 'purple',
        topbarThemeColor: '#6A1B9A',
        menuMode: 'reveal',
        cardColor: '#2a323d'
    }
]);

const scales = ref([12, 13, 14, 15, 16]);

const { setScale, layoutConfig, layoutState, onConfigSidebarToggle, replaceLink, changeColorScheme } = useLayout();

watch(layoutConfig.menuMode, (newVal) => {
    if (newVal === 'static') {
        layoutState.staticMenuDesktopInactive.value = false;
    }
});

const onConfigButtonClick = () => {
    onConfigSidebarToggle();
};

const colorScheme = ref(layoutConfig.colorScheme.value);

const changeTheme = (theme) => {
    const themeLink = document.getElementById('theme-link');
    const themeHref = themeLink.getAttribute('href');
    const newHref = themeHref.replace(layoutConfig.componentTheme.value, theme);

    replaceLink(themeLink, newHref, () => {
        layoutConfig.componentTheme.value = theme;
    });
};
const replaceScene = (colorScheme, componentTheme) => {
    const id = 'theme-link';
    const themeLink = document.getElementById(id);
    const themeLinkHref = themeLink.getAttribute('href');

    let newHref = themeLinkHref.replace(layoutConfig.colorScheme.value, colorScheme);
    newHref = newHref.replace(layoutConfig.componentTheme.value, componentTheme);

    themeLink.setAttribute('href', newHref);

    layoutConfig.componentTheme.value = componentTheme;
    layoutConfig.colorScheme.value = colorScheme;
};

const changeMenuTheme = (theme) => {
    layoutConfig.menuTheme.value = theme;
};
const changeTopbarTheme = (theme) => {
    layoutConfig.topbarTheme.value = theme;
};

const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    applyScale();
};
const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    applyScale();
};
const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
};

const onInputStyleChange = (value) => {
    $primevue.config.inputStyle = value;
};

const onRippleChange = (value) => {
    $primevue.config.ripple = value;
};

const changeScene = (item) => {
    colorScheme.value = item.colorScheme;
    selectedScene.value = item;
    replaceScene(item.colorScheme, item.componentTheme);
    changeMenuTheme(item.menuTheme);
    changeTopbarTheme(item.topbarTheme);
    layoutConfig.menuMode.value = item.menuMode;
    selectedScene.value = item.sceneName;
};
</script>

<template>
    <button class="layout-config-button config-link" type="button" @click="onConfigButtonClick()">
        <i class="pi pi-cog"></i>
    </button>
    <Sidebar v-model:visible="layoutState.configSidebarVisible.value" position="right" class="layout-config-sidebar w-20rem">
        <div class="p-3">
            <h5>Layout/Theme Scale</h5>
            <div class="flex align-items-center">
                <Button icon="pi pi-minus" type="button" @click="decrementScale()" class="w-2rem h-2rem mr-2" text rounded :disabled="layoutConfig.scale.value === scales[0]"></Button>
                <div class="flex gap-2 align-items-center">
                    <i class="pi pi-circle-fill text-300" v-for="s in scales" :key="s" :class="{ 'text-primary-500': s === layoutConfig.scale.value }"></i>
                </div>
                <Button icon="pi pi-plus" type="button" @click="incrementScale()" class="w-2rem h-2rem ml-2" text rounded :disabled="layoutConfig.scale.value === scales[scales.length - 1]"></Button>
            </div>
            <h5>Scenes</h5>
            <div class="flex flex-wrap p-2 surface-100 gap-2 border-round-lg">
                <Button @click="changeScene(scene)" class="bg-transparent border-none relative p-0" v-for="scene of scenes" :key="scene.id" style="flex: 0 0 48%" v-tooltip.top="scene.sceneName">
                    <div v-if="selectedScene === scene.sceneName" class="absolute w-full h-full flex justify-content-center align-items-center" style="background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(3.56688px)">
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.520691" y="0.770691" width="24.4586" height="24.4586" rx="12.2293" :fill="scene.componentThemeColor" />
                            <g clip-path="url(#clip0_1_16289)">
                                <path
                                    d="M11.1158 16.5119C11.0587 16.51 11.0025 16.4964 10.9507 16.472C10.899 16.4476 10.8528 16.4129 10.8149 16.37L7.97597 13.531C7.92185 13.4959 7.8764 13.449 7.84306 13.3938C7.80973 13.3385 7.78938 13.2765 7.78354 13.2122C7.77771 13.148 7.78655 13.0832 7.8094 13.0229C7.83224 12.9626 7.8685 12.9082 7.91542 12.864C7.96234 12.8197 8.01871 12.7867 8.08027 12.7674C8.14183 12.7481 8.20696 12.743 8.27076 12.7526C8.33456 12.7621 8.39535 12.7861 8.44854 12.8226C8.50174 12.8591 8.54595 12.9072 8.57783 12.9632L11.1158 15.4842L17.0606 9.55651C17.1406 9.50462 17.2358 9.4811 17.3308 9.48972C17.4258 9.49834 17.5151 9.53861 17.5845 9.60406C17.6539 9.66952 17.6993 9.75637 17.7134 9.8507C17.7275 9.94503 17.7096 10.0414 17.6625 10.1243L11.4168 16.37C11.3789 16.4129 11.3327 16.4476 11.281 16.472C11.2292 16.4964 11.173 16.51 11.1158 16.5119Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_16289">
                                    <rect width="10.7006" height="10.7006" fill="white" transform="translate(7.39966 7.64966)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <svg width="110" height="44.5" viewBox="0 0 110 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1_23714)">
                            <rect x="0.5" width="109.5" height="56" rx="6" :fill="scene.colorSchemeColor" />
                            <rect width="109.5" height="10.5" transform="translate(0.5)" :fill="scene.topbarThemeColor" />
                            <rect width="42" height="45.5" transform="translate(0.5 10.5)" :fill="scene.menuThemeColor" />
                            <rect x="11" y="24.5" width="21" height="3.5" rx="1.75" :fill="scene.componentThemeColor" />
                            <rect x="11" y="31.5" width="21" height="3.5" rx="1.75" :fill="scene.componentThemeColor" />
                            <rect x="11" y="38.5" width="21" height="3.5" rx="1.75" :fill="scene.componentThemeColor" />
                            <rect x="53" y="21" width="46.5" height="24.5" rx="3" :fill="scene.cardColor" />
                            <rect x="60" y="28" width="32.5" height="10.5" rx="3" :fill="scene.componentThemeColor" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_23714">
                                <rect x="0.5" width="109.5" height="56" rx="6" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Button>
            </div>

            <h5>Color Scheme</h5>
            <div class="flex gap-4">
                <div class="field-radiobutton flex-1">
                    <RadioButton name="colorScheme" value="light" v-model="colorScheme" id="theme3" @change="changeColorScheme('light')"></RadioButton>
                    <label for="theme3">Light</label>
                </div>
                <div class="field-radiobutton flex-1">
                    <RadioButton name="colorScheme" value="dark" v-model="colorScheme" id="theme1" @change="changeColorScheme('dark')"></RadioButton>
                    <label for="theme1">Dark</label>
                </div>
            </div>

            <template v-if="!simple">
                <h5>Menu Mode</h5>
                <div class="flex flex-wrap row-gap-3">
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="static" v-model="layoutConfig.menuMode.value" inputId="mode1"></RadioButton>
                        <label for="mode1">Static</label>
                    </div>

                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="overlay" v-model="layoutConfig.menuMode.value" inputId="mode2"></RadioButton>
                        <label for="mode6">Overlay</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="slim" v-model="layoutConfig.menuMode.value" inputId="mode3"></RadioButton>
                        <label for="mode2">Slim</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="slim-plus" v-model="layoutConfig.menuMode.value" inputId="mode4"></RadioButton>
                        <label for="mode3">Slim +</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="reveal" v-model="layoutConfig.menuMode.value" inputId="mode5"></RadioButton>
                        <label for="mode4">Reveal</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="drawer" v-model="layoutConfig.menuMode.value" inputId="mode6"></RadioButton>
                        <label for="mode5">Drawer</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="horizontal" v-model="layoutConfig.menuMode.value" inputId="mode7"></RadioButton>
                        <label for="mode2">Horizontal</label>
                    </div>
                </div>
            </template>

            <template v-if="!simple">
                <h5>Menu Profile Position</h5>
                <div class="flex gap-4">
                    <div class="field-radiobutton flex-1">
                        <RadioButton name="position" value="start" v-model="layoutConfig.menuProfilePosition.value" inputId="start"></RadioButton>
                        <label for="star">Start</label>
                    </div>
                    <div class="field-radiobutton flex-1">
                        <RadioButton name="position" value="end" v-model="layoutConfig.menuProfilePosition.value" inputId="end"></RadioButton>
                        <label for="end">End</label>
                    </div>
                </div>
            </template>

            <template v-if="!simple">
                <h5>Input Style</h5>
                <div class="flex">
                    <div class="field-radiobutton flex-1">
                        <RadioButton :modelValue="inputStyle" name="inputStyle" value="outlined" inputId="outlined_input" @update:modelValue="onInputStyleChange"></RadioButton>
                        <label for="outlined_input">Outlined</label>
                    </div>
                    <div class="field-radiobutton flex-1">
                        <RadioButton :modelValue="inputStyle" name="inputStyle" value="filled" inputId="filled_input" @update:modelValue="onInputStyleChange"></RadioButton>
                        <label for="filled_input">Filled</label>
                    </div>
                </div>
            </template>
            <h5>Ripple Effect</h5>
            <InputSwitch :modelValue="rippleActive" @update:modelValue="onRippleChange"></InputSwitch>

            <template v-if="!simple">
                <h5>Menu Themes</h5>
                <template v-if="layoutConfig.colorScheme.value !== 'dark'">
                    <div class="flex flex-wrap row-gap-3">
                        <div v-for="(theme, i) in menuThemes" :key="i" class="w-3">
                            <button
                                class="cursor-pointer p-link w-2rem h-2rem border-round shadow-2 flex-shrink-0 flex justify-content-center align-items-center border-circle"
                                @click="() => changeMenuTheme(theme.name)"
                                :style="{ 'background-color': theme.color }"
                            >
                                <i v-if="theme.name === layoutConfig.menuTheme.value" :class="['pi pi-check', theme.name === layoutConfig.menuTheme.value && layoutConfig.menuTheme.value !== 'light' ? 'text-white' : 'text-dark']"></i>
                            </button>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <p>Menu themes are only available in light mode by design as large surfaces can emit too much brightness in dark mode.</p>
                </template>
            </template>

            <template v-if="!simple">
                <h5>Topbar Themes</h5>
                <div class="flex flex-wrap row-gap-3">
                    <div v-for="(theme, i) in topbarThemes" :key="i" class="w-3">
                        <button
                            class="cursor-pointer p-link w-2rem h-2rem border-round shadow-2 flex-shrink-0 flex justify-content-center align-items-center border-circle"
                            @click="() => changeTopbarTheme(theme.name)"
                            :style="{ 'background-color': theme.color }"
                        >
                            <i v-if="theme.name === layoutConfig.topbarTheme.value" :class="['pi pi-check', theme.name === layoutConfig.topbarTheme.value && layoutConfig.topbarTheme.value !== 'light' ? 'text-white' : 'text-dark']"></i>
                        </button>
                    </div>
                </div>
            </template>
            <h5>Component Themes</h5>
            <div class="flex flex-wrap row-gap-3">
                <div v-for="(theme, i) in componentThemes" :key="i" class="w-3">
                    <button class="cursor-pointer p-link w-2rem h-2rem border-circle flex-shrink-0 flex align-items-center justify-content-center" @click="() => changeTheme(theme.name)" :style="{ 'background-color': theme.color }">
                        <i v-if="theme.name === layoutConfig.componentTheme.value" class="pi pi-check text-white"></i>
                    </button>
                </div>
            </div>
        </div>
    </Sidebar>
</template>

<style lang="scss" scoped></style>
