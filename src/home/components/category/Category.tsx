import React, { ReactElement } from "react";
import * as S from "./Styles";
import Text from "@shared/components/text";
import Palette from "@shared/styles/Palette";
import Link from "next/link";
import useCategoryQuery from "@home/hooks/useCategoryQuery";

type Props = {
  categories: string[];
};

function Category(props: Props): ReactElement {
  const { categories } = props;
  const { isCategorySelected } = useCategoryQuery();

  return (
    <S.Wrapper>
      <S.CategoryList>
        {categories.map((category) => {
          const isSelected = isCategorySelected(category);

          return (
            <S.CategoryItem key={category}>
              <Link href={`/?category=${category.toLowerCase()}`} passHref>
                <Text
                  as="a"
                  decorate={{
                    fontWeight: "bold",
                    textColor: isSelected
                      ? Palette.BLACK
                      : Palette.LESS_LIGHT_GREY,
                    underline: isSelected,
                  }}
                >
                  {category}
                </Text>
              </Link>
            </S.CategoryItem>
          );
        })}
      </S.CategoryList>
    </S.Wrapper>
  );
}

export default Category;
