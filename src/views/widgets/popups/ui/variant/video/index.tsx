import cn from 'classnames';
import { ReactButtonClose } from '@/shared/react/button';
import type { TPopupChild } from '@/shared/lib/popups/types';

interface IPopupVideo {
  videoUrl: string
}

const PopupVideo: TPopupChild<IPopupVideo> = ({
  className,
  videoUrl,
  closePopup,
}) => {
  return (
    <div className={cn('relative ', className)} >
      <ReactButtonClose className='absolute z-1 right-6 -top-16 t:-top-18 d:top-0 d:-right-18 xxl:-right-20' onClick={closePopup}/>
      <video
        controls
        src={videoUrl}
        preload="auto"
        muted
        autoPlay
        playsInline
      />
    </div>
  )
}

export default PopupVideo;
