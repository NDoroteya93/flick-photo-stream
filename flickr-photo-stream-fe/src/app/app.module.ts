import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './modules/layout/layout.module';
import { UsersModule } from './modules/users/users.module';
import { FlickrModule } from './modules/flickr/flickr.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    UsersModule,
    FlickrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
