import { genPictureUsingPOST } from '@/services/congmingya/pictureController';
import { getLoginUserVOUsingGET } from '@/services/congmingya/userController';
import { useModel } from '@@/exports';
import { Button, Card, Form, Input, message, Select, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

const AddPicture: React.FC = () => {
  const [form] = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    // 对接后端，上传数据
    const params = {
      ...values,
    };
    try {
      const res = await genPictureUsingPOST(params, {});
      const newLoginUser = await getLoginUserVOUsingGET();
      flushSync(() => {
        // @ts-ignore
        setInitialState((s) => ({
          ...s,
          currentUser: newLoginUser.data,
        }));
      });
      if (!res?.data) {
        message.error(res.message);
      } else {
        message.success('任务提交成功，稍后请在我的图片页面查看');
        form.resetFields();
      }
    } catch (e: any) {
      message.error('分析失败，' + e.message);
    }
    setSubmitting(false);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="add-picture">
      <Card title="智能生图">
        <Form
          form={form}
          name="addPicture"
          labelAlign="left"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item
            name="title"
            label="图片标题"
            rules={[
              { required: true, message: '请输入图片标题' },
              {
                max: 20,
                message: '标题过长',
              },
            ]}
          >
            <TextArea placeholder="请为要生成的图片拟一个标题" />
          </Form.Item>
          <Form.Item
            name="description"
            label="图片描述"
            rules={[
              { required: true, message: '请输入想要生成的画面内容' },
              {
                max: 80,
                message: '描述过长',
              },
            ]}
          >
            <Input placeholder="请输入想要生成的画面内容" />
          </Form.Item>
          <Form.Item
            name="size"
            label="图片大小"
            rules={[{ required: true, message: '请选择想要生成的画面大小' }]}
          >
            <Select
              placeholder={'请选择图片大小'}
              options={[
                { value: '768x768', label: '768x768' },
                { value: '768x1024', label: '768x1024' },
                { value: '1024x768', label: '1024x768' },
                { value: '576x1024', label: '576x1024' },
                { value: '1024x576', label: '1024x576' },
                { value: '1024x1024', label: '1024x1024' },
              ]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AddPicture;
