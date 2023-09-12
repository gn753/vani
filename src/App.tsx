import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Message from "./components/Message";
import { IsMessage, IsCustomMessage } from "./types/types";

function App() {
  const [messages, setMessages] = useState<IsCustomMessage[] | []>([]);
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("http://test.vanillabridge.com/test_data");
      const data = await res.json();

      //날짜만을 추출
      const extractDays = data.map((it: any) => {
        return it.created_at.slice(0, 10);
      });

      //중복 제거
      const removedSameValue = Array.from(new Set(extractDays));

      // 동일한 날짜끼리 그룹화

      const findsameDays = () => {
        let sum: any = [];
        removedSameValue.map((day: any) => {
          const response = data.filter(
            (it: any) => it.created_at.slice(0, 10) === day.slice(0, 10)
          );

          sum.push({ date: day.slice(0, 10), messages: [...response] });
          return null;
        });
        return sum;
      };

      const customNewData = findsameDays();

      //최종적으로 날짜 정렬
      const customOrderedDate: IsCustomMessage[] = customNewData.sort(
        (a: any, b: any) => {
          return +new Date(a.date) - +new Date(b.date);
        }
      );

      setMessages(customOrderedDate);

      //날짜 순 정렬
    };
    fetchMessages();
  }, []);

  return (
    <AppWrapper className="App">
      <Container>
        <Header>
          <div>
            <div>채팅방 상대</div>
          </div>
        </Header>
        <Body>
          <div>
            <div>
              {messages.map((messageGroup: any) => {
                return (
                  <>
                    <h3>{messageGroup.date}</h3>
                    <ul>
                      {messageGroup.messages.map((msg: IsMessage) => (
                        <Message key={msg.id} {...msg} />
                      ))}
                    </ul>
                  </>
                );
              })}
            </div>
          </div>
        </Body>
      </Container>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  border: 1px solid black;
  width: 360px;
  height: 720px;
`;

const Header = styled.header`
  background-color: #faf0e1;
  & > div {
    display: flex;
    justify-content: center;
    height: 60px;
    padding: 20px;
    box-sizing: border-box;
  }
`;

const Body = styled.div`
  background-color: #fff9ef;
  overflow: scroll;
  & > div {
    height: 660px;
    padding: 10px;
    border: 1px solid red;
    box-sizing: border-box;
  }
`;
