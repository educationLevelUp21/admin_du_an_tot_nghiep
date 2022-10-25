import { useState } from 'react';
// material
import { Container} from '@mui/material';
// components
import Page from '../components/Page';
import Add_product from '../dialog/Add_product';
import '../css/dialog.css'; 

// ----------------------------------------------------------------------

export default function EcommerceShop() {

  const [open, setOpen] = useState(false);
  const handleClickItem = () => {
    setOpen(true)
  }

  return (
    <>
    
    <Page title="Dashboard: Products">
    <Add_product open={open} setOpen={setOpen}
      />
      <Container>
       <button onClick={() => handleClickItem()}>open</button>
      </Container>
    </Page>
    </>
  );
}
