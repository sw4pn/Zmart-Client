import HTMLReactParser from "html-react-parser";
import HeadTitle from "../components/HeadTitle";
import Container from "../components/layouts/Container";

const data = {
  date: "Do I Need an Account to Place an Order?",
  content: `<p class="py-2"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro magni nemo fugit rem inventore. Quisquam nemo facere molestias voluptates et, aut tempora rem! Blanditiis quisquam adipisci provident nostrum, a pariatur.
      Harum cupiditate dicta veniam voluptas dolore sint itaque exercitationem inventore nesciunt quam saepe laborum iusto a beatae necessitatibus rerum alias et suscipit voluptatem, molestias tempore mollitia ipsum nulla? Tenetur, quo.
      Animi illo, repudiandae aliquid officiis eaque a, tenetur, placeat quasi eveniet vero ab dolores quia eligendi! Pariatur, quibusdam officia natus accusamus iure dignissimos, magnam, quas perferendis eligendi ratione iste doloribus.
      Minima commodi architecto tempora sequi nemo, libero neque. Excepturi maiores, explicabo illo beatae, eius quidem dolores unde magnam officia in quis iusto incidunt iure? Soluta, modi molestiae. Esse, voluptatem dolorum?
      Id optio est dignissimos molestiae neque commodi nisi quidem totam eius sequi non inventore sit deserunt vitae nobis, quis natus perferendis. Error tempora illo amet distinctio quidem veniam velit libero!</p><p class="py-2">
      Atque ex soluta quis enim asperiores voluptatibus nemo ut nobis quam. Eius cumque ratione, hic animi pariatur ea porro officia perspiciatis excepturi, quaerat, voluptatem temporibus sunt quidem natus consequatur. Asperiores?
      Ullam nesciunt mollitia perferendis quidem tenetur nam omnis, magni, provident culpa odit nemo dolorum fugit iure! Architecto, provident illum. Numquam tenetur distinctio dolorem itaque consequatur perferendis sed cumque quisquam facere.
      Quos consectetur suscipit necessitatibus incidunt. Libero iste fugit at? Dignissimos, aperiam nihil! Veniam maiores, beatae quis iste voluptatibus nemo, provident impedit temporibus, voluptate explicabo sequi dicta eveniet recusandae quisquam obcaecati?
      Rerum fuga atque facilis nisi dolorum ipsum vero natus dolore ratione placeat consequuntur quae nesciunt architecto est, animi eligendi tempora suscipit obcaecati perferendis et laboriosam! Eius nostrum inventore possimus deserunt.
      Optio at earum libero. Sed exercitationem, incidunt accusamus voluptatem numquam consectetur nulla maxime. Facere dignissimos, laborum distinctio rem magnam pariatur maxime odio consequatur temporibus explicabo reiciendis necessitatibus error dolorem doloremque.
      Veritatis reprehenderit, tenetur mollitia, recusandae harum animi ea praesentium aut labore beatae illo dolor vel veniam atque sequi numquam nulla. Facere ea consequatur commodi maiores nihil adipisci quidem? Dolore, alias!</p><p class="py-2">
      Beatae officiis consequatur, obcaecati, velit amet magni nobis rerum expedita illum, cupiditate eum repellat laborum nisi. Ratione animi, temporibus qui possimus recusandae dolorem non veniam nesciunt doloremque at voluptatibus iure.
      Doloribus molestias molestiae amet nemo et asperiores eum eligendi corporis nisi rem. Corrupti veritatis tempora quo vero, quas magnam dolorum laborum in suscipit. Rerum recusandae illo animi fugiat debitis commodi.</p><p class="py-2">
      Porro deleniti ducimus, minus quidem eveniet et, mollitia vero nulla animi nostrum veniam delectus alias exercitationem doloribus officiis ullam quam corporis ipsam saepe. Facilis odit, blanditiis totam asperiores quo perspiciatis?
      Nisi, reprehenderit! Mollitia voluptatum sequi modi id illum veritatis illo, consequuntur odio voluptatem quam quae soluta labore ullam totam! Rem saepe facere aliquam placeat ut eaque hic assumenda omnis deserunt.</p><p class="py-2">
      Ipsum, repellendus aliquid unde quas sequi repudiandae inventore libero nihil quam assumenda. Ab vitae molestias tempore! Vero tempora, delectus deleniti maxime unde neque aliquam consequatur earum optio est doloribus ad!
      Delectus aspernatur, natus voluptatem saepe, molestiae placeat ut numquam distinctio doloribus nam hic cumque tempore porro? Sed sit dignissimos temporibus sint ex ratione, alias nemo deserunt minima saepe unde magni?
      Id libero, voluptatibus quos cumque illum est molestiae ullam obcaecati delectus assumenda dicta quo commodi qui repudiandae fugit maiores non veniam beatae. Excepturi consectetur delectus quaerat facere quo, a repudiandae.</p><p class="py-4">
      Repellendus corporis, quae cupiditate consectetur molestiae dolore. Laboriosam omnis, magni nam inventore in impedit incidunt eligendi veniam voluptatibus sunt odio est dignissimos officiis voluptate quisquam totam beatae non! Similique, vero!
      Quibusdam, culpa! Quis repellat eum officiis molestias quisquam deleniti fugit omnis quidem consequuntur suscipit porro doloribus inventore, quae esse placeat facere magnam, obcaecati corrupti sapiente? Id eum eligendi vel quae.
      Fugiat reprehenderit reiciendis explicabo eveniet error eaque nostrum possimus, dolorem, nemo excepturi repellat tenetur aut, maxime commodi officia id vitae dicta vel consequuntur. Molestias temporibus animi maiores? Tempora, delectus maxime!
      Maiores, placeat veniam laboriosam, tempora numquam animi, at quaerat reiciendis facilis eius suscipit illo a ipsum iste ratione beatae architecto consequatur aliquid corrupti! Illum, dicta. Ullam debitis reiciendis quisquam dicta?
      Qui ex earum eius sequi dolor molestiae est distinctio tempore dicta perspiciatis eum nobis aliquid, harum pariatur alias accusantium sit! Laboriosam, corrupti eos perferendis commodi aspernatur deserunt nesciunt est alias.</p><p class="py-2">
      Quisquam est enim vitae minima perspiciatis nihil non ipsa incidunt officiis alias neque molestias laboriosam, impedit quidem tempora ab temporibus reprehenderit magni? Accusamus blanditiis deserunt unde at eaque odit beatae.
      Reprehenderit nisi placeat commodi, illo quo tempore quis debitis animi sunt cumque ullam necessitatibus magni dolore inventore exercitationem, beatae dolor, ut enim ad excepturi? Aspernatur cum recusandae officiis cumque. Ut?
      Cupiditate, officia voluptatum, accusamus voluptatibus deserunt, doloremque iste nihil iure porro dignissimos fugit. Quaerat, veritatis. Consequuntur repellat quibusdam delectus. Rem sequi vero, atque cum perspiciatis alias. Ex ab velit aut.
      Voluptas reprehenderit in minima vero dolore? Quisquam sed repudiandae commodi illo assumenda, animi expedita alias earum, ipsa deleniti quidem maxime aliquid non dicta qui? Recusandae hic iure ut non quas.</p><p class="py-2">
      Sed suscipit cupiditate facilis ipsam enim. Velit et quidem, iste fugiat eveniet delectus harum dolorem non quae eius perferendis cumque veritatis ut, doloremque voluptatem hic temporibus. Eos ducimus modi quaerat!</p><p class="py-2">
      Deserunt, cumque totam nam amet explicabo consequatur quidem. Nesciunt illum molestiae possimus recusandae reprehenderit necessitatibus inventore. Omnis, voluptatibus perspiciatis odio, fugiat reprehenderit tenetur, quas quod maxime quaerat suscipit ullam odit?
      Possimus unde est at, sit explicabo rerum pariatur facilis delectus mollitia provident suscipit aspernatur? Doloremque, veniam eum pariatur sed ullam nemo nam, facere molestiae impedit repellendus, recusandae laboriosam. Illum, blanditiis.
      Id nam vitae cum aspernatur eos culpa ratione corporis recusandae est deleniti repellat, distinctio, eligendi quo sunt autem laborum. Molestiae, suscipit autem! Est quam, molestias esse ab cum reiciendis sequi.</p><p class="py-2">
      Voluptates obcaecati ea velit ipsa aliquam tempore tempora fuga dolores sed. Eius repellat distinctio magnam, molestiae necessitatibus consectetur inventore excepturi odio rerum iste. Tenetur quidem nostrum est rem unde et?
      Labore architecto dolorem vitae eaque temporibus. Incidunt amet eligendi tenetur quisquam assumenda sequi ut corporis dolorum vitae eos. Laudantium commodi modi fugit quod libero iure inventore, harum maxime nihil unde!
      Itaque facere at voluptate qui deserunt asperiores, magni minus aspernatur distinctio. Nesciunt nulla earum ducimus, aut iste architecto sint numquam magnam blanditiis. Nulla ut magnam delectus! Similique corporis aliquam animi!
      Molestiae officiis minima modi necessitatibus ad assumenda, at ex autem architecto sunt iusto nihil fugiat repellendus excepturi harum sint nisi consequatur earum error! Ex maxime aut, perferendis itaque est suscipit!</p><p class="py-2">
      Ex aliquam doloribus laborum expedita ipsum earum molestiae saepe! Eveniet, doloremque? Accusantium doloribus impedit ipsa consequuntur quibusdam nam aliquid optio quos sit consequatur dolorem iste, eaque non minima molestias animi.
      Excepturi voluptas corporis, deserunt officiis repudiandae eius sint animi est modi nam sequi cupiditate praesentium ipsum, illo quisquam? Labore cumque corporis aliquam facere amet sed velit? Delectus sunt non ut.
      Perspiciatis dignissimos doloribus reiciendis eveniet excepturi, nulla ipsam natus suscipit odit beatae ratione soluta doloremque laborum veritatis eaque dolores aliquid, explicabo iure porro, odio illum ea cumque facere! Pariatur, sequi.
      Corrupti at recusandae quae, veritatis voluptatibus nulla ullam iure modi aut? Vero veritatis perspiciatis soluta quis, inventore dolores dolor provident doloremque eligendi dignissimos perferendis unde! Veniam inventore accusantium sequi vero!
      Expedita saepe culpa iure eos quasi? Unde quas laboriosam doloribus sed magnam. Quasi nam architecto dolorem! Debitis quis tempore, esse dolorem facere natus in delectus odio aperiam, ab quibusdam nesciunt!</p><p class="py-2">
      Tempora doloremque ex saepe! Nam repudiandae corporis doloremque eligendi quae! Laboriosam explicabo sed est quisquam distinctio ipsam necessitatibus ducimus amet voluptatem ex, voluptate adipisci dolorem blanditiis praesentium quos atque suscipit?
      Repellendus, quisquam cum ad maxime exercitationem labore totam id natus accusantium dolor illum aperiam minima saepe incidunt corporis soluta voluptas in delectus illo sit ut, consectetur repudiandae! Magnam, fugiat a.
      Quidem consectetur, harum minus doloribus atque officiis cumque dicta animi explicabo est eius magni dolores eos, vel fugiat quod magnam commodi a? Perspiciatis, suscipit accusamus. Praesentium aperiam repellat accusamus dolor.</p><p class="py-2">
      Facilis praesentium velit maiores ut corporis voluptas voluptatem illo, nostrum dignissimos expedita commodi, temporibus nam vitae sit blanditiis consequuntur repudiandae tenetur dicta beatae quos! Amet doloribus possimus maiores quidem dignissimos.
      Eius ea quidem odio cum, ad corrupti, sint culpa voluptatum fugiat facere voluptatem? Velit unde ea vero minus impedit suscipit distinctio repudiandae odit amet, repellendus accusamus, perspiciatis laudantium natus libero!
      Facere cum debitis velit explicabo officiis ut odio corporis laudantium in sed, veritatis, ducimus possimus amet nihil deserunt eum corrupti eligendi consequatur, ipsam error! Eaque magni officiis molestias quaerat accusantium!
      Illo minus eligendi rem cum officia perferendis earum eius tempora modi aliquid autem, incidunt aut iste enim mollitia magni facere omnis molestias dignissimos reprehenderit quis voluptatem velit repudiandae! Ea, nisi.
      Accusantium eaque mollitia perspiciatis repudiandae provident sint ducimus nobis nostrum alias velit, quibusdam itaque modi. Fugit illum ea provident quos recusandae hic sequi dicta vitae! Non beatae qui eum illum!</p><p class="py-2">
      Eligendi ad aliquid ea alias, nobis assumenda aspernatur aperiam sunt saepe tempore dolorum eaque eum cupiditate id voluptate voluptatibus nemo non atque tempora! Voluptas quos sapiente eos accusantium voluptate odio!
      Qui quaerat placeat modi hic natus facilis dolor nesciunt corporis quae eaque sint earum assumenda non, ullam officiis amet veniam laborum consequatur aspernatur possimus odio eius consectetur maiores! Facilis, saepe!</p><p class="py-2">
      Minima id eum possimus iste rem nihil repellat necessitatibus. Repellat rerum doloribus inventore. Quo recusandae praesentium, corporis repellat quisquam perspiciatis vel labore temporibus numquam minima aut, ducimus omnis. Inventore, dolores!
      Tempora consectetur pariatur aspernatur deserunt accusamus possimus sint libero exercitationem enim. In ipsum eveniet similique ullam obcaecati, esse odio molestiae, praesentium sint odit soluta voluptates. Earum doloribus quidem quaerat accusantium?
      Doloribus veritatis quo mollitia voluptate pariatur? Cum deleniti nostrum cupiditate! Explicabo odio dolores architecto assumenda veritatis? Aperiam maiores nisi perferendis maxime voluptatibus rerum placeat sapiente, consectetur ea hic perspiciatis facilis?
      Vitae, corporis natus. Autem vero vitae qui laudantium numquam. Corporis facilis, modi, eligendi perspiciatis quidem itaque obcaecati nihil saepe dolorem atque tenetur voluptates nesciunt, nisi quasi aut blanditiis assumenda minima!</p><p class="py-2">
      Repudiandae officiis possimus dicta harum, suscipit sint fugit molestias necessitatibus officia repellat, adipisci, recusandae minima temporibus odit quas explicabo? Consequatur, perspiciatis vero voluptates doloremque necessitatibus nihil? Voluptatum labore voluptate eligendi?
      Nobis modi nemo aperiam ab, a, natus culpa perferendis deleniti quam pariatur harum itaque? Similique est dolore nisi veritatis fugiat distinctio possimus et in nesciunt iure ducimus, consequuntur ex eum?
      Nulla voluptatem, maxime aperiam expedita dignissimos ipsa harum, ullam eligendi sed, debitis aliquid mollitia quam voluptatibus nisi. Quae molestiae voluptatibus tempora amet enim! Nulla minus distinctio illum necessitatibus consequatur ipsum.</p><p class="py-2">
      Temporibus labore quas blanditiis! Cupiditate tempore quam at blanditiis architecto nam maiores provident suscipit soluta doloremque, dolorem, repudiandae iste rem numquam sint veniam. Praesentium tenetur ipsa facilis necessitatibus adipisci magnam.
      Nemo neque velit cum itaque, rerum cupiditate, ullam natus quo, voluptate quos eligendi incidunt ab! Quae optio amet maiores. A deleniti officiis quaerat nam rem! Expedita enim ea ut quae.
      Natus nam labore architecto velit iste quisquam at totam inventore cumque id doloribus quibusdam nemo veniam, asperiores similique explicabo porro qui tempora tenetur sequi perspiciatis adipisci voluptates, enim vitae! Libero.</p><p class="py-2">
      Sit nam ut laudantium, incidunt ea quaerat voluptate placeat iste, officiis quidem laboriosam dicta atque. Doloremque, odit aut nobis eveniet reprehenderit quidem laudantium, dicta neque inventore repudiandae deleniti exercitationem pariatur.
      Velit quia blanditiis voluptatibus eum facere ea reprehenderit earum porro qui aperiam perspiciatis magnam magni doloribus est nihil neque enim, dolor illum animi hic, laudantium accusantium veritatis. Iusto, temporibus minima.</p><p class="py-2">
      Sequi sit ullam sapiente! Placeat illum voluptates doloribus unde delectus. Officiis sint ab minus omnis nihil eos dolorem, tenetur rem, reprehenderit eligendi dolor vitae placeat nam harum atque molestiae. Quo.
      Iusto totam dolorum quo odit culpa magnam illum vero, facere mollitia non minima hic alias magni laudantium ullam ipsam nesciunt. Sit veniam modi repellat quisquam delectus tenetur officiis totam quibusdam!
      Iste officiis magnam aspernatur impedit. Animi cumque doloremque porro, assumenda laudantium facilis aliquid ab id magni! Odit asperiores repellat similique voluptatibus autem cumque tenetur? Unde temporibus odio explicabo sed officiis?
      Magnam quas officiis aperiam id. Reprehenderit in earum veniam autem, ut deleniti blanditiis, dolorum doloremque necessitatibus delectus laboriosam dolor iusto obcaecati ad repellendus exercitationem! Iste delectus itaque adipisci animi sit.
      Sed cumque ullam iusto numquam maiores nam quam nesciunt obcaecati dicta aliquid eos fuga, praesentium consectetur quas perferendis nemo. Labore in dolorem esse? Vero nam architecto unde nemo magni iusto.
      Eum perferendis exercitationem facere ratione corrupti. Labore placeat expedita ullam ipsam aspernatur aperiam esse eveniet explicabo voluptatibus sunt! Officiis quidem odit incidunt voluptas totam saepe sunt eum quas quasi vel.</p><p class="py-2">
      Enim aliquam natus adipisci nisi vitae soluta assumenda officiis veniam deserunt ratione alias saepe, eum itaque iure ipsa facilis possimus commodi. Quod ipsa excepturi odit et nesciunt, nam eaque quidem.
      Animi alias eligendi, odio consectetur corporis doloremque eius ipsam id ipsa quam eos illum! Rem officia saepe facilis ipsa harum, odit vero cum. Commodi aperiam expedita explicabo maiores dolorem optio!</p><p class="py-2">
      Placeat dolore doloribus numquam fugiat eligendi nemo amet, dicta vero magnam dolores, minus omnis fugit blanditiis culpa, ullam corporis tempora iusto exercitationem ipsa minima libero ex. Velit illum fuga beatae.</p><p class="py-2">
      Earum ut est, magnam accusantium, tempore officia veniam eum nihil mollitia animi aspernatur unde consequuntur repudiandae deleniti voluptatum similique possimus rerum totam. Velit alias culpa inventore, aspernatur at similique quod.
      Obcaecati illo autem ipsam, rerum enim quia temporibus vero eius nesciunt molestias blanditiis iste velit veniam maxime? Repudiandae officiis nemo ipsam, quo nostrum, optio voluptatibus et assumenda itaque eligendi id!</p><p class="py-2">
      Odit accusamus cum nulla totam laboriosam. Molestias numquam aperiam cum perferendis delectus minus nulla, sapiente nesciunt velit, sed sequi consectetur voluptas laborum accusantium excepturi cumque praesentium ab officiis, unde temporibus.
      Id voluptates atque quod doloribus. Saepe neque expedita fugit inventore deserunt sed! Voluptates delectus modi voluptatem architecto omnis ex nam cupiditate neque accusantium qui voluptas ratione tempora, perspiciatis ea adipisci.
      Ea nam reprehenderit, sequi totam numquam fugit impedit nobis enim iste tempore optio quisquam placeat deleniti veritatis quam iure natus at laboriosam facere porro obcaecati, repudiandae pariatur labore! Illo, deleniti?
      Beatae ducimus tenetur sequi illum possimus dolores nesciunt reiciendis omnis voluptatem cupiditate dolorem vitae, vero totam quod, iusto ea? Consectetur odit ratione velit deleniti minima optio nulla id totam necessitatibus?
      Nam fuga exercitationem, nesciunt vel perspiciatis inventore tenetur enim eligendi possimus asperiores dolorem eos hic id suscipit obcaecati ipsam consequuntur sapiente reprehenderit neque fugiat dolore cum maiores totam. Quod, sint.
      Amet qui, molestias, laborum, porro dolore neque veniam illum voluptate quisquam pariatur quae sed repellat totam laboriosam? Fugiat porro error suscipit neque esse provident aperiam at dignissimos vero ea. Suscipit?</p><p class="py-2">
      Fugiat consectetur consequuntur assumenda dolorem, facere fuga nisi velit optio excepturi cum laudantium, quasi aliquid est ea molestias necessitatibus sunt quibusdam esse odit illo. Distinctio magnam perferendis deleniti! Nisi, magni!
      Sapiente mollitia quae commodi a amet officiis! Id minus, quos, animi reprehenderit adipisci veniam perferendis expedita fugit assumenda porro at saepe, eos exercitationem quaerat voluptatum quas ipsam! Qui, asperiores numquam!
      Nisi aut adipisci temporibus mollitia cum quia beatae distinctio voluptates, quo rem molestias id recusandae dolorum cumque ratione dolorem minima odit saepe numquam ab nihil. Illo quibusdam blanditiis animi harum.</p><p class="py-2">
      Laudantium quae possimus quod labore consequatur voluptate ut. Modi quisquam, explicabo nesciunt dignissimos doloribus, sequi recusandae, ipsum voluptas dolore sapiente nulla omnis animi incidunt officia rem corrupti! Nostrum, laudantium illo!
      Laboriosam esse praesentium hic! Rerum blanditiis sint vel quam ea tempore, quia, non sunt, nulla aperiam nam? Qui eius, odio voluptatem fugiat eos vel, tempora reprehenderit dolorum aliquid architecto velit?</p><p class="py-2"></p>`,
};

const AboutPage = () => {
  return (
    <>
      <Container className="p-4 sm:p-10">
        <HeadTitle title="About Us" className="pb-10 pt-4" />
        <div className="">{HTMLReactParser(data.content)}</div>
      </Container>
    </>
  );
};

export default AboutPage;
