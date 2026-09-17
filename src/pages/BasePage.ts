import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly cookieAcceptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookieAcceptButton = page.getByRole('button', { name: 'Accept all' });
  }

  /**
   * Navigate to a path relative to the baseURL
   */
  async navigate(path: string = '/en'): Promise<void> {
    await this.page.goto(path);
    await this.acceptCookiesIfPresent();
  }

  /**
   * Dismiss cookie consent modal if it appears
   */
  async acceptCookiesIfPresent(): Promise<void> {
    try {
      if (await this.cookieAcceptButton.isVisible({ timeout: 2000 })) {
        await this.cookieAcceptButton.click();
      }
    } catch {
      // Cookie banner not present or already accepted
    }
  }

  /**
   * Get the current page title
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Get the current URL
   */
  getUrl(): string {
    return this.page.url();
  }
}
