import { Result } from 'antd';

export const PageError = () => {
  return <Result status="404" title="404" subTitle="К сожалению, данной страницы не существует."></Result>;
};
