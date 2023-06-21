import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, AppLayoutModule, PrimeNgModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MessageService,
    DialogService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
