import {
  addAssistantUsingPOST,
  getLatestAssistantUsingGET,
} from '@/services/congmingya/chatAssistantController';
import { CommentOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Button, Card, Col, Flex, message, Row, theme, Typography } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { useState } from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  const onClick = async (id: number | undefined) => {
    history.push(`/chat/${id}`);
  };

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [size, setSize] = useState<SizeType>('large');
  const { currentUser } = initialState ?? {};
  const [ellipsis, setEllipsis] = useState(true);

  const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 273,
  };

  const startChat = async () => {
    try {
      const res = await getLatestAssistantUsingGET();
      history.push(`/chat/${res.data}`);
    } catch (e) {
      const res = await addAssistantUsingPOST();
      const id = res.data;
      if (res.code === 0) {
        message.success('新建助手成功');
        history.push(`/chat/${id}`);
      }
    }
  };

  const addAssistant = async () => {
    try {
      const res = await addAssistantUsingPOST();
      const id = res.data;
      if (res.code === 0) {
        message.success('新建助手成功');
        history.push(`/chat/${id}`);
      }
    } catch (e: any) {
      message.error('系统错误');
    }
  };

  const goBi = async () => {
    history.push('/chart/add_chart');
  };

  const goPicture = async () => {
    history.push('/picture/add_picture');
  };

  return (
    <PageContainer>
      <Card
        style={{ borderRadius: 8, height: '100%' }}
        size="default"
        cover={<img alt="example" src="https://www.yucongming.com/static/ModelBg.f4069726.png" />}
      >
        <div
          style={{
            backgroundPosition: 'center',
            backgroundSize: '274px auto',
            width: '100%',
            height: '80%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <p
            style={{
              fontSize: '38px',
              fontFamily: '宋体, KaiTi, cursive',
              color: '#ffffff',
              textAlign: 'center',
              marginTop: 16,
            }}
          >
            做您最强大的AI助手
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            <Flex gap="middle" align="start" vertical={false}>
              <Button
                type="default"
                icon={<PlusCircleOutlined />}
                size={size}
                onClick={addAssistant}
              >
                新建聊天
              </Button>
              <Button
                type="default"
                icon={<CommentOutlined />}
                size={size}
                onClick={() => {
                  startChat();
                }}
              >
                开始聊天
              </Button>
            </Flex>
          </div>
        </div>
      </Card>
      <div>
        <Row >
          <Col xs={24} sm={12} md={8}>
            <Card hoverable size="default" style={{ height: '100%' }}>
              <Flex justify="space-between" wrap={'nowrap'}>
                <img
                  height={'20%'}
                  alt="avatar"
                  src="https://gulimall-chixiaowai.oss-cn-shenzhen.aliyuncs.com/congmingya/icon/%E4%BF%A1%E6%81%AF%E6%B6%88%E6%81%AF.png"
                  style={imgStyle}
                />
                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                  <Typography.Title level={3} ellipsis={{
                    rows: 3,
                    expandable: false,
                    tooltip: '多功能的AI语言助手，旨在为用户提供各种语言相关的支持和服务。'
                  }}>
                    多功能的AI语言助手，旨在为用户提供各种语言相关的支持和服务。
                  </Typography.Title>
                  <Button type="primary" onClick={startChat} target="_blank">
                    去使用
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable size="default" style={{ height: '100%' }}>
              <Flex justify="space-between" wrap={'nowrap'}>
                <img
                  height={'20%'}
                  alt="avatar"
                  src="https://gulimall-chixiaowai.oss-cn-shenzhen.aliyuncs.com/congmingya/icon/fsux_%E5%9B%BE%E8%A1%A8_%E5%A0%86%E7%A7%AF%E6%9F%B1%E7%8A%B6%E5%9B%BE.png"
                  style={imgStyle}
                />
                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32, height: "20%" }}>
                  <Typography.Title level={3} ellipsis={ ellipsis ? {
                    rows: 3,
                    expandable: false,
                    tooltip: '导入数据，输入想要的分析目标，就能利用AI生成符合要求的图表以及分析结论。'
                  } : false}>
                    导入数据，输入想要的分析目标，就能利用AI生成符合要求的图表以及分析结论。
                  </Typography.Title>
                  <Button type="primary" onClick={goBi} target="_blank">
                    去使用
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} >
            <Card hoverable size="default" style={{ height: '100%' }}>
              <Flex justify="space-between" wrap={'nowrap'}>
                <img
                  height={'20%'}
                  alt="avatar"
                  src="https://gulimall-chixiaowai.oss-cn-shenzhen.aliyuncs.com/congmingya/icon/%E5%9B%BE%E7%89%87.png"
                  style={imgStyle}
                />
                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                  <Typography.Title level={3} ellipsis={{
                    rows: 3,
                    expandable: false,
                    tooltip: '输入想要生成的画面内容，帮您快速生成指定大小的图片。'
                  }}>
                    输入想要生成的画面内容，帮您快速生成指定大小的图片。
                  </Typography.Title>
                  <Button type="primary" onClick={goPicture} target="_blank">
                    去使用
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default Welcome;
