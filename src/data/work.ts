/**
 * Selected work cards (canvas `workData`). `imgStyle` and `mediaStyle` are the canvas inline style
 * strings for the image and its media box (TRENDERS sits on a gradient instead of a photo crop).
 */
export type WorkItem = {
  title: string;
  tag1: string;
  tag2: string;
  text: string;
  img: string;
  alt: string;
  imgStyle: string;
  mediaStyle: string;
};

export const work: WorkItem[] = [
  {
    title: 'TREVA Real Estate',
    tag1: 'Real Estate',
    tag2: 'Platform + AI + CRM',
    text: 'A complete real estate platform: website, inventory, AI assistant and CRM.',
    img: '/images/work/treva.jpg',
    alt: 'Resort terrace with an infinity pool at sunset',
    imgStyle: 'object-position: 30% 50%',
    mediaStyle: '',
  },
  {
    title: 'SABAH Towers',
    tag1: 'Real Estate',
    tag2: 'Website + CRM',
    text: 'A premium website for a seafront residential development, connected to the CRM.',
    img: '/images/work/sabah.jpg',
    alt: 'SABAH Towers residential towers at night',
    imgStyle: 'width: 140%; left: -38%; object-position: 50% 62%',
    mediaStyle: '',
  },
  {
    title: 'BRABUS Island Baku',
    tag1: 'Real Estate',
    tag2: 'Website',
    text: 'A project showcase for the BRABUS branded residences in Sea Breeze.',
    img: '/images/work/brabus.jpg',
    alt: 'BRABUS Island Baku residences on the beach at sunset',
    imgStyle: 'width: 126%; left: -24%; object-position: 50% 55%',
    mediaStyle: '',
  },
  {
    title: 'TVIM',
    tag1: 'Wholesale & Distribution',
    tag2: 'E-commerce platform',
    text: 'An online catalogue and ordering platform for a construction materials distributor.',
    img: '/images/work/tvim.jpg',
    alt: 'TVIM store front in Baku',
    imgStyle: 'object-position: 20% 42%',
    mediaStyle: '',
  },
  {
    title: 'TRENDERS',
    tag1: 'Marketing & Creative Services',
    tag2: 'Website + CMS',
    text: 'A new agency website with a custom CMS, portfolio, careers and blog.',
    img: '/images/work/trenders.jpg',
    alt: 'Trenders logo on a blue gradient',
    imgStyle:
      'width: auto; aspect-ratio: 1 / 1; left: 40px; object-fit: contain; -webkit-mask-image: linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent); mask-image: linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent)',
    mediaStyle:
      'background: linear-gradient(90deg, #7AACE9 0%, #6D9ED9 10%, #2B63C4 28%, #0A2F86 42%, #021855 56%, #021855 100%)',
  },
];
