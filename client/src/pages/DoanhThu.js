import { useEffect, useState } from 'react';

// material
import { Container, TextField } from '@mui/material';

// components
import Page from '../components/Page';

// ----------------------------------------------------------------------
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DoanhThu() {

  const [value, setValue] = useState(new Date());


  // const [uname, setUname] = useState("");
  // const [TK, setTK] = useState("");

  return (
    <Page title="Dashboard: DoanhThu">
      <Container>
      <h1>dsadsa</h1>
      </Container>
    </Page>
  );
}

