---
title: 우당탕탕 블로그 제작 후기 (0) - 기획
description: 기술 블로그 제작을 위한 기획 단계를 공유합니다.
category: Etc
date: 2022-01-03
---

## 만들게 된 계기는 무엇인가요?

### 1. 새해 목표

2022년 새해를 맞아 자체 기술 블로그 개발을 본격적으로 시작해보려 마음을 먹었습니다.

그동안 시간이 없고 귀찮다는 이유로 자체 블로그 개발을 미뤄왔었는데, 올해는 꼭 나만의 블로그를 만들어서 배포해보려 합니다.

독자분께서 이 글을 읽고 계시다면, 필자가 태생적인 귀찮음과 기술적인 이슈를 이겨내고 블로그 개발에 성공했다는 의미니 축하해 주시면 감사하겠습니다.

### 2. 똥글과 퀄리티 있는 글의 분리

기존에 타 플랫폼으로 블로그를 운영하면서 아쉬웠던 점은 똥글과 퀄리티 있는 글을 모두 같은 블로그에 올려야 한다는 점이었습니다.

똥글과 퀄리티 있는 글을 같이 올리면 블로그 컨텐츠의 품질이 하락될까봐 걱정되었습니다.  
이런 걱정에, 소소하게 오늘 배운 것을 기록하는 용도로 블로그를 잘 활용하지 않게 되었습니다.  
이는 오늘 배운것을 기록하지 않게 되는 결과로 이어졌습니다.

쉽고 정리되지 않은 언어로 글을 쓰는 공간이 필요하다 느껴졌습니다.

단순하게 오늘 배운 점을 기록하는 용도로 쓰는 블로그와, 깊게 고민하고 나만이 쓸 수 있는 글을 적는 블로그와 구분하고 싶었습니다.

이제 이 블로그에는 퀄리티 있고 신경을 많이 쓴 글을 올리고, 다른 깃허브 레포지토리에는 오늘 배운 점을 기록하는 용도로 편하게 글을 쓰려 합니다.

## 무엇을 고려하며 만들었나요?

블로그를 기획하면서 고려했던 부분은 아래와 같습니다.

### 1. 최소한의 운영 비용

음... 돈 쓰기 싫었습니다.

![No money](https://media2.giphy.com/media/xT0xeiQCDFiJEu2vXG/giphy.gif?cid=ecf05e47u749jm4wcgxo0tfuapswq7u35guocdy5lzt2uvbl&rid=giphy.gif&ct=g)

### 2. 검색엔진 최적화

이왕이면 내가 쓴 글이 많은 사람들에게 읽혔으면 좋겠다는 생각을 했습니다.  
많은 사람들과 지식을 나누고 의견을 주고 받고 싶었습니다.  
많은 분들에게 피드백을 받고 성장하고 싶었기에 검색 엔진 최적화는 큰 고려 대상이었습니다.

### 3. 글 저작과 업로드의 편의성

글 저작과 업로드가 귀찮거나 힘들면, 글을 잘 쓰지 않게 될 것 같았습니다.  
꾸준한 포스팅을 위해 글 저작과 업로드가 편해야 한다는 점 또한 고려 대상이었습니다.

### 4. 개발의 재미

특정 솔루션을 가져다 쓰면 편리하겠지만, 밑 바닥부터 완성까지 만들어 나가는 재미를 느끼기 힘들 것 같았습니다. 저는 재미와 흥미로 움직이는 사람이기에 블로그를 만드는 과정이 재미있어야 한다는 점도 큰 고려 대상이었습니다.

## 어떻게 만들었나요?

### 1. 최소한의 운영비용 → `Vercel`을 이용하여 배포

`AWS`를 사용하면 돈이 들기에 `AWS`를 고려하지 않았습니다.  
상업적 목적이 아니라면 무료로 사용할 수 있는 `Netlify`와 `Vercel` 중 하나를 선택해야 했습니다.

[Vercel과 Netlify 비교 글](https://bejamas.io/compare/netlify-vs-vercel/)을 보고 비교해 보았을 때, 제가 사용하는 용도에 있어서 두 플랫폼이 큰 차이가 없어 보였습니다.

`Next.js` 와 `swr`을 개발한 회사인 `Vercel`이 더 익숙하고 친숙해 `Vercel`을 사용하게 되었습니다.

### 2. 검색엔진 최적화, 개발의 재미 → `Next.js` 사용

SEO 최적화에 용이한 SSR을 적용하였습니다.  
SSR을 쉽게 도와주는 프레임워크인 `Next.js`를 사용하였습니다.

정적 사이트를 만드는데 도움을 주는 프레임워크인 `Gatsby` 사용도 고려하였지만, 바닥부터 완성까지 만들어나가는 재미를 느끼고 싶어 사용하지 않았습니다.

### 3. 글 저작, 업로드의 편의성 → `마크다운`으로 저작 후, 이를 파싱

글을 편하게 작성하기 위해 마크다운 문법을 사용하여 로컬에서 편하게 글을 작성하고 이를 GitHub Repo에 올리면, 블로그가 마크다운 파일을 파싱해서 글을 보여주는 방법으로 개발하였습니다.

## 나는 완벽하지 않으니

### 좋은 레퍼런스를 찾자

블로그의 구성을 기획하기 위해 여러 회사의 기술 블로그, 개인의 기술 블로그를 뒤졌습니다.

토스 기술 블로그, 우아한 형제들 기술 블로그 등등 여러 기술 블로그들을 뒤져가며 블로그를 분석하고, 저의 블로그에 들어갈 내용을 간략하게 구성했습니다.

### 디자인을 도와줘

전 디자인에 재능이 없습니다.  
그래서 혼자 개발한 프로젝트의 UI는 항상 지옥에서 온 심미성을 가지고 있습니다.

이를 잘 알고 있는 저는 대학교때부터 친하게 지내온 디자이너 친구에게 프로젝트의 디자인을 부탁했습니다.

다행히 그 친구 한명이 저를 가여삐 여겨 `식사 한끼` 라는 저렴한 가격으로 디자인을 도와 주었습니다. (크으으 고맙슴미다...!)

![thank_you](https://user-images.githubusercontent.com/52201658/147881307-83e63a72-791c-4bb9-9ec5-96df846e58c6.jpeg)
