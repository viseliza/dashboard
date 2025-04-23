<script setup lang="ts">
    import { SignatureAPI } from '~/api';

    const props = defineProps<{
        signature: string;
        signatures: Signatures;
    }>();
    
    const mode = ref('Ввод данных');
    const data = shallowRef<any>({});

    const title = props.signatures.getTitle(props.signature);
    const description = props.signatures.getDescription(props.signature);
    const style = props.signatures.getStyle(props.signature);
    const params = props.signatures.getParams(props.signature);
    const call = props.signatures.getAPICall(props.signature, new SignatureAPI(''));

    watch(data, (value) => {
        mode.value = 'Результат';
    });
</script>

<template>
    <div class="util-container">
        <header>
            <div class="util-container-top">
                <div class="util-container-icon default" v-if="!style.icon">
                    <v-icon class="concurent-icon">
                        mdi-source-fork
                    </v-icon>
                </div>

                <div 
                    v-else 
                    :style="{ backgroundColor: style.color as string }"
                    class="util-container-icon"
                >
                    <img :src="style.icon as string" alt="icon">
                </div>

                <div class="util-container-title">
                    <h3>
                        {{ title }}
                    </h3>

                    <p>
                        {{ description }}
                    </p>
                </div>
            </div>
            <div class="util-container-bottom">
                <UtilsTab 
                    title="Ввод данных" 
                    v-model:mode="mode" 
                    :enabled="true" 
                />

                <UtilsTab 
                    title="Результат" 
                    v-model:mode="mode" 
                    :enabled="data.headers || false" 
                />
            </div>
        </header>

        <div class="util-container-content">
            <ModalsControlForm 
                v-if="mode === 'Ввод данных'"
                :name="'Получение сигнатуры  ' + title"
                :model="'Signature ' + title"
                :api="new SignatureAPI('')"
                :params="params"
                :call="call"
                v-model:data="data"
                :styles="{ marginRight: '0px' }"
            />

            <div class="util-container-content result" v-else-if="mode === 'Результат' && data.headers">
                <BaseCode 
                    :headers="true"
                    v-model:data="data.headers"
                />

                <BaseCode 
                    :type="'text'"
                    :headers="true"
                    title="result"
                    v-model:data="data.result"
                />
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
    .util-container {
        display: flex;
        flex-direction: column;
        background-color: var(--secondary-color);
        border-radius: 10px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .util-container header {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .util-container header .util-container-top {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 20px;
        padding-bottom: 5px;
    }
    .util-container header .util-container-top .util-container-title {
        display: flex;
        flex-direction: column;
    }
    .util-container header .util-container-top .util-container-title h3 {
        font-size: 14px;
        font-weight: 700;
    }
    .util-container header .util-container-top .util-container-title p {
        font-size: 12px;
        font-weight: 500;
        opacity: .7;
    }
    .util-container header .util-container-top .util-container-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        padding: 5px;
        border-radius: 50%;
    }
    .util-container-icon img {
        width: 25px;
        height: 25px;
    }
    .util-container header .util-container-top .util-container-icon.default {
        background-color: var(--text-secondary);
        padding: 5px;
        border-radius: 50%;
        border: 2px solid var(--secondary-color);
    }
    .util-container header .util-container-top .util-container-icon .concurent-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
    }
    .util-container header .util-container-bottom {
        display: flex;
    }
    .util-container header .util-container-bottom button {
        flex: 1 1 50%;
        padding-bottom: 5px;
        border-bottom: 2px solid var(--secondary-color);
    }
    .util-container .util-container-content {
        padding: 15px;
        padding-top: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .util-container .util-container-content.result {
        flex: 1 1 auto;
        padding: 20px;
        background-color: var(--inversion-color);
        border-radius: 0 0 10px 10px;
        gap: 10px;
    }
</style>