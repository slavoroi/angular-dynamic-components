import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import 'hammerjs';

hljs.registerLanguage('javascript', javascript);

hljs.registerLanguage('html', html);

hljs.registerLanguage('css', css);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
