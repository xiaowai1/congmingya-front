import {
  deleteChartUsingPOST,
  listMyChartByPageUsingPOST,
} from '@/services/congmingya/chartController';
import { useModel } from '@@/exports';
import { Avatar, Button, Card, List, message, Popconfirm, Result, Select, Space } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

const MyChart: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res.code == 0) {
        if (res.data) {
          setChartList(res.data.records ?? []);
          setTotal(res.data.total ?? 0);
          // 隐藏图表的 title
          if (res.data.records) {
            res.data.records.forEach((data) => {
              if (data.status === 'success') {
                const chartOption = JSON.parse(data.genChart ?? '{}');
                chartOption.title = undefined;
                data.genChart = JSON.stringify(chartOption);
              }
            });
          }
        }
      } else {
        message.error('获取我的图表失败');
      }
    } catch (e: any) {
      // message.error('获取我的图表失败，' + e.message);
    }
    setLoading(false);
  };

  //打出图表
  const exportChart = async (values: number | undefined) => {
    const res = await deleteChartUsingPOST({ id: values });
    if (res.data) {
      message.success('删除成功');
      setSearchParams((old) => {
        return { ...old };
      });
    } else {
      message.error('删除失败');
    }
  };

  //删除图表
  const handleDelete = async (values: number | undefined) => {
    const res = await deleteChartUsingPOST({ id: values });
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
    loadData();
  }, [searchParams]);

  // @ts-ignore
  return (
    <div className="my-chart">
      <div>
        <Space>
          <Select
            placeholder="请选择图表类型"
            allowClear={true}
            onSelect={(value) => {
              // 设置搜索条件
              setSearchParams({
                ...initSearchParams,
                chartType: value,
              });
            }}
          >
            <Select.Option value={'折线图'}>折线图</Select.Option>
            <Select.Option value={'柱状图'}>柱状图</Select.Option>
            <Select.Option value={'堆叠图'}>堆叠图</Select.Option>
            <Select.Option value={'饼图'}>饼图</Select.Option>
            <Select.Option value={'雷达图'}>雷达图</Select.Option>
          </Select>
          <Search
            placeholder="请输入图表名称"
            enterButton
            loading={loading}
            onSearch={(value) => {
              // 设置搜索条件
              setSearchParams({
                ...initSearchParams,
                name: value,
              });
            }}
          />
        </Space>
      </div>
      <div className="margin-16" />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
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
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              style={{ width: '100%' }}
              actions={[
                <Popconfirm title="确定要删除该图表吗?" onConfirm={() => handleDelete(item.id)}>
                  <Button danger size={'middle'}>
                    删除
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={<img src={currentUser && currentUser.userAvatar} alt="avatar" />} />
                }
                title={item.name}
                description={item.chartType ? '图表类型：' + item.chartType : undefined}
              />
              <>
                {item.status === 'wait' && (
                  <>
                    <Result
                      status="warning"
                      title="待生成"
                      subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                    />
                  </>
                )}
                {item.status === 'running' && (
                  <>
                    <Result status="info" title="图表生成中" subTitle={item.execMessage} />
                  </>
                )}
                {item.status === 'success' && (
                  <>
                    <div style={{ marginBottom: 16 }} />
                    <p>{'分析目标：' + item.goal}</p>
                    <div style={{ marginBottom: 16 }} />
                    <ReactECharts option={item.genChart && JSON.parse(item.genChart)} />
                    <p>{'分析结果：' + item.genResult}</p>
                  </>
                )}
                {item.status === 'failed' && (
                  <>
                    <Result status="error" title="图表生成失败" subTitle={item.execMessage} />
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
export default MyChart;
