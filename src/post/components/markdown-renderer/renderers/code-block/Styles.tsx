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
