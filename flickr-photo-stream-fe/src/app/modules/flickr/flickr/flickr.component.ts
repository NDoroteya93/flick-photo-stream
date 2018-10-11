import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PhotostreamsService } from '../../../core/photostreams/photostreams.service';
import { Photostream } from '../../../shared/interfaces/photostream.interface';
import { Subject } from 'rxjs';


@Component({
  selector: 'fps-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.scss'], 
  encapsulation: ViewEncapsulation.None
})
export class FlickrComponent implements OnInit {
  public photoStreamList: Photostream[];
  
  private term$ = new Subject<string>();

  constructor(private photostreamService: PhotostreamsService) {
    this.term$.subscribe(term => this.search(term));
  }

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

  public getPhotostreamDescription(description: string): string[] {
    const regex = /<p>.*?<\/p\>/g;

    return description.match(regex)
      .filter(text => text.indexOf('img') === -1 ? true : false);
  }

  public searchByTagName(term: string): void {
    this.term$.next(term);
  }

  private search(term: string): void { 
    this.photostreamService.searchByTag(term)
      .subscribe(data => this.photoStreamList = data.result);
  }

}
