import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '聪明鸭';
  const currentYear = new Date().getFullYear();

  // const [pageContentHeight, setPageContentHeight] = useState(0);
  // const [windowHeight, setWindowHeight] = useState(0);
  //
  // const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  //
  // useEffect(() => {
  //   const handleResize = () => {
  //     setPageContentHeight(document.documentElement.scrollHeight);
  //     setWindowHeight(window.innerHeight);
  //     setIsContentOverflowing(
  //       pageContentHeight > windowHeight
  //     );
  //
  //     // 初始加载时获取页面内容长度和窗口高度
  //     setPageContentHeight(document.documentElement.scrollHeight);
  //     setWindowHeight(window.innerHeight);
  //     console.log("isContentOverflowing:", isContentOverflowing)
  //   };
  //
  //   window.addEventListener('resize', handleResize);
  //   handleResize();
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <DefaultFooter
      style={{
        background: 'none',
        // position: isContentOverflowing ? 'relative' : 'fixed',
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'name',
          title: '聪明鸭',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/xiaowai1/congmingya',
          blankTarget: true,
        },
        {
          key: '聪明鸭',
          title: '聪明鸭',
          href: 'https://github.com/xiaowai1/congmingya',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
