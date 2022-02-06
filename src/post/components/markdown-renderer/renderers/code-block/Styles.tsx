import styled from "@emotion/styled";

const TRAFFIC_LIGHT_URL = `https://ik.imagekit.io/garbagevalue/garbage/window-buttons_gt8xoXxWn.png`;

export const TrafficLight = styled.div`
  width: 100%;
  height: 16px;
  background-color: rgb(30, 30, 30);
  background-image: url(${TRAFFIC_LIGHT_URL});
  background-repeat: no-repeat;
  background-size: 44px 10px;
  border-radius: 12px 12px 0 0;
  background-position: 1em 1em;
  padding: 1em;
  box-sizing: border-box;
`;

export const DefaultCodeTag = styled.code`
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 3px 2px;
  overflow-wrap: break-word;
  color: #eb5757;
  border-radius: 3px;
  background-color: rgba(135, 131, 120, 0.15);
  line-height: normal;
`;
