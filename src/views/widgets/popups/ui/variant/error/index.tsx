import { useContext } from 'react';
import { LocaleContext } from '@/widgets/popups/config';
import PopupMessage from '@/widgets/popups/ui/variant/message';
import type { TPopupChild } from '@/shared/lib/popups/types';

export interface TPopupError {
  title?: string
  isFallBack?: boolean
}

const PopupError: TPopupChild<TPopupError> = ({
  className,
  closePopup,
  title,
  isFallBack = false,
}) => {
  const locale = useContext(LocaleContext);

  return (
    <PopupMessage
      className={className}
      closePopup={closePopup}
      title={title ?? locale?.getTranslate('titleError')}
      description={!isFallBack ? locale?.getTranslate('descriptionError') : undefined}
      buttonText={!isFallBack ? locale?.getTranslate('buttonTextError') : undefined}
    />
  );
};

export default PopupError;
