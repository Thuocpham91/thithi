import React, { useState } from 'react'
import AdminLayout from "../../../layouts/Admin";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Link from 'next/link'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import * as XLSX from "xlsx";

import { productService } from '../../../services/product.service';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [dataDashboard, setDataDashboard] = useState({
    user: 150,
    order: 30,
  });


  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);



  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);

    const sdsd = await productService.upaloadFile(body);

  };


  const [labels, setlabels] = useState(["06-06-2022", "07-06-2022", "08-06-2022", "09-06-2022", "10-06-2022", "11-06-2022", "12-06-2022"]);
  const [dataChart, setdataChart] = useState([12, 19, 3, 5, 2, 3]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Lượt đặt hàng",
        data: dataChart,
        backgroundColor: "#EE0232",
        borderWidth: 2,
        borderRadius: 80,
        borderSkipped: false,
        barPercentage: 0.2,
      },
    ],
  };
  const options = {
    responsive: true,
  };


  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      const json = XLSX.utils.sheet_to_json(ws);
      console.log(json);
    };
    reader.readAsBinaryString(file);



  }





  return (<>

    <div>
      <img src={createObjectURL} />
      <h4>Select Image</h4>
      <input type="file" name="myImage" onChange={uploadToClient} />
      <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
      </button>
    </div>
    <div className='home-top mb-10 grid grid-cols-2 gap-8'>
      <div className='flex routing-sample-box1  rounded-lg bg-white shadow-sm p-5 relative'>
        <div className='home-top--icon'><GroupOutlinedIcon /></div>
        <div className='home-top--content'><p>Thành viên</p><h3>{dataDashboard.user}</h3></div>
        <div className='home-top--link cursor-pointer underline'>
          <Link href="/admin/user"><a>Chi tiết</a></Link>
        </div>
      </div>
      <div className='flex routing-sample-box1  rounded-lg bg-white shadow-sm p-5 relative'>
        <div className='home-top--icon'><LocalMallIcon /></div>
        <div className='home-top--content'><p>Đơn hàng</p><h3>{dataDashboard.order}</h3></div>
        <div className='home-top--link cursor-pointer underline'>
          <Link href="/admin/user"><a>Chi tiết</a></Link>
        </div>
      </div>
    </div>
    <div className='grid grid-cols-5 gap-8'>
      <div className="home-chart col-span-3">
        <div className='home-chart--header'>Lượt đặt hàng từ 06-06-2022 đến 12-06-2022</div>
        <div className='home-chart--main'><Bar options={options} data={data} /></div>
      </div>
    </div>
    <input type="file" onChange={onChange} />


  </>)
}

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
