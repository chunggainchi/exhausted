export interface AnatomyObject {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  outerImage: string;
  xrayImage: string;
  description: string;
}

export const anatomyData: AnatomyObject[] = [
  {
    id: 'human-hand',
    name: 'Menschliche Hand',
    category: 'Mensch',
    outerImage: '/images/anatomy/hand-outer.webp',
    xrayImage: '/images/anatomy/hand-xray.webp',
    description: 'eine Hand besteht aus 27 Knochen – mehr als in deinem ganzen Arm! Deshalb kann sie so viele präzise Bewegungen machen, vom Aufheben einer Murmel bis zum Zeichnen eines Bildes.',
  },
  {
    id: 'cow',
    name: 'Kuh',
    category: 'Tiere',
    subcategory: 'Land',
    outerImage: '/images/anatomy/cow-outer.webp',
    xrayImage: '/images/anatomy/cow-xray.webp',
    description: 'Kühe haben eine sehr lange Wirbelsäule mit vielen großen Wirbeln. Sie brauchen sie, um ihren schweren Körper zu tragen und gleichzeitig den Rücken flexibel zu halten.',
  },
  {
    id: 'sheep',
    name: 'Schaf',
    category: 'Tiere',
    subcategory: 'Land',
    outerImage: '/images/anatomy/sheep-outer.webp',
    xrayImage: '/images/anatomy/sheep-xray.webp',
    description: 'Der Schädel eines Schafes hat einen breiten Kieferknochen, weil Schafe stundenlang Gras kauen. Diese starke Knochenform macht ausdauerndes Knabbern möglich.',
  },
  {
    id: 'elephant',
    name: 'Elefant',
    category: 'Tiere',
    subcategory: 'Land',
    outerImage: '/images/anatomy/elephant-outer.webp',
    xrayImage: '/images/anatomy/elephant-xray.webp',
    description: 'Der Rüssel eines Elefanten ist ein echtes Muskel-Superheld! Er hat keinerlei Knochen – deshalb kann er sich wie ein Seil verdrehen und alles greifen, von winzigen Erdnüssen bis zu dicken Baumästen.',
  },
  {
    id: 'human-foot',
    name: 'Menschliches Fuß',
    category: 'Mensch',
    outerImage: '/images/anatomy/foot-outer.webp',
    xrayImage: '/images/anatomy/foot-xray.webp',
    description: 'Dein Fuß hat 26 Knochen – fast so viele wie deine ganze Hand! Sie arbeiten zusammen wie ein kleines Team, damit du stehen, gehen und springen kannst.',
  },
];

export const categories = Array.from(new Set(anatomyData.map((item) => item.category)));
