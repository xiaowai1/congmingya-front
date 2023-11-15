import { listMyAssistantUsingPOST } from '@/services/congmingya/chatAssistantController';
import { useModel } from '@@/exports';
import { history } from '@umijs/max';
import { Avatar, List, message, Space } from 'antd';
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

  const startChat = async (id: number | undefined) => {
    history.push(`/chat/${id}`);
  };

  useEffect(() => {
    async function loadAssistants() {
      try {
        const res = await listMyAssistantUsingPOST(searchParams);
        if (res.data) {
          setChatList(res.data.records ?? []);
        }
        console.log('chatList:', chatList);
      } catch (e: any) {
        message.error('获取助手列表失败');
      }
    }

    loadAssistants();
  }, [searchParams]);

  return (
    <>
      <List
        dataSource={chatList}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => {
              startChat(item.id);
            }}
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
          // total: total,
          showSizeChanger: true,
          pageSizeOptions: [10, 15, 20, 50],
        }}
      />
    </>
  );
};

export default AssistantList;
