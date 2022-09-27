import {Injector} from '@angular/core';

/**
 * Allows for retrieving singletons using `AppInjector.get(MyService)`
 */
export let AppInjector: Injector;

export function setAppInjector(injector: Injector) {
    if (AppInjector) {
        // Should not happen
        console.error('Programming error: AppInjector was already set');
    } else {
        AppInjector = injector;
    }
}