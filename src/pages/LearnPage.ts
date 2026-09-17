import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LearnPage extends BasePage {
  readonly userDropdown: Locator;
  readonly userName: Locator;
  readonly logoutButton: Locator;
  readonly myVideosLink: Locator;
  readonly trainingLink: Locator;
  readonly myTherapistLink: Locator;
  readonly learnLink: Locator;
  readonly profileLink: Locator;

  constructor(page: Page) {
    super(page);
    this.userDropdown = page.locator('[data-test="dropdown-header"] button');
    this.userName = page.locator('[data-test="logged-name"]');
    this.logoutButton = page.locator('[data-test="btn-logout"]');
    this.myVideosLink = page.getByRole('link', { name: 'My videos' });
    this.trainingLink = page.getByRole('link', { name: 'Training' });
    this.myTherapistLink = page.getByRole('link', { name: 'My therapist' });
    this.learnLink = page.getByRole('link', { name: 'Learn' });
    this.profileLink = page.getByRole('link', { name: 'My profile' });
  }

  /**
   * Navigate directly to the learn dashboard
   */
  async goto(): Promise<void> {
    await this.navigate('/en/method/learn');
  }

  /**
   * Open the user profile dropdown
   */
  async openUserDropdown(): Promise<void> {
    await this.userDropdown.click();
    await this.logoutButton.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Click the logout button inside the user dropdown
   */
  async logout(): Promise<void> {
    await this.openUserDropdown();
    await this.logoutButton.click();
    await this.page.waitForURL('**/login', { timeout: 10000 });
  }

  /**
   * Get the logged-in user name
   */
  async getLoggedInUserName(): Promise<string> {
    return (await this.userName.textContent())?.trim() || '';
  }

  /**
   * Navigate to My Videos
   */
  async navigateToVideos(): Promise<void> {
    await this.myVideosLink.click();
    await this.page.waitForURL('**/myvideos');
  }

  /**
   * Check if a specific level is visible on the learning map
   */
  async isLevelVisible(levelName: string): Promise<boolean> {
    return this.page.locator(`text=${levelName}`).first().isVisible();
  }
}
