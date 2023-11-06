import {Form, Input, message, Modal, Select, Upload, UploadFile, UploadProps} from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import {useState} from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {Group} from "antd/es/radio";
import {useForm} from "antd/es/form/Form";

export default function UpdateUser() {
  const { Item } = Form;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

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
        setLoading(false);
        setImageUrl(url);
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
    {label: '管理员', value: 'admin'},
    {label: "普通用户", value: 'user'}
  ]

  //表单对象
  const [form] = Form.useForm()

  async function onSubmit(){
    //验证并获取数据
    const result = await form.validateFields();
    console.log("result:", result);
  }

  return (
    <Modal open={true} title={'修改用户'} onOk={onSubmit}>
      <Form form={form}>
        <Item name={"userAccount"} label={'用户账号'}>
          <Input></Input>
        </Item>
        <Item name={"userAvatar"} label={'用户头像'}>
          <Upload
            listType="picture-circle"
            className="avatar-uploader"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Item>
        <Item name={"userRole"} label={'用户身份'}>
          <Group options={options} optionType={'button'} buttonStyle={'solid'} />
        </Item>
      </Form>
    </Modal>
  );
}
