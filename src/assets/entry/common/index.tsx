import { InitPopups } from '@/widgets/popups';
import { saveUTM } from '@/shared/helpers/saveUTM';

new InitPopups();

// Записывает utm-метки в сессию
try {
  if (!sessionStorage.getItem('utm')) {
    saveUTM();
  }
} catch (e) {
  console.error(e);
}
