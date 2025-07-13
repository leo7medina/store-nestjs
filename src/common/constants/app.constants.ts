export class AppConstants {
    static readonly APP_ID = 'STORE_NESTJS'

    // Providers
    static readonly TASKS = 'TASKS';
    static readonly PG = 'PG';

    static readonly URLS = {
        TODOS: 'https://jsonplaceholder.typicode.com/todos'
    };

    // MaxLength field entities
    static readonly MAX_LENGTH = {
        BRAND: {
            NAME: 100,
            IMAGE: 255
        },
        CATEGORY: {
            NAME: 100
        },
        PRODUCT: {
            NAME: 255
        },
        CUSTOMER: {
            NAME: 255,
            LASTNAME: 255,
            PHONE: 15
        },
        USER: {
            EMAIL: 100,
            USERNAME: 20,
            PASSWORD: 255
        }
    };

    static readonly IS_PUBLIC = 'isPublic';
    static readonly ROLES_KEY = 'roles';
}
