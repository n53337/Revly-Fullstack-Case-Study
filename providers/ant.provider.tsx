import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';


export default function AntPoviders({ children }: { children: React.ReactNode }) {
  return <AntdRegistry>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }} 
    >
    {children}
    </ConfigProvider>
    </AntdRegistry>;
}