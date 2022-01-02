import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableMapSet } from 'immer';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

enableMapSet();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, { ngZoneEventCoalescing: true }).catch(err => console.error(err));
