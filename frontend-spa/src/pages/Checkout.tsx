import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Alert,
  Spin,
  Steps,
  Radio,
  Space,
} from 'antd';
import { CreditCardOutlined, EnvironmentOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { apiFetch } from '../lib/api';
import { formatPrice } from '../lib/format';
import { useAuth } from '../store/auth';

const { Step } = Steps;
const { TextArea } = Input;

type CheckoutItem = {
  id: number;
  gpu_id: number;
  title: string;
  price: number;
  quantity: number;
  image_path?: string;
};

type CheckoutSummary = {
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
};

export default function Checkout() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [summary, setSummary] = useState<CheckoutSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [orderData, setOrderData] = useState<any>(null);

  async function loadCartForCheckout() {
    try {
      const res = await apiFetch('/api/cart');
      if (res.ok) {
        const data = await res.json();
        if (data.items.length === 0) {
          navigate('/cart');
          return;
        }
        setItems(data.items);
        setSummary(data.summary);
      } else {
        throw new Error('Failed to load cart');
      }
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: 'Failed to load cart for checkout', type: 'error' },
        }),
      );
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadCartForCheckout();
  }, [user, navigate]);

  async function handleAddressSubmit(values: any) {
    setSubmitting(true);
    try {
      const res = await apiFetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        const data = await res.json();
        setOrderData(data);
        setCurrentStep(1);
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { text: 'Order created successfully', type: 'success' },
          }),
        );
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
    } catch (error: any) {
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: error.message || 'Checkout failed', type: 'error' },
        }),
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePaymentSubmit(paymentData: any) {
    setSubmitting(true);
    try {
      const res = await apiFetch(`/api/orders/${orderData.orderId}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      if (res.ok) {
        setCurrentStep(2);
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { text: 'Payment successful!', type: 'success' },
          }),
        );
        setTimeout(() => {
          navigate(`/orders/${orderData.orderId}`);
        }, 3000);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Payment failed');
      }
    } catch (error: any) {
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { text: error.message || 'Payment failed', type: 'error' },
        }),
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Spin size="large" />
        <div className="mt-3">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div className="page-checkout container py-4">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="Checkout" className="mb-4">
            <Steps current={currentStep} className="mb-4">
              <Step title="Shipping" icon={<EnvironmentOutlined />} />
              <Step title="Payment" icon={<CreditCardOutlined />} />
              <Step title="Complete" icon={<CheckCircleOutlined />} />
            </Steps>

            {currentStep === 0 && (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleAddressSubmit}
                requiredMark={false}
              >
                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="shipping_name" label="Full Name" rules={[{ required: true }]}>
                      <Input placeholder="John Smith" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="shipping_email"
                      label="Email Address"
                      rules={[{ required: true }, { type: 'email' }]}
                    >
                      <Input placeholder="john@example.com" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="shipping_phone" label="Phone Number (Optional)">
                  <Input placeholder="+44 7700 900123" />
                </Form.Item>
                <Form.Item
                  name="shipping_address_line1"
                  label="Address Line 1"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="123 Main Street" />
                </Form.Item>
                <Form.Item name="shipping_address_line2" label="Address Line 2 (Optional)">
                  <Input placeholder="Apartment, suite, etc." />
                </Form.Item>
                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="shipping_city" label="City" rules={[{ required: true }]}>
                      <Input placeholder="London" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="shipping_postcode"
                      label="Postcode"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="SW1A 1AA" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="shipping_country" label="Country" initialValue="GB">
                  <Radio.Group>
                    <Radio value="GB">United Kingdom</Radio>
                    <Radio value="IE">Ireland</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="notes" label="Order Notes (Optional)">
                  <TextArea
                    rows={3}
                    placeholder="Any special delivery instructions..."
                    maxLength={500}
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit" size="large" loading={submitting} block>
                  Continue to Payment
                </Button>
              </Form>
            )}

            {currentStep === 1 && orderData && (
              <div className="payment-section">
                <Alert
                  message="Demo Payment"
                  description="This is a demo checkout. Click 'Complete Payment' to simulate a successful payment."
                  type="info"
                  showIcon
                  className="mb-4"
                />
                <Card title="Payment Method" className="mb-4">
                  <Radio.Group defaultValue="demo" className="w-100">
                    <Space direction="vertical" className="w-100">
                      <Radio value="demo">
                        <Space>
                          <CreditCardOutlined />
                          <span>Demo Payment (Test Mode)</span>
                        </Space>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Card>
                <div className="payment-summary mb-4">
                  <h4>Order Summary</h4>
                  <p>
                    <strong>Order Number:</strong> {orderData.orderNumber}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> {formatPrice(orderData.totalAmount)}
                  </p>
                </div>
                <Space>
                  <Button onClick={() => setCurrentStep(0)}>Back to Shipping</Button>
                  <Button
                    type="primary"
                    size="large"
                    loading={submitting}
                    onClick={() => handlePaymentSubmit({ payment_method: 'demo' })}
                  >
                    Complete Payment
                  </Button>
                </Space>
              </div>
            )}

            {currentStep === 2 && orderData && (
              <div className="success-section text-center">
                <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a' }} />
                <h2 className="mt-3">Order Confirmed!</h2>
                <p className="text-muted">
                  Thank you for your purchase. Your order number is{' '}
                  <strong>{orderData.orderNumber}</strong>
                </p>
                <p className="text-muted">You will receive an email confirmation shortly.</p>
                <p className="text-muted">Redirecting to order details in 3 seconds...</p>
              </div>
            )}
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Order Summary" className="sticky-summary">
            <div className="order-items mb-3">
              {items.map((item) => (
                <Row key={item.id} gutter={[8, 8]} className="mb-3">
                  <Col span={6}>
                    {item.image_path && (
                      <img
                        src={item.image_path}
                        alt={item.title}
                        style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 4 }}
                      />
                    )}
                  </Col>
                  <Col span={12}>
                    <div className="text-sm">
                      <div className="fw-medium">{item.title}</div>
                      <div className="text-muted">Qty: {item.quantity}</div>
                    </div>
                  </Col>
                  <Col span={6} className="text-end">
                    <div className="fw-medium">{formatPrice(item.price * item.quantity)}</div>
                  </Col>
                </Row>
              ))}
            </div>
            <Divider />
            {summary && (
              <div className="pricing-summary">
                <Row justify="space-between" className="mb-2">
                  <Col>Subtotal:</Col>
                  <Col>{formatPrice(summary.subtotal)}</Col>
                </Row>
                <Row justify="space-between" className="mb-2">
                  <Col>VAT (20%):</Col>
                  <Col>{formatPrice(summary.taxAmount)}</Col>
                </Row>
                <Row justify="space-between" className="mb-2">
                  <Col>Shipping:</Col>
                  <Col>
                    {summary.shippingAmount === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      formatPrice(summary.shippingAmount)
                    )}
                  </Col>
                </Row>
                <Divider />
                <Row justify="space-between" className="total-row">
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>
                    <strong>{formatPrice(summary.totalAmount)}</strong>
                  </Col>
                </Row>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .sticky-summary {
          position: sticky;
          top: 20px;
        }
        .total-row {
          font-size: 18px;
        }
        .text-sm {
          font-size: 14px;
        }
        .fw-medium {
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .sticky-summary {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
