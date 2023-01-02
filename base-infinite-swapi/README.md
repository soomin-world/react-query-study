# Infinite SWAPI

## 무한 스크롤 구현하기

## Installation

#. Download this directory, or clone or fork this repo
#. `npm install --legacy-peer-deps`

**Note** The `--legacy-peer-deps` is very important since this project uses [React Infinite Scroller](https://www.npmjs.com/package/react-infinite-scroller), which doesn't (yet) support React 17.

## 무한쿼리 데이터 형식

- usequery와 useInfiniteQuery의 다른점

1.  usequery에서 데이터는 단순히 쿼리함수에서 반환되는 데이터이다
2.  반면 useinfinitequery에서 객체는 두개의 프로퍼티를 가지고 있다.
3.  하나는 데이터 페이지 객체의 배열인 페이지이다. 페이지에 있는 각 요소가 하나의 usequery에서 받는 하나의 데이터에 해당
4.  pageParams rk dlTek. 각 페이지의 매개변수가 들어있다(많이 사용되지는 않음)
5.  모든 쿼리는 페이지 배열에 고유한 요소를 가지고있고, 그 요소는 해당 쿼리에 대한 데이터에 해당한다. 페이지가 진행되며 쿼리도 바뀜
6.  page파람은 검색된 쿼리의 키를 추적한다.-> 하지만 정말 많이 사용되지 않음

- useInfiniteQyery Syntax와 useQuery의 차이점

1.  pagePara 은 쿼리함수에 전달되는 매개변수
2.  react query가 pageParam의 현재값을 유지함
3.  infinitequery에 옵션을 사용하는 방식으로 작업을 실행함.
    -> getNextPageParam : (lastPage, allPages) // 다음 페이지로 가는 방법을 정의
    -> pageParam을 업데이트해줌

#### useInfiniteQuery 반환객체 속성

- fetchNextPage - > 사용자가 더많은 데이터를 요청할때 호출
- hasNextPage -> getNextPagePara 의 값을 기반으로 두고있다. 이 프로퍼티를 무한쿼리에 전달하여 마지막 쿼리의 데이터를 어떻게 사용할지 전달함 -> if undefined -> nodata(false)
- isFetchingNextPage -> useQuery에는 없는 개념, 다음 페이지를 가져오는지 혹은 그냥 일반적 페칭인지 구분

##### FLOW

component mounts (useinfinitescroll = undefined) -> fetch first page (data.pages[0]: {...})->  
getNextPageParam(update pageParam)-> hasNextPage? -> user scrolls/ click button fetchNextPage

#### React Infinite Scroller

- useInfiniteQuery와 호환이 잘된다.
- InfiniteScroll component 에는 두개의 props 가있다.
  ->loadmore={fetchNextPage} -> 데이터가 더 필요할 때 불러와 useInfiniteQuery에서 나온 fetchNextPage 함숫값을 이용한다.
  -> hasmore={hasNextPage}
- infinite scroll컴포넌트는 스스로 페이지의 끝에 도달했음을 인식하고 fetchNextPage를 불러오는 기능이다.
- 데이터 프로퍼티에서 데이터에 접근할 수 있는데 배열인 페이지 프로퍼티를 사용하여, 그 페이지 배열로 map을 사용하여 데이터를 표시할 수 있게 해줍니다.

#### Bi-directional Scrolling

- next함수들의 사용과 동일하며 next 대신 previous 키워드를 사용하면 된다.
