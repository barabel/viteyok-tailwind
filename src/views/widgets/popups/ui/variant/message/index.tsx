import type { TPopupChild } from '@/shared/lib/popups/types';
import { ReactButtonClose, ReactButton } from '@/shared/react/button';
import cn from 'classnames';

export interface TPopupMessage {
  title?: string
  description?: string
  buttonText?: string
}

const PopupMessage: TPopupChild<TPopupMessage> = ({
  className,
  title,
  description,
  buttonText,
  closePopup,
}) => {
  return (
    <div className={cn('relative  w-full h-full flex flex-col justify-center p-9.5 bg-blue-100 text-center t:w-120 t:h-200 t:py-22 t:px-17.5 xxl:p-22.5', className)}>
      <ReactButtonClose className='absolute top-4 right-4' onClick={closePopup}/>
      {title && <div className='text-black-100 mb-2 h1 t:mb-3'>
        {title}
      </div>}
      {description &&
          <div className='text-black-100 mb-12.5 t1 t:max-w-99.5'>
            {description}
          </div>}
      {buttonText && <ReactButton className='mx-auto' title={buttonText} onClick={closePopup}/>}
    </div>
  );
};

export default PopupMessage;
