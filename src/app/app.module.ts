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
import { ErrorHandlerComponent } from './error/error-handler/error-handler.component';

const rollbarConfig = {
  accessToken: '84bd779018134de7a01a92433fe3a732',
  captureUncaught: true,
  captureUnhandledRejections: true,
  client: {
    javascript: {
      source_map_enabled: true,
      code_version: "10.1",
      guess_uncaught_frames: true,
    },
    environment:'production'
  },
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
  declarations: [ AppComponent, ErrorHandlerComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory }
  ]
})
export class AppModule { }
