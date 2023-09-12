import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { IsCustomMessage } from "../types/types";
import moment from "moment";

export default function Input({ messages, setMessages }: any) {
  const [inputMessage, setInputMessage] = useState("");
  const [messageId, setMessageId] = useState(0);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    const currentTime = moment().format("YYYY-MM-DD");

    //새 메시지 데이터
    const newMessage = {
      id: messageId,
      user_id: 1,
      user_name: "소개자",
      photo_url: "",
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      msg: {
        content: inputMessage,
        mtype: "text",
      },
    };
    //현재 작성한 날짜가 기존에 있는지 확인 기
    const findData = messages.find(
      (msg: any) => msg.date.slice(0, 10) === currentTime
    );

    //해당 날짜에 작성한적이 있다면 해당 날짜에 push 하기
    if (findData) {
      let copyData = JSON.parse(JSON.stringify(messages));
      copyData[copyData.length - 1].messages.push(newMessage);

      setMessages(copyData);
    } 
    //없다면 새로 데이터를 만들기
    else {
      setMessages((pre: IsCustomMessage[]) => [
        ...pre,
        { date: currentTime, messages: [newMessage] },
      ]);
    }

    setInputMessage("");
  };

  useEffect(() => {
    if (messages.length > 0) {
      const test1 = messages[messages.length - 1].messages;
      const id = test1[test1.length - 1].id;

      setMessageId(id + 1);
    }
  }, [messages]);

  return (
    <InputContainer>
      <CustomInput
        type="text"
        placeholder="메세지를 입력해주세요"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button onClick={handleSendMessage}>전송</Button>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
`;

const CustomInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
