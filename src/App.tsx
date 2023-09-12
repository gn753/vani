import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Message from "./components/Message";
import { IsMessage } from "./types/types";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessageList = async () => {
      const res = await fetch("http://test.vanillabridge.com/test_data");
      const data = await res.json();
      setMessages(data);
    };
    fetchMessageList();
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
              {messages.map((it: IsMessage) => (
                <Message key={it.id} {...it} />
              ))}
            </div>
          </div>
        </Body>
      </Container>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div``;

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
