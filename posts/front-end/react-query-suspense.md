---
title: React Query suspense 옵션의 동작 원리
description: useQuery suspense 옵션을 직접 만들어보며 파악하는 동작 원리
category: Front-end
date: 2022-06-20
---

### 서론

서버 상태 관리를 위해 React Query 라이브러리를 사용하고 있습니다.

추가로, 상황이 허락한다면 `useQuery`에 `suspense: true` 옵션을 주어 `Suspense`와 `ErrorBoundary` 를 사용해 비동기 펜딩중의 UI를 선언적으로 처리하고, 에러 시의 UI를 선언적으로 처리해 코드의 복잡도를 줄이려고 노력합니다.

아래의 코드는 Suspense를 사용한 예시 코드입니다. ErrorBoundary는 설명의 편의를 위해 사용하지 않았습니다.

```tsx
function Component() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <SubComponent />
    </Suspense>
  );
}

function SubComponent() {
  const todoQuery = useQuery("todo", fetchTodo, { suspense: true });

  return <div>{todoQuery.data}</div>;
}
```

`Suspense` 를 사용하면, 데이터가 페칭중일때의 보여주어야 할 UI를 `fallback`이라는 `props`로 넘겨 렌더할 수 있습니다.

위와 같은 방법으로 비동기 처리하는 것을 정리하다가 `suspense: true`일 때, `useQuery` 내부에서 무슨일이 일어나는지 궁금해져서 `useQuery(key, fetchFn, {suspense: true})` 를 직접 만들어 보았습니다. 이 과정에서 얻은 점들을 공유하면 좋을 것 같아 공유합니다.

## 두줄 요약

1. `Suspense` 컴포넌트 `fallback props`는 하위 컴포넌트에서 Promise를 Throw할 때 렌더됩니다.
2. Suspense 하위 컴포넌트는 데이터가 다 불러와져야 마운트 합니다.

> 직접 만들어본 `useQuery(key, queryFn, {suspense: true})`

```tsx
type QueryStatus = {
  status: "pending" | "success" | "error";
  result: unknown;
};

const queryMap = new Map<string, QueryStatus>();

export function useCustomSuspenseQuery<T>(
  key: string,
  queryFn: () => Promise<T>
) {
  const suspender = queryFn()
    .then((result) => {
      queryMap.set(key, { status: "success", result });
    })
    .catch((error) => {
      queryMap.set(key, { status: "error", result: error });
    });

  if (!queryMap.has(key)) {
    queryMap.set(key, { status: "pending", result: null });
    throw suspender;
  }

  const queryMetaData = queryMap.get(key)!;

  if (queryMetaData.status === "success") {
    return { isFetching: false, data: queryMetaData.result as T };
  }

  if (queryMetaData.status === "error") {
    throw queryMetaData.result;
  }
}
```

> 사용 예시

```tsx
const fetchTodo = (): Promise<string> =>
  new Promise((res) => {
    setTimeout(() => res("코딩"), 1000);
  });

const fetchRest = (): Promise<string> =>
  new Promise((res) => {
    setTimeout(() => res("산책"), 1500);
  });

const TestContent = React.memo(function _Test({}: Props) {
  const todoQuery = useCustomSuspenseQuery<string>("todo", fetchTodo);
  const restQuery = useCustomSuspenseQuery<string>("rest", fetchRest);

  return (
    <div>
      <button type="button">{todoQuery?.data}</button>
      <button type="button">{restQuery?.data}</button>
    </div>
  );
});

function Test() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <TestContent />
    </Suspense>
  );
}
```
