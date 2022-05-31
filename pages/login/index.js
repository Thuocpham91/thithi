import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Link from 'next/link'
import styles from '../../styles/Login.module.scss'
import Divider from '@mui/material/Divider';
import Image from 'next/image'
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/router';
import Head from 'next/head'


import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { userService } from '../../services';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';



const drawerBleeding = 0;
const Root = styled('div')(({ theme }) => ({
    height: '100%',
    borderRadius: '8px 8px 0 0',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));


const Login = (props) => {

    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, []);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { window } = props;
    const [openRules, setOpenRules] = useState(false);
    const [initValue, setiInitValuee] = React.useState({
        password: '12',
        lastName: 'has',
        email: 'phamvuthuoc@gmail.com',
    });


    const toggleDrawer = (newOpen) => () => {
        setOpenRules(newOpen);
    };

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <>
        <Head>
            <title>Đăng nhập</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="robots" content="noindex" />
            <meta property="og:title" content="Khatoco" />
            <meta property="og:description" content="Conng ty Khatoco" />
            <meta property="og:site_name" content="Khatoco" />
        </Head>
            <div className='main-body'>
                <div className={styles.mainLogin}>
                    <div className={styles.titleLogin}>
                        <h3 className='mb-2 text-2xl'>Xin kính chào Quý đại lý!</h3>
                        <p>Quý đại lý vui lòng đăng nhập để tham gia đặt hàng qua Zalo</p>
                    </div>
                    <div className='form-login'>
                        {/* <form onSubmit={formik.handleSubmit} className='mt-10'> */}

                        <Formik
                            initialValues={initValue}
                            // validationSchema={SignupSchema}
                            onSubmit={values => {
                                return userService.login(values.email, values.password)
                                .then(() => {
                                    // get return url from query parameters or default to '/'
                                    const returnUrl = router.query.returnUrl || '/';
                                    router.push(returnUrl);
                                })
                                .catch(error => {
                                    console.log(error)
                                    // setError('apiError', { message: error });
                                });
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className='mt-10'>
                                    <div className="mb-4">
                                        <label className="block text-black text-sm mb-2" htmlFor="username">
                                            Tài khoản
                                        </label>
                                        <input className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email"
                                            name="email" placeholder="Nhập email" />
                                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-black text-sm mb-2" htmlFor="password">
                                            Mật khẩu
                                        </label>
                                        <input className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" />
                                        {errors.password && touched.password ? <div>{errors.password}</div> : null}
                                    </div>
                                    <Link href="/">
                                        <a className='underline text-xs text-[#23432E]'>Quên mật khẩu?</a>
                                    </Link>
                                    <div className='mt-4'>
                                        <Button
                                            type="submit"
                                            style={{ background: '#23432E', borderRadius: 8, padding: 15 }}
                                            className='w-full' variant="contained"  ><span className=' text-base font-semibold'>ĐĂNG NHẬP</span>
                                        </Button>
                                        <Divider className='my-5' style={{marginTop:'1.25rem !important',marginBottom:'1.25rem !important'}} />
                                        <Button className={styles.butonZalo}>
                                            <span className="mr-2" style={{ height: 34 }}>
                                                <Image
                                                    alt="Zalo Login"
                                                    src="/images/zalo-icon.png"
                                                    width={36}
                                                    height={34}
                                                />
                                            </span>
                                            Đăng nhập bằng Zalo</Button>
                                    </div>





                                </Form>
                            )}



                        </Formik>
                        {/* </form> */}
                    </div>
                </div>
                <div className={styles.rules}>
                    <Checkbox {...label} defaultChecked />
                    <div>Tôi đã đọc và đồng ý với <strong onClick={toggleDrawer(true)} className='text-[#23432E] cursor-pointer'>Điều khoản sử dụng</strong></div>

                    <Root>
                        <CssBaseline />
                        <Global
                            styles={{
                                '.MuiDrawer-root > .MuiPaper-root': {
                                    height: `calc(70% - ${drawerBleeding}px)`,
                                    overflow: 'visible',
                                },
                            }}
                        />

                        <SwipeableDrawer
                            container={container}
                            anchor="bottom"
                            open={openRules}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                            swipeAreaWidth={drawerBleeding}
                            disableSwipeToOpen={false}
                            ModalProps={{
                                keepMounted: true,
                            }}
                        >
                            <div className={styles.rulesMain}>
                                <div className={styles.rulesTitle}>Điều khoản sử dụng dịch vụ</div>
                                <div className={styles.rulesContent}>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel a egestas elementum, adipiscing. Urna rutrum at at eu molestie. Eros, vestibulum scelerisque tellus nibh non nunc sit. Fermentum, nunc sit dapibus euismod tempus dui erat egestas. Ullamcorper lorem orci ac nunc scelerisque congue. Montes, feugiat fames at quis in aliquet suspendisse. Adipiscing neque massa in ut tempus lectus semper id. Ullamcorper pellentesque nam in mattis et ipsum, semper. Erat enim sed auctor magnis adipiscing ipsum vestibulum mauris. Aliquet leo egestas vulputate turpis diam sed.</p>
                                    <p>Quam at congue aliquet mollis. Vel congue a, eros, at commodo imperdiet. Nec, diam, sit turpis ornare fermentum lacus, amet justo, diam. Nec feugiat diam, nullam cursus quis. Imperdiet blandit ac malesuada mollis magna tortor cursus tortor. Nam enim, vitae, in ornare malesuada phasellus maecenas in vulputate. Vitae venenatis potenti lorem eget tincidunt nunc vel eget.</p>
                                </div>
                                <Button onClick={toggleDrawer(false)} style={{ background: '#23432E', borderRadius: 8, padding: 15, margin: '0 15px', width: 'calc(100% - 30px)' }} variant="contained"><span className=' text-base font-semibold'>Đóng</span></Button>
                            </div>

                        </SwipeableDrawer>
                    </Root>

                </div>
            </div>






        </>
    )
}
Login.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
export default Login
