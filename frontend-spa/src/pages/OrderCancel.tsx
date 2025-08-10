import { Result } from 'antd';

export default function OrderCancel() {
  return (
    <div className="container py-5">
      <Result
        status="warning"
        title="Checkout cancelled"
        subTitle="You can continue shopping or try checkout again."
        extra={<a className="ant-btn ant-btn-primary" href="/cart"><span>Back to cart</span></a>}
      />
    </div>
  );
}


