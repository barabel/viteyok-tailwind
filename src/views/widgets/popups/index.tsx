import { createRoot } from 'react-dom/client';
import { Popups } from './ui/popups';
import { Localization } from '@/shared/helpers/localization';
import { LocaleContext } from './config';

export class InitPopups {
  constructor() {
    const popups = document.getElementById('popups');

    if (popups) {
      this.renderPopups(popups);
    }
  }

  renderPopups(popups: HTMLElement): void {
    popups.innerHTML = '';
    const instLocale = new Localization();
    const popupsRoot = createRoot(popups);

    popupsRoot.render(
      <LocaleContext.Provider value={instLocale}>
        <Popups />
      </LocaleContext.Provider>,
    );
  }
}
