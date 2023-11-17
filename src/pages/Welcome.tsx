import { CommentOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import {Button, Card, Col, Flex, message, Radio, Row, theme, Typography} from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { useState } from 'react';
import {addAssistantUsingPOST, getLatestAssistantUsingGET} from "@/services/congmingya/chatAssistantController";

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
  }

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
    // const chatId = res.data;
    // history.push('/chat/' + chatId);
  };

  const onClick1 = async () => {
    const res = await getLatestAssistantUsingGET();
    history.push(`/chat/${res.data}`);
  }

  const onClick = async () => {
    history.push('/chart/add_chart');
  }

  return (
    <PageContainer>
      <Card
        style={{ borderRadius: 8 }}
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
              <Button type="default" icon={<CommentOutlined />} size={size} onClick={() => {
                startChat()
              }}>
                开始聊天
              </Button>
            </Flex>
          </div>
        </div>
      </Card>
        <div>
          <Row>
            <Col span={12}>
              <Card hoverable>
                <Flex justify="space-between" wrap={"nowrap"}>
                  <img
                    alt="avatar"
                    src="https://gulimall-chixiaowai.oss-cn-shenzhen.aliyuncs.com/congmingya/icon/%E4%BF%A1%E6%81%AF%E6%B6%88%E6%81%AF.png"
                    style={imgStyle}
                  />
                  <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                    <Typography.Title level={3}>
                      一个多功能的AI语言助手，旨在为用户提供各种语言相关的支持和服务。
                    </Typography.Title>
                    <Button type="primary" onClick={onClick1} target="_blank">
                      去使用
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            </Col>
            <Col span={12}>
              <Card hoverable>
                <Flex justify="space-between" wrap={"nowrap"}>
                  <img
                    alt="avatar"
                    src="https://gulimall-chixiaowai.oss-cn-shenzhen.aliyuncs.com/congmingya/icon/fsux_%E5%9B%BE%E8%A1%A8_%E5%A0%86%E7%A7%AF%E6%9F%B1%E7%8A%B6%E5%9B%BE.png"
                    style={imgStyle}
                  />
                  <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                    <Typography.Title level={3}>
                      智能图表：只需要导入数据，输入想要的分析目标，就能利用AI生成符合要求的图表以及分析结论。
                    </Typography.Title>
                    <Button type="primary" onClick={onClick} target="_blank">
                      去使用
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            </Col>

          </Row>

          {/*<div*/}
          {/*  style={{*/}
          {/*    display: 'flex',*/}
          {/*    flexWrap: 'wrap',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <InfoCard*/}
          {/*    index={1}*/}
          {/*    href="https://umijs.org/docs/introduce/introduce"*/}
          {/*    title="了解 umi"*/}
          {/*    desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"*/}
          {/*  />*/}
          {/*  <InfoCard*/}
          {/*    index={2}*/}
          {/*    title="了解 ant design"*/}
          {/*    href="https://ant.design"*/}
          {/*    desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"*/}
          {/*  />*/}
          {/*  <InfoCard*/}
          {/*    index={3}*/}
          {/*    title="了解 Pro Components"*/}
          {/*    href="https://procomponents.ant.design"*/}
          {/*    desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"*/}
          {/*  />*/}
          {/*  <InfoCard*/}
          {/*    index={4}*/}
          {/*    title="了解 Pro Components"*/}
          {/*    href="https://procomponents.ant.design"*/}
          {/*    desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      {/*</Card>*/}
    </PageContainer>
  );
};

export default Welcome;
