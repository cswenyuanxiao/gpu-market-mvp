import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export default function ServerError() {
  return (
    <div className="container py-5">
      <Result
        status="500"
        title="Server Error"
        subTitle="Something went wrong on our end. Please try again later."
        extra={
          <Button type="primary" icon={<HomeOutlined />}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Go Home
            </Link>
          </Button>
        }
      />
    </div>
  );
}


