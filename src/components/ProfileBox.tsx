import styled from "@emotion/styled";

interface IsProps {
    photo:string;
    name:string;
}

export default function ProfileBox({photo,name}:IsProps) {
  return (
    <Profile>
      <Avatar photo={photo} />
      <div>{name}</div>
    </Profile>
  );
}

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

interface IsAvatar {
  photo: string;
}

const Avatar = styled.div<IsAvatar>`
  width: 30px;
  height: 30px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 7px;
  background-image: url(${(props) => props.photo});
`;
