import { request } from '@/app';
import {
  getLoginUserVOUsingGET,
  signUsingPOST,
  updateMyselfUsingPOST,
} from '@/services/congmingya/userController';
import { useModel } from '@@/exports';
import {
  Button,
  Form,
  FormRule,
  Input,
  message,
  Popconfirm,
  Space,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const UserCenter: React.FC = () => {
  const { Item } = Form;
  //表单对象
  const [form] = Form.useForm();
  const userAccountRules: FormRule[] = [
    { required: true, message: '用户账号不能为空' },
    { min: 4, max: 20, message: '用户账号为4至20位' },
  ];
  const [loading, setLoading] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  // @ts-ignore
  const [imageUrl, setImageUrl] = useState<string>();
  const { currentUser } = initialState ?? {};

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只支持jpg/png格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2M');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        // @ts-ignore
        currentUser.userAvatar = info.file.response.data;
        setLoading(false);
        setImageUrl(info.file.response.data);
      });
    }
  };

  //修改个人信息
  async function handleEdit() {
    //未修改获取表单数据
    const formValue = form.getFieldsValue();
    if (
      // @ts-ignore
      formValue.userAccount === currentUser.userAccount &&
      // @ts-ignore
      formValue.userAvatar === currentUser.userAvatar
    ) {
      message.info('信息未修改');
      return;
    }
    //修改后验证并获取数据
    const result = await form.validateFields();
    try {
      const res = await updateMyselfUsingPOST({
        ...result,
        userAvatar: imageUrl,
      });
      if (res) {
        message.success('修改成功');
        const newLoginUser = await getLoginUserVOUsingGET();
        flushSync(() => {
          // @ts-ignore
          setInitialState((s) => ({
            ...s,
            currentUser: newLoginUser.data,
          }));
        });
      }
    } catch (error) {
      form.setFieldsValue(currentUser);
      // @ts-ignore
      message.error(error.response.data.message);
    }
  }

  //签到领鸭币
  async function handleSign() {
    try {
      const res = await signUsingPOST();
      if (res.data) {
        const newLoginUser = await getLoginUserVOUsingGET();
        flushSync(() => {
          // @ts-ignore
          setInitialState((s) => ({
            ...s,
            currentUser: newLoginUser.data,
          }));
        });
        message.success('领取成功!');
      } else {
        message.error('今天已经领过了');
      }
    } catch (error) {
      message.error('领取失败');
    }
  }

  const onSuccess = async () => {};

  // 模拟异步获取表单数据
  async function fetchFormData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          userAccount: currentUser && currentUser.userAccount,
          userAvatar: currentUser && currentUser.userAvatar,
          integral: currentUser && currentUser.integral,
          accessKey: currentUser && currentUser.accessKey,
          secretKey: currentUser && currentUser.secretKey,
          // 其他字段的初始值
        });
      }, 1000);
    });
  }

  useEffect(() => {
    // 模拟异步获取表单数据
    fetchFormData().then((data) => {
      form.setFieldsValue(data); // 填充表单数据
    });
  }, [form]);

  return (
    <div>
      <Form form={form}>
        <Item
          name={'userAccount'}
          label={'用户账号'}
          initialValue={currentUser && currentUser.userAccount}
          rules={userAccountRules}
        >
          <Input style={{ width: '20%' }} />
        </Item>

        <Item name={'userAvatar'} label={'用户头像'}>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            showUploadList={false}
            action={request.baseURL + '/api/oss/file/upload?module=avatar'}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <img
                src={currentUser && currentUser.userAvatar}
                alt="avatar"
                style={{ width: '100%' }}
              />
            )}
          </Upload>
        </Item>
        <Item>
          <Popconfirm title="确定要修改吗?" onConfirm={() => handleEdit()}>
            <Button type={'primary'} size={'middle'}>
              修改
            </Button>
          </Popconfirm>
        </Item>
        <Item name={'integral'} label={'鸭币数量'}>
          <Space size={'large'}>
            <a>{currentUser && currentUser.integral}</a>
            <Button shape="round" type="primary" onClick={handleSign}>
              每日领取
            </Button>
          </Space>
        </Item>
        <Item name={'accessKey'} label={'accessKey'}>
          <a>{currentUser && currentUser.accessKey}</a>
        </Item>
        <Item name={'secretKey'} label={'secretKey'}>
          <a>{currentUser && currentUser.secretKey}</a>
        </Item>
      </Form>
    </div>
  );
};

export default UserCenter;
