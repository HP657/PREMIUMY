<script lang="ts">
  import { onMount } from 'svelte';

  function generateRandomString() {
    return window.btoa(Math.random() + '').slice(0, 20);
  }

  onMount(async () => {
    const button = document.getElementById("payment-button") as HTMLButtonElement;
    const coupon = document.getElementById("coupon-box") as HTMLInputElement | null;

    const amount = {
      currency: "KRW",
      value: 50000,
    };

    // 토스페이먼츠 위젯 초기화
    const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
    const customerKey = generateRandomString();
    const tossPayments = (window as any).TossPayments(clientKey);

    const widgets = tossPayments.widgets({ customerKey });

    await widgets.setAmount(amount);

    await Promise.all([
      widgets.renderPaymentMethods({
        selector: "#payment-method",
        variantKey: "DEFAULT",
      }),
      widgets.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
      })
    ]);

    // 쿠폰 체크박스 이벤트
    if (coupon) {
      coupon.addEventListener("change", async () => {
        if (coupon.checked) {
          await widgets.setAmount({
            currency: "KRW",
            value: amount.value - 5000,
          });
        } else {
          await widgets.setAmount(amount);
        }
      });
    }

    // 결제 버튼 이벤트
    button.addEventListener("click", async () => {
      await widgets.requestPayment({
        orderId: generateRandomString(),
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + "/widget/success",
        failUrl: window.location.origin + "/widget/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
      });
    });
  });
</script>

<svelte:head>
  <title>토스페이먼츠 샘플 프로젝트</title>
  <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-logo.png" />
  <script src="https://js.tosspayments.com/v2/standard"></script>
</svelte:head>

<div class="max-w-[800px] mx-auto">
  <div class="p-10 mt-8 mb-12">
    <div id="payment-method"></div>
    <div id="agreement"></div>
    <div class="flex justify-center items-center py-8 bg-white">
      <button
        id="payment-button"
        class="w-[250px] rounded-lg bg-blue-600 text-gray-50 font-semibold text-[15px] leading-[18px] px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-blue-700"
      >
        결제하기
      </button>
    </div>
  </div>
</div>
