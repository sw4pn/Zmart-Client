import HeadTitle from "../components/HeadTitle";
import Container from "../components/layouts/Container";
import HTMLReactParser from "html-react-parser";

const data = {
  date: "25th March, 2023",
  content: `
    <p>
    Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a full refund or an exchange. Please see below for more information on our return policy.
    </p>
    <h4 class="mt-6 mb-3 font-semibold text-lg">RETURNS</h4>
    <p>
    All returns must be postmarked within fourteen (14) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.</p>
    <h4 class="mt-6 mb-3 font-semibold text-lg">
    RETURN PROCESS</h4>
    <p>
    To return an item, place the item securely in its original packaging and include your proof of purchase, then mail your return to the following address:
    ZMart
    Attn: Returns
    1, Cupicorno
    Mumbai East, Maharashtra 411001
    India
    You may also use the prepaid shipping label enclosed with your package. Return shipping charges will be paid or reimbursed by us. </p>
    <h4 class="mt-6 mb-3 font-semibold text-lg">
    REFUNDS</h4>
    <p>
    After receiving your return and inspecting the condition of your item, we will process your return or exchange. Please allow at least fourteen (14) days from the receipt of your item to process your return or exchange. We will notify you by email when your return has been processed.</p>
    <h4 class="mt-6 mb-3 font-semibold text-lg">
    EXCEPTIONS</h4>
    <p>
    The following items cannot be returned or exchanged:
    <ul class="my-3">
    <li> ● Exclusive offers </li>
    <li>  ● Big sale products </li>
    </ul>
    For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
    Please Note:
    <ul class="my-3">
    <li>  ●  Not Used Products </li>
    <li>  ●  No personal damage </li>
    <li>  ●  __________ </li>
    </ul>
    </p>
    <h4 class="mt-6 mb-3 font-semibold text-lg">
    QUESTIONS</h4>
    <p>
    If you have any questions concerning our return policy, please contact us at:<br/>
    (911) 911-9111 <br/>
    refund@zmart.ecom <br/>
    </p> `,
};

const RefundPage = () => {
  return (
    <>
      <Container className="p-4 sm:p-10">
        <HeadTitle title="Refund Policy" className="pb-10 pt-4" />
        <div className="">{HTMLReactParser(data.content)}</div>
      </Container>
    </>
  );
};

export default RefundPage;
