import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { MaterialModule } from './materials/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './component/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, FilterComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
