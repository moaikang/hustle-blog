---
title: React Query 공식 문서 번역 - 개요
description: React Query 공식 문서의 개요 부분을  번역해보았습니다.
category: Front-end
date: 2022-01-14
---

# React Query 개요

React Query는 React에서의 데이터 페칭을 위한 라이브러리로 설명되지만, 보다 기술적인 용어로 말하면 React 애플리케이션에서 서버 상태를 페칭하고, 캐싱하고, 동기화시키는 라이브러리입니다.

## 만든 이유

React 애플리케이션은 컴포넌트에서 데이터를 가져오는 방법을 제공하지 않습니다.
따라서 개발자들은 React Hook을 사용해 데이터를 페칭하거나, 애플리케이션에 비동기 데이터를 저장하고 제공하기 위해 상태 관리 라이브러리를 사용하였습니다.

대부분 기존의 상태관리 라이브러리는 클라이언트 상태를 다루기에는 적합하지만, 비동기 데이터나 서버
상태를 다루기에는 좋지 않습니다. 왜냐하면 서버 상태는 완벽하게 다르기 때문입니다.

서버 상태는

- 제어하거나 가질수 없는 위치에 원격으로 존재
- 페칭하거나 업데이트하기 위해 비동기 API가 필요
- 공유된 소유권을 의미하며, 모르는 사이에 사람들이 데이터를 바꿀수 있음
- 조심하지 않는다면 최신 상태를 유지하지 못할 가능성이 있음

애플리케이션에서 서버 상태의 특성을 파악하면, 아래와 같은 더 많은 해결해야할 문제가 발생합니다.

- 캐싱
- 동일한 데이터에 대한 여러 요청을 단일 요청으로 중복 제거
- 오래된 데이터를 업데이트 하는 것
- 언제 데이터가 유효하지 않은지 아는 것
- 최대한 빠르게 데이터 업데이트를 반영하는 것
- 페이지네이션과 Lazy Loading 같은 성능 최적화
- 서버 상태에 대한 메모리 관리와 가비지 컬렉션

이 해결해야할 문제들을 이미 해결했다면, 당신은 슈퍼 개발자입니다.
하지만, 당신이 슈퍼 개발자가 아니라면 이 문제와 아직 싸우고 있을 것입니다.

React Query는 서버 상태를 관리하기 위한 최고의 라이브러리 중 하나입니다.
환경 설정을 할 필요 없이 즉시 사용 가능하고, 놀라울 정도로 잘 작동하고, 프로젝트의 규모가 커짐에 따라 원하는 대로 사용자가 커스터마이징 할 수 있습니다.

React Query는 이러한 까다로운 서버 상태 관리로 인해 생기는 문제를 해결하기에 적합합니다.

React Query는 다음과 같은 기술적인 장점이 있습니다.

- 복잡하고 이해하기 어려운 여러줄의 코드를 제거하고, 몇 줄 안되는 React Query 로직으로 서버 상태를 컨트롤 할 수 있습니다.
- 환경 설정에 대한 걱정 없이 애플리케이션을 유지 보수하기 쉬워지고, 새로운 기능을 더 쉽게 구축할 수 있게 됩니다.
- 애플리케이션을 빠르고 성능좋게 만들어서 사용자에게 좋은 UX를 서빙할 수 있게 합니다.

## 예시

```js
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    )
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
```
