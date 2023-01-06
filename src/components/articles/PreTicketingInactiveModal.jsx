// import styled from 'styled-components';
// import * as colors from '@styles/colors';
// import { Column, Row } from '@components/atoms/wrapper.style';
// import { format } from 'date-fns';
// import { useNavigate } from 'react-router-dom';
// import useMyTickets from '@hooks/useMyTickets';
// import { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';

// export default function PreTicketingInactiveModal({ setPreTicketModal, hostAddr }) {
//   const sbtList = useMyTickets();

//   const navigate = useNavigate();
//   const [mySbtImage, setMySbtImage] = useState();
//   const [inactiveTickets, setInactiveTickets] = useState([]);
//   const [mySbtList, setMySbtList] = useState([]);

//   //   useEffect(() => {
//   //     setInactiveTickets(sbtList?.filtered((item) => item.tokenIsActive));
//   //   }, [sbtList]);

//   useEffect(() => {
//     setMySbtList(
//       sbtList.map((item) => {
//         let cp;
//         if (item) {
//           imgUrlInUri(item).then((res) => {
//             cp = { ...item, tokenImage: res };
//             setMySbtImage(cp);
//           });
//         }
//         return mySbtImage;
//       }),
//     );
//   }, [mySbtImage, sbtList]);
//   async function imgUrlInUri(item) {
//     const img = await axios(item.tokenImage).then((res) => {
//       //   console.log(res.data);
//       item.tokenImage = res.data;
//     });
//     return item;
//   }

//   const PreTicketingList = ({ item }) => {
//     return (
//       <ModalTempBox>
//         <Row justifyContent={'space-between'} alignItems={'center'}>
//           {/* <img src={item.posterImgUrl} alt="포스터img" style={{ width: '150px' }} /> */}
//           <Column justifyContent={'center'} alignItems={'flex-end'} gap={'10px'}>
//             {/* <p style={{ fontSize: '25px' }}>{item.title}</p>
//             <p style={{ fontSize: '20px' }}>
//               {format(new Date(item.startDate), 'yyyy.MM.dd')} ~
//               {format(new Date(item.endDate), 'yyyy.MM.dd')}
//             </p> */}
//             {item.tokenId && (
//               <p style={{ fontSize: '18px', color: colors.bgRed }}>
//                 {'사전예매기간 : ' + format(new Date(item.tokenId), 'yyyy.MM.dd')} ~
//                 {format(new Date(item.tokenId), 'yyyy.MM.dd')}
//               </p>
//             )}
//             <TicketButtonWrapper>
//               <TicketButton
//                 buttonColor={`#fa0800c5`}
//                 onClick={() => {
//                   setPreTicketModal(false);
//                   navigate({
//                     pathname: '/detail',
//                     search: `?id=${item.tokenId}`,
//                   });
//                 }}
//               >
//                 사용하기{' '}
//               </TicketButton>
//             </TicketButtonWrapper>
//           </Column>
//         </Row>
//       </ModalTempBox>
//     );
//   };

//   return (
//     <>
//       <Column justifyContent={'center'} alignItems={'center'} marginBottom={'40px'}>
//         소유 중인 관련 INACTIVE ticket
//       </Column>
//       <ModalWrapper>
//         {mySbtList.map((item) => console.log(item))}
//         {sbtList?.map((item, i) => (
//           <PreTicketingList item={item} key={i} />
//         ))}
//       </ModalWrapper>
//     </>
//   );
// }

// const TicketButtonWrapper = styled(Column)`
//   display: flex;
//   flex-direction: ${(props) => props.direction};
//   justify-content: center;
//   align-items: flex-end;
//   margin-top: 20px; ;
// `;

// const TicketButton = styled('button')`
//   background-color: ${(props) => props.buttonColor};
//   width: 100px;
//   height: 36px;
//   font-size: 16px;
//   cursor: pointer;
//   border-radius: 3px;
// `;

// const ModalTempBox = styled(Column)`
//   width: 536px;
//   max-height: 400px;
//   align-items: center;
//   background-color: #3b3b40;
//   padding: 20px;
//   border-radius: 12px;
//   justify-content: center;
//   border: 2px solid ${colors.primary80};
// `;

// const ModalWrapper = styled(Column)`
//   display: flex;
//   align-items: center;
//   width: 600px;
//   max-height: 600px;
//   gap: 15px;
//   overflow-y: auto;

//   &::-webkit-scrollbar {
//     width: 4px;
//   }
//   &::-webkit-scrollbar-thumb {
//     border-radius: 2px;
//     background: #a2a2a2;
//   }
// `;
