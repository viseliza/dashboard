import type { SignatureStrategy } from "~/types";
import letual from '~/assets/images/logos/letual.svg';
import type { SignatureAPI } from "~/api";

export class Letual implements SignatureStrategy {
    getTitle() {
        return 'Летуаль';
    }

    getAPICall(api: SignatureAPI) {
        return api.letual;
    }

    getParams(args = null): Record<string, any> {
        return {
            'url': {
                example: 'https://api-v2.letu.ru/s/api/session/sessionConfirmationNumber',
                type: 'string',
                required: true,
            },
            'jsession': {
                example: '',
                type: 'string',
                required: false,
            },
            'ts': {
                example: '1719049200',
                type: 'number',
                required: false,
            },
        }
    }

    getDescription() {
        return 'Сигнатура для работы с API Летуаль';
    }

    getStyle() {
        return {
            icon: letual,
            color: '#0921ff'
        }
    }
}
