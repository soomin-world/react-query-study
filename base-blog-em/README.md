# react-query study

install -> create Query Client and add QueryProvider
-> yarn install react-query

### : react query란?

- react-query는 서버의 값을 클라이언트에 가져오거나, 캐싱, 값 업데이트, 에러핸들링 등 비동기 과정을 더욱 편하게 하는데 사용됩니다.

#### react-query 장점

여러가지 장점이 있지만 주로 아래와 같이 프론트 개발자가 구현하기 귀찮은 일들을 수행합니다.

- 캐싱
- get을 한 데이터에 대해 update를 하면 자동으로 get을 다시 수행한다. (예를 들면 게시판의 글을 가져왔을 때 게시판의 글을 생성하면 게시판 글을 get하는 api를 자동으로 실행 )
- 데이터가 오래 되었다고 판단되면 다시 get (invalidateQueries)
- 동일 데이터 여러번 요청하면 한번만 요청한다. (옵션에 따라 중복 호출 허용 시간 조절 가능)
- 무한 스크롤 (Infinite Queries (opens new window))
- 비동기 과정을 선언적으로 관리할 수 있다.
- react hook과 사용하는 구조가 비슷하다.

#### useQUery

- 데이터를 get 하기 위한 api입니다. post, update는 useMutation을 사용합니다.
- 첫번째 파라미터로 unique Key가 들어가고, 두번째 파라미터로 비동기 함수(api호출 함수)가 들어갑니다. (당연한 말이지만 두번째 파라미터는 promise가 들어가야합니다.)
- 첫번째 파라미터로 설정한 unique Key는 다른 컴포넌트에서도 해당 키를 사용하면 호출 가능합니다. unique Key는 string과 배열을 받습니다. - 배열로 넘기면 0번 값은 string값으로 다른 컴포넌트에서 부를 값이 들어가고 두번째 값을 넣으면 query 함수 내부에 파라미터로 해당 값이 전달됩니다.
- return 값은 api의 성공, 실패여부, api return 값을 포함한 객체입니다.
- useQuery는 비동기로 작동합니다. 즉, 한 컴포넌트에 여러개의 useQuery가 있다면 하나가 끝나고 다음 useQuery가 실행되는 것이 아닌 두개의 useQuery가 동시에 실행됩니다.

#### isFetching vs isLoading

- isFetching-> fetching중 aync함수가 아직 데이터를 들고 오는중임
- isLoading -> fetching 중임과 동시에 아직 fetch되어 cache화된 데이터가 없는 상태

#### Stale

- data refetch 는 data가 stale 되었을때만 발생한다.
- stale time 은 데이터를 허용하는 최대나이이다.
- stale time은 데이터가 만료되었다고 판단할때까지 허용하는 시간이다. (데이터의 성격에 따라 달라짐)
- staleTime 의 기본값은 0초이다. -> 데이터는 항상 만료 상태이므로 항상 refetch를 시켜 만료된 데이터를 제공할 상황을 줄인다.
- stale time 은 refetch를 위한 고려사항이다.
- stale time 은 윈도우가 다시 포커스 될때와 같은 특정 트리거에서 쿼리 데이터를 가져올지를 결정한다.

#### cahce

- 캐시타임은 얼마나 데이터가 비활성호된 이후 남아있는 시간이다.
- 캐시데이터는 쿼리를 다시 실행했을떄 사용된다( 데이터가 최신생타인지 서버에서 확인하는 동안사용자에게 표시됨)
- cache 는 나중에 다시 필요할 수도 있는 데이터이다.
- 특정 쿼리에 대한 활성 useQuery가 없는 경우 clod storage로 들어감.
- 구성된 cache time이 지나면 캐시의 데이터가 만료되며, 기본값은 5분이다.
- 시간의 양은 특정쿼리에 대한 useQuery가 활성화된후 경과된 시간이다.
- 캐시가 만료되면 가비지 컬렉션이 실행되고 클라이언트는 데이터를 사용할수 없다.
- 데이터가 캐시에 있는 동안에는 페칭할때 이용 할 수 있따.
- 데이터 페칭을 중지 하지 않으므로 서버의 최신 데이터로 새로 고침이 가능하다. -> 하지만 빈페이지를 계쏙 출력할 수 있다.
- 빈페이지를 보여주는 것보단 조금 오래된 데이터를 보여주는 것이 낫다.

#### Prefetching

- 프레페칭은 데이터를 캐시에 추가한다.
- 기본값으로 stale 상태를 가진다
- 데이터를 사용하고자 할때 만료 상태에서 refetch한다.
- 데이터를 가지고 오는 중에 캐시에 있는 데이터가 나타난다.- 캐시가 만료되지 않았따면!
- 프리페칭은, 패지네이션 말고도 여러곳에서 사용 할 수 있다.

#### mutation

- 변이는 서버에 데이터를 업데이틓 ㅏ도록 서버에 네트워크 호출시 사용 (추가 , 삭제, 수정)
- useMutation 훅 사용 -> useQuery와 비슷하나 mutate함수를 출력함.
  -> 쿼리가 아니므로 쿼리키는 필요하지않음
  -> 재시도를 하지않음, 설정은 가능
