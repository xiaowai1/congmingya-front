import {
  getAnswerUsingPOST,
  listLoginUserChatUsingPOST,
} from '@/services/congmingya/chatController';
import { useModel, useParams } from '@@/exports';
import Chat, { Bubble, Icon, Message, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import '@chatui/core/es/styles/index.less';
import { message } from 'antd';
import { useEffect } from 'react';
import './chatui-theme.css';

const initialMessages = [
  {
    type: 'text',
    content: { text: '您好，我是聪明鸭，你的贴心AI小助手~' },
    user: {
      avatar:
        'https://gulimall-chixiaowai.oss-cn-shenzhen.aliyuncs.com/congmingya/avatar/%E6%9C%BA%E5%99%A8%E4%BA%BA.svg',
    },
  },
  {
    type: 'image',
    content: {
      picUrl: '',
    },
    user: { avatar: '' },
  },
];

function ChatPage() {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const { id } = useParams();

  // 发送回调
  async function handleSend(type: string, val: string) {
    if (type === 'text' && val.trim()) {
      // TODO: 发送请求
      try {
        appendMsg({
          type: 'text',
          content: { text: val },
          position: 'right',
          user: { avatar: currentUser && currentUser.userAvatar },
        });
        const res = await getAnswerUsingPOST({
          assistantId: Number(id),
          content: val,
        });
        setTyping(true);
        // 模拟回复消息
        setTimeout(() => {
          appendMsg({
            type: 'text',
            // @ts-ignore
            content: { text: res.data.result },
            user: {
              avatar:
                'https://gulimall-chixiaowai.oss-cn-shenzhen.aliyuncs.com/congmingya/avatar/%E6%9C%BA%E5%99%A8%E4%BA%BA.svg',
            },
          });
        }, 1000);
      } catch (e: any) {
        message.error('系统错误');
      }
    }
  }

  // @ts-ignore
  function renderMessageContent(msg: Message) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  useEffect(() => {
    const loadMessage = async () => {
      const res = await listLoginUserChatUsingPOST({ assistantId: Number(id) });
      // console.log('res: ', res.data);
      // console.log('messages: ', messages);
      if (res.data) {
        let messageList = res.data;
        messageList.map((message) => {
          console.log('message: ', message);
          message.isUser == '0'
            ? appendMsg({
                type: 'text',
                content: { text: message.content },
                position: 'right',
                user: { avatar: currentUser && currentUser.userAvatar },
              })
            : appendMsg({
                type: 'text',
                // @ts-ignore
                content: { text: message.content },
                user: {
                  avatar:
                    'https://gulimall-chixiaowai.oss-cn-shenzhen.aliyuncs.com/congmingya/avatar/%E6%9C%BA%E5%99%A8%E4%BA%BA.svg',
                },
              });
        });
      }
    };
    loadMessage();
  }, []);

  return (
    <div>
      <Chat
        navbar={{ title: '聪明鸭AI助手' }}
        rightAction={<Icon type="bullhorn" />}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />
    </div>
  );
}

export default ChatPage;
