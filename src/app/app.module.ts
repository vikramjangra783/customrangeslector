import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MovableDirective } from './app-movable.directive';
import { RangeDirective } from './range.directive';
import { MovableBoundryDirective } from './app-movable-boundary.directive';



@NgModule({
  declarations: [
    AppComponent,
    MovableBoundryDirective,
    MovableDirective,
    RangeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
