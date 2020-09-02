# Transport Layer - TCP, UDP

### TCP(Transmission Control Protocol)

- **연결형** 프로토콜
> TCP의 handshake는 [여기](TCP-connection-management.md) 참고

- Congestion Control, Flow Control 지원
> Flow Control: 데이터의 처리 속도를 조절하여 receiver의 버퍼 오버플로우를 방지한다. receiver window의 크기를 설정해 수신량을 정할 수 있다.<br/>
Congestion Control: 네트워크 내 패킷 수가 과도하게 증가하는 것을 방지한다.

- 신뢰성이 높다.
> duplicated ACK이 오거나, ACK을 받지 못하고 Time out이 발생하면 재전송을 요청한다.

- 순서대로 segment를 교환한다(in-order)
- web, 파일 전송, email 등 일반적인 어플리케이션이 데이터를 송수신할 경우 사용한다.

- TCP Header
![TCP Header](https://www.lifewire.com/thmb/daf1l1lyCgDxWLbO9rlPizJroL8=/1235x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/tcp-headers-f2c0881ea4c94e919794b7c0677ab90a.jpg)

<br/>

### UDP(User Datagram Protocol)

- **비연결형** 프로토콜. TCP와 달리, UDP sender와 receiver 간 handshaking이 없다.

- TCP와 달리 Congestion Control, Flow Control 지원하지 않는다.
- 비신뢰성. TCP와 달리 데이터의 전송을 보장하지 않는다. (Application Layer의 몫이다)
- 교환하는 패킷의 순서가 보장되지 않는다(unordered)
- 간단한 데이터를 빠르게 전송하고자 하는 어플리케이션에서 주로 사용한다.
- VPN, 실시간 멀티미디어, 온라인 게임 등에서 사용한다.
- UDP Header는 TCP에 비해 간단하다.

필드명 | 설명
-|-
Source Port(2 bytes)| sender의 port 번호
Destination Port(2 bytes) | receiver의 port 번호
Length(2 bytes) | header와 data를 포함한 datagram의 총 크기
Checksum(2 bytes) | 데이터 오류 검출에 사용

<br/>

#### 참고
- [TCP vs. UDP - www.lifewire.com/tcp-headers-and-udp-headers-explained-817970](https://www.lifewire.com/tcp-headers-and-udp-headers-explained-817970)
