import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; 
import { PhotostreamsService } from '../../../core/photostreams/photostreams.service';
import { Photostream } from '../../../shared/interfaces/photostream.interface';

@Component({
  selector: 'fps-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.scss']
})
export class FlickrComponent implements OnInit {
  public photoStreamList: Photostream[];

  constructor(private photostreamService: PhotostreamsService) { }

  public ngOnInit(): void {
    this.getPhotostreams();
  }

  public getPhotostreams(): void {
    this.photostreamService
      .getPhotostreams()
      .subscribe(photostreams => {
        if (photostreams) {
          this.photoStreamList = photostreams.result;
        }
      });
  }

  public getAuthorName(name: string): string {
    return name.substr(2, name.length - 4);
  }

}
