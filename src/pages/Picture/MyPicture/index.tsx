import { useModel } from '@@/exports';
import {Avatar, Button, Card, List, message, Popconfirm, Result, Select, Space, Modal } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import {deletePictureUsingPOST, listMyPictureByPageUsingPOST} from "@/services/congmingya/pictureController";

const MyPicture: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 8,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const [searchParams, setSearchParams] = useState<API.PictureQueryRequest>({ ...initSearchParams });
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [pictureList, setPictureList] = useState<API.Picture[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleIndex, setVisibleIndex] = useState<number>(-1);

  //加载当前用户的所有图片
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyPictureByPageUsingPOST(searchParams);
      if (res.code == 0) {
        if (res.data) {
          setPictureList(res.data.records ?? []);
          setTotal(res.data.total ?? 0);
        }
      } else {
        message.error('获取我的图片失败');
      }
    } catch (e: any) {
      // message.error('获取我的图片失败，' + e.message);
    }
    setLoading(false);
  };

  //删除图片
  const handleDelete = async (values: number | undefined) => {
    const res = await deletePictureUsingPOST({ id: values });
    if (res.data) {
      message.success('删除成功');
      setSearchParams((old) => {
        return { ...old };
      });
    } else {
      message.error('删除失败');
    }
  };

  //下载
  const downloadPicture = async (url: string | undefined) => {
    const link = document.createElement('a');
    // @ts-ignore
    link.href = url;
    link.download = 'image.jpg';
    link.click();
  };

  const handleImageClick = async (values: number | undefined) => {
    // @ts-ignore
    setVisibleIndex(values);
  };

  const handleModalClose = async () => {
    setVisibleIndex(-1);
  };


  useEffect(() => {
    loadData();
  }, [searchParams]);

  // @ts-ignore
  return (
    <div className="my-picture">
      <div>
        <Space>
          <Select
            placeholder="请选择图片大小"
            allowClear={true}
            onSelect={(value) => {
              // 设置搜索条件
              setSearchParams({
                ...initSearchParams,
                size: value,
              });
            }}
          >
            <Select.Option value={'768x768'}>768x768</Select.Option>
            <Select.Option value={'768x1024'}>768x1024</Select.Option>
            <Select.Option value={'1024x768'}>1024x768</Select.Option>
            <Select.Option value={'576x1024'}>576x1024</Select.Option>
            <Select.Option value={'1024x576'}>1024x576</Select.Option>
            <Select.Option value={'1024x1024'}>1024x1024</Select.Option>
          </Select>
          <Search
            placeholder="请输入图片标题"
            enterButton
            loading={loading}
            onSearch={(value) => {
              // 设置搜索条件
              setSearchParams({
                ...initSearchParams,
                title: value,
              });
            }}
          />
        </Space>
      </div>
      <div className="margin-16" />
      <List
        grid={{
          gutter: 16,
          xs: 2,
          sm: 2,
          md: 2,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
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
        }}
        loading={loading}
        dataSource={pictureList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              style={{ width: '100%' }}
              actions={[
                <Space>
                  <Button type={"primary"} size={'middle'} onClick={() => downloadPicture(item.url)}>
                    下载
                  </Button>
                  <Popconfirm
                    title="确定要删除该图片吗?"
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button danger size={'middle'}>
                      删除
                    </Button>
                  </Popconfirm>,
                </Space>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={<img src={currentUser && currentUser.userAvatar} alt="avatar" />} />
                }
                title={item.title}
                description={item.size ? '图片大小：' + item.size : undefined}
              />
              <>
                {item.status === 'wait' && (
                  <>
                    <Result
                      status="warning"
                      title="待生成"
                      subTitle={item.execMessage ?? '当前图片生成队列繁忙，请耐心等候'}
                    />
                  </>
                )}
                {item.status === 'running' && (
                  <>
                    <Result status="info" title="图片生成中" subTitle={item.execMessage} />
                  </>
                )}
                {item.status === 'success' && (
                  <>
                    <div style={{ marginBottom: 16 }} />
                    <p>{'图片描述：' + item.description}</p>
                    <div style={{ marginBottom: 16 }} />
                    <img
                      src={item.url}
                      style={{ width: '100%' }}
                      onClick={() => handleImageClick(item.id)}
                      alt="缩略图"
                    />
                    <Modal visible={visibleIndex === item.id} onCancel={handleModalClose} footer={null}>
                      <img src={item.url} style={{ width: '100%' }} alt="大图" />
                    </Modal>
                  </>
                )}
                {item.status === 'failed' && (
                  <>
                    <Result status="error" title="图片生成失败" subTitle={item.execMessage} />
                  </>
                )}
              </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default MyPicture;
