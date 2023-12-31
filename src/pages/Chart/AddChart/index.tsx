import { request } from '@/app';
import { genChartByAiUsingPOST } from '@/services/congmingya/chartController';
import { getLoginUserVOUsingGET } from '@/services/congmingya/userController';
import { useModel } from '@@/exports';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Select, Space, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

const AddChart: React.FC = () => {
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
      file: undefined,
    };
    try {
      const res = await genChartByAiUsingPOST(params, {}, values.file[0].originFileObj);
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
        message.success('分析任务提交成功，稍后请在我的图表页面查看');
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
    <div className="add-chart">
      <Card title="智能分析">
        <Form
          form={form}
          name="addChart"
          labelAlign="left"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item
            name="goal"
            label="分析目标"
            rules={[
              { required: true, message: '请输入分析目标' },
              {
                max: 200,
                message: '分析目标最多二百字',
              },
            ]}
          >
            <TextArea placeholder="请输入你的分析需求，比如：分析网站用户的增长情况" />
          </Form.Item>
          <Form.Item
            name="name"
            label="图表名称"
            rules={[
              { required: true, message: '请输入图表名称' },
              {
                max: 30,
                message: '名称过长',
              },
            ]}
          >
            <Input placeholder="请输入图表名称" />
          </Form.Item>
          <Form.Item
            name="chartType"
            label="图表类型"
            rules={[{ required: true, message: '请选择图表类型' }]}
          >
            <Select
              options={[
                { value: '折线图', label: '折线图' },
                { value: '柱状图', label: '柱状图' },
                { value: '堆叠图', label: '堆叠图' },
                { value: '饼图', label: '饼图' },
                { value: '雷达图', label: '雷达图' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="file"
            label="原始数据"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: '请上传Excel文件' }]}
          >
            <Upload
              name="file"
              maxCount={1}
              action={request.baseURL + '/api/oss/file/upload/excel?module=file'}
            >
              <Button icon={<UploadOutlined />}>上传 Excel 文件</Button>
            </Upload>
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
export default AddChart;
