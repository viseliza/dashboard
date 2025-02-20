<script lang="ts" setup>
    import { DateConvert } from '~/utils';
    const activeTab = shallowRef('3');
    const route = useRoute();
    const router = useRouter();

    const dateConvert = new DateConvert();

    watch(activeTab, () => {
        const queries = route.query;
        const period = dateConvert.convert(activeTab.value);

        delete queries['from_timestamp'];
        delete queries['to_timestamp'];
        
        const result = {
            ...queries,
            ...period
        };
        
        router.push({
            path: route.path,
            query: { ...result }
        });
    });
</script>


<template>
    <section>
        <input v-model="activeTab" type="radio" id="day" value="1" name="tractor" />    
        <input v-model="activeTab" type="radio" id="weak" value="2" name="tractor" />      
        <input v-model="activeTab" type="radio" id="month" value="3" name="tractor" />
        <input v-model="activeTab" type="radio" id="year" value="4" name="tractor" />
        
        <nav>   
            <label for="day">День</label>
            <label for="weak">Неделя</label>
            <label for="month">Месяц</label>
            <label for="year">Год</label>
        </nav>
    </section>
</template>


<style scoped>
    section {
        display: flex;
        padding: 4px;
        background-color: var(--secondary-color);
        border-radius: 15px;
    }
    nav {
        border-radius: 13px;
        width: 250px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    nav:after {
        content:'';
        width: 25%;
        height: 100%;
        border-radius: 12px;
        background: var(--inversion-color);
        position: absolute;
        transition: .5s;
    }
    input {
        display: none;
    }
    label {
        width: 25%;
        float: left;
        text-align: center;
        cursor: pointer;
        opacity: .5;
        transition: .5s;
        z-index: 2;
    }
    label:hover {
        opacity: .8;    
    }
    #day:checked ~ nav [for='day'],
    #weak:checked ~ nav [for='weak'],
    #month:checked ~ nav [for='month'],
    #year:checked ~ nav [for='year'] {
        opacity: 1;
    }

    #day:checked ~ nav:after {
        left: 0;
    }
    #weak:checked ~ nav:after {
        left:25%;
        border-top: 0 none;
    }
    #month:checked ~ nav:after {
        left: 50%;
    }
    #year:checked ~ nav:after {
        left: 75%;
    }

</style>