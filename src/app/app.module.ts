import * as Rollbar from 'rollbar'; // When using Typescript < 3.6.0.
// `import Rollbar from 'rollbar';` is the required syntax for Typescript 3.6.x.
// However, it will only work when setting either `allowSyntheticDefaultImports`
// or `esModuleInterop` in your Typescript options.

import { BrowserModule } from '@angular/platform-browser';
import {
  Injectable,
  Injector,
  InjectionToken,
  NgModule,
  ErrorHandler, Inject
} from '@angular/core';
import { AppComponent } from './app.component';

const rollbarConfig = {
  enabled:true,
  accessToken: 'c0cce9fd8f6a44aa8f18a93dfb97be87',
  captureUncaught:true,
  client: {
    javascript: {
      source_map_enabled: true,
      code_version: "3.5",
      guess_uncaught_frames: true,
    },
  },
  environment: 'production'
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

  handleError(err:any) : void {
    this.rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory }
  ]
})
export class AppModule { }
