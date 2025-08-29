// Les bons relexes avant de prendre la route
// https://www.securite-routiere.gouv.fr/les-medias/nos-quiz/le-grand-quiz-de-la-securite-routiere
export const categoriesBank = [
  { technical_name: 'tv_cinema', name: 'TV & Cinema' },
  { technical_name: 'art_litterature', name: 'Litterature' },
  { technical_name: 'musique', name: 'Musique' },
  { technical_name: 'actu_politique', name: 'Politique' },
  { technical_name: 'culture_generale', name: 'Culture generale' },
  { technical_name: 'sport', name: 'Sport' },
  { technical_name: 'jeux_videos', name: 'Jeux videos' },
];

export const securiteRoutiere = [
  {
    question_index: 0,
    title:
      'Après avoir consommé de l’alcool, boire un café serré fera-t-il baisser l’alcoolémie ?',
    answers: ['Oui', 'Non'],
    right_answer: {
      index: 1,
      explanation:
        "Rien ne permet d’accélérer l’élimination de l’alcool dans le sang, il faut juste attendre que le taux baisse et ça baisse beaucoup plus lentement qu'on l'imagine.",
    },
    done: false,
  },
  {
    question_index: 1,
    title:
      'Entre 0,5 et 0,8 g d’alcool par litre de sang, soit à partir de 2 verres, le risque d’être responsable d’un accident mortel est multiplié en moyenne par :',
    answers: ['2,5', '4,8', '6,4'],
    right_answer: {
      index: 2,
      explanation:
        'Champ visuel rétréci, perception des distances modifiée… L’alcool a des effets immédiats sur le cerveau. Il n’y a pas de petite dose : dès le seuil de 0,5 g par litre de sang, les risques sont réels.',
    },
    done: false,
  },
  {
    question_index: 2,
    title: 'La nuit, l’alcool est présent dans :',
    answers: [
      '35 % des accidents mortels',
      '40 % des accidents mortels',
      '50 % des accidents mortels',
    ],
    right_answer: {
      index: 2,
      explanation:
        'La nuit, l’alcool est présent dans la moitié des accidents mortels et atteint 66 % le week-end !',
    },
    done: false,
  },
  {
    question_index: 3,
    title: 'Quelle boisson contient le plus d’alcool pur ?',
    answers: [
      '25 cl de bière à 5°',
      '12,5 cl de vin à 12°',
      '3 cl de whisky à 40°',
      'toutes ces boissons contiennent la même quantité d’alcool pur',
    ],
    right_answer: {
      index: 3,
      explanation:
        'Peu importe la boisson alcoolisée, un verre (dose de bar) contient la même quantité d’alcool pur.',
    },
    done: false,
  },
  {
    question_index: 4,
    title:
      'Dans certains cas, l’installation d’un éthylotest antidémarrage peut être proposée en alternative à une suspension de permis :',
    answers: ['Vrai', 'Faux'],
    right_answer: {
      index: 0,
      explanation:
        'Cette alternative, prise par décision préfectorale, concerne les automobilistes contrôlés avec une alcoolémie délictuelle (supérieure à 0,8 g par litre de sang), pour une durée d’un an maximum (prolongeable jusqu’à 5 ans par l’autorité judiciaire). Ce dispositif préserve le droit de conduire tout en luttant contre l’alcool au volant.',
    },
    done: false,
  },
  {
    question_index: 5,
    title:
      'Les conducteurs impliqués dans un accident mortel avec un taux d’alcool positif sont en très grande majorité :',
    answers: ['Des hommes', 'Des femmes'],
    right_answer: {
      index: 0,
      explanation:
        '92 % des conducteurs impliqués dans un accident mortel avec l’alcool sont des hommes. Une alcoolémie excessive est présente dans 30 % des accidents mortels.',
    },
    done: false,
  },
  {
    question_index: 6,
    title:
      'Un conducteur titulaire du permis probatoire peut consommer avant de conduire :',
    answers: ['0 verre d’alcool', '1 verre d’alcool', '2 verres d’alcool'],
    right_answer: {
      index: 0,
      explanation:
        'Les accidents de la route sont la première cause de mortalité et de handicap des 18-25 ans et dans un quart de ces accidents, une alcoolémie excessive en est la cause. Pour les conducteurs titulaires d’un permis probatoire, la limite est de 0,2 g par litre de sang (0,1 mg par litre d’air expiré). 0,2 g par litre, c’est zéro verre d’alcool car cette limite peut être dépassée dès le premier verre d’alcool.',
    },
    done: false,
  },
  {
    question_index: 7,
    title:
      'Dans 1 accident mortel sur 5, un conducteur est positif aux stupéfiants.',
    answers: ['Vrai', 'Faux'],
    right_answer: {
      index: 0,
      explanation:
        'Vrai. En 2021, près de 20 % des personnes décédées sur les routes ont été tuées dans un accident impliquant un conducteur sous l’emprise de stupéfiants. Cette part atteint 1 accident mortel sur 3 la nuit au cours des week-ends.',
    },
    done: false,
  },
  {
    question_index: 8,
    title:
      'Par combien le mélange cannabis/alcool multiplie le risque de causer un accident mortel ?',
    answers: ['7', '18', '29'],
    right_answer: {
      index: 2,
      explanation:
        'Le mélange drogue/cannabis est délétère car les effets des deux substances se cumulent dangereusement. La raison : des réflexes amoindris, doublés d’un sentiment de désinhibition, qui peuvent avoir des conséquences graves !',
    },
    done: false,
  },
  {
    question_index: 8,
    title:
      'Sur les boîtes des médicaments, combien y a-t-il de niveaux de risque représentés par un pictogramme triangulaire ?',
    answers: ['3 niveaux', '5 niveaux', '8 niveaux'],
    right_answer: {
      index: 0,
      explanation:
        'Vision, motricité, audition… Certains médicaments peuvent amoindrir les capacités des conducteurs ! Pour identifier le niveau de risque, des pictogrammes assortis de messages sont imprimés sur leurs boîtes. Jaune : soyez prudent ; orange : soyez très prudent, demandez l’avis du médecin avant de conduire ; rouge : attention danger, la conduite est impossible.',
    },
    done: false,
  },
  {
    question_index: 9,
    title:
      '5 heures de sommeil ou moins la veille d’un départ multiplient le risque d’accident par :',
    answers: ['2', '3', '4'],
    right_answer: {
      index: 1,
      explanation:
        'La fatigue et la somnolence au volant augmentent le risque d’accident. Avant de faire un long trajet, il convient de dormir suffisamment de manière à ne pas constituer une dette de sommeil. De même, il est déconseillé de partir après une journée de travail sans s’être reposé.',
    },
    done: false,
  },
  {
    question_index: 10,
    title: 'La fatigue est la 1re cause d’accident mortel sur l’autoroute :',
    answers: ['Vrai', 'Faux'],
    right_answer: {
      index: 0,
      explanation:
        'La somnolence est un vrai danger, particulièrement sur l’autoroute : elle y a été responsable d’un quart des accidents mortels entre 2015 et 2019.',
    },
    done: false,
  },
  {
    question_index: 11,
    title:
      'À quelle fréquence est-il conseillé au conducteur de faire une pause lors d’un long trajet en voiture sur la route ?',
    answers: ['2 heures', '3 heures'],
    right_answer: {
      index: 0,
      explanation:
        'Le risque d’avoir un accident est 8 fois plus important lorsqu’on est somnolent ! Faire des pauses s’impose toutes les 2 heures, et plus si la fatigue se fait sentir !',
    },
    done: false,
  },
  {
    question_index: 12,
    title:
      'Être contrôlé avec une alcoolémie supérieure à 0,8 g par litre de sang est un délit puni :',
    answers: [
      'jusqu’à 1 an d’emprisonnement',
      'jusqu’à 2 ans d’emprisonnement',
      'jusqu’à 3 ans d’emprisonnement',
    ],
    right_answer: {
      index: 1,
      explanation:
        'Au-delà du seuil des 0,8 g d’alcool par litre de sang, il s’agit d’un délit passible de 2 ans d’emprisonnement qui, en plus d’un retrait de 6 points et d’une amende de 4 500 euros, s’accompagne d’un stage obligatoire de sensibilisation à la sécurité routière aux frais du contrevenant.',
    },
    done: false,
  },
  {
    question_index: 13,
    title:
      'À quelle fréquence est-il conseillé au conducteur de faire une pause lors d’un long trajet en voiture sur la route ?',
    answers: ['2 heures', '3 heures'],
    right_answer: {
      index: 0,
      explanation:
        'Le risque d’avoir un accident est 8 fois plus important lorsqu’on est somnolent ! Faire des pauses s’impose toutes les 2 heures, et plus si la fatigue se fait sentir !',
    },
    done: false,
  },
  {
    question_index: 14,
    title:
      'Sur autoroute, diminuer sa vitesse de 10 km/h en passant de 130 à 120 km/h sur un trajet de 500 km permet-il d’économiser du carburant ?',
    answers: [
      'non, aucune différence de consommation',
      'oui, environ 4 litres de carburant',
      'oui, environ 10 litres de carburant',
    ],
    right_answer: {
      index: 1,
      explanation:
        'Réduire sa vitesse de 10 km/h sur autoroute en passant de 130 à 120 km/h permet d’économiser sur 500 km entre 3,5 et 4,5 litres de carburant (selon la motorisation et le type de véhicule), et près de 12 kg de CO2. En plus, abaisser la vitesse permet de diminuer le nombre des accidents de la route et leur gravité. En effet, la distance d’arrêt est réduite et permet d’éviter les obstacles imprévus.',
    },
    done: false,
  },
  {
    question_index: 15,
    title:
      'Avoir des pneus sous-gonflés peut entraîner une surconsommation de carburant.',
    answers: ['Vrai', 'Faux'],
    right_answer: {
      index: 0,
      explanation:
        'Vrai, un sous-gonflage des pneus entraîne une surconsommation de carburant. Pour 0,3 bar de moins que la pression recommandée, on atteint 1,2 % de consommation en plus, pour 0,5 bar en moins, 2,4 % de consommation en plus. Un pneu mal gonflé peut également entraîner une mauvaise adhérence à la route et augmenter le risque d’éclatement. Entretenir correctement ses pneus permet de rouler en toute sécurité et de les garder plus longtemps.',
    },
    done: false,
  },
];

export const backToSchool = [
  {
    question_index: 0,
    title: 'Quelle est la racine carrée de 36 ?',
    answers: ['6', '9', '12', '18'],
    right_answer: {
      index: 0,
      explanation: '',
    },
    done: false,
  },
  {
    question_index: 1,
    title: 'Quel département français a pour chef-lieu Bordeaux ?',
    answers: ['Landes', 'Mayenne', 'Gironde', 'Ardèche'],
    right_answer: {
      index: 2,
      explanation: '',
    },
    done: false,
  },

  {
    question_index: 2,
    title: "Qu'est pour moi le père de mon père ?",
    answers: ['Mon oncle', 'Mon frère', 'Mon neveu', 'Mon grand-père'],
    right_answer: {
      index: 3,
      explanation: '',
    },
    done: false,
  },
  {
    question_index: 3,
    title: 'Combien de voleurs accompagnaient Ali Baba ?',
    answers: ['12', '40', '1000', '10000'],
    right_answer: {
      index: 1,
      explanation: '',
    },
    done: false,
  },
  {
    question_index: 4,
    title: '-aud ou -eau ? Quel mot est mal orthographié ?',
    answers: ['Lapereau', 'Ruisseau', 'Crapeau', 'Manteau'],
    right_answer: {
      index: 2,
      explanation: '',
    },
    done: false,
  },
  {
    question_index: 5,
    title: 'Lequel de ces nombres est un nombre premier ?',
    answers: ['13', '25', '32', '33'],
    right_answer: {
      index: 0,
      explanation: '',
    },
    done: false,
  },
  {
    question_index: 6,
    title: "Combien d'années compte-t-on dans une décennie ?",
    answers: ['1', '10', '12', '100'],
    right_answer: {
      index: 1,
      explanation: '',
    },
    done: false,
  },
  {
    question_index: 7,
    title: 'Lequel de ces termes est synonyme de joyeux ?',
    answers: ['Gai', 'Bouleversé', 'Désolé', 'Navré'],
    right_answer: {
      index: 0,
      explanation: '',
    },
    done: false,
  },
];
