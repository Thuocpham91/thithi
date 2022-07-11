import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import { productService } from '../../../services/product.service';

import { useSelector, useDispatch } from 'react-redux';
import { incrementCount } from '../../../Store/actions'


import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const MainHome = () => {
    const [listProduct, setListProduct] = useState([]);
    const [orderList, setOrderList] = useState(false);

    const count = useSelector((state) => state.counter);
    const searchProduct = useSelector((state) => state.showProduct);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        async function fetchData() {

            let dkm = [];
            if (count != -1 || searchProduct != -1) {
                let dataad = localStorage.getItem('listProduct');
                dkm = JSON.parse(dataad);

                if (searchProduct != -1) {
                    dkm = dkm.filter(item => {
                        return item.variants[0].category.code == searchProduct.code;
                    })
                }

            } else {

                let data = await productService.getProduct();
                if (data.status != 200) return;
                data = JSON.parse(data.data);

                dkm = data.variants;
                let data_user = JSON.parse(localStorage.getItem('user'));

                let idstore = data_user.data.id_store;

                let listfintell = dkm.filter(item => {
                    let kmj = item.variants[0].inventories;
                    const check = kmj.find(item => { return item.store_id == idstore });
                    if (check) return item;
                });
                dkm = listfintell.reverse();

                localStorage.setItem('listProduct', JSON.stringify(listfintell));
                localStorage.setItem('listVariants', JSON.stringify(listfintell));

            }
            setListProduct(dkm);

            const check = dkm.find(item => { return item.numberPackage > 0 || item.numberTobacco > 0 || item.numberBarrel > 0 });
            if (check) setOrderList(true);
            if (!check) setOrderList(false);
            // setOrderList(dkm);


        }
        fetchData();

    }, [count, searchProduct]);


    const updateArray = (listOder) => {
        let dataTotal = localStorage.getItem('listProduct');
        let dkm = JSON.parse(dataTotal);

        const kFix = dkm.map(ils => {
            let im = ils;
            let kmm = listOder.find(itemsd => { return ils.product_id == itemsd.product_id });
            if (kmm) im = kmm;
            return im;
        });
        localStorage.setItem('listProduct', JSON.stringify(kFix));

        const cont = kFix.find(item => { return item.numberPackage > 0 || item.numberTobacco > 0 || item.numberBarrel > 0 });
        if (cont) setOrderList(true);
        if (!cont) setOrderList(false);

    }


    const minusNumber = (data, type) => {
        const newArray = minusFunc(listProduct, data, type);
        setListProduct(newArray);
        updateArray(newArray);
    }

    const plusNumber = (data, type) => {
        const newArray = plusFunc(listProduct, data, type);
        setListProduct(newArray);
        updateArray(newArray)
    }

    const minusFunc = (array, data, type) => {
        const newArray = [];
        array.map(function (item, idx) {
            let it = item;
            if (item.product_id === data.product_id) {
                if (type == "package") {
                    let count = item.numberPackage || 0;
                    if (count > 0) {
                        count = Number(count) - 1;
                        it = { ...it, numberPackage: count };
                    }
                }
                if (type == "tobacco") {
                    let count = item.numberTobacco || 0;
                    if (count > 0) {
                        count = Number(count) - 1;
                        it = { ...it, numberTobacco: count };
                    }
                }
                if (type == "barrel") {
                    let count = item.numberBarrel || 0;
                    if (count > 0) {
                        count = Number(count) - 1;
                        it = { ...it, numberBarrel: count };
                    }
                }
            }
            newArray.push(it)
        })
        return newArray
    }



    const plusFunc = (array, data, type) => {
        const newArray = [];
        array.map(function (item, idx) {
            let it = item;
            if (item.product_id === data.product_id) {
                if (type == "package") {
                    let count = item.numberPackage || 0;
                    count = Number(count) + 1;
                    it = { ...it, numberPackage: count };
                }
                if (type == "tobacco") {
                    let count = item.numberTobacco || 0;
                    count = Number(count) + 1;
                    it = { ...it, numberTobacco: count };
                }
                if (type == "barrel") {
                    let count = item.numberBarrel || 0;
                    count = Number(count) + 1;
                    it = { ...it, numberBarrel: count };
                }
            }
            newArray.push(it)
        })
        return newArray
    }


    const router = useRouter();
    const handleLink = (link) => {
        // const mns=listProduct.filter(item=>{return item.numberPackage>0 ||  item.numberTobacco>0||  item.numberBarrel>0})
        // localStorage.setItem('listProduct', JSON.stringify(listProduct));
        dispatch(incrementCount());
        router.push({ pathname: link });
    }


    const ShowGoi = ({ d }) => {
        return (<>
            <div className="product-item">
                <div className='product-item--img'>
                    <span>
                        <Image
                            unoptimized
                            alt={d.product_name}
                            src={d.variants[0].photo[0] ? d.variants[0].photo[0].url : "/images/default.jpg"}
                            layout='fill'
                            objectFit='contain'
                            quality={100}
                        />
                    </span>
                </div>
                <div className='product-item--title'>

                    <div style={{fontSize:16, fontWeight:"bold"}}>
                        {d.product_name}
                    </div>

                    <p>Gói</p>
                </div>
                {d.total_quantity == 0 && <>
                    <div className='product-item--hh text-[#ff0000]'>Tạm hết</div>
                </>}
                {d.total_quantity > 0 && <>
                    <div className='product-item--number flex justify-center items-center'>
                        <button onClick={e => minusNumber(d, 'package')}>-</button>
                        <div className="text-[#ff0000]">
                            {d.numberPackage > 0 ? d.numberPackage : ''}
                        </div>
                        <button onClick={e => plusNumber(d, 'package')}>+</button>
                    </div>
                </>}
            </div>

        </>)

    }



    const ShowCay = ({ d }) => {

        return (<>
            <div className="product-item">
                <div className='product-item--img'>
                    <span>
                        <Image
                            unoptimized
                            alt={d.title}
                            src={d.variants[0].photo[0] ? d.variants[0].photo[1].url : "/images/default.jpg"}
                            layout='fill'
                            objectFit='contain'
                            quality={100}
                        />
                    </span>
                </div>
                <div className='product-item--title'>
                    <div style={{fontSize:16, fontWeight:"bold"}}>
                        {d.product_name}
                    </div>
                    <p>Cây (10 Gói)</p>
                </div>
                {d.total_quantity == 0 && <>
                    <div className='product-item--hh text-[#ff0000]'>Tạm hết</div>
                </>}
                {d.total_quantity > 0 && <>
                    <div className='product-item--number flex justify-center items-center'>
                        <button onClick={e => minusNumber(d, 'tobacco')}>-</button>
                        <div className="text-[#ff0000]">
                            {d.numberTobacco > 0 ? d.numberTobacco : ''}
                        </div>
                        <button onClick={e => plusNumber(d, 'tobacco')}>+</button>
                    </div>
                </>}
            </div>

        </>)
    }

    const ShowDiv = ({ d }) => {



        return (<>

            <div></div>


        </>)


    }


    const ShowThung = ({ d }) => {


        return (<>

            < div className="product-item" >
                <div className='product-item--img'>
                    <span>
                        <Image
                            unoptimized
                            alt={d.product_name}
                            src={d.variants[0].photo.length > 2 ? d.variants[0].photo[2].url : "/images/default.jpg"}
                            layout='fill'
                            objectFit='contain'
                            quality={100}
                        />
                    </span>
                </div>
                <div className='product-item--title'>

                    <div style={{fontSize:16, fontWeight:"bold"}}>
                        {d.product_name}
                    </div>

                    <p>Thùng (500 Gói)</p>
                </div>
                {
                    d.total_quantity == 0 && <>
                        <div className='product-item--hh text-[#ff0000]'>Tạm hết</div>
                    </>
                }
                {
                    d.total_quantity > 0 && <>
                        <div className='product-item--number flex justify-center items-center'>
                            <button onClick={e => minusNumber(d, 'barrel')}>-</button>
                            <div className="text-[#ff0000]">
                                {d.numberBarrel > 0 ? d.numberBarrel : ''}
                            </div>
                            <button onClick={e => plusNumber(d, 'barrel')}>+</button>
                        </div>
                    </>
                }

            </div >



        </>)




    }

    return (<>


        <div className="main-home--home">
            <div className='list-product'>
                {listProduct.map(function (d, idx) {
                    return (
                        <div key={idx} className="product-main grid grid-cols-3 gap-4">
                            <ShowGoi d={d}></ShowGoi>
                            <ShowCay d={d}></ShowCay>
                            <ShowThung d={d}></ShowThung>
                        </div>
                    )
                })}

                {listProduct.length < 2 ? <ShowDiv /> : ""}
            </div>
        </div>

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10000 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        {orderList && <>
            <div className='oder-button'><Button onClick={e => handleLink('/cart')} style={{ background: '#23432E', borderRadius: 8, padding: 15, margin: '0 15px', width: 'calc(100% - 30px)' }} variant="contained"><span className=' text-base font-semibold'>Đặt hàng</span></Button> </div>
        </>}
    </>
    )
}

export default MainHome