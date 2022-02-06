import Avatar from "@shared/components/avartar";
import React, { ReactElement } from "react";
import * as S from "./Styles";
import Text from "@shared/components/text";
import Palette from "@shared/styles/Palette";

const CONTACT_LABEL = "Contact";

const PROFILE = {
  AVATAR_URL: "https://avatars.githubusercontent.com/u/52201658?v=4",
  NAME: "moaikang",
  BIO: "No Stack Engineeeeeer 👻",
  EMAIL: "moaikang.dev@gmail.com",
};

type Props = React.HTMLAttributes<HTMLElement>;

function Profile(props: Props): ReactElement {
  return (
    <S.Wrapper {...props}>
      <S.Content>
        <Avatar src={PROFILE.AVATAR_URL} size={72} />

        <S.AboutWrapper>
          <Text
            className="name"
            decorate={{ fontWeight: "bold", fontSize: 18 }}
          >
            {PROFILE.NAME}
          </Text>
          <Text decorate={{ fontSize: 12 }}>{PROFILE.BIO}</Text>

          <S.ContactWrapper>
            <Text className="contact-label" decorate={{ fontWeight: "bold" }}>
              {CONTACT_LABEL}
            </Text>

            <Text decorate={{ textColor: Palette.GREY }}>{PROFILE.EMAIL}</Text>
          </S.ContactWrapper>
        </S.AboutWrapper>
      </S.Content>
    </S.Wrapper>
  );
}

export default Profile;
