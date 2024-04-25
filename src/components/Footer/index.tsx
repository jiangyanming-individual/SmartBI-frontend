import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: '鸭子智能BI',
          title: '鸭子智能BI',
          href: 'https://blog.csdn.net/JEREMY_GYJ',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/jiangyanming-individual',
          blankTarget: true,
        },
        {
          key: '鸭子智能BI',
          title: '鸭子智能BI',
          href: 'https://blog.csdn.net/JEREMY_GYJ',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
