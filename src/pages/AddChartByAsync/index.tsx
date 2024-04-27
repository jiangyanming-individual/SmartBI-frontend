import {Alert, Tabs, message, Form, Select, Upload, Button, Space, Row, Col, Card, Divider, Spin} from 'antd';
import React, { useState } from 'react';
import TextArea from "antd/es/input/TextArea";
import {UploadOutlined} from "@ant-design/icons";
import ReactECharts from 'echarts-for-react';
import {geneChartAsynMqUsingPost, geneChartAsynUsingPost, geneChartUsingPost} from "@/services/smartBi/chartController";
import {useForm} from "antd/es/form/Form";


const AddChartByAsync: React.FC = () => {

  //清空图表
  const [form,setForm]=useForm();

  //后端返回的数据
  const [submitting,setSubmitting]=useState<boolean> (false);

  const onFinish = async (values: any) => {
    //不重复提交
    if (submitting){
      return;
    }
    setSubmitting(true);
    const params={
      ...values,
      file: undefined
    };
    try {
       console.log(values.file)
       const res=await geneChartAsynMqUsingPost(params,{},values.file.file.originFileObj); //传递参数；
      if (!res?.data){
         message.error('分析数据上传失败，稍后请重试');
       }else {
         message.success('分析数据上传成功，稍后可以在我的图表页面查看');
         form.resetFields(); //重置所有的表单
       }
    }catch (e :any){
      message.error("分析失败",+e.message);
    }
    //最后关闭提交
    setSubmitting(false);
  };

  return (
    <div className="add-chart-async">
      <Divider style={{ fontWeight: 'bold', color: 'blue' }}>智能分析(异步)</Divider>
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
                rules={[{ required: true, message: '请输入分析目标' }]}
              >
                <TextArea placeholder="请输入你的分析需求，比如分析网站用户的增长情况" />
              </Form.Item>

              <Form.Item
                name="chartName"
                label="图表名称"
                rules={[{ required: true, message: '请输入图表名称' }]}
              >
                <TextArea placeholder="请输入图表名称" />
              </Form.Item>

              <Form.Item
                name="chartType"
                label="图表类型"
                rules={[{ required: true, message: '请选择图表的类型' }]}
              >
                <Select
                  options={[
                    { value: '饼图', label: '饼图' },
                    { value: '地图', label: '地图' },
                    { value: '树图', label: '树图' },
                    { value: '折线图', label: '折线图' },
                    { value: '柱状图', label: '柱状图' },
                    { value: '雷达图', label: '雷达图' },
                    { value: '条形图', label: '条形图' },
                    { value: '热力图', label: '热力图' },
                    { value: '漏斗图', label: '漏斗图' },
                    { value: '散点图', label: '散点图' },
                    { value: '仪表盘', label: '仪表盘' },
                    { value: 'K线图', label: 'K线图' },
                    { value: '长图表', label: '长图表' },
                    { value: '区域图', label: '区域图' },
                    { value: '面积热力图', label: '面积热力图' },
                    { value: '三维散点图', label: '三维散点图' },
                  ]}
                />
              </Form.Item>

              <Form.Item name="file" label="原始数据">
                <Upload name="file" maxCount={1} accept=".csv,.xls,.xlsx,.json,.txt,.xml,.sql">
                  <Button icon={<UploadOutlined />}>上传 CSV 文件(Excel)</Button>
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
    </div>
  );
};
export default AddChartByAsync;

