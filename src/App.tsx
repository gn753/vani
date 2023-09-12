import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Message from "./components/Message";
import { IsMessage, IsCustomMessage } from "./types/types";
import Input from "./components/Input";
import ProfileBox from "./components/ProfileBox";

function App() {
  const [messages, setMessages] = useState<IsCustomMessage[] | []>([]);
  const [profile, setProfile] = useState<any>({
    name: "",
    photo: "",
  });

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

      const profile = data.filter((it: any) => it.user_id === 2);
      setProfile({ photo: profile[0].photo_url, name: profile[0].user_name });
    };

    fetchMessages();
  }, []);

  return (
    <AppWrapper className="App">
      <Container>
        <Header>
          <div>
            <ProfileBox photo={profile.photo} name={profile.name} />
          </div>
        </Header>
        <Body>
          <BodyContainer>
            <List>
              {messages.length > 0 &&
                messages.map((messageGroup: any, index) => {
                  return (
                    <div key={`${messageGroup.date}-${index}`}>
                      <DayGroupTitle>
                        <span>{messageGroup.date}</span>
                      </DayGroupTitle>
                      <ul>
                        {messageGroup.messages.map(
                          (item: IsMessage) =>
                            item.msg.mtype === "text" && (
                              <Message key={item.id} {...item} />
                            )
                        )}
                      </ul>
                    </div>
                  );
                })}
            </List>
            <Input messages={messages} setMessages={setMessages} />
          </BodyContainer>
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
  width: 360px;
  height: 720px;
`;

const Header = styled.header`
  position: fixed;
  width: 360px;
  background-color: #faf0e1;
  & > div {
    display: flex;
    justify-content: center;
    height: 60px;
    padding: 20px;
    box-sizing: border-box;
  }
`;

const DayGroupTitle = styled.h3`
  display: flex;
  justify-content: center;
  span {
    background-color: gray;
    color: #fff;
    font-size: 12px;
    padding: 4px;
    border-radius: 3px;
    box-sizing: border-box;
  }
`;

const Body = styled.div`
  background-color: #fff9ef;
`;

const BodyContainer = styled.div`
  box-sizing: border-box;
`;

const List = styled.div`
  overflow: scroll;
  box-sizing: border-box;
  height: 683px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
