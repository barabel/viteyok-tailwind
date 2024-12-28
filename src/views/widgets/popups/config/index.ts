import { createContext } from 'react';
import { type Localization } from '@/shared/helpers/localization';

export const LocaleContext = createContext<Localization | null>(null);
