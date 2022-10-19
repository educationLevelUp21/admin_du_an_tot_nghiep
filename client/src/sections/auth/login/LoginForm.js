import * as Yup from 'yup';
import { useState } from 'react';



import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  // const [showPassword, setShowPassword] = useState(false);

  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required'),
  // });

  // const defaultValues = {
  //   email: '',
  //   password: '',
  //   remember: true,
  // };

  // const methods = useForm({
  //   resolver: yupResolver(LoginSchema),
  //   defaultValues,
  // });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  const onClick = async () => {
    navigate('/dashboard', { replace: true });
  };
  const [Value, setValue] = useState("");
  // ten dang nhap
  const [color2, setColor2] = useState("#d8dde1");
  const [emaill, setEmail] = useState(true);
  const [errorEmaill, setErrorEmaill] = useState("");
  const validateEmaill = (se) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(se) == false) {
      setEmail(true);
      setColor2("#d8dde1");
      setErrorEmaill("");
    } else {
      setEmail(false);
      setColor2("red");
      setErrorEmaill("Vui lòng không điền kí tự đặt biệt");
    }
  }
  function ErrorEmail(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.errorEmaill}
      </div>
    )
  }


  // mat khau
  const [color3, setColor3] = useState("#d8dde1");
  const [password, setPassword] = useState(true);
  const [errorPassword, setErrorPassword] = useState("");
  const validatePass = (se) => {
    const pass1 = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (pass1.test(se) == false) {
      setPassword(true);
      setColor3("#d8dde1");
      setErrorPassword("");
    } else {
      setPassword(false);
      setColor3("red");
      setErrorPassword("Vui lòng không điền kí tự đặt biệt");
    }
  }
  function ErrolPassword(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.errorPassword}
      </div>
    )
  }
  return (
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    //   <Stack spacing={3}>
    //     <RHFTextField name="email" label="Email address" />

    //     <RHFTextField
    //       name="password"
    //       label="Password"
    //       type={showPassword ? 'text' : 'password'}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="end">
    //             <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
    //               <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
    //             </IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //   </Stack>

    //   <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
    //     <RHFCheckbox name="remember" label="Remember me" />
    //     <Link variant="subtitle2" underline="hover">
    //       Forgot password?
    //     </Link>
    //   </Stack>

    //   <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
    //     Login
    //   </LoadingButton>
    // </FormProvider>
    <div className="container">

      <div className="user" >
        <input type="text" className="form__input" style={{ borderColor: color2 }} placeholder=" " name="Tên đăng nhập"
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => validateEmaill(e.target.value)}
          required />
        <label htmlFor="text" className="form__label">Tên đăng nhập</label>
        <ErrorEmail
          isHidden={emaill}
          errorEmaill={errorEmaill} />

      </div>
      <div className="user">
        <input type="password" className="form__input" style={{ borderColor: color3 }} placeholder=" " name="Tên đăng nhập"
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => validatePass(e.target.value)}
          required /><label htmlFor="email" className="form__label">Mật khẩu</label>
        <ErrolPassword
          isHidden={password}
          errorPassword={errorPassword} />

      </div>
      <div className="cbx">
        <div className='cbx_1'>
          <input className='cbx_ipt' name="rememberme" type="checkbox" value="forever" />
          <p> Lưu mật khẩu</p>
        </div>
        <a className='cbx_2' href='/login'>
          Forgot password?
        </a>
      </div>

      <Button className='btn' variant="contained" onClick={onClick}>Đăng nhập</Button>





    </div >
  );
}
