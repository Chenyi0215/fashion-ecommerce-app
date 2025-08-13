// frontend/src/app/register/page.js

import { Suspense } from 'react';
import RegisterForm from '@/components/RegisterForm';

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;