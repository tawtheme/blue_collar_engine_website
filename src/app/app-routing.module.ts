import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineRequestDemoComponent } from './online-request-demo/online-request-demo.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FrontendLayoutComponent } from './shared/frontend-layout/frontend-layout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OnlineBookingSystemComponent } from './online-booking-system/online-booking-system.component';
import { BookingSystemComponent } from './booking-system/booking-system.component';
import { EstimateComponent } from './estimate/estimate.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  {
    path: '',
    component: FrontendLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full',
      },
      {
        path: 'online-request-demo',
        component: OnlineRequestDemoComponent,
      },
      {
        path: 'invoices',
        component: InvoiceComponent,
      },
      {
        path: 'estimates',
        component: EstimateComponent,
      },
      {
        path: 'online-booking-system',
        component: OnlineBookingSystemComponent,
      },
      {
        path: 'booking-system',
        component: BookingSystemComponent,
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'terms-of-service',
        component: TermsOfServiceComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'blog/:slug',
        component: BlogDetailsComponent,
      },
    ],
  },
  {
    path: 'home',
    component: FrontendLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
    ],
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
