<script lang="ts" setup>
    type Checkboxes = {
        auth: boolean;
        update: boolean;
    }
    type Props = {   
        style?: Record<string, string>;
        checkboxes: Checkboxes;
        toggle: boolean;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['error']);

    const model = defineModel<string>('model');
    const active = shallowRef(false);
    const error = shallowRef<boolean>(false);
    const template = defineModel<string>('template');

    const rules = computed(() => ({
        'host': 'string',
        'port': 'number',
        'username': 'string',
        'password': 'string',
        'link': 'string',
        'seconds': 'number',
    }));

    const params = computed(() => {
        return template.value?.split(':').reduce((acc: Record<string, any>, item: string, index: number) => {
            const key = item.toLowerCase();
            const type = rules.value[key as keyof typeof rules.value];
            const value = model.value?.split(':')[index] ?? '';
            const checked = typeof value === type;
            
            if (!checked) error.value = true;

            acc[key] = {
                type: type,
                value: value,
                checked: checked,
            };
            return acc;
        }, {});
    });

    const models = reactive(params.value ?? {});

    watch(template, (value) => {
        Object.keys(models).forEach(key => {
            delete models[key];
        });

        Object.assign(models, params.value);
    });

    const fields = computed(() => {
        return Object.keys(models).reduce((acc: Record<string, any>, key: string) => {
            const index = template.value?.split(':').indexOf(key.toUpperCase()) ?? 0;
            acc[key] = model.value?.split(':')[index];
            return acc;
        }, {});
    });

    const validate = () => {
        const splited = model.value?.split(':').map((item: string) => item.trim());
        error.value = splited?.length !== template.value?.split(':').length;
        emit('error', error.value);
    }

    watch(models, (value) => {
        error.value = false;
        Object.keys(value).forEach(key => {
            if (!value[key as keyof typeof value].checked)
                error.value = true;
            if (fields.value[key as any] === undefined)
                error.value = true;
        });
        emit('error', error.value);
    });
</script>

<template>
    <ModalsControlManyField :active="active" :error="error">
        <template #checkboxes>
            <ModalsControlManyCheckbox 
                v-for="key in Object.keys(checkboxes)"
                :key="key"
                :name="key" 
                v-model="checkboxes[key as keyof Checkboxes]"
            />
        </template>

        <template #input>
            <input 
                @input="validate"
                @focus="active = true"
                @blur="active = false"
                class="input"
                :class="{ 'error-input': error }"
                type="text" 
                v-model="model"
                :placeholder="template"
            />
        </template>

        <template #content>
            <TooltipsFieldCheckbox 
                v-for="item in Object.keys(models)"
                :key="item"
                :item="item"
                top="12px"
                :rule="rules[item as keyof typeof rules]"
                :field="fields[item as keyof typeof fields]"
                v-model="models[item as keyof typeof models].checked"
            />
        </template>
    </ModalsControlManyField>
</template>

<style scoped>
    .input {
        outline: none;
        font-weight: 700;
        font-size: 14px;
        caret-color: var(--active-color);
        caret-shape:bar;
        padding: 5px 10px;
        border-radius: 15px;
        width: 100%;
        transition: all 0.3s ease-in-out;
    }
</style>