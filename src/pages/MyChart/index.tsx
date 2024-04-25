import React, {useEffect, useState} from 'react';
import {listMyChartVoByPageUsingPost} from "@/services/smartBi/chartController";
import {Avatar, Button, Card, Col, Divider, List, message} from "antd";
import {useModel} from "@umijs/max";
import ReactECharts from "echarts-for-react";
import Search from "antd/es/input/Search";
import Row from "antd/es/descriptions/Row";

const MyChartPage: React.FC = () => {
  /**
   * 初始化参数
   */
  const initSearchParams={
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc', //按时间降序
  }
  /**
   * 前端搜索条件
   */
  const [searchParams,setSearchParams]=useState<API.ChartQueryRequest>({
    ...initSearchParams,
  })
  /**
   * 后端分页返回数据：图表数据和总数
   */
  const [chartList,setChartList]=useState<API.Chart[]>()
  const [total,setTotal]=useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true); //设置加载的效果

  /**
   * 获取当前用户信息
   */
  const { initialState, setInitialState } = useModel('@@initialState');
  const {currentUser}= initialState || {}

  /**
   * 向后端发起请求
   */
  const loadData=async ()=>{
    setLoading(loading);
    try {
      let res = await listMyChartVoByPageUsingPost(searchParams);
      if (res.data){
         message.success("获取图表列表成功");
         //设置返回值
         setChartList(res.data.records?? []);
         setTotal(res.data.total?? 0 );
        //  //隐藏title:
        if (res.data.records){
          res.data.records.forEach((data)=>{
            const chartOption= JSON.parse(data.genChart ?? '{}'); //如果生成的json代码不存返回为{}
            chartOption.title=undefined;
            data.genChart=JSON.stringify(chartOption); //重新赋值为genChart
          });
        }
      }else {
        message.error("获取图表信息失败");
      }
    } catch (e :any) {
      message.error("获取我的图表失败",e.message);
    }
    setLoading(false);
  }

  /**
   * 钩子函数，搜索条件发生改变时会自己自动变化；
   */
  useEffect(()=>{
    loadData()
  },[searchParams])

  return (
    <div className="my-chart-page">
      <div className="search-chart">
        <Search
          placeholder="请输入图标名称搜索"
          loading={loading}
          enterButton
          onSearch={(value)=>{
            setSearchParams({
              ...searchParams,
              chartName: value, //根据图表名称来搜索
            });
          }}
        />
      </div>

      <div style={{marginBottom:16}}/>
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
          //触发查询条件：onChange=> function(page, pageSize)
          onChange: (page,pageSize) => {
            //重新进行搜索
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize: pageSize,
            });
          },
          current: searchParams.current, // 当前页
          pageSize: searchParams.pageSize, // 每页条数,
          total: total,
        }}

        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card  style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<Avatar src={currentUser?.userAvatar} />}
                title={ currentUser?.userName}
                description={item.chartType ? '图表类型：' + item.chartType : undefined}
              />
              <Divider/>
              <p
                style={{
                color: 'black',
                fontSize: '14px',}}
              >{'分析目标: ' + item.goal}</p>

              <p>{'图表名称: '+ item.chartName}</p>
              <ReactECharts option={ item.genChart && JSON.parse(item.genChart)} />
              <Divider/>
              <p  style={{
                color: 'black',
                fontSize: '14px',}}>{'智能分析结论: '+ item.getResult}
              </p>

              {/*<Row justify="end">*/}
              {/*  <Col>*/}
              {/*    <Button danger onClick={() => handleDelete(item.id)}>*/}
              {/*      删除*/}
              {/*    </Button>*/}
              {/*  </Col>*/}
              {/*</Row>*/}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default MyChartPage;

