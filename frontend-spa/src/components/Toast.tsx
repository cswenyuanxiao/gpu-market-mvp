import { message } from 'antd';

export function useToast() {
  const [msgApi, contextHolder] = message.useMessage();
  function push(text: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
    const mType =
      type === 'error'
        ? 'error'
        : type === 'warning'
          ? 'warning'
          : type === 'success'
            ? 'success'
            : 'info';
    msgApi.open({ type: mType as any, content: text, duration: 3 });
  }
  const api = { push };
  return { api, messages: contextHolder } as const;
}

export function ToastContainer({ messages }: { messages: React.ReactNode }) {
  return <>{messages}</>;
}
