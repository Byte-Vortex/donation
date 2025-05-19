import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
export async function SeoScripts() {

  return (
    <>

      {/* info@hkm G4A */}
      <GoogleAnalytics gaId='G-CEN4632TKZ'  />

      {/* info@hkm GTM */}
      <GoogleTagManager gtmId='GTM-K9KKCC4W' />


      {/* JSM Meta Pixel Tag */}
      <Script
        id='jsm meta pixel'
        dangerouslySetInnerHTML={{
          __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1607080606725750');
                fbq('track', 'PageView');
                `
        }}
      />

      <Script
        id="google-tag-manager-data-layer"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];`
        }}
      />

      {/* <SeoScriptsClient initialData={initialData} /> */}


    </>
  )
}