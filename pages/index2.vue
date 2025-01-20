<script setup lang="ts">
    import { ref } from 'vue';
    
    useHead({ 
        title: 'Пополнение баланса'
    });

    definePageMeta({
        validate: async ({ query }) => {
            return typeof query.invoice === 'string' && 
                /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(query.invoice)
        }
    });

    const { invoice } = useRoute().query;
    const methods: Array<{ [key: string]: string }> = [
        { code: 'card', name: 'Карта' },
		{ code: 'sbp', name: 'СБП' },
		{ code: 'sberPay', name: 'SberPay' },
	];
    
    let data: Ref = ref({
        state: 'loading',
        amount: 0,
        currentMethod: useCookie('method', { default: () => 'card' }),
        createOrder: false,
        form: {
            valid: false,
            email: {
                value: useCookie('email'),
                rules: [
                    (value: string) => {
                        if (!value || /.+@.+\..+/.test(value)) return true

                        return 'Неверный формат email!'
                    },
                ]
            },
            phone: {
                value: useCookie('phone'),
                rules: [
                    (value: string) => {
                        if (data.value.currentMethod != 'sberPay' || /^((\+|)7|8|)9(\d{9})$/.test(value)) return true

                        return 'Неверный формат телефона!'
                    },
                ]
            },
        }
	});

    const createPayment = async () => {
        if (!data.value.form.valid || data.value.createOrder) return;
        data.value.createOrder = true;

        const response = await fetch(`https://payment.pennoe.org/api/payment/franchise`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                uuid: invoice,
                email: data.value.form.email.value ? data.value.form.email.value.toString().trim() : null,
                phone: data.value.form.phone.value ? data.value.form.phone.value.toString().trim().substr(-10) : null,
                method: data.value.currentMethod,
            }),
        });
        
        switch (response.status) {
            case 429:
                alert('Слишком много запросов! Блокировка на 60 секунд.');
                data.value.createOrder = false;
                break;
            case 200:
                const invoiceData: any = await response.json();

                if (invoiceData['status'] != 'success') {
                    alert('Произошла ошибка при создании оплаты! (#1)');
                    data.value.createOrder = false;
                    return;
                }

                invoiceData['url'] !== null ? (window.location.href = invoiceData['url']) : (data.value.state = 'sberPay');
                break;
            default:
                alert('Произошла ошибка при создании оплаты! (#2)');
                data.value.createOrder = false;
                break;
        }
    }

    const checkInvoice = async () => {
        const response = await fetch(`https://payment.pennoe.org/api/payment/${invoice}/`, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        });

        switch (response.status) {
            case 429: 
                alert("Слишком много запросов! Блокировка на 60 секунд...");
                break;
            case 200:
                const invoiceData: any = await response.json();

                data.value.amount = invoiceData['amount'] as number;

                if (invoiceData['payment_url'] != null && !invoiceData['paid']) {
                    if (invoiceData['payment_url'] != 'sberPay') {
                        window.location.href = invoiceData['payment_url'] as string;
                    } else {
                        data.value.state = 'sberPay';
                    }
                    return;
                }

                data.value.state = invoiceData['paid'] ? 'success' : 'payment';
                break;
            default:
                data.value.state = 'not_found';
                break;
        }
    }

    checkInvoice()
</script>

<template>
    <v-app class="bg">
        <main class="fill-height w-100 d-flex align-center justify-center flex-column">
            <v-card class="pa-10 d-flex align-center flex-column rounded card mx-4 mx-md-8 mx-lg-12" max-width="600px">
                <template v-if="data.state == 'loading'">
                    <img src="/images/loading.svg" alt="loader svg" class="loader" width="64px" height="64px" />
                    <section class="mt-2 text-sm font-medium leading-6 text-gray-900 text-center">Получение информации о платеже...</section>
                </template>
                <template v-else-if="data.state == 'payment'">
                    <section class="h-auto w-100">
                        <span class="text-black text-h5 text-center">Счёт на сумму <span class="font-weight-bold">{{(data.amount/100).toFixed(2)}} ₽</span></span>
                        
                        <span class="d-block grey-darken-4 font-weight-medium mt-5 text-center">Выберите метод оплаты</span>

                        <section class="d-flex mt-2 flex-wrap justify-center">
                            <v-btn v-for="method in methods" :style="data.currentMethod == method.code ? 'background: #E1E1E1;' : 'background: #F7F7F7;'" class="h-auto w-md-auto w-100 py-2 mx-1 mb-2 rounded-6 d-flex align-center justify-center mt-1 none-shadow" @click="data.currentMethod = method.code">
                                <v-img :src="`/images/${method.code}.svg`" :alt="method.code + ' icon'" width="40px"/>
                                <span class="ml-2 text-caption md:text-body-1">{{ method.name }}</span>
                            </v-btn>
                        </section>

                        <section class="flex flex-col justify-center align-center">
                            <v-form v-model="data.form.valid">
                                <v-text-field
                                    label="Email для чека"
                                    prepend-icon="mdi-email-outline"
                                    variant="underlined"
                                    v-model=data.form.email.value
                                    :rules=data.form.email.rules
                                    class="mt-5"
                                ></v-text-field>
                                <v-text-field
                                    v-if="data.currentMethod == 'sberPay'"
                                    label="Номер телефона"
                                    prepend-icon="mdi-phone-outline"
                                    variant="underlined"
                                    v-model=data.form.phone.value
                                    :rules=data.form.phone.rules
                                ></v-text-field>
                            </v-form>
                            <section style="opacity: 0.7;" class="mt-3">
                                Нажимая "Перейти к оплате", я подтверждаю, что ознакомился с 
                                <v-tooltip location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <a href="/oferta" target="_blank" v-bind="props" @click.stop>пользовательским соглашением</a>
                                    </template>
                                    Открыть в новом окне
                                </v-tooltip>
                                и принимаю его условия
                            </section>
                            <section class="d-flex w-100 justify-end mt-5">
                                <v-btn
                                    density="default"
                                    :color="data.form.valid ? (data.createOrder ? 'grey-darken-2' : 'deep-orange') : 'grey-darken-2'"
                                    class="self-end"
                                    @click="createPayment"
                                    :prepend-icon="data.createOrder ? 'mdi-clock-outline' : ''"
                                    :disabled="data.createOrder"
                                >
                                    {{data.createOrder ? 'Платёж создаётся' : 'Перейти к оплате'}}
                                </v-btn>
                            </section>
                        </section>
                    </section>
                </template>
                <template v-else-if="data.state == 'sberPay'">
                    <img src="/images/sberPay.svg" alt="sberPay logo" width="96px" height="96px" />
                    <span class="font-weight-black pt-3 text-center">Платёж создан!</span>
                    <span class="pt-5 text-center">Ожидайте PUSH-уведомления от приложения банка.</span>
                    <span class="text-center">Счёт был выставлен на указанный номер телефона при создании платежа.</span>
                </template>
                <template v-else-if="data.state == 'success'">
                    <img src="/images/success.svg" alt="success svg" width="64px" height="64px" />
                    <section class="mt-2 font-medium leading-6 text-gray-900 text-center">Счёт успешно оплачен</section>
                </template>
                <template v-else-if="data.state == 'not_found'">
                    <img src="/images/error.svg" alt="success svg" width="64px" height="64px" />
                    <section class="mt-2 font-medium leading-6 text-gray-900 text-center">Счёт не найден</section>
                </template>
                <template v-else>
                    <img src="/images/error.svg" alt="error svg" width="64px" height="64px" />
                    <section class="mt-2 font-medium leading-6 text-gray-900 text-center">Неизвестная ошибка</section>
                </template>
            </v-card>
        </main>
    </v-app>
</template>

<style>
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .bg {
        background: #EEE !important;
        background-image: url('/images/bg.svg') !important;
        background-repeat: repeat
    }

    .card {
        background: #fff !important;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    .none-shadow { box-shadow: none !important; }
    .rounded-6 { border-radius: 6px !important; }
    .loader { animation: spin 1s linear infinite; }
</style>

