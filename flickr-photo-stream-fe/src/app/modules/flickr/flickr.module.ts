import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlickrComponent } from './flickr/flickr.component';
import { SharedModule } from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule
  ],
  declarations: [FlickrComponent],
  exports: [FlickrComponent]
})
export class FlickrModule { }
