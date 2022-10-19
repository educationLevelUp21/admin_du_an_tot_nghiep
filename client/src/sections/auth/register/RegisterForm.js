
import { useState } from 'react';
import Button from '@mui/material/Button';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  // const navigate = useNavigate();

  // const [showPassword, setShowPassword] = useState(false);

  // const [UserName, setUserName] = useState("");
  // const [Email, setEmail] = useState("");
  // const [Password, setPassword] = useState("");

  // const RegisterSchema = Yup.object().shape({
  //   userName: Yup.string().required('User name required'),
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required'),
  // });

  // const defaultValues = {
  //   userName: '',
  //   email: '',
  //   password: '',
  // };

  // const methods = useForm({
  //   resolver: yupResolver(RegisterSchema),
  //   defaultValues,
  // });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // const onSubmit = async () => {
  //   navigate('/dashboard', { replace: true });

  // };

  // ------------------------------------------------
  // const [UserName, setUserName] = useState("");
  // const [Email, setEmail] = useState("");
  // const [Password, setPassword] = useState("");



  const [Value, setValue] = useState("");


  // ten
  const [name, setName] = useState(true);
  const [errorName, setErrorName] = useState("");
  const [color1, setColor1] = useState("#d8dde1");
  const validateName = (se) => {
    const name = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (name.test(se) == false) {
      setName(true);
      setColor1("#d8dde1");
      setErrorName("");
    } else {
      setName(false);
      setColor1("red");
      setErrorName("Vui lòng không điền kí tự đặt biệt");
    }
  }
  function ErrorName(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.errorName}
      </div>
    )
  }

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

    <div className="container">
      {/* ten */}
      <div className="user" >
        <input type="text" className="form__input" style={{ borderColor: color1 }} placeholder=" " name="Tên đăng nhập"
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => validateName(e.target.value)}
          required />
        <label htmlFor="name" className="form__label">Tên </label>
        <ErrorName
          isHidden={name}
          errorName={errorName} />
      </div>
      {/* ten user */}
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
      {/* pass */}
      <div className="user">
        <input type="password" className="form__input" style={{ borderColor: color3 }} placeholder=" " name="Tên đăng nhập"
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => validatePass(e.target.value)}
          required /><label htmlFor="email" className="form__label">Mật khẩu</label>
        <ErrolPassword
          isHidden={password}
          errorPassword={errorPassword} />
      </div>

      <Button className='btn' variant="contained">Đăng ký</Button>
    </div >
  );
}
