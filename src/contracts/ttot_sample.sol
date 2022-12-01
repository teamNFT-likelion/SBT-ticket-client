// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*
    1. 1번 지갑으로 컨트랙트 생성
    2. mintSbt 이용하여 2번 지갑 티켓 구매, 3번 지갑 티켓 구매, 4번 지갑 티켓 구매 -> msg.value를 1 이더로 설정 필요.
        AAA
        1670000000
        1000000000000000000
        12345
        A123 / A125 / A128
        100
    3. 1번 지갑으로 컨트랙트 잔액 확인 getBalance 3이더인지
    4. 2번, 3번, 4번 중 한 사람만 getSbtTokens로 내 티켓 확인
    5. getSeat로 해당 날짜의 공연 좌석 정보 받아오기
    6. 2번, 3번, 4번 중 한 사람만 burn으로 환불
    7. 내 잔고 확인 1이더가 다시 추가되었는지
    8. 다시 getSeat로 빠진 좌석 확인
    9. 1번 지갑으로 컨트랙트 잔액 확인 2이더인지
*/

contract ttot_sample is  ERC721Enumerable {
    address payable owner;

    constructor() ERC721("TicketToToken", "TTOT") payable {
        owner = payable(msg.sender);
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // tokenId와 tokenURI 연결
    mapping(uint => string) public tokenURIs ;
    function tokenURI(uint _tokenId) override public view returns (string memory) {
        return  tokenURIs[_tokenId] ;
    }


    // 티켓 구매와 발행
    // tokenURI는 ipfs 주소, deadline은 unix timestamp 형태, price는 wei단위, id는 공연의 id값, seat는 좌석정보, limit는 해당 공연의 티켓 제한 수
    function mintSbt( string memory _tokenURI, uint _deadline, uint _price, uint _id, string memory _seat, uint _limit) public payable {
        require(_price <= msg.value, "caller sent lower than price.");
        // payable(address(this)).transfer(msg.value); -> 없어도 알아서 컨트랙트에 보내짐

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        tokenURIs[tokenId] = _tokenURI;
        sbtDeadlines[tokenId] = _deadline;
        sbtIsActives[tokenId] = true;
        sbtPrices[tokenId] = _price;

        _mint(msg.sender, tokenId);

        sbtTicketId[tokenId] = _id;
        sbtTicketSeat[tokenId] = _seat;


        pushSeat(_id, _deadline, _seat, _limit);
    }


    // 티켓 좌석 선택과 매수 제한 (공연id => 날짜 => 좌석)
    mapping (uint => mapping(uint => string[])) tickets;
    function pushSeat(uint _id, uint _deadline, string memory _seat, uint _limit) private {
        require(tickets[_id][_deadline].length <= _limit, "All the seats are full");

        tickets[_id][_deadline].push(_seat);
    }

    // 티켓 환불 시 사용할 좌석 제거 기능
    function popSeat(uint _id, uint _deadline, string memory _seat) private {
        uint length = tickets[_id][_deadline].length;

        for (uint i=0; i<length; i++) {
            if (keccak256(bytes(tickets[_id][_deadline][i])) == keccak256(bytes(_seat))) {
                tickets[_id][_deadline][i] = tickets[_id][_deadline][length-1];
                tickets[_id][_deadline].pop();
                return;
            }
        }
    }

    // 해당날짜 공연의 좌석 정보 받아오기
    function getSeat(uint _id, uint _deadline) public view returns (string[] memory) {
        return tickets[_id][_deadline];
    }


    // 티켓에 들어갈 데이터
    struct SbtTokenData {
        uint256 sbtTokenId; // id
        string  sbtTokenURI; // image, title, userEmail ...
        uint256 deadline; // 티켓이 끝나는 시점
        bool isActive;  // 공연이 끝난 티켓인지
        uint256 price;  // 환불할 때 필요한 티켓 가격
    }


    // tokenId => ....
    mapping(uint256 => uint256) public sbtDeadlines;
    mapping(uint256 => bool) public sbtIsActives;
    mapping(uint256 => uint256) public sbtPrices;
    mapping(uint256 => uint256) public sbtTicketId;
    mapping(uint256 => string) public sbtTicketSeat;


    // 티켓의 데드라인 가져오기
    function getSbtDeadline(uint256 _tokenId) private view returns(uint256) {
        return sbtDeadlines[_tokenId];
    }


    // 티켓이 활성화 상태 가져오기
    function getSbtIsActive(uint256 _tokenId) private view returns(bool) {
        return sbtIsActives[_tokenId];
    }


    // 티켓 가격 가져오기
    function getSbtPrice(uint256 _tokenId) private view returns(uint256) {
        return sbtPrices[_tokenId];
    }
    
    // 데드라인이 지나면 티켓 비활성화
    function setSbtIsActive(uint _tokenId) private {
        if (block.timestamp > getSbtDeadline(_tokenId)) {
            sbtIsActives[_tokenId] = false;
        }
    }



    // 내가 가진 SBT 확인
    function getSbtTokens(address _sbtTokenOwner) public returns (SbtTokenData[] memory) {
        uint256 balanceLength = balanceOf(_sbtTokenOwner);

        SbtTokenData[] memory myTokenData = new SbtTokenData[](balanceLength);

        for(uint256 i = 0; i < balanceLength; i++) {
            uint256 sbtTokenId = tokenOfOwnerByIndex(_sbtTokenOwner, i);
            string memory sbtTokenURI = tokenURI(sbtTokenId);
            uint256 deadline = getSbtDeadline(sbtTokenId);
            setSbtIsActive(sbtTokenId);
            bool isActive = getSbtIsActive(sbtTokenId);
            uint256 price = getSbtPrice(sbtTokenId);
            
            myTokenData[i] = SbtTokenData(sbtTokenId , sbtTokenURI, deadline, isActive, price);
        }

        return myTokenData;
    }


    // 환불 기능
    function burn( uint256 _tokenId) public {
        address addr_owner = ownerOf(_tokenId);
        require( addr_owner == msg.sender, "msg.sender is not the owner of the token");
        uint256 refundAmount = sbtPrices[_tokenId];

        payable(addr_owner).transfer(refundAmount);

        popSeat(sbtTicketId[_tokenId], sbtDeadlines[_tokenId], sbtTicketSeat[_tokenId]);

        _burn(_tokenId);

        delete sbtDeadlines[_tokenId];
        delete sbtIsActives[_tokenId];
        delete sbtPrices[_tokenId];
        delete tokenURIs[_tokenId];
        delete sbtTicketId[_tokenId];
        delete sbtTicketSeat[_tokenId];
    }

    // 컨트랙트의 잔고 확인
    function getBalance() public view returns(uint) {
        require(owner == msg.sender, "Not a owner");

        return address(this).balance;
    }

    // 컨트랙트에서 owner로 토큰 빼는 함수
    function transferToOwner(uint _amount) public payable{
        require(owner == msg.sender, "Not a owner");

        owner.transfer(_amount);
    }
}