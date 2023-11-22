import { request } from '@/app';
import { addUserUsingPOST } from '@/services/congmingya/userController';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, FormRule, Input, message, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { Group } from 'antd/es/radio';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { useState } from 'react';

export default function AddUser({
  open,
  user,
  onSuccess,
  onCancel,
}: {
  open: boolean;
  user: API.UserVO;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const { Item } = Form;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const userAccountRules: FormRule[] = [
    { required: true, message: '用户账号不能为空' },
    { min: 4, max: 20, message: '用户账号为4至20位' },
  ];

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
        console.log('file:', info.file.response.data);
        // user.userAvatar = info.file.response.data;
        setLoading(false);
        setImageUrl(info.file.response.data);
        console.log('imageUrl:', imageUrl);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const options = [
    { label: '普通用户', value: '普通用户' },
    { label: '管理员', value: '管理员' },
  ];

  //表单对象
  const [form] = Form.useForm();

  async function onSubmit() {
    //验证并获取数据
    const result = await form.validateFields();
    try {
      console.log('imageUrl:', result);
      const res = await addUserUsingPOST({
        ...result,
        id: user.id,
        userAvatar: imageUrl,
        userRole: result.userRole === '管理员' ? 'admin' : 'user',
      });
      if (res) {
        message.success('添加成功');
      }
      onSuccess && onSuccess();
      form.resetFields();
    } catch (error) {
      // @ts-ignore
      message.error(error.response.data.message);
    }
  }

  // 取消按钮点击事件处理函数
  function addCancel() {
    onCancel && onCancel(); // 调用外部传入的 onCancel 回调函数
    form.resetFields(); // 重置表单字段的值
  }

  return (
    <Modal open={open} title={'新增用户'} onOk={onSubmit} onCancel={addCancel}>
      <Form form={form} initialValues={user}>
        <Item name={'userAccount'} label={'用户账号'} rules={userAccountRules}>
          <Input />
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
              uploadButton
            )}
          </Upload>
        </Item>
        <Item name={'userRole'} label={'用户身份'}>
          <Group options={options} optionType={'button'} buttonStyle={'solid'} />
        </Item>
      </Form>
    </Modal>
  );
}
