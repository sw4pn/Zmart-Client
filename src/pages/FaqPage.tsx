import HeadTitle from "../components/HeadTitle";
import Container from "../components/layouts/Container";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "../components/ui/Accordion";

const questions = [
  {
    title: "What Shipping Methods Are Available? ",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien lorem, consectetur et turpis id, blandit interdum metus. Morbi sed ligula id elit mollis efficitur ut nec ligula. Proin erat magna, pellentesque at elementum at, eleifend a tortor.",
  },
  {
    title: "How Long Will it Take To Get My Package?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien lorem, consectetur et turpis id, blandit interdum metus. Morbi sed ligula id elit mollis efficitur ut nec ligula. Proin erat magna, pellentesque at elementum at, eleifend a tortor.",
  },
  {
    title: "How Do I Track My Order?",
    content:
      "Integer ex turpis, venenatis vitae nibh vel, vestibulum maximus quam. Ut pretium orci ac vestibulum porttitor. Fusce tempus diam quis justo porttitor gravida.",
  },
  {
    title: "Do I Need A Account To Place Order?",
    content:
      "Integer ex turpis, venenatis vitae nibh vel, vestibulum maximus quam. Ut pretium orci ac vestibulum porttitor. Fusce tempus diam quis justo porttitor gravida",
  },
  {
    title: " How Should I to Contact if I Have Any Queries?",
    content:
      "In egestas, libero vitae scelerisque tristique, turpis augue faucibus dolor, at aliquet ligula massa at justo. Donec viverra tortor quis tortor pretium, in pretium risus finibus. Integer viverra pretium auctor. Aliquam eget convallis eros, varius sagittis nulla. Suspendisse potenti. Aenean consequat ex sit amet metus ultrices tristique. Nam ac nunc augue. Suspendisse finibus in dolor eget volutpat.",
  },
  {
    title: "Do I Need an Account to Place an Order?",
    content:
      "In egestas, libero vitae scelerisque tristique, turpis augue faucibus dolor, at aliquet ligula massa at justo. Donec viverra tortor quis tortor pretium, in pretium risus finibus. Integer viverra pretium auctor. Aliquam eget convallis eros, varius sagittis nulla. Suspendisse potenti. Aenean consequat ex sit amet metus ultrices tristique. Nam ac nunc augue. Suspendisse finibus in dolor eget volutpat.",
  },
];

const FaqPage = () => {
  const faqData = questions?.map((item, i) => {
    return (
      <AccordionItem key={i} className="w-full border">
        <AccordionHeader className="w-full text-start font-semibold text-gray-600 p-4">
          <div className="">{item.title}</div>
        </AccordionHeader>
        <AccordionBody>
          <div className="bg-neutral-50 p-8">{item.content}</div>
        </AccordionBody>
      </AccordionItem>
    );
  });

  return (
    <Container className="p-4 sm:p-10">
      <HeadTitle title="Frequently Asked Question's" className="pb-10 pt-4" />
      <div className="bg-neutral-100">
        <Accordion>{faqData}</Accordion>
      </div>
    </Container>
  );
};

export default FaqPage;
