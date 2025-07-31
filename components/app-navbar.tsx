"use client";

import { UserOutlined, ApartmentOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createElement } from "react";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: createElement(UserOutlined),
    label: "Users",
    href: "/users",
  },
  {
    key: "2",
    icon: createElement(ApartmentOutlined),
    label: "Vendors",
    href: "/vendors",
  },
];

const AppNavbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const pathname = usePathname();

  // Made any here because the type is not defined in the MenuProps
  const handleMenuClick = (item: any) => {
    router.push(items.find((i) => i.key === item.key)?.href || "/");
  };

  return (
    <Layout className="!min-h-screen">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="p-4">
          <Image
            src="https://cdn.prod.website-files.com/66be4630db3d6b1bfd791b23/66be5673f24147259459348a_Logo.svg"
            alt="logo"
            width={75}
            height={75}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[items.find((i) => i.href === pathname)?.key || "1"]}
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            paddingLeft: "1rem",
          }}
        >
          <h2 className="font-bold text-lg">
            {items.find((i) => i.href === pathname)?.label}
          </h2>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppNavbar;
