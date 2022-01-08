---
title: Next.js 공식 문서 번역
description: Next.js 공식 문서 번역
category: Front-end
date: 2022-01-03
---

### Pre-Rendering

기본적으로, Next.js는 모든 페이지를 Pre-render 합니다.

즉, Next.js 는 클라이언트 측 JavaScript로 모든 작업을 수행하는 대신 각 페이지에 대해 미리 HTML을 생성 합니다.

Pre-Rendering은 웹의 성능과 SEO에 더 큰 도움이 됩니다.

각각의 생성된 HTML은 필요한 최소한의 자바스크립트 코드와 연결되어있습니다. 페이지가 브라우저로 부터 로딩될 때, 페이지의 자바스크립트 코드는 돌아가고, 모든 페이지를 Interactive 하게 만듭니다. (이를 Hydration 이라고 합니다.)

**한줄 요약**

1. Next.js는 JS로 모든 페이지를 생성하는 대신, 각 페이지에 대해서 HTML을 미리 생성합니다.

2. 이는 성능과 SEO에 좋습니다.

3. 생성된 HTML은 필요한 최소한의 자바스크립트와 연동되어 있는데, 페이지가 브라우저로 부터 로딩될 때, 페이지의 자바스크립트 코드는 돌아가고, 모든 페이지가 Interactive 하게 됩니다. 이를 Hydration 이라고 합니다.

---

### Pre-rendering이 일어나고 있는지 확인하는 방법

- 브라우저에서 자바스크립트 Disable 합니다.
- 페이지에 접근합니다.

이 때, 자바스크립트가 Disable 된 상태에서도 앱이 보여야 합니다.
왜냐하면. Next.js는 앱을 정적 HTML로 Pre-render해서 App UI가 자바스크립트 없이 보이게 하기 때문입니다.

### Hydration

Next.js가 처음 로드되면 Pre-render된 HTML이 보인다.
이때 자바스크립트가 로드되면 리액트 컴포넌트가 시작되고 앱이 작동하게 된다. 이를 하이드레이션이라고 합니다.

### Pre-rendering의 두가지 방법

Pre-rendering에는 두가지 방법이 있습니다.

1. Static Generation.
2. Server-side Rendering.

이 차이는 `언제 HTML을 생성하냐`에 차이가 있습니다.

1. Static Generation: 빌드 타임에 HTML 생성.
2. Server-side Rendering: 각각의 요청마다 HTML 생성.

### 언제 Static Generation을 사용하고, 언제 SSR을 사용할까?

- 최대한 Static Generation을 사용하는 것이 좋다.
- 왜냐하면 한번 페이지가 만들어지고 CDN을 통해 서빙될 때, SSR로 각 요청마다 페이지를 만들어내는 것 보다 훨씬 빠르기 때문이다.

- Static Generation은 아래와 같은 용도로 사용할 수 있다.

  - 마케팅 페이지
  - 블로그 포스트
  - 이커머스 제품 리스팅
  - Help and Documentation

- `사용자의 요청 이전에 이 페이지를 Pre-Render 할 수 있을까?` 라는 질문에 `맞다`고 답을 할 수 있으면 Static Generation을 쓰는 것이 낫다.

- 반면에, `Static Generation`은 사용자의 요청 이전에 Pre-render 하는 것이 어렵다면, 사용하지 않는게 좋다.

- 페이지가 수시로 자주 데이터를 업데이트 하고, 페이지의 요청마다 콘텐츠가 바뀐다면 `Static Generation`을 사용하지 않는 것이 낫다.

- 이러한 경우에는 SSR을 사용하는 것이 낫다. 이건 좀 느리지만, 프리 렌더링된 페이지는 항상 최신이다.

- 또는 너는 프리렌더링을 스킵할수 있고, 클라이언트 자바스크립트를 이용해서 자주 업데이트 되는 데이터를 업데이트 할 수 있다.

### 데이터가 있거나 없는 Static Generation

Static Generation은 데이터가 있는 상태로 될수도 있고, 없는 상태로 될 수 있습니다.

우리가 만드는 모든 페이지가 외부 데이터를 페칭해야 하는 것은 아닙니다.

이런 외부 데이터를 페칭하지 않는 페이지들은 빌드 타임에 자동적으로 정적으로 생성될 수 있습니다.

하지만, 어떤 페이지들은 처음에 데이터를 페칭하지 않으면 렌더할 수 없을 수도 있습니다.

아마 너는 파일시스템에 접근하거나, 외부 API에 접근하거나, 데이터 베이스에 들어갈 필요성 있을수도 있기 때문입니다.

Next.js는 `data와 함꼐하는 SSG` 를 제공합니다.

![](https://nextjs.org/static/images/learn/data-fetching/static-generation-with-data.png)

이는 `getStaticProps`라는 함수를 통해서 지원이 가능한데,
page 컴포넌트를 export 할 때, `getStaticProps`라는 함수도 export 할 수 있습니다.

getStaticProps는 빌드 타임에 실행되고, 함수 내부에서는 외부 데이터를 가져와서 이를 Props로 뿌려줄 수 있습니다.

기본적으로, `getStaticProps`는 Next.js에게 `"야! 이 페이지는 외부 데이터 종속성이 있어! 그니깐 너가 이 페이지를 빌드 타임에 프리 렌더할 때, 이걸 먼저 해결해야해! "` 라고 알려주는 것이다.

### 결론

getStaticProps는 빌드 이후에는 값을 변경할 수 없다.
빌드 할 때, 데이터를 가져오고, 그 이후에는 똑같이 정적 파일을 서빙한다.

### getServerSideProps

만약 너가 빌드 타임 대신에, 요청할 때 데이터를 페치해야 한다면, 너는 Server-side-Rendering을 써야한다.

![](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering-with-data.png)

서버 사이드 렌더링을 위해서는, getStaticProps 대신에 getServerSideProps를 써야한다.

serverSideProps는 Request때 마다 불리기 때문에, 파라미터로 `contxt` 라는 상세한 요청 정보가 들어가 있는 변수가 들어간다.

```js
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

요청할 때 마다 데이터가 달라지는 경우만 `getServerSideProps`를 사용해야 한다. 왜냐하면 서버는 매 요청마다 결과를 계산해야 하고, 결과는 CDN에 특별한 설정 없이는 캐싱될 수 없기 때문에, 속도가 느리다.

### GetInitialProps

- 이거는 나중에
