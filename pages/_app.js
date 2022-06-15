import '../styles/globals.css'
import '../styles/style.scss'
import '../styles/admin.scss'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services';
import { BehaviorSubject } from 'rxjs';
import { Toaster } from "react-hot-toast";


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

  async function authCheck(url) {
    const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    setAuthorized(false);

    if (!publicPaths.includes(path)) {
      const check_login = await userService.getLogin();
      console.log(check_login)


      if (check_login.status != 200) {
        userSubject.next(null);
        setAuthorized(false);
        router.push({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        });

      }else {

        setAuthorized(true);
      }

    } else {
      setAuthorized(true);
    }
  }
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<>
    {authorized && <Component {...pageProps} />}
    <Toaster position="bottom-right" />
  </>
  )
}

