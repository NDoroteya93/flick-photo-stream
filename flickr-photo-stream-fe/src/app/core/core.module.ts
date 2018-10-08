import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './api/api.service';
import { PhotostreamsService } from './photostreams/photostreams.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    HttpService,
    PhotostreamsService, 
    AuthService
  ]
})
export class CoreModule { }
