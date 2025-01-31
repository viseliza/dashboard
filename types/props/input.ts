/** Интерфейс описывающий поля компонента инпута
 * @param  {string} modelValue - значение вводимого текста
 * @param  {string | undefined} label - название поля инпута
 * @param  {InputType} inputType - тип инпута
 */
export interface InputProps {
    modelValue: string;
    label?: string;
}

export interface InputTypeProps {
    inputType: InputType;
}

export type InputType = 'password' | 'text';
