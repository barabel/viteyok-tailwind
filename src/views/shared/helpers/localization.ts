export class Localization {
  private readonly locale: Record<string, string> | undefined;

  constructor() {
    if (window.localeInst) {
      return window.localeInst;
    }

    const localeScript = document.getElementById('locale');

    if (localeScript) {
      const localeText = localeScript.textContent;

      if (localeText) {
        this.locale = JSON.parse(localeText);
      }
    }

    window.localeInst = this;
  }

  public getTranslate(key: string): string {
    if (!this.locale) return key;

    if (this.locale[key]) {
      return this.locale[key];
    }

    return key;
  }
}
