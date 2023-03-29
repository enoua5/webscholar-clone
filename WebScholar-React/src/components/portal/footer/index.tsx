import { DefaultFooter } from "@ant-design/pro-layout";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`WebScholar ${currentYear}`}
    />
  );
}