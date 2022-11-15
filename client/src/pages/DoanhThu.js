
// material
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function DoanhThu() {

  // const [uname, setUname] = useState("");
  // const [TK, setTK] = useState("");




  // fetch("http://localhost:8080/UserAdmin-data", {
  //   method: "POST",
  //   crossDomain: true,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   body: JSON.stringify({
  //     token: window.localStorage.getItem("token"),
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data, "userData");
  //     setUname(data.data.uname)
  //     setTK(data.data.taikhoan)

  //     console.log(uname, TK);
  //   })


  return (
    <Page title="Dashboard: DoanhThu">
      <Container>
        <h1>dasdsa</h1>

      </Container>
    </Page>
  );
}
