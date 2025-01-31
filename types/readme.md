# Папка Types #

> Папка, содержащая все типы и интерфейсы используемые в приложении

Пример структуры:

```
/types
    index.ts
    Auth.ts
    /Boo
        index.ts
        foo.ts
```

Пример использования:

```TypeScript
//types/index.ts
export type Boo = {
    name: string;
    age: number;
    email: string;
}
```