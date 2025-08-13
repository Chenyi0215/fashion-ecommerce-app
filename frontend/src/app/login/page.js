import { Suspense } from 'react';
import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;