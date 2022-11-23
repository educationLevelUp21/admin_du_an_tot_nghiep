import { useEffect, useState } from 'react';

// material
import { Container, TextField } from '@mui/material';

// components
import Page from '../components/Page';

// css
import '../css/dialog.css';

// ----------------------------------------------------------------------
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import $ from "jquery";
import success from '../pages/success.png';
export default function DoanhThu() {
  useEffect(() => {
    $("button").click(function () {
      $(".alert").addClass("show");
      $(".alert").removeClass("hide");
      $(".alert").addClass("showAlert");
      setTimeout(function () {
        $(".alert").removeClass("show");
        $(".alert").addClass("hide");
      }, 9000);
    });
    $(".btn_alert_add").click(function () {
      $(".alert").removeClass("show");
      $(".alert").addClass("hide");
    });
  }, [])
  const [value, setValue] = useState(new Date());


  // const [uname, setUname] = useState("");
  // const [TK, setTK] = useState("");

  return (
    <Page title="Dashboard: DoanhThu">
      <Container>
        <h1>dsadsa</h1>
        <div>
          <button>Thêm</button>
          <div class="alert hide">
            <img src={success} width='28' height='28' />
            <p class="msg">Bạn đã thêm thành công</p>
            <div class="btn_alert_add">
              X
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
}

