import { lazy, useEffect, useState, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PopupsContainer } from './popups-container';
import { emitEvent } from '@/shared/helpers/emitEvent';
import { ScrollLock } from '@/shared/lib/scroll';
import PopupError from '@/widgets/popups/ui/variant/error';

const bodyScrollLock = new ScrollLock();
export interface PopupComponent {
  variant: string
  data?: object & {
    isCloseAll?: boolean
    [x: string]: any
  }
  callbackFunc?: () => void

}

const popups: Record<string, any> = {
  error: lazy(() => import("./variant/error")),
  message: lazy(() => import("./variant/message")),
  video: lazy(() => import("./variant/video")),
}


export const Popups: FCClass = () => {
  const [popupList, setPopupList] = useState<PopupComponent[]>([]);

  const openPopup = (data: PopupComponent): void => {
    setPopupList((popupList) => {
      return [...popupList, {
        ...data,
      }];
    });
  }

  const closePopup = useCallback(() => {
    setPopupList((prevList) => prevList.slice(0, -1));
  }, []);

  const closeAllPopups = useCallback(() => {
    setPopupList([]);
  }, []);

  useEffect(() => {
    const listenerOpen = (event: CustomEvent<PopupComponent>): void => {
      openPopup(event.detail);
    }

    window.addEventListener('modalOpen', listenerOpen);

    return () => {
      window.removeEventListener('modalOpen', listenerOpen);
    }
  }, []);

  useEffect(() => {
    if (popupList.length > 0) {
      bodyScrollLock.lock()
    }

    const listenerClose = (): void => {
      emitEvent('closePopup', {
        index: popupList.length - 1,
      });
    }

    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        listenerClose();
      }
    }

    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('modalClose', listenerClose);

    return () => {
      if (popupList.length > 0) {
        bodyScrollLock.enable()
      }

      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('modalClose', listenerClose);
    }
  }, [popupList, closePopup]);

  return (
    popupList.map((popup, index) => {
      const LazyPopup = popups[popup.variant];

      return (
        <ErrorBoundary
          key={index}
          fallback={
            <PopupsContainer
              index={index}
              LazyPopup={() => <PopupError title={'ошибка модального окна'} isFallBack closePopup={closePopup}/>}
              closePopup={closePopup}
              closeAllPopups={closeAllPopups}
            />
          }
        >
          <PopupsContainer
            index={index}
            LazyPopup={LazyPopup}
            closePopup={closePopup}
            closeAllPopups={closeAllPopups}
            isCloseAll={popup?.data?.isCloseAll}
            callbackFunc={popup?.callbackFunc}
            {...popup.data}
          />
        </ErrorBoundary>
      )
    })
  );
}
