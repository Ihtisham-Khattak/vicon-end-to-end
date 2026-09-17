import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LandingPage extends BasePage {
  readonly signInLink: Locator;
  readonly homeLink: Locator;
  readonly howItWorksLink: Locator;
  readonly resultsLink: Locator;
  readonly blogLink: Locator;
  readonly professionalsLink: Locator;
  readonly helpLink: Locator;
  readonly heroHeading: Locator;
  readonly tryItLink: Locator;

  constructor(page: Page) {
    super(page);
    this.signInLink = page.getByRole('link', { name: 'Sign In' });
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.howItWorksLink = page.getByRole('link', { name: 'How it works' });
    this.resultsLink = page.getByRole('link', { name: 'Results' });
    this.blogLink = page.getByRole('link', { name: 'Blog' });
    this.professionalsLink = page.getByRole('link', { name: 'Professionals' });
    this.helpLink = page.getByRole('link', { name: 'Help' });
    this.heroHeading = page.getByRole('heading', { name: 'VICON Method Stimulate language' });
    this.tryItLink = page.getByRole('link', { name: 'I Want to try it' });
  }

  /**
   * Navigate directly to the landing page
   */
  async goto(): Promise<void> {
    await this.navigate('/en');
  }

  /**
   * Click Sign In to navigate to the login page
   */
  async clickSignIn(): Promise<void> {
    await this.signInLink.click();
    await this.page.waitForURL('**/login');
  }
}
