import { useEffect, useState } from 'react';
import { Result, Spin } from 'antd';

export default function OrderSuccess() {
  const [loading, setLoading] = useState(true);
  const [orderKey, setOrderKey] = useState<string | null>(null);
  useEffect(() => {
    const url = new URL(window.location.href);
    const k = url.searchParams.get('orderKey');
    setOrderKey(k);
    setLoading(false);
  }, []);
  if (loading) return (<div className="container py-4 d-flex justify-content-center"><Spin /></div>);
  return (
    <div className="container py-5">
      <Result
        status="success"
        title="Payment completed"
        subTitle={orderKey ? `Your order (${orderKey}) was placed successfully.` : 'Your order was placed successfully.'}
        extra={
          <a className="ant-btn ant-btn-primary" href="/">
            <span>Continue shopping</span>
          </a>
        }
      />
    </div>
  );
}


