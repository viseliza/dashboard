/** Интерфейс описывающий поля компонента инпута
 * @param  {string} modelValue - значение вводимого текста
 * @param  {string | undefined} label - название поля инпута
 */
export interface InputProps {
    modelValue: string;
    label?: string;
}