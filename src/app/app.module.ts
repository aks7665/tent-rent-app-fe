import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import * as fromAuth from './store/auth/auth.reducer';
import * as fromProduct from './store/product/product.reducer';
import * as fromCustomer from './store/customer/customer.reducer';
import * as fromInitialize from './store/initialize/initialize.reducer';
import * as fromTransaction from './store/transaction/transaction.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { CustomerEffects } from './store/customer/customer.effects';
import { ProductEffects } from './store/product/product.effects';
import { InitializeEffects } from './store/initialize/initialize.effects';
import { TransactionEffects } from './store/transaction/transaction.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthPageGuard } from './guards/auth-page.guard';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([
      AuthEffects,
      CustomerEffects,
      ProductEffects,
      InitializeEffects,
      TransactionEffects
    ]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.reducer),
    StoreModule.forFeature(fromCustomer.customerFeatureKey, fromCustomer.reducer),
    StoreModule.forFeature(fromInitialize.initializeFeatureKey, fromInitialize.reducer),
    StoreModule.forFeature(fromTransaction.transactionFeatureKey, fromTransaction.reducer)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    AuthGuard,
    AuthPageGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
