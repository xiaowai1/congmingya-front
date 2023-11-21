import {
  deleteChatAssistantUsingPOST,
  listMyAssistantUsingPOST,
} from '@/services/congmingya/chatAssistantController';
import { useModel } from '@@/exports';
import { history } from '@umijs/max';
import { Avatar, Button, List, message, Popconfirm, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const AssistantList: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 10,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const [searchParams, setSearchParams] = useState<API.ChatQueryRequest>({ ...initSearchParams });
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [chatList, setChatList] = useState<API.ChatAssistant[]>([]);
  const [total, setTotal] = useState<number>(0);

  const startChat = async (id: number | undefined) => {
    history.push(`/chat/${id}`);
  };

  //删除聊天助手
  const handleDelete = async (values: number | undefined) => {
    const res = await deleteChatAssistantUsingPOST({ id: values });
    if (res.data) {
      message.success('删除成功');
      setSearchParams((old) => {
        return { ...old };
      });
    } else {
      message.error('删除失败');
    }
  };

  useEffect(() => {
    async function loadAssistants() {
      try {
        const res = await listMyAssistantUsingPOST(searchParams);
        if (res.code == 0 && res.data) {
          setTotal(res.data.total ?? 0);
          setChatList(res.data.records ?? []);
        }
      } catch (e: any) {
        // message.error('获取助手列表失败');
      }
    }

    loadAssistants();
  }, [searchParams]);

  return (
    <>
      <List
        style={{width: "90%"}}
        dataSource={chatList}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type={'primary'}
                size={'middle'}
                onClick={() => {
                  startChat(item.id);
                }}
              >
                继续聊天
              </Button>,
              <Popconfirm title="确定要删除该助手吗?" onConfirm={() => handleDelete(item.id)}>
                <Button danger size={'middle'}>
                  删除
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: [10, 15, 20, 50],
        }}
      />
    </>
  );
};

export default AssistantList;
