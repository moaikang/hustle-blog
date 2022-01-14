---
title: React Query 공식 문서 번역 - Quick Start
description: React Query 공식 문서의 Quick Start 부분을 번역해보았습니다.
category: Front-end
date: 2022-01-14
---

# React- Query Quick Start

아래의 예시는 React Query의 핵심 개념 3가지를 간략하게 표현합니다.

## Queries

### Query 기초

Query는 고유한 키에 연결된 비동기 데이터에 대한 선언적 종속성입니다.
Query는 GET, POST 요청을 포함한 Promise 기반의 메서드를 서버에서 데이터를 가져오는데 사용할 수 있습니다.
만약 서버의 데이터를 수정한다면, `Mutations` 사용을 권장합니다.

Query를 Custom Hook이나 컴포넌트에서 구독하고 싶다면, `useQuery` Hook을

- Query를 위한 고유한 키
- Promise를 반환하는 함수

와 함께 호출하세요.

```js
import { useQuery } from "react-query";

function App() {
  const info = useQuery("todos", fetchTodoList);
}
```

당신이 사용한 고유키는 내부적으로 다시 데이터 패칭하고, 캐싱하고, 애플리케이션에서 쿼리를 공유하는 데에 사용됩니다.
`useQuery`로 부터 반환된 값은 쿼리에 대한 정보를 담고 있습니다.

```js
const result = useQuery("todos", fetchTodoList);
```

`result` 객체에 포함되어 있는 몇몇 상태는 생산성을 위해 알아야 합니다.
Query는 아래와 같은 상태를 가질 수 있습니다.

- `isLoading` or `status === 'loading'` - 데이터가 없고 현재 Fetching 중
- `isError` or `status === 'error'` - 에러
- `isSuccess` or `status === 'success'` - 성공하고 data가 있는 상태
- `isIdle` or `status === 'idle'` - 현재 사용 불가능한 상태 (이에 대해 좀 더 자세히 알아볼 것입니다.)

이러한 기본 상태 외에도 쿼리 상태에 따라 더 많은 정보를 사용할 수 있습니다.

- `error`- 쿼리가 `isError` 상태인 경우 속성 `error`를 통해 `error` 사용 가능.
- `data`- 쿼리가 `success` 상태인 경우 속성을 통해 데이터를 사용할 수 있습니다.
- `isFetching`- 쿼리를 가져오는 경우 (백그라운드 다시 가져오기 포함) 어떤 상태에서도 참이 됩니다.

대부분의 쿼리의 경우 일반적으로 `isLoading` 상태를 확인한 다음, `isError` 상태 를 확인한 다음, 마지막으로 데이터를 사용할 수 있다고 가정하고 성공적인 상태를 렌더링하는 것으로 충분합니다.

```js
function Todos() {
  const { isLoading, isError, data, error } = useQuery("todos", fetchTodoList);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // 우리는 이 지점에 'isSuccess === true'라고 생각할 수 있습니다.
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

만약 boolean 형태의 변수가 맘에 들지 않으면, `status`를 사용할 수 있습니다.

```js
function Todos() {
  const { status, data, error } = useQuery("todos", fetchTodoList);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  // 물론 status === 'success'도 사용할 수 있으나, "else" 로직도 작동합니다.
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

## Mutations

Query와 달리, `mutations`은 보통 데이터를 Create / Update / Delete 하거나, 서버의 사이드 이펙트를 수행하는 데에 사용됩니다. 이러한 목적으로, `React Query`는 `useMutation` hook을 제공합니다.

`mutation`을 사용해 새로운 할일을 서버에 추가하는 예시입니다.

```js
function App() {
  const mutation = useMutation((newTodo) => {
    return axios.post("/todos", newTodo);
  });

  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}
```

`mutation`은 아래와 같은 상태를 가질 수 있습니다.

- `isIdle` or `status === 'idle'` - mutation이 idle 이거나, 새로 만들어지거나 초기화된 상태
- `isLoading` or `status === 'loading'` - mutation이 돌아가고 있는 상태
- `isError` or `status === 'error'` - mutation에서 에러 발생
- `isSuccess` or `status === 'success'` - mutation이 성공적이고, mutation data가 사용 가능한 상태

이러한 기본 상태 외에도 `mutation`의 상태에 따라 더 많은 정보를 사용할 수 있습니다.

- `error` - `mutation`이 Error 상태일 때, 속성 error을 통해 오류가 발생 합니다.
- `data`- `mutation`이 success 상태에 있는 경우, 속성을 통해 데이터를 사용할 수 있습니다.

위의 예에서, 하나의 변수 또는 객체를 `mutate` 함수를 호출하여 `mutation` 함수에 변수를 전달할 수도 있음을 확인했습니다.

변수만 있을 때에는 `Mutation`은 그렇게 특별하지 않지만, `onSuccess 옵션`, 쿼리 클라이언트의 `invalidateQueries()` 및 Query Client의 `setQueryData()` 와 함께 사용하면, `mutation`은 매우 강력한 도구가 됩니다.

> 중요: 이 함수는 비동기 함수이므로, React 16 및 이전 버전의 이벤트 콜백에서 직접 사용할 수 없습니다 . onSubmit의 이벤트에 액세스해야 하는 경우 다른 함수로 `mutate`를 래핑해야 합니다. 이것은 [React의 이벤트 풀링](https://reactjs.org/docs/legacy-event-pooling.html) 때문 입니다.

```js
// 아래의 코드는 React 16 이하의 버전에서 작동하지 않습니다.
const CreateTodo = () => {
  const mutation = useMutation((event) => {
    event.preventDefault();
    return fetch("/api", new FormData(event.target));
  });

  return <form onSubmit={mutation.mutate}>...</form>;
};

// 아래의 코드는 작동합니다.
const CreateTodo = () => {
  const mutation = useMutation((formData) => {
    return fetch("/api", formData);
  });

  const onSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(new FormData(event.target));
  };

  return <form onSubmit={onSubmit}>...</form>;
};
```

### Mutation 상태 초기화하기

아래의 코드는 `mutation`의 `error` 또는 `data`를 클리어 해야하는 예시입니다.
이를 하기 위해서는, `reset`함수를 써서 해결할 수 있습니다.

```jsx
const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const mutation = useMutation(createTodo);

  const onCreateTodo = (e) => {
    e.preventDefault();
    mutation.mutate({ title });
  };

  return (
    <form onSubmit={onCreateTodo}>
      {mutation.error && (
        // mutation 초기화
        <h5 onClick={() => mutation.reset()}>{mutation.error}</h5>
      )}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <button type="submit">Create Todo</button>
    </form>
  );
};
```

### Mutation 사이드 이펙트

`useMutation`은 `mutation`의 생명 주기 동안언제든 사용할 수 있는 사이드 이펙트를 도와주는 몇가지 옵션이 제공됩니다. 이는 `mutation`이후 쿼리 무효와와 데이터 refetching 뿐만 아니라 `optimistic updates`에 용이합니다.

```js
useMutation(addTodo, {
  onMutate: (variables) => {
    // mutation이 일어나려고 합니다.

    // 선택적으로 (예를 들어) 롤백할 때 사용할 데이터가 포함된 컨텍스트를 반환합니다.
    return { id: 1 };
  },
  onError: (error, variables, context) => {
    // 에러가 발생 했을 때
    console.log(`rolling back optimistic update with id ${context.id}`);
  },
  onSuccess: (data, variables, context) => {
    // 성공했을 때,
  },
  onSettled: (data, error, variables, context) => {
    // 에러 혹은 성공 했을 때,
  },
});
```

콜백 함수에서 promise를 반환할 때, 다음 콜백이 호출되기 전에 먼저 기다립니다.

```js
useMutation(addTodo, {
  onSuccess: async () => {
    console.log("I'm first!");
  },
  onSettled: async () => {
    console.log("I'm second!");
  },
});
```

`mutate`를 호출할 때, `useMutation`에 정의 되어있는 콜백 말고 추가적인 다른 콜백을 트리거하고 싶을수도 있습니다. 이것은 컴포넌트에 특화된 사이드 이펙트를 트리거하는 데에 사용될 수 있습니다. 그렇게 하려면 `mutation` 에 동일한 콜백 옵션을 함수에 제공해야 합니다.
지원되는 재정의는 `onSuccess`, `onError`및 `onSettled`입니다. `mutation`이 완료 되기 전에 컴포넌트가 언마운트되면 이러한 추가 콜백이 실행되지 않습니다.

```js
useMutation(addTodo, {
  onSuccess: (data, variables, context) => {
    // I will fire first
  },
  onError: (error, variables, context) => {
    // I will fire first
  },
  onSettled: (data, error, variables, context) => {
    // I will fire first
  },
});

mutate(todo, {
  onSuccess: (data, variables, context) => {
    // I will fire second!
  },
  onError: (error, variables, context) => {
    // I will fire second!
  },
  onSettled: (data, error, variables, context) => {
    // I will fire second!
  },
});
```

### Promises

성공 시 해결되거나 오류가 발생하는 프라미스를 얻으려면 `mutateAsync`를 `mutate` 대신 사용하세요.
이 예시는 사이드 이펙트를 구성하는 예시입니다.

```js
const mutation = useMutation(addTodo);

try {
  const todo = await mutation.mutateAsync(todo);
  console.log(todo);
} catch (error) {
  console.error(error);
} finally {
  console.log("done");
}
```

### Retry

기본적으로 React Query는 `mutation`이 실패했을 때, 재시도 하지 않습니다. 하지만, `retry` 옵션으로 재시도 할 수 있습니다.

```js
const mutation = useMutation(addTodo, {
  retry: 3,
});
```

장치가 오프라인일때 돌연변이가 실패하면, 장치가 다시 연결될 때 재시도됩니다.

### Mutation 저장

Mutation은 필요한 경우 저장소에 저장되고 나중에 다시 시작할 수 있습니다. 이것은 `hydrate()`로 수행할 수 있습니다.

```js
const queryClient = new QueryClient();

// "addTodo" mutation 정의
queryClient.setMutationDefaults("addTodo", {
  mutationFn: addTodo,
  onMutate: async (variables) => {
    // ToDo 리스트에 필요한 현재 쿼리 취소
    await queryClient.cancelQueries("todos");

    // optimistic todo 생성
    const optimisticTodo = { id: uuid(), title: variables.title };

    // optimistic todo를 todoList에 추가
    queryClient.setQueryData("todos", (old) => [...old, optimisticTodo]);

    // optimistic todo를 가지고 있는 Context 반환
    return { optimisticTodo };
  },
  onSuccess: (result, variables, context) => {
    // ToDdoList의 Optimistic Todo를 결과로 바꿉니다.
    queryClient.setQueryData("todos", (old) =>
      old.map((todo) => (todo.id === context.optimisticTodo.id ? result : todo))
    );
  },
  onError: (error, variables, context) => {
    // optimistic todo 를 todos list에서 제거
    queryClient.setQueryData("todos", (old) =>
      old.filter((todo) => todo.id !== context.optimisticTodo.id)
    );
  },
  retry: 3,
});

// Component에서 MUtation 시작
const mutation = useMutation("addTodo");
mutation.mutate({ title: "title" });

// Mutation이 네트워크가 끊기는 등의 이유로 멈췄을 때
// 애플리케이션이 종료될 때 일시 중지된 mutation이 Dehydrate 될 수 있습니다.
const state = dehydrate(queryClient);

// 애플리케이션이 시작될 때, mutation이 다시 hydrated 될 수 있습니다.
hydrate(queryClient, state);

// 멈춘 Mutation을 다시 시작합니다.
queryClient.resumePausedMutations();
```
