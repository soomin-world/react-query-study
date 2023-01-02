# react-query study

### : react query란?




#### isFetching vs isLoading

- isFetching-> fetching중
- isLoading -> fetching 중임과 동시에 아직 fetch되어 cache화된 데이터가 없는 상태 


#### Stale data
- data refetch 는 data가 stale 되었을때만 발생한다.
- stale time 은 데이터를 허용하는 최대나이이다.
- stale time은 데이터가 만료되었다고 판단할때까지 허용하는 시간이다. (데이터의 성격에 따라 달라짐)
- staleTime 의 기본값은 0초이다. -> 데이터는 항상 만료 상태이므로 항상 refetch를 시켜 만료된 데이터를 제공할 상황을 줄인다.
- - stale time 은 refetch를 위한 고려사항이다. 

#### cahce data

- cache 는 나중에 다시 필요할 수도 있는 데이터이다. 
- 특정 쿼리에 대한 활성 useQuery가 없는 경우 clod storage로 들어감.
- 구성된 cache time이 지나면 캐시의 데이터가 만료되며, 기본값은 5분이다. 
- 시간의 양은 특정쿼리에 대한 useQuery가 활성화된후 경과된 시간이다.  
- 캐시가 만료되면 가비지 컬렉션이 실행되고 클라이언트는 데이터를 사용할수 없다. 
- 데이터가 캐시에 있는 동안에는 페칭할때 이용 할 수 있따. 
- 데이터 페칭을 중지 하지 않으므로 서버의 최신 데이터로 새로 고침이 가능하다. -> 하지만 빈페이지를 계쏙 출력할 수 있다. 
- 빈페이지를 보여주는 것보단 조금 오래된 데이터를 보여주는 것이 낫다. 

#### query key

- 각각의 쿼리에 대해 쿼리키를 배열형식으로 작성해, 의존성 배열이 하는 역할을 줄 수도 있다. 
