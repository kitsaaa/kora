const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  {
    title: "Ель колючая 'Glauca' Misty Blue",
    slug: "el-glauca-misty-blue",
    category: "хвойные",
    available: true,
    description: "Эта ель обладает характерной голубовато-серебристой хвоей, придающей дереву изысканный декоративный вид. Доступна в размерах от 150 до 450 см, подходит как для одиночных посадок, так и для создания живых изгородей. Чем выше растение, тем более выражена крона правильной конусовидной формы.",
    variants: [
      { size: "150–200 см", price: 4500 },
      { size: "200–250 см", price: 5900 },
      { size: "250–300 см", price: 9800 },
      { size: "300–350 см", price: 12700 },
      { size: "350–400 см", price: 15700 },
      { size: "400–450 см", price: 18500 }
    ]
  },
  {
    title: "Ель канадская",
    slug: "el-kanadskaya",
    category: "хвойные",
    available: true,
    description: "Классическая зелёная ель с густой хвоей и плотной симметричной кроной. Представлена в диапазоне от 200 до 500 см, используется как в ландшафтном дизайне, так и в качестве новогоднего дерева. Более крупные экземпляры подойдут для оформления парковых зон и аллей.",
    variants: [
      { size: "200–250 см", price: 3950 },
      { size: "250–300 см", price: 5500 },
      { size: "300–350 см", price: 7500 },
      { size: "350–400 см", price: 9500 }
    ]
  },
  {
    title: "Ель черная",
    slug: "el-chernaya",
    category: "хвойные",
    available: true,
    description: "Североамериканская порода ели с тёмно-зелёной, почти чёрной хвоей. Устойчива к холоду и отлично чувствует себя в условиях высокой влажности. Представлена в размерах от 200 до 350 см — оптимальный выбор для природных и лесопарковых зон.",
    variants: [
      { size: "200–250 см", price: 3700 },
      { size: "250–300 см", price: 5700 },
      { size: "300–350 см", price: 7700 }
    ]
  },
  {
    title: "Ель сибирская",
    slug: "el-sibirskaya",
    category: "хвойные",
    available: true,
    description: "Морозостойкое дерево с ярко-зелёной мягкой хвоей. Прекрасно адаптируется к суровому климату и малоплодородным почвам. Доступна в размерах 250–400 см — подходит для крупных участков, хорошо переносит обрезку.",
    variants: [
      { size: "250–300 см", price: 10700 },
      { size: "300–350 см", price: 14500 },
      { size: "350–400 см", price: 18100 }
    ]
  },
  {
    title: "Сосна обыкновенная",
    slug: "sosna-obyknovennaya",
    category: "хвойные",
    available: true,
    description: "Неприхотливое, светолюбивое дерево с длинной ароматной хвоей. Предлагается в крупных размерах от 450 до 600 см. Сосна хорошо смотрится в больших ландшафтных композициях и на участках с песчаной почвой.",
    variants: [
      { size: "450–500 см", price: 18000 },
      { size: "500–550 см", price: 21000 },
      { size: "550–600 см", price: 24000 }
    ]
  },
  {
    title: "Лиственница европейская",
    slug: "listvennitsa-evropeyskaya",
    category: "хвойные",
    available: true,
    description: "Уникальное хвойное дерево, сбрасывающее хвою на зиму. Летом она мягкая и светло-зелёная, осенью — золотисто-жёлтая. Доступные размеры от 600 до 1000 см делают её отличным выбором для посадки в качестве акцента в садах и аллеях.",
    variants: [
      { size: "600–650 см", price: 23000 },
      { size: "650–700 см", price: 27100 },
      { size: "700–750 см", price: 31100 },
      { size: "750–800 см", price: 35200 },
      { size: "800–850 см", price: 39200 },
      { size: "850–900 см", price: 44300 },
      { size: "900–950 см", price: 47300 },
      { size: "950–10000 см", price: 51300 }
    ]
  },
  {
    title: "Ель колючая (голубая) VIP",
    slug: "el-kolyuchaya-golubaya-vip",
    category: "хвойные",
    available: true,
    description: "Роскошная разновидность голубой ели с насыщенным стальным оттенком хвои. Представлена в крупных размерах от 300 до 580 см, отлично подходит для статусных участков, городских пространств и официальных зданий.",
    variants: [
      { size: "300–320 см", price: 60300 },
      { size: "320–340 см", price: 65100 },
      { size: "340–360 см", price: 70000 },
      { size: "360–380 см", price: 74800 },
      { size: "380–400 см", price: 79700 },
      { size: "400–420 см", price: 84500 },
      { size: "420–440 см", price: 89400 },
      { size: "440–460 см", price: 94300 },
      { size: "460–480 см", price: 99300 },
      { size: "480–500 см", price: 104200 },
      { size: "500–520 см", price: 109100 },
      { size: "520–540 см", price: 114000 },
      { size: "540–560 см", price: 118900 },
      { size: "560–580 см", price: 123900 }
    ]
  },
  {
    title: "Туя западная Смарагд / Smaragd",
    slug: "tuya-smaragd",
    category: "хвойные",
    available: true,
    description: "Колоновидная туя с густой, ярко-зелёной хвоей. Прекрасно сохраняет форму без стрижки. Имеются компактные варианты высотой 40–80 см — идеально подходят для живых изгородей и декоративных композиций.",
    variants: [
      { size: "С3 40–60 см", price: 400 },
      { size: "C7.5 60–80 см", price: 1250 }
    ]
  },
  {
    title: "Туя западная Брабант / Brabant",
    slug: "tuya-brabant",
    category: "хвойные",
    available: true,
    description: "Быстрорастущий сорт туи с рыхлой кроной и светло-зелёной хвоей. В наличии саженцы 40–60 см. Подходит для формирования живых заборов, легко переносит обрезку.",
    variants: [
      { size: "С3 40–60 см", price: 400 }
    ]
  },
  {
    title: "Сосна горная",
    slug: "sosna-gornaya",
    category: "хвойные",
    available: true,
    description: "Карликовая хвойная культура, устойчивая к ветру, засухе и холоду. Варианты от 10 до 60 см — отличный выбор для альпинариев, бордюров и контейнерного озеленения.",
    variants: [
      { size: "С2 10–20 см", price: 450 },
      { size: "С7.5 40–60 см", price: 1400 }
    ]
  },
  {
    title: "Кедр сибирский",
    slug: "kedr-sibirskiy",
    category: "хвойные",
    available: true,
    description: "Мощное, величественное дерево с плотной хвоей и крупными шишками. Доступен в маленьком размере 100–200 см — идеален для закладки садов и аллей, требует много пространства.",
    variants: [
      { size: "С2/С3 20–30 см", price: 800 }
    ]
  }
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        description: product.description,
      },
      create: {
        title: product.title,
        slug: product.slug,
        category: product.category,
        available: product.available,
        description: product.description,
        variants: {
          create: product.variants.map(v => ({ size: v.size, price: v.price }))
        }
      },
    });
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); }); 