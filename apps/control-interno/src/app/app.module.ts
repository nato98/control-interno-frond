// Angular
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Libs
import { CoreModule, InterceptorService } from '@unicauca/core';
import { AuthModule } from '@unicauca/auth';
import { LayoutAppModule } from '@unicauca/layout';
import { AppRoutingModule } from './app.routing.module';

// Components
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    LayoutAppModule,
    CoreModule.forRoot(),
    AuthModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
