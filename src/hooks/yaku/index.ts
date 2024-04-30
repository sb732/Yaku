export const getYakuTowersInfo = async () => {
  const data = [
    {
      name: 'Yaku Motors',
      image: 'https://s3.amazonaws.com/img.yaku.ai/estates/yakumotors.png',
      type: 'Shop',
      surface: 1080,
      href: '/explore/collection/SOL/yakucorp1',
    },
    {
      name: "Toy's R",
      image: 'https://s3.amazonaws.com/img.yaku.ai/estates/toys.png',
      type: 'Shop',
      surface: 1746,
      href: '/explore/collection/SOL/toys_r_us',
    },
    {
      name: 'Honda',
      image: 'https://s3.amazonaws.com/img.yaku.ai/estates/honda.png',
      type: 'Ads',
      surface: 1746,
      href: '',
    },
    {
      name: 'Monke DAO',
      image: 'https://yakuapp.s3.amazonaws.com/img/smb2.png',
      type: 'Tower',
      height: 757,
      location: 'Downtown Piers',
      href: '/explore/collection/SOL/solana_monkey_business',
    },
    {
      name: 'PopHeads',
      image:
        'https://bafybeigaq3x3iz3v24qjnv26ql7c7fstll6reolqbxkpncpbpa23bovgva.ipfs.dweb.link/',
      type: 'Tower',
      height: 900,
      location: 'Funfair',
      href: '/explore/collection/SOL/pop_heads',
    },
    {
      name: 'Stoned Ape Crew',
      image: 'https://yakuapp.s3.amazonaws.com/img/sac1.png',
      type: 'Tower',
      height: 700,
      location: 'Downtown',
      href: '/explore/collection/SOL/stoned_ape_crew',
    },
  ];
  return data;
};

export const getYakuCollectionStats = async () => {
  const data = [
    {
      image:
        'https://bafybeibkjcrnct6ihayjhk5567572a5ai2bhnwb7sk3mh4yhu7pa45al5e.ipfs.dweb.link',
      name: 'Yaku Motors | ONI-S01',
      description:
        'YAKU Motors ONI-S01 is the first playable customizable motorcycle available to explore Yakushima City!...',
      url: 'https://magiceden.io/marketplace/yaku_corp',
      supply: 6985,
    },
    {
      image: 'https://arweave.net/J9hCnlJYaJqltgwcsfkPO_b_eO4Q2QsRZhA8mQnYhuI',
      name: 'Yaku Estates | Capsule X',
      description:
        'Get your propoerty in Yakushima City! Hang out in your capsule apartment with friends, customize your motorcycle and avatar...',
      url: 'https://magiceden.io/marketplace/yaku_x',
      supply: 6489,
    },
    {
      image:
        'https://bafybeigaq3x3iz3v24qjnv26ql7c7fstll6reolqbxkpncpbpa23bovgva.ipfs.dweb.link',
      name: 'Yaku X | Avatars',
      description:
        'Choose your race and ascend to become a Kami! YAKU X is the customizable playable avatar to explore Yakushima City...',
      url: 'https://magiceden.io/marketplace/yaku_corp_capsulex',
      supply: 8734,
    },
  ];
  return data;
};

export const getDashboardSlides = async () => {
  const data = {
    delay: 83000,
    slides: [
      {
        title: '',
        type: 'image',
        mobileSrc:
          'https://s3.amazonaws.com/img.yaku.ai/logos/Background_motor.png',
        src: 'https://s3.amazonaws.com/img.yaku.ai/logos/Background_motor.png',
      },
    ],
  };
  return data;
};
