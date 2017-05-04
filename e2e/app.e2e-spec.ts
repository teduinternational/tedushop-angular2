import { TedushopAngular2Page } from './app.po';

describe('tedushop-angular2 App', () => {
  let page: TedushopAngular2Page;

  beforeEach(() => {
    page = new TedushopAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
