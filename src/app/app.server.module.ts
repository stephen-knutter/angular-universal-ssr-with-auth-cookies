import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

export function getRequest() {
  const req = Zone.current.get('req') || {};
  return req; 
}
export function getResponse() {
  const res = Zone.current.get('res') || {};
  return res;
}
export function getCookies() {
 const req = getRequest();
 return req && req.cookies || null;
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule
  ],
  providers: [
    // Add universal-only providers here
    { provide: 'req', useFactory: getRequest },
    { provide: 'res', useFactory: getResponse },
    { provide: 'cookies', useFactory: getCookies },
  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule {}
