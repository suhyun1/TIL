# 32bit와 64bit 어플리케이션의 차이점
> 여기서 32bit와 64bit는 어플리케이션이 쓸 수 있는 **메모리 주소** 와 일반 **레지스터** 의 크기를 나타낸다. <br/>
64bit 어플리케이션을 실행하려면 64bit의 **프로세서** 와 64bit의 **OS** 가 필요하다. 대부분의 64bit 시스템에서는 호환모드로 32bit 앱 실행시킬 수 있다.(역으로는 X)

### 중요한 차이: 메모리 주소의 크기
- 64비트의 메모리 주소를 사용하면 2^64 = 16엑사바이트의 메모리 주소를 처리 가능
- 32비트의 메모리 주소를 사용하면 2^32 = 4기가바이트의 메모리 주소 처리 가능
- => 요즘 컴퓨터는 대부분 물리적 메모리가 4GB 이상이기 때문에 더 많은 데이터를 메모리에 올려놓고 디스크 접근을 줄일 수 있는 64bit 어플리케이션이 더 빠를 수 있음

### 64bit 메모리 주소의 단점
- 64bit 메모리 주소를 사용하면 모든 포인터를 저장할 때 메모리가 2배 필요함. 그런데 32bit와 64bit 애플리케이션의 프로세서 cache 크기는 똑같다는 것. 64bit 자료구조는 용량을 더 많이 차지 하기 때문에 cache에 조금밖에 못 넣음. 따라서 접근할 값을 main memory에서 가져올 때까지 기다려야 하는 `cache miss`가 발생할 확률이 높음

### 어떤 것이 더 빠른가?
- 어떤 것이 더 빠르다고 말할 수 없음. 32bit로 실행했을 때 더 빠른 코드도 있고, 64bit로 실행했을 때 더 빠른 코드도 있음