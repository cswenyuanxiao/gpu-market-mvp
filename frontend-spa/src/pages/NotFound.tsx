import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

export default function NotFound() {
  return (
    <div className="container py-5 text-center">
      <Result
        status="404"
        title="404"
        subTitle="Page not found."
        extra={<Link to="/"><Button type="primary">Go Home</Button></Link>}
      />
    </div>
  );
}


