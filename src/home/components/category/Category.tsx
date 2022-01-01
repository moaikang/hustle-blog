import React, { ReactElement } from "react";
import * as S from "./Styles";
import Text from "@shared/components/text";
import Palette from "@shared/styles/Palette";
import Link from "next/link";
import useCategoryQuery from "@home/hooks/useCategoryQuery";
import useFetchCategory from "@home/hooks/useFetchCategory";

function Category(): ReactElement {
  const { isCategoriesLoading, categories, error } = useFetchCategory();
  const { isCategorySelected } = useCategoryQuery();

  if (isCategoriesLoading) {
    return <div></div>;
  }

  if (error) {
    return <div>에러 발생</div>;
  }

  return (
    <S.Wrapper>
      <S.CategoryList>
        {categories &&
          categories.map((categoryObj) => {
            const { category } = categoryObj;
            const isSelected = isCategorySelected(category);

            return (
              <S.CategoryItem key={categoryObj.id}>
                <Link href={`/?category=${category.toLowerCase()}`} passHref>
                  <Text
                    as="a"
                    decorate={{
                      fontWeight: "bold",
                      textColor: isSelected ? Palette.BLACK : Palette.GREY,
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
