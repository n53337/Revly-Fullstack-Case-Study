import { AntdRegistry } from '@ant-design/nextjs-registry';


export default function AntPoviders({ children }: { children: React.ReactNode }) {
  return <AntdRegistry>{children}</AntdRegistry>;
}