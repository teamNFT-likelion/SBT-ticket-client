import { loadTossPayments } from '@tosspayments/payment-sdk';

const clientKey = 'test_ck_5GePWvyJnrKjMRP6vn1VgLzN97Eo';

export function payCardByTossPayment(_price, _name, _customer, _dataId) {
  loadTossPayments(clientKey).then((tossPayments) => {
    tossPayments
      .requestPayment('카드', {
        amount: _price,
        orderId: crypto.randomUUID(),
        orderName: _name,
        customerName: _customer,
        successUrl: `${window.origin}/payment/success?id=${_dataId}`,
        failUrl: `${window.origin}/pay_fail`,
      })
      .catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          // 결제 고객이 결제창을 닫았을 때 에러 처리
        } else if (error.code === 'INVALID_CARD_COMPANY') {
          // 유효하지 않은 카드 코드에 대한 에러 처리
        }
      });
  });
}

export function payTransferByTossPayment(_price, _name, _customer, _dataId) {
  loadTossPayments(clientKey).then((tossPayments) => {
    tossPayments
      .requestPayment('계좌이체', {
        amount: _price,
        orderId: crypto.randomUUID(),
        orderName: _name,
        customerName: _customer,
        successUrl: `${window.origin}/payment/success?id=${_dataId}`,
        failUrl: `${window.origin}/pay_fail`,
      })
      .catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          // 결제 고객이 결제창을 닫았을 때 에러 처리
        } else if (error.code === 'INVALID_CARD_COMPANY') {
          // 유효하지 않은 카드 코드에 대한 에러 처리
        }
      });
  });
}

//---------사전예매 시
export function prePayCardByTossPayment(_price, _name, _customer, _dataId, _inactiveId) {
  // loadTossPayments(clientKey).then((tossPayments) => {
  //   tossPayments
  //     .requestPayment('카드', {
  //       amount: _price,
  //       orderId: crypto.randomUUID(),
  //       orderName: _name,
  //       customerName: _customer,
  //       successUrl: `${window.origin}/payment/success?id=${_dataId}&inactiveId=${_inactiveId}`,
  //       failUrl: `${window.origin}/pay_fail`,
  //     })
  //     .catch(function (error) {
  //       if (error.code === 'USER_CANCEL') {
  //         // 결제 고객이 결제창을 닫았을 때 에러 처리
  //       } else if (error.code === 'INVALID_CARD_COMPANY') {
  //         // 유효하지 않은 카드 코드에 대한 에러 처리
  //       }
  //     });
  // });
}

export function prePayTransferByTossPayment(_price, _name, _customer, _dataId, _inactiveId) {
  // loadTossPayments(clientKey).then((tossPayments) => {
  //   tossPayments
  //     .requestPayment('계좌이체', {
  //       amount: _price,
  //       orderId: crypto.randomUUID(),
  //       orderName: _name,
  //       customerName: _customer,
  //       successUrl: `${window.origin}/payment/success?id=${_dataId}&inactiveId=${_inactiveId}`,
  //       failUrl: `${window.origin}/pay_fail`,
  //     })
  //     .catch(function (error) {
  //       if (error.code === 'USER_CANCEL') {
  //         // 결제 고객이 결제창을 닫았을 때 에러 처리
  //       } else if (error.code === 'INVALID_CARD_COMPANY') {
  //         // 유효하지 않은 카드 코드에 대한 에러 처리
  //       }
  //     });
  // });
}
