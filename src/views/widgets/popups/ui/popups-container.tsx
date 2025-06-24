import { type MouseEventHandler, Suspense, useEffect, useRef, useState, useCallback } from 'react';
import cn from 'classnames';
import type { TPopupChild } from '@/shared/lib/popups/types';

enum VariantsStyles {
  hidden = 'invisible opacity-0 pointer-events-none',
  appearing = 'visible opacity-100 pointer-events-auto *:translate-x-0',
}

export interface TPopupsContainer {
  LazyPopup: TPopupChild
  index: number
  closePopup: () => void
  closeAllPopups: () => void
  isCloseAll?: boolean
  isBelow?: boolean
  callbackFunc?: () => void
}

export const PopupsContainer: FCClass<TPopupsContainer> = ({
  LazyPopup,
  index,
  closePopup,
  closeAllPopups,
  isCloseAll = false,
  callbackFunc,
  ...props
}) => {
  const popups = useRef(null);
  const timerRef = useRef<NodeJS.Timeout>(undefined);
  const [isAppearing, setAppearing] = useState(false);
  const durationClose = 300;

  useEffect(() => {
    const handleCloseEvent = (event: CustomEvent): void => {
      if (event.detail.index === index) {
        closeCurrentPopup();
      }
    }

    window.addEventListener('closePopup', handleCloseEvent);

    const appearanceTimeout = setTimeout(() => {
      setAppearing(true);
    }, 10);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(appearanceTimeout);
      window.removeEventListener('closePopup', handleCloseEvent);
    }
  }, [index]);

  const closeCurrentPopup = useCallback(() => {
    setAppearing(false);

    if (callbackFunc) {
      callbackFunc();
    }

    timerRef.current = setTimeout(() => {
      isCloseAll ? closeAllPopups() : closePopup();
    }, durationClose);
  }, [isCloseAll, closeAllPopups, closePopup]);

  const closeByOverlayClick: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    if (event.target === popups.current) {
      closeCurrentPopup();
    }
  }, [closeCurrentPopup])

  return (
    <div ref={popups} className={cn('fixed inset-0 h-dvh bg-black-100-60 flex flex-col',
      'justify-center items-center t:p-16 transition', {
      [VariantsStyles.hidden]: !isAppearing,
      [VariantsStyles.appearing]: isAppearing,
    })} onClick={closeByOverlayClick}>
      <div className={cn('w-full h-full relative z-(--z-popup) translate-x-full',
        't:flex t:items-center t:justify-center t:bg-transparent t:transform-none')}>
        <Suspense fallback={<></>}>
          <LazyPopup
            closePopup={closeCurrentPopup}
            {...props}
          />
        </Suspense>
      </div>
    </div>
  );
};
