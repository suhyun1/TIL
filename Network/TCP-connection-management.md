# TCP Connection Management -  3 way handshake & 4 way handshake

### 3 way handshake (TCP Connection Establishment)
TCP에서는 host 간 연결을 성립하기 위해 3 way handshake를 사용한다.

![](https://media.geeksforgeeks.org/wp-content/uploads/TCP-connection-1.png)

1. client host에서 server에 `SYN`(synchronized sequence number) packet을 보낸다.(초기 sequence #를 지정한다)
2. server host가 `SYN`을 수신하고 동의할 경우`SYN`과 `ACK`(Acknowledgement) packet을 한 묶음으로 같이 보낸다.(server는 버퍼를 할당하고 서버의 초기 sequence #를 지정한다)
3. client가 `SYNACK`을 받으면 data가 포함된 `ACK` 패킷을 보낸다.(1번에서는 data가 포함되지 않은 `ACK`이다)

이렇게 3번의 통신이 완료되어야 연결이 성립되므로 3 way handshake라고 한다.

<br/>

### 4 way handshake (TCP Connection Termination)
통신이 끝나고 연결을 해제할 때 4 way handshake를 사용한다.

![TCP Connection Termination](https://media.geeksforgeeks.org/wp-content/uploads/CN.png)

1. client가 server에 연결을 종료하겠다는 `FIN`을 보낸다.
2. server는 `FIN`을 받으면 `ACK` packet을 보낸다.<br/>
이때 자신의 통신이 끝날 때까지(모든 데이터를 보낼 때까지) TIME OUT 상태가 된다. 또한 `ACK`을 받은 client는 전송 버퍼를 지우고 수신만 할 수 있는 상태가 된다.
3. 데이터를 모두 보내면 server는 `FIN`을 client에 보낸다.
4. client가 `FIN`을 받으면 `ACK`를 server에게 보낸다. (아직 서버로부터 받지 못한 데이터가 있을 수 있으므로 TIME_WAIT 상태로 기다린다.)<br/>
server는 이 `ACK`을 받으면 소켓을 닫고(closed), client는 TIME_WAIT이 끝나면 닫는다.

이렇게 4번의 통신이 완료되어야 연결이 해제되므로  4 way handshake라고 한다.

<br/>

##### 참고
- [TCP Connection Establishment - geeksforgeeks](https://www.geeksforgeeks.org/computer-network-tcp-3-way-handshake-process/)
- [TCP Connection Termination - geeksforgeeks](https://www.geeksforgeeks.org/tcp-connection-termination/)
