import { A2t4bPage } from './app.po';

describe('a2t4b App', () => {
  let page: A2t4bPage;

  beforeEach(() => {
    page = new A2t4bPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
