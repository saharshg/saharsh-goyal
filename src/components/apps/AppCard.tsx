import { Heading, Line, Row, SmartLink, Text } from "@once-ui-system/core";

export type AppType = {
  name: string;
  url: string;
  description: string;
};
export const AppCard = ({ app }: { app: AppType }) => {
  return (
    <Row>
      <SmartLink href={app.url}>
        <Row fillWidth maxWidth='s' gap='4'>
          <Heading>{app.name}</Heading>
          <Text>{app.description}</Text>
        </Row>
      </SmartLink>
      <Line />
    </Row>
  );
};
