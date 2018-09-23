import { FlickrModule } from './flickr.module';

describe('FlickrModule', () => {
  let flickrModule: FlickrModule;

  beforeEach(() => {
    flickrModule = new FlickrModule();
  });

  it('should create an instance', () => {
    expect(flickrModule).toBeTruthy();
  });
});
