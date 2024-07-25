// hooks/useFaviconBadge.js
import { useEffect } from 'react';

const useFaviconBadge = (count:number) => {
  useEffect(() => {
    if(count === 0) return;
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!favicon) return;

    const faviconSize = 32;
    const canvas = document.createElement('canvas');

    canvas.width = faviconSize;
    canvas.height = faviconSize;

    const context = canvas.getContext('2d');
    if(!context) return;
    const img = document.createElement('img');

    const createBadge = () => {
      context.drawImage(img, 0, 0, faviconSize, faviconSize);

      context.beginPath();
      context.arc(canvas.width - faviconSize / 3, faviconSize / 3, faviconSize / 3, 0, 2 * Math.PI);
      context.fillStyle = '#e30';
      context.fill();

      context.font = '15px Arial, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#fff';
      context.fillText(count.toString(), canvas.width - faviconSize / 3, faviconSize / 3);

      favicon.href = canvas.toDataURL('image/png');
    };

    img.addEventListener('load', createBadge);

    img.src = favicon.href;
  }, [count]);
};

export default useFaviconBadge;
