// components/FacebookSDKLoader.tsx
'use client';

import { useEffect } from 'react';

const FacebookSDKLoader = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0&appId=YOUR_APP_ID';

      if (!document.getElementById('facebook-jssdk')) {
        document.body.appendChild(script);
      }
    }
  }, []);

  return null;
};

export default FacebookSDKLoader;