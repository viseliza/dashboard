<script setup lang="ts">
import type { Proxy } from '~/models';

    const props = defineProps<{
        proxy: Proxy
    }>();

    const transformType = {
        'socks5': 'S5',
        'socks4': 'S4',
        'http': 'H',
        'https': 'Hs',
    }
</script>

<template>
    <div class="card-header">
        <div class="left">
            <div class="icon-type">
                <span>
                    {{ transformType[proxy.type] }}
                </span>
            </div>


            <section class="title">
                <h2 class="type">{{ proxy.type }}</h2>
                
                <TooltipsTextContent :style="{ 'max-width': '20ch' }">
                    <template #pretext>
                        {{ proxy.id }}
                    </template>
                </TooltipsTextContent>
            </section>
        </div>

        <div class="right">
            <div class="top-tags">
                <ProxiesTag 
                    :value="proxy.mode" 
                    background="#dce9fd"
                />

                <ProxiesTag 
                    value="checkInternet" 
                    :background="proxy.checkInternet ? 'rgba(var(--accept-color-rgb), 0.2)' : 'rgba(var(--delete-color-rgb), 0.15)'"
                    :isBoolean="proxy.checkInternet"
                />
            </div>

            <div class="bottom-tags">
                <ProxiesTag 
                    value="enable" 
                    :background="proxy.enable ? 'rgba(var(--accept-color-rgb), 0.2)' : 'rgba(var(--delete-color-rgb), 0.15)'"
                    :isBoolean="proxy.enable"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 15px;
        border-bottom: 1px solid var(--secondary-color);
    }
    .card-header .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        position: relative;
    }
    .card-header .left .icon-type {
        width: 40px;
        height: 40px;
        border: 1px solid var(--text-secondary);
        box-shadow: 
            rgba(50, 50, 93, 0.15) 0px calc(30px / 8) calc(60px / 8) calc(-12px / 8) inset, 
            rgba(0, 0, 0, 0.2) calc(0px / 8) calc(18px / 8) calc(36px / 8) calc(-18px / 8) inset;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-header .left .icon-type span {
        font-weight: 700;
        color: var(--text-secondary);
    }
    .card-header .left .title {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        gap: 5px;
    }
    .card-header .left .title .type {
        font-weight: 700;
    }
    .card-header .right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 5px;
    }
    .card-header .right .top-tags {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
    .card-header .right .bottom-tags {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
</style>