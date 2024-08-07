﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ErrorInterceptor } from './_helpers';


import { OnlineRequestDemoComponent } from './online-request-demo/online-request-demo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoaderService } from './_services/loader.service';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material/material.module';
import * as moment from 'moment';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FrontendLayoutComponent } from './shared/frontend-layout/frontend-layout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgxStripeModule } from 'ngx-stripe';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OnlineBookingSystemComponent } from './online-booking-system/online-booking-system.component';
import { BookingSystemComponent } from './booking-system/booking-system.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { EstimateComponent } from './estimate/estimate.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

Date.prototype.toISOString = function () {
  return moment(this).format('YYYY-MM-DDTHH:mm:ss');
};
const matSnackbarDefaultConfig: MatSnackBarConfig = {
  verticalPosition: 'top',
  horizontalPosition: 'center',
  duration: 2000,
  panelClass: 'custom-snakbar',
};

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000, // 10 seconds
      closeButton: true,
      progressBar: true,
    }),
    NgbModule,
    MaterialModule,
    JwtModule,
    SharedModule,

    NgxStripeModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    OnlineRequestDemoComponent,
    ConfirmDialogComponent,
    HomePageComponent,
    FrontendLayoutComponent,
    PagenotfoundComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    AboutUsComponent,
    OnlineBookingSystemComponent,
    BookingSystemComponent,
    InvoiceComponent,
    EstimateComponent,
    BlogComponent,
    BlogDetailsComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: matSnackbarDefaultConfig },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    LoaderService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
