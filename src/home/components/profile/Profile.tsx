import Avatar from "@shared/components/avartar";
import Grid from "@shared/components/grid";
import React, { ReactElement } from "react";
import * as S from "./Styles";
import Text from "@shared/components/text";
import Palette from "@shared/styles/Palette";

type Props = {
  name: string;
  image: string;
  description: string;
  email: string;
};

const CONTACT_LABEL = "Contact";

function Profile({ name, image, description, email }: Props): ReactElement {
  return (
    <S.Wrapper>
      <S.Content>
        <Avatar src={image} size={72} />

        <S.AboutWrapper>
          <Text
            className="name"
            decorate={{ fontWeight: "bold", fontSize: 18 }}
          >
            {name}
          </Text>
          <Text decorate={{ fontSize: 12 }}>{description}</Text>

          <S.ContactWrapper>
            <Text className="contact-label" decorate={{ fontWeight: "bold" }}>
              {CONTACT_LABEL}
            </Text>

            <Text decorate={{ textColor: Palette.GREY }}>{email}</Text>
          </S.ContactWrapper>
        </S.AboutWrapper>
      </S.Content>
    </S.Wrapper>
  );
}

export default Profile;
