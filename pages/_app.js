import '../styles/globals.css'
import '../styles/style.scss'
import '../styles/admin.scss'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services';

export default MyApp;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {

    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck)



    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    console.log(userService.userValue)
    if ( !userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<>
    {authorized && <Component {...pageProps} />}
  </>
  )
}

