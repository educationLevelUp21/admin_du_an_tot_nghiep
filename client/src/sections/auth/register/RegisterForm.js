import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // const [UserName, setUserName] = useState("");
  // const [Email, setEmail] = useState("");
  // const [Password, setPassword] = useState("");

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string().required('User name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    userName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });

  };

  return (
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    //   <Stack spacing={3}>
    //     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
    //       <RHFTextField name="userName" label="UserName" />
    //     </Stack>

    //     <RHFTextField name="email" label="Email address" />

    //     <RHFTextField
    //       name="password"
    //       label="Password"
    //       type={showPassword ? 'text' : 'password'}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="end">
    //             <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
    //               <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
    //             </IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />

    //     <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
    //       Register
    //     </LoadingButton>
    //   </Stack>
    // </FormProvider>
    <h1>dsad</h1>
  );
}
