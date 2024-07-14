<script setup>
import { ref, onMounted, watch } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig } = useLayout();

const products = ref(null);
const visitor = ref(null);
const chart = ref(null);
const visitorChart = ref(null);
const visitorChartOptions = ref(null);

const payments = [
    { name: 'Electric Bill', amount: 75.6, paid: true, date: '06/04/2022' },
    { name: 'Water Bill', amount: 45.5, paid: true, date: '07/04/2022' },
    { name: 'Gas Bill', amount: 45.2, paid: false, date: '12/04/2022' },
    { name: 'Internet Bill', amount: 25.9, paid: true, date: '17/04/2022' },
    { name: 'Streaming', amount: 40.9, paid: false, date: '20/04/2022' },
    { name: 'Phone Bill', amount: 32.9, paid: false, date: '23/04/2022' }
];

onMounted(() => {
    initChart();
});

watch([layoutConfig.componentTheme, layoutConfig.colorScheme], () => {
    initChart();
});

const initChart = () => {
    const textColor = getComputedStyle(document.body).getPropertyValue('--text-color');
    const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color');
    const surfaceLight = getComputedStyle(document.body).getPropertyValue('--surface-100');

    visitorChart.value = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                data: [600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810, 780],
                backgroundColor: primaryColor,
                fill: true,
                barPercentage: 0.75,
                stepped: true
            }
        ]
    };

    visitorChartOptions.value = {
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        hover: {
            mode: 'index'
        },
        scales: {
            y: {
                min: 500,
                max: 900,
                ticks: {
                    color: textColor
                },
                grid: {
                    color: surfaceLight
                }
            },
            x: {
                ticks: {
                    color: textColor
                },
                grid: {
                    display: false
                }
            }
        }
    };
};

const productService = new ProductService();

productService.getProducts().then((data) => {
    products.value = data;
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-4 xl:col-2">
            <Button class="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
                <div class="p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2" :class="{ 'bg-primary-900': layoutConfig.colorScheme === 'dark' }">
                    <i class="pi pi-send text-xl"></i>
                </div>

                <div class="flex flex-column align-items-start text-900">
                    <span class="block h-auto font-bold">Make</span>
                    <span class="block h-auto">Swift Transfer</span>
                </div>
            </Button>
        </div>

        <div class="col-12 md:col-4 xl:col-2">
            <Button class="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
                <div class="p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2" :class="{ 'bg-primary-900': layoutConfig.colorScheme === 'dark' }">
                    <i class="pi pi-money-bill text-xl"></i>
                </div>

                <div class="flex flex-column align-items-start text-900">
                    <span class="block h-auto font-bold">Pay</span>
                    <span class="block h-auto">Credit Cards</span>
                </div>
            </Button>
        </div>

        <div class="col-12 md:col-4 xl:col-2">
            <Button class="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
                <div class="p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2" :class="{ 'bg-primary-900': layoutConfig.colorScheme === 'dark' }">
                    <i class="pi pi-credit-card text-xl"></i>
                </div>

                <div class="flex flex-column align-items-start text-900">
                    <span class="block h-auto font-bold">Make</span>
                    <span class="block h-auto">Card Transfer</span>
                </div>
            </Button>
        </div>

        <div class="col-12 md:col-4 xl:col-2">
            <Button class="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
                <div class="p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2" :class="{ 'bg-primary-900': layoutConfig.colorScheme === 'dark' }">
                    <i class="pi pi-download text-xl"></i>
                </div>

                <div class="flex flex-column align-items-start text-900">
                    <span class="block h-auto font-bold">Receive</span>
                    <span class="block h-auto">Money</span>
                </div>
            </Button>
        </div>

        <div class="col-12 md:col-4 xl:col-2">
            <Button class="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
                <div class="p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2" :class="{ 'bg-primary-900': layoutConfig.colorScheme === 'dark' }">
                    <i class="pi pi-arrow-right-arrow-left text-xl"></i>
                </div>

                <div class="flex flex-column align-items-start text-900">
                    <span class="block h-auto font-bold">See</span>
                    <span class="block h-auto">Transactions</span>
                </div>
            </Button>
        </div>

        <div class="col-12 md:col-4 xl:col-2">
            <Button class="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
                <div class="p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2" :class="{ 'bg-primary-900': layoutConfig.colorScheme === 'dark' }">
                    <i class="pi pi-prime text-xl"></i>
                </div>

                <div class="flex flex-column align-items-start text-900">
                    <span class="block h-auto font-bold">Open</span>
                    <span class="block h-auto">Ticket</span>
                </div>
            </Button>
        </div>

        <div class="col-12 md:col-6 xl:col-3">
            <div class="py-4 px-2 border-round-md surface-card flex flex-wrap h-full align-items-center justify-content-between gap-3 border-1 surface-border">
                <div class="flex gap-3 align-items-center">
                    <div class="p-2 flex justify-content-center align-items-center border-circle bg-primary text-0 mr-2" :class="{ 'bg-primary-900 text-900': layoutConfig.colorScheme === 'dark' }">
                        <i class="pi pi-dollar text-2xl"></i>
                    </div>

                    <div>
                        <div class="text-xl font-medium text-left">USD</div>
                        <div class="text-base text-color-secondary">Dollar</div>
                    </div>
                </div>
                <div class="flex gap-3">
                    <div class="flex flex-column gap-1">
                        <span class="text-sm text-color-secondary">Latest</span>
                        <span class="text-base font-medium">3,5232</span>
                    </div>

                    <div class="flex flex-column gap-1">
                        <span class="text-sm text-color-secondary">Change</span>
                        <span class="text-base font-medium">-0.85</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 md:col-6 xl:col-3">
            <div class="py-4 px-2 border-round-md surface-card flex flex-wrap h-full align-items-center justify-content-between gap-3 border-1 surface-border">
                <div class="flex gap-3 align-items-center">
                    <div class="p-2 flex justify-content-center align-items-center border-circle bg-primary text-0 mr-2" :class="{ 'bg-primary-900': layoutConfig.colorScheme === 'dark' }">
                        <i class="pi pi-euro text-2xl"></i>
                    </div>

                    <div>
                        <div class="text-xl font-medium text-left">EUR</div>
                        <div class="text-base text-color-secondary">Euro</div>
                    </div>
                </div>
                <div class="flex gap-3">
                    <div class="flex flex-column gap-1">
                        <span class="text-sm text-color-secondary">Latest</span>
                        <span class="text-base font-medium">4,1246</span>
                    </div>

                    <div class="flex flex-column gap-1">
                        <span class="text-sm text-color-secondary">Change</span>
                        <span class="text-base font-medium">-0.16</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 md:col-6 xl:col-3">
            <div class="py-4 px-2 border-round-md surface-card flex flex-wrap h-full align-items-center justify-content-between gap-3 border-1 surface-border">
                <div class="flex gap-3 align-items-center">
                    <div class="p-2 flex justify-content-center align-items-center border-circle bg-primary text-0 mr-2" :class="{ 'bg-primary-900': layoutConfig.colorScheme === 'dark' }">
                        <i class="pi pi-pound text-2xl"></i>
                    </div>

                    <div>
                        <div class="text-xl font-medium text-left">GBP</div>
                        <div class="text-base text-color-secondary">Pound</div>
                    </div>
                </div>
                <div class="flex gap-3">
                    <div class="flex flex-column gap-1">
                        <span class="text-sm text-color-secondary">Latest</span>
                        <span class="text-base font-medium">4,6300</span>
                    </div>

                    <div class="flex flex-column gap-1">
                        <span class="text-sm text-color-secondary">Change</span>
                        <span class="text-base font-medium">-0.25</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 md:col-6 xl:col-3">
            <div class="py-4 px-2 border-round-md surface-card flex flex-wrap h-full align-items-center justify-content-between gap-3 border-1 surface-border">
                <div class="flex gap-3 align-items-center">
                    <div class="p-2 flex justify-content-center align-items-center border-circle bg-primary text-0 mr-2" :class="{ 'bg-primary-900': layoutConfig.colorScheme === 'dark' }">
                        <i class="pi pi-bitcoin text-2xl"></i>
                    </div>

                    <div>
                        <div class="text-xl font-medium text-left">BTC</div>
                    </div>
                </div>
                <div class="flex gap-3">
                    <div class="flex flex-column gap-1">
                        <span class="text-sm text-color-secondary">Latest</span>
                        <span class="text-base font-medium">143,059</span>
                    </div>

                    <div class="flex flex-column gap-1">
                        <span class="text-sm text-color-secondary">Change</span>
                        <span class="text-base font-medium">-0.85</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6">
            <div class="card h-full">
                <h5>Accounts</h5>
                <div class="flex justify-content-between border-bottom-1 surface-border p-3">
                    <span class="font-semibold text-color-secondary text-xl">Grand Total</span>
                    <span class="text-green-500 text-2xl font-bold">$624,504.00</span>
                </div>

                <div class="p-3">
                    <div class="flex align-items-center justify-content-between py-2">
                        <div class="flex gap-3 text-lg align-items-center">
                            <i class="pi pi-money-bill text-color-secondary"></i>
                            <span class="text-color-secondary">Bank Accounts</span>
                        </div>
                        <div class="flex align-items-center gap-2">
                            <span class="font-semibold text-base">$320,521.25</span>
                            <a href="#" class="text-color-secondary">
                                <i class="pi pi-angle-double-right"></i>
                            </a>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-between py-2">
                        <div class="flex gap-3 text-lg align-items-center">
                            <i class="pi pi-briefcase text-color-secondary"></i>
                            <span class="text-color-secondary">Saving</span>
                        </div>
                        <div class="flex align-items-center gap-2">
                            <span class="font-semibold text-base">$94,305.00</span>
                            <a href="#" class="text-color-secondary">
                                <i class="pi pi-angle-double-right"></i>
                            </a>
                        </div>
                    </div>

                    <div class="flex align-items-center justify-content-between py-2">
                        <div class="flex gap-3 text-lg align-items-center">
                            <i class="pi pi-globe text-color-secondary"></i>
                            <span class="text-color-secondary">Stocks</span>
                        </div>
                        <div class="flex align-items-center gap-2">
                            <span class="font-semibold text-base">$5,000.00</span>
                            <a href="#" class="text-color-secondary">
                                <i class="pi pi-angle-double-right"></i>
                            </a>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-between py-2">
                        <div class="flex gap-3 text-lg align-items-center">
                            <i class="pi pi-dollar text-color-secondary"></i>
                            <span class="text-color-secondary">Profit</span>
                        </div>
                        <div class="flex align-items-center gap-2">
                            <span class="font-semibold text-base">$21.25</span>
                            <a href="#" class="text-color-secondary">
                                <i class="pi pi-angle-double-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6">
            <div class="card h-full">
                <h5>Debt Management</h5>
                <div class="flex justify-content-between border-bottom-1 surface-border p-3">
                    <span class="font-semibold text-color-secondary text-xl">Grand Total</span>
                    <span class="text-red-500 text-2xl font-bold">$-125,330.00</span>
                </div>

                <div class="p-3">
                    <div class="flex align-items-center justify-content-between py-2">
                        <div class="flex gap-3 text-lg align-items-center">
                            <i class="pi pi-briefcase text-color-secondary"></i>
                            <span class="text-color-secondary">Used Credits</span>
                        </div>
                        <div class="flex align-items-center gap-2">
                            <span class="font-semibold text-base">$100,240.00</span>
                            <a href="#" class="text-color-secondary">
                                <i class="pi pi-angle-double-right"></i>
                            </a>
                        </div>
                    </div>

                    <div class="flex align-items-center justify-content-between py-2">
                        <div class="flex gap-3 text-lg align-items-center">
                            <i class="pi pi-calendar text-color-secondary"></i>
                            <span class="text-color-secondary">Loans</span>
                        </div>
                        <div class="flex align-items-center gap-2">
                            <span class="font-semibold text-base">$25,090.00</span>
                            <a href="#" class="text-color-secondary">
                                <i class="pi pi-angle-double-right"></i>
                            </a>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-between py-2">
                        <div class="flex gap-3 text-lg align-items-center">
                            <i class="pi pi-ticket text-color-secondary"></i>
                            <span class="text-color-secondary">Overdrafts</span>
                        </div>
                        <div class="flex align-items-center gap-2">
                            <span class="font-semibold text-base">$0</span>
                            <a href="#" class="text-color-secondary">
                                <i class="pi pi-angle-double-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6">
            <div class="card h-full">
                <div v-if="layoutConfig.colorScheme.value === 'light'" class="w-full h-17rem bg-cover bg-center bg-no-repeat" style="background: url(/demo/images/dashboard-banking/asset-japan.jpg)"></div>
                <div v-if="layoutConfig.colorScheme.value === 'dark'" class="w-full h-17rem bg-cover bg-center bg-no-repeat" style="background: url(/demo/images/dashboard-banking/asset-japan-night.jpg)"></div>
                <div>
                    <h3 class="mt-3"><strong>Journey to Japan</strong></h3>
                    <div>
                        <ProgressBar :value="30" class="border-round" :style="{ height: '.5rem' }" :showValue="false"></ProgressBar>
                    </div>

                    <div class="text-color-secondary my-3">
                        <p>
                            <span><b>$3,000.00</b></span> from $10,000.00
                        </p>
                    </div>

                    <div class="flex align-items-center justify-content-between my-3">
                        <Button label="Deposit"></Button>
                        <a href="#" class="p-button-link">Withdraw</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6">
            <div class="card">
                <div class="text-900 text-xl font-semibold mb-3">Monthly Payments</div>
                <DataTable ref="dt" :value="payments" dataKey="id" :rows="5">
                    <template #empty> No products found.</template>
                    <Column field="name" header="Name" class="white-space-nowrap w-4"> </Column>
                    <Column field="price" header="Amount" class="white-space-nowrap w-4">
                        <template #body="{ data }">
                            {{ formatCurrency(data.amount) }}
                        </template>
                    </Column>
                    <Column field="date" header="Date" class="white-space-nowrap w-4"> </Column>
                    <Column field="inventoryStatus" header="Status" class="white-space-nowrap w-4 text-right">
                        <template #body="{ data }">
                            <Tag v-if="data.paid" value="COMPLETED" severity="success"></Tag>
                            <Tag v-else value="PENDING" severity="warning"></Tag>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <div class="col-12 lg:col-6">
            <div class="card h-full">
                <h5>Transactions</h5>

                <div class="flex align-items-center justify-content-between">
                    <div class="flex w-7 align-items-center justify-content-between">
                        <img src="/demo/images/dashboard-banking/asset-visa.png" alt="avalon-layout" width="52" />
                        <div class="flex flex-column">
                            <span class="font-medium">07 July 2023</span>
                            <span class="text-color-secondary">11.05</span>
                        </div>
                        <div class="flex flex-column">
                            <span class="font-medium">Online Payment</span>
                            <span class="text-color-secondary">Visa Card</span>
                        </div>
                    </div>
                    <div class="w-5 flex justify-content-end">
                        <Button label="See Details"></Button>
                    </div>
                </div>

                <div class="flex align-items-center justify-content-between">
                    <div class="flex w-7 align-items-center justify-content-between">
                        <img src="/demo/images/dashboard-banking/asset-netflix.png" alt="avalon-layout" width="52" />
                        <div class="flex flex-column">
                            <span class="font-medium">06 July 2023</span>
                            <span class="text-color-secondary">11.05</span>
                        </div>
                        <div class="flex flex-column">
                            <span class="font-medium">Online Payment</span>
                            <span class="text-color-secondary">Netflix</span>
                        </div>
                    </div>
                    <div class="w-5 flex justify-content-end">
                        <Button label="See Details"></Button>
                    </div>
                </div>

                <div class="flex align-items-center justify-content-between">
                    <div class="flex w-7 align-items-center justify-content-between">
                        <img src="/demo/images/dashboard-banking/asset-spotify.png" alt="avalon-layout" width="52" />
                        <div class="flex flex-column">
                            <span class="font-medium">05 July 2023</span>
                            <span class="text-color-secondary">08.32</span>
                        </div>
                        <div class="flex flex-column">
                            <span class="font-medium">Online Payment</span>
                            <span class="text-color-secondary">Spotify</span>
                        </div>
                    </div>
                    <div class="w-5 flex justify-content-end">
                        <Button label="See Deatils"></Button>
                    </div>
                </div>

                <div class="flex align-items-center justify-content-between">
                    <div class="flex w-7 align-items-center justify-content-between">
                        <img src="/demo/images/dashboard-banking/asset-newyorker.png" alt="avalon-layout" width="52" />
                        <div class="flex flex-column">
                            <span class="font-medium">02 July 2023</span>
                            <span class="text-color-secondary">14.46</span>
                        </div>
                        <div class="flex flex-column">
                            <span class="font-medium">Purchase</span>
                            <span class="text-color-secondary">The New Yorker</span>
                        </div>
                    </div>
                    <div class="w-5 flex justify-content-end">
                        <Button label="See Details"></Button>
                    </div>
                </div>

                <div class="flex align-items-center justify-content-between">
                    <div class="flex w-7 align-items-center justify-content-between">
                        <img src="/demo/images/dashboard-banking/asset-google.png" alt="avalon-layout" width="52" />
                        <div class="flex flex-column">
                            <span class="font-medium">02 July 2023</span>
                            <span class="text-color-secondary">12.51</span>
                        </div>
                        <div class="flex flex-column">
                            <span class="font-medium">Online Payment</span>
                            <span class="text-color-secondary">Google</span>
                        </div>
                    </div>
                    <div class="w-5 flex justify-content-end">
                        <Button label="See Details"></Button>
                    </div>
                </div>

                <div class="flex align-items-center justify-content-between">
                    <div class="flex w-7 align-items-center justify-content-between">
                        <img src="/demo/images/dashboard-banking/asset-soundcloud.png" alt="avalon-layout" width="52" />
                        <div class="flex flex-column">
                            <span class="font-medium">01 July 2023</span>
                            <span class="text-color-secondary">09.27</span>
                        </div>
                        <div class="flex flex-column">
                            <span class="font-medium">Online Payment</span>
                            <span class="text-color-secondary">SoundCloud</span>
                        </div>
                    </div>
                    <div class="w-5 flex justify-content-end">
                        <Button label="See Details"></Button>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6">
            <div class="card h-full">
                <h5>Monthly Statistics</h5>
                <Chart type="bar" :data="visitorChart" :options="visitorChartOptions" :id="visitor - chart"></Chart>
            </div>
        </div>
    </div>
</template>
