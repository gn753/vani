import styled from "@emotion/styled";
import { IsMessage } from "../types/types";
import parse from "html-react-parser";
import ProfileBox from "./ProfileBox";
export default function Messages({ ...rest }: IsMessage) {
  const { msg, created_at, photo_url, user_id, user_name } = rest;

  const dateObj = new Date(created_at);

  const hour = dateObj.getHours();

  const time = hour > 12 ? "오후" : "오전";

  const formattedTime = `${time} : ${hour.toString().padStart(2, "0")}:${dateObj
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <Container>
      {user_id === 2 && <ProfileBox photo={photo_url} name={user_name} />}
      <MessageBox row={user_id === 1 ? true : false}>
        <Text row={user_id === 1 ? true : false}>
          {parse(`${msg.content}`)}
        </Text>
        <TimeStamp>
          <span>{formattedTime}</span>
        </TimeStamp>
      </MessageBox>
    </Container>
  );
}

const Container = styled.li`
  margin: 0 auto;
  padding: 10px;
`;

interface IsMessageBox {
  row: boolean;
}

const MessageBox = styled.div<IsMessageBox>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 40px;
  border-radius: 10px;
  flex-direction: ${(props) => props.row && "row-reverse"};
`;

const Text = styled.p<IsMessageBox>`
  margin: 0;
  padding: 5px 10px;
  border-radius: 12px;
  max-width: 150px;
  border-top-left-radius: ${(props) => (props.row ? "12px" : "0px")};
  background-color: ${(props) => (props.row ? "#03006e" : "#FFF")};
  color: ${(props) => (props.row ? "#FFF" : "#000")};
`;

const TimeStamp = styled.div`
  font-size: 12px;
  color: #888;
  align-self: end;
  span {
    right: 0;
    bottom: 0;
  }
`;
