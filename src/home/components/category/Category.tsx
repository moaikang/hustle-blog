import React, { ReactElement } from "react";
import * as S from "./Styles";
import Text from "@shared/components/text";
import Palette from "@shared/styles/Palette";

type Props = {};

function Category({}: Props): ReactElement {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = [
    "All",
    "Front-end",
    "React",
    "JavaScript",
    "TypeScript",
    "Web",
    "Infra",
    "Retrospect",
  ];

  return (
    <S.Wrapper>
      <S.CategoryList>
        {categories.map((category, idx) => {
          const isSelected = selectedCategory === category;

          return (
            <S.CategoryItem key={category}>
              <Text
                decorate={{
                  fontWeight: "bold",
                  textColor: isSelected ? Palette.BLACK : Palette.GREY,
                  underline: isSelected,
                }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Text>
            </S.CategoryItem>
          );
        })}
      </S.CategoryList>
    </S.Wrapper>
  );
}

export default Category;
