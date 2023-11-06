import { deleteUserUsingPOST,listUserPageUsingPOST } from "@/services/congmingya/userController";
import { useModel } from '@@/exports';
import {Avatar, Button, message, Popconfirm, Select, Space, Table} from 'antd';
import type { FormInstance } from 'antd/es/form';
import Search from 'antd/es/input/Search';
import { ColumnsType } from "antd/es/table";
import React,{ useEffect,useState } from 'react';
import {AntDesignOutlined} from "@ant-design/icons";

const EditableContext = React.createContext<FormInstance<any> | null>(null);


const UserList: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 3,
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.UserQueryRequest>({ ...initSearchParams });
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [total, setTotal] = useState<number>(0);
  const [userList, setUserList] = useState<API.UserVO[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const handleDelete = async (values: number | undefined) => {
    const res = await deleteUserUsingPOST({ id: values });
    if (res.data) {
      message.success('删除成功');
      loadData();
    } else {
      message.error('删除失败');
    }
  };

  // const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
  const defaultColumns: ColumnsType<API.UserVO> = [
    // {
    //   title: '用户头像',
    //   dataIndex: 'userAvatar',
    // },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      width: '10%'
    },
    {
      title: 'accessKey',
      dataIndex: 'accessKey',
      width: '20%'
    },
    {
      title: 'secretKey',
      dataIndex: 'secretKey',
      width: '20%'
    },
    {
      title: '用户身份',
      dataIndex: 'userRole',
      width: '10%'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '20%'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
      // @ts-ignore
      render: (_, user: API.UserVO) => {
        return (
          <>
            <Space>
              <Button type={'default'} size={'small'}>修改</Button>
              <Popconfirm title="确定要删除该用户吗?" onConfirm={() => handleDelete(user.id)}>
                <Button danger size={'small'}>
                  删除
                </Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listUserPageUsingPOST(searchParams);
      if (res.data) {
        let list = res.data.records;
        if (list){
          list = list.map(user => {
            if (user.userRole === "admin"){
              return {...user, userRole: "管理员" };
            }else {
              return {...user, userRole: "普通用户" };
            }
          })
          // @ts-ignore
        }
        setUserList(list ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取用户列表失败');
      }
    } catch (e: any) {
      message.error('获取用户列表失败，' + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary">新增用户</Button>
          <Select
            placeholder="请选择用户身份"
            allowClear={true}
            onSelect={(value) => {
              // 设置搜索条件
              setSearchParams({
                ...initSearchParams,
                userRole: value,
              });
            }}
          >
            <Select.Option value={'admin'}>管理员</Select.Option>
            <Select.Option value={'user'}>普通用户</Select.Option>
          </Select>
          <Search
            placeholder="请输入用户账号"
            enterButton
            loading={loading}
            onSearch={(value) => {
              // 设置搜索条件
              setSearchParams({
                ...initSearchParams,
                userAccount: value,
              });
            }}
          />
        </Space>
      </div>
      <div className="margin-16" />

      <Table
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={userList}
        columns={defaultColumns}
        rowKey={'id'}
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
          pageSizeOptions: [3, 5, 10, 20],
        }}
      />
    </div>
  );
};

export default UserList;
