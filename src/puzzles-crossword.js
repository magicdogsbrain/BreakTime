/**
 * Mini Crosswords
 *
 * 5x5 grids with gentle, accessible clues
 * Not cryptic - just satisfying wordplay
 *
 * Grid pattern:
 * X X X X #
 * X # X # X
 * X X X X X
 * X # X # X
 * # X X X X
 *
 * Words:
 * A1: row0 cols0-3 (4 letters)
 * A3: row2 cols0-4 (5 letters)
 * A5: row4 cols1-4 (4 letters)
 * D1: col0 rows0-3 (4 letters)
 * D2: col2 rows0-4 (5 letters)
 * D4: col4 rows1-4 (4 letters)
 */

export const MINI_CROSSWORDS = [
  {
    // A1=SOFT D1=SHED D2=FIRST A3=EARTH D4=CHEW A5=STEW
    // S O F T #    D1:S,H,E,D  D2:F,I,R,S,T  D4:C,H,E,W
    // H # I # C    A1:S,O,F,T  A3:E,A,R,T,H  A5:S,T,E,W
    // E A R T H
    // D # S # E
    // # S T E W
    id: 'cross-001',
    title: 'Cosy Comforts',
    grid: [
      ['S', 'O', 'F', 'T', '#'],
      ['H', '#', 'I', '#', 'C'],
      ['E', 'A', 'R', 'T', 'H'],
      ['D', '#', 'S', '#', 'E'],
      ['#', 'S', 'T', 'E', 'W']
    ],
    across: [
      { number: 1, clue: 'Gentle and comfortable (4)', answer: 'SOFT', row: 0, col: 0 },
      { number: 3, clue: 'Our planet (5)', answer: 'EARTH', row: 2, col: 0 },
      { number: 5, clue: 'Hearty casserole dish (4)', answer: 'STEW', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Garden storage building (4)', answer: 'SHED', row: 0, col: 0 },
      { number: 2, clue: 'Before second (5)', answer: 'FIRST', row: 0, col: 2 },
      { number: 4, clue: 'What you do with food (4)', answer: 'CHEW', row: 1, col: 4 }
    ]
  },
  {
    // A1=LAMP D1=LIME D2=MINTS A3=ICONS D4=STEP A5=STEP? no...
    // D1=LIME: L,I,M,E  A1[0]=L  A3[0]=M
    // A1=LAMP: L,A,M,P  A1[2]=M  D2[0]=M
    // D2=MINTS: M,I,N,T,S  D2[2]=N  A3[2]=N  D2[4]=S  A5[1]=S
    // A3: M_N__ -> MINCE: M,I,N,C,E  A3[4]=E  D4[1]=E
    // D4: _E__  rows1-4 col4: ?E?? -> BEST? no D4=_,E,_,_ -> PETS? P,E,T,S
    // D4=PETS: P,E,T,S  D4[3]=S  A5[3]=S
    // A5=_S_S -> row4 cols1-4  A5[1]=S  A5[3]=S
    // hmm _S_S... not many words. ASKS? but no A at col1... wait A5[0]=col1, A5[1]=col2
    // A5[1]=D2[4]=S. So row4: #,?,S,?,S
    // need word for row4 cols1-4 where col2=S col4=S -> ?S?S
    // ASKS? but A5[0]=col1=A... wait that's fine: A,S,K,S
    // but D4[3]=S and A5[3]=col4=S. Check: ASKS=A,S,K,S. A5[3]=S ✓
    // but D4=PETS: D4[3]=S. And A5[3]=S ✓
    // Wait D4[2]=T. row3,col4=T. That's fine (isolated cell).
    // Grid:
    // L A M P #
    // I # I # P
    // M I N C E
    // E # T # T
    // # A S K S
    id: 'cross-002',
    title: 'Sweet Things',
    grid: [
      ['L', 'A', 'M', 'P', '#'],
      ['I', '#', 'I', '#', 'P'],
      ['M', 'I', 'N', 'C', 'E'],
      ['E', '#', 'T', '#', 'T'],
      ['#', 'A', 'S', 'K', 'S']
    ],
    across: [
      { number: 1, clue: 'Bedside light (4)', answer: 'LAMP', row: 0, col: 0 },
      { number: 3, clue: 'Meat filling for pies (5)', answer: 'MINCE', row: 2, col: 0 },
      { number: 5, clue: 'Questions (4)', answer: 'ASKS', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Green citrus fruit (4)', answer: 'LIME', row: 0, col: 0 },
      { number: 2, clue: 'After-dinner sweets (5)', answer: 'MINTS', row: 0, col: 2 },
      { number: 4, clue: 'Dogs and cats (4)', answer: 'PETS', row: 1, col: 4 }
    ]
  },
  {
    // D1=GIFT: G,I,F,T  A1[0]=G  A3[0]=F
    // A1=GUST: G,U,S,T  A1[2]=S  D2[0]=S
    // D2=STARE: S,T,A,R,E  D2[2]=A  A3[2]=A  D2[4]=E  A5[1]=E
    // A3=F_A__: FLAME: F,L,A,M,E  A3[4]=E  D4[1]=E
    // D4=_E__: rows1-4 col4: need 4-letter word 2nd letter E
    // BEND: B,E,N,D -> D4[3]=D  A5[3]=D
    // A5: row4 cols1-4: _E_D  A5[1]=E(D2[4]) A5[3]=D(D4[3])
    // BEND? no that starts B. A5 starts at col1. _E_D -> HERD? MEND? SEND? LEND?
    // MEND: M,E,N,D ✓
    // Grid:
    // G U S T #
    // I # T # B
    // F L A M E
    // T # R # N
    // # M E N D
    id: 'cross-003',
    title: 'Fix It Up',
    grid: [
      ['G', 'U', 'S', 'T', '#'],
      ['I', '#', 'T', '#', 'B'],
      ['F', 'L', 'A', 'M', 'E'],
      ['T', '#', 'R', '#', 'N'],
      ['#', 'M', 'E', 'N', 'D']
    ],
    across: [
      { number: 1, clue: 'Strong wind burst (4)', answer: 'GUST', row: 0, col: 0 },
      { number: 3, clue: 'Fire light (5)', answer: 'FLAME', row: 2, col: 0 },
      { number: 5, clue: 'Repair (4)', answer: 'MEND', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Present for someone (4)', answer: 'GIFT', row: 0, col: 0 },
      { number: 2, clue: 'Look fixedly (5)', answer: 'STARE', row: 0, col: 2 },
      { number: 4, clue: 'Curve or turn (4)', answer: 'BEND', row: 1, col: 4 }
    ]
  },
  {
    // D1=ALSO: A,L,S,O  A1[0]=A  A3[0]=S
    // A1=ARCH: A,R,C,H  A1[2]=C  D2[0]=C
    // D2=CLAIM: C,L,A,I,M  D2[2]=A  A3[2]=A  D2[4]=M  A5[1]=M
    // A3=S_A__: SHADE: S,H,A,D,E  A3[4]=E  D4[1]=E
    // D4=_E__: HELM: H,E,L,M  D4[3]=M  A5[3]=M
    // A5: _M_M? hard. Let me try different D4.
    // D4=SEAL: S,E,A,L  D4[3]=L  A5[3]=L
    // A5: _M_L -> row4 cols1-4  AMYL? not common. Let me try again.
    // D4=JEEP? no. DEER: D,E,E,R  D4[3]=R  A5[3]=R
    // A5: _M_R  not great.
    // Let me change A3. S_A__: STALE: S,T,A,L,E  A3[4]=E  D4[1]=E
    // D4=BEER: B,E,E,R  D4[3]=R  A5[3]=R
    // A5: _M_R  AMOR? not English.
    // D4=SEEM: S,E,E,M  D4[3]=M  A5[3]=M
    // A5: _M_M  hmm.
    // Let me change D2. D2[0]=C (from A1[2])
    // D2=CREST: C,R,E,S,T  D2[2]=E  A3[2]=E  D2[4]=T  A5[1]=T
    // A3=S_E__: STEEP: S,T,E,E,P  A3[4]=P  D4[1]=P
    // D4=_P__: SPIT? S,P,I,T  no... UPON: U,P,O,N  D4[3]=N  A5[3]=N
    // A5: _T_N  STEN? STUN: S,T,U,N ✓ (row4 cols1-4)
    // Grid:
    // A R C H #
    // L # R # U
    // S T E E P
    // O # S # O
    // # S T U N
    id: 'cross-004',
    title: 'Steep Hill',
    grid: [
      ['A', 'R', 'C', 'H', '#'],
      ['L', '#', 'R', '#', 'U'],
      ['S', 'T', 'E', 'E', 'P'],
      ['O', '#', 'S', '#', 'O'],
      ['#', 'S', 'T', 'U', 'N']
    ],
    across: [
      { number: 1, clue: 'Curved doorway (4)', answer: 'ARCH', row: 0, col: 0 },
      { number: 3, clue: 'Very sloped (5)', answer: 'STEEP', row: 2, col: 0 },
      { number: 5, clue: 'Surprise and amaze (4)', answer: 'STUN', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'As well (4)', answer: 'ALSO', row: 0, col: 0 },
      { number: 2, clue: 'Top of a wave (5)', answer: 'CREST', row: 0, col: 2 },
      { number: 4, clue: 'On top of (4)', answer: 'UPON', row: 1, col: 4 }
    ]
  },
  {
    // D1=WARM: W,A,R,M  A1[0]=W  A3[0]=R
    // A1=WISH: W,I,S,H  A1[2]=S  D2[0]=S
    // D2=STORE: S,T,O,R,E  D2[2]=O  A3[2]=O  D2[4]=E  A5[1]=E
    // A3=R_O__: ROOMS: R,O,O,M,S  A3[4]=S  D4[1]=S
    // Hmm R_O__ with A3[2]=O: R?O?? -> ROOMS doesn't work (R,O,O,M,S A3[2]=O ✓ but A3[0]=R and A3[1] can be anything)
    // Wait: A3[0]=D1[2]=R ✓, A3[2]=D2[2]=O ✓
    // ROOMS: R,O,O,M,S  -> A3[0]=R ✓ A3[2]=O ✓ A3[4]=S, D4[1]=S
    // D4=_S__: ASKS: A,S,K,S  D4[3]=S  A5[3]=S
    // A5: _E_S  row4 cols1-4: HENS? BEES? LENS? PENS? TENS?
    // PENS: P,E,N,S ✓
    // Grid:
    // W I S H #
    // A # T # A
    // R O O M S
    // M # R # K
    // # P E N S
    id: 'cross-005',
    title: 'Home Sweet Home',
    grid: [
      ['W', 'I', 'S', 'H', '#'],
      ['A', '#', 'T', '#', 'A'],
      ['R', 'O', 'O', 'M', 'S'],
      ['M', '#', 'R', '#', 'K'],
      ['#', 'P', 'E', 'N', 'S']
    ],
    across: [
      { number: 1, clue: 'Hope or desire (4)', answer: 'WISH', row: 0, col: 0 },
      { number: 3, clue: 'Spaces in a house (5)', answer: 'ROOMS', row: 2, col: 0 },
      { number: 5, clue: 'Writing instruments (4)', answer: 'PENS', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Cosy temperature (4)', answer: 'WARM', row: 0, col: 0 },
      { number: 2, clue: 'Shop or keep (5)', answer: 'STORE', row: 0, col: 2 },
      { number: 4, clue: 'Requests (4)', answer: 'ASKS', row: 1, col: 4 }
    ]
  },
  {
    // D1=TUBA: T,U,B,A  A1[0]=T  A3[0]=B
    // A1=TRUE: T,R,U,E  A1[2]=U  D2[0]=U
    // D2=UNDER: U,N,D,E,R  D2[2]=D  A3[2]=D  D2[4]=R  A5[1]=R
    // A3=B_D__: BADGE: B,A,D,G,E  A3[4]=E  D4[1]=E
    // D4=_E__: MESH: M,E,S,H  D4[3]=H  A5[3]=H
    // A5: _R_H  row4 cols1-4: not great...
    // D4=ZERO: Z,E,R,O  D4[3]=O  A5[3]=O
    // A5: _R_O  not great either.
    // D4=BEST: B,E,S,T  D4[3]=T  A5[3]=T
    // A5: _R_T  GRIT: G,R,I,T ✓
    // Grid:
    // T R U E #
    // U # N # B
    // B A D G E
    // A # E # S
    // # G R I T
    id: 'cross-006',
    title: 'True Grit',
    grid: [
      ['T', 'R', 'U', 'E', '#'],
      ['U', '#', 'N', '#', 'B'],
      ['B', 'A', 'D', 'G', 'E'],
      ['A', '#', 'E', '#', 'S'],
      ['#', 'G', 'R', 'I', 'T']
    ],
    across: [
      { number: 1, clue: 'Not false (4)', answer: 'TRUE', row: 0, col: 0 },
      { number: 3, clue: 'Name tag or pin (5)', answer: 'BADGE', row: 2, col: 0 },
      { number: 5, clue: 'Sand or determination (4)', answer: 'GRIT', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Big brass instrument (4)', answer: 'TUBA', row: 0, col: 0 },
      { number: 2, clue: 'Below or beneath (5)', answer: 'UNDER', row: 0, col: 2 },
      { number: 4, clue: 'Better than the rest (4)', answer: 'BEST', row: 1, col: 4 }
    ]
  },
  {
    // D1=CASH: C,A,S,H  A1[0]=C  A3[0]=S
    // A1=CLAP: C,L,A,P  A1[2]=A  D2[0]=A
    // D2=AISLE: A,I,S,L,E  D2[2]=S  A3[2]=S  D2[4]=E  A5[1]=E
    // A3=S_S__: no good 5-letter words with S_S...
    // Let me try D2=ARISE: A,R,I,S,E  D2[2]=I  A3[2]=I  D2[4]=E  A5[1]=E
    // A3=S_I__: SHINE: S,H,I,N,E  A3[4]=E  D4[1]=E
    // D4=_E__: LEND: L,E,N,D  D4[3]=D  A5[3]=D
    // A5: _E_D: HERD, BEND, FEED, SEED, WEED, NEED, REED, LEND, SEND
    // SEED: S,E,E,D ✓
    // Grid:
    // C L A P #
    // A # R # L
    // S H I N E
    // H # S # N
    // # S E E D
    id: 'cross-007',
    title: 'Garden Patch',
    grid: [
      ['C', 'L', 'A', 'P', '#'],
      ['A', '#', 'R', '#', 'L'],
      ['S', 'H', 'I', 'N', 'E'],
      ['H', '#', 'S', '#', 'N'],
      ['#', 'S', 'E', 'E', 'D']
    ],
    across: [
      { number: 1, clue: 'Sound of applause (4)', answer: 'CLAP', row: 0, col: 0 },
      { number: 3, clue: 'Bright glow (5)', answer: 'SHINE', row: 2, col: 0 },
      { number: 5, clue: 'Plant this to grow flowers (4)', answer: 'SEED', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Money (4)', answer: 'CASH', row: 0, col: 0 },
      { number: 2, clue: 'Get up early (5)', answer: 'ARISE', row: 0, col: 2 },
      { number: 4, clue: 'Borrow from a friend (4)', answer: 'LEND', row: 1, col: 4 }
    ]
  },
  {
    // D1=BLOB: B,L,O,B  A1[0]=B  A3[0]=O
    // A1=BARK: B,A,R,K  A1[2]=R  D2[0]=R
    // D2=RIDER: R,I,D,E,R  D2[2]=D  A3[2]=D  D2[4]=R  A5[1]=R
    // A3=O_D__: ORDER: O,R,D,E,R  A3[4]=R  D4[1]=R
    // D4=_R__: CREW: C,R,E,W  D4[3]=W  A5[3]=W
    // A5: _R_W: BREW: B,R,E,W ✓ or CROW: C,R,O,W ✓ or GREW: G,R,E,W ✓ or DRAW: D,R,A,W ✓
    // BREW: B,R,E,W ✓
    // Grid:
    // B A R K #
    // L # I # C
    // O R D E R
    // B # E # E
    // # B R E W
    id: 'cross-008',
    title: 'Morning Cuppa',
    grid: [
      ['B', 'A', 'R', 'K', '#'],
      ['L', '#', 'I', '#', 'C'],
      ['O', 'R', 'D', 'E', 'R'],
      ['B', '#', 'E', '#', 'E'],
      ['#', 'B', 'R', 'E', 'W']
    ],
    across: [
      { number: 1, clue: 'Sound a dog makes (4)', answer: 'BARK', row: 0, col: 0 },
      { number: 3, clue: 'Arrangement or command (5)', answer: 'ORDER', row: 2, col: 0 },
      { number: 5, clue: 'Make a pot of tea (4)', answer: 'BREW', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Shapeless spot (4)', answer: 'BLOB', row: 0, col: 0 },
      { number: 2, clue: 'Horse or bike user (5)', answer: 'RIDER', row: 0, col: 2 },
      { number: 4, clue: 'Ship team (4)', answer: 'CREW', row: 1, col: 4 }
    ]
  },
  {
    // D1=PALE: P,A,L,E  A1[0]=P  A3[0]=L
    // A1=PLOD: P,L,O,D  A1[2]=O  D2[0]=O
    // D2=OLIVE: O,L,I,V,E  D2[2]=I  A3[2]=I  D2[4]=E  A5[1]=E
    // A3=L_I__: LIVER: L,I,I... no. LIKEN: L,I,K... no A3[2] must be I.
    // Wait A3[0]=L, A3[2]=I -> L_I__
    // LINKS: L,I,N,K,S  no A3[2] = N not I. Hmm I need A3[2]=I.
    // So L,?,I,?,? -> LILAC? L,I,L,A,C  A3[2]=L not I.
    // L,_,I,_,_: Needs char at pos0=L pos2=I: LOGIC? no. Let me think...
    // LAIRS: L,A,I,R,S  A3[2]=I ✓ A3[4]=S  D4[1]=S
    // D4=_S__: USED: U,S,E,D  D4[3]=D  A5[3]=D
    // A5: _E_D: HELD: H,E,L,D ✓ or WELD: W,E,L,D ✓ or BEND: B,E,N,D ✓
    // HELD: H,E,L,D ✓
    // Grid:
    // P L O D #
    // A # L # U
    // L A I R S
    // E # V # E
    // # H E L D
    id: 'cross-009',
    title: 'Hold Tight',
    grid: [
      ['P', 'L', 'O', 'D', '#'],
      ['A', '#', 'L', '#', 'U'],
      ['L', 'A', 'I', 'R', 'S'],
      ['E', '#', 'V', '#', 'E'],
      ['#', 'H', 'E', 'L', 'D']
    ],
    across: [
      { number: 1, clue: 'Walk heavily (4)', answer: 'PLOD', row: 0, col: 0 },
      { number: 3, clue: 'Hideouts or dens (5)', answer: 'LAIRS', row: 2, col: 0 },
      { number: 5, clue: 'Kept in your hands (4)', answer: 'HELD', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Light in colour (4)', answer: 'PALE', row: 0, col: 0 },
      { number: 2, clue: 'Green salad fruit (5)', answer: 'OLIVE', row: 0, col: 2 },
      { number: 4, clue: 'Previously owned (4)', answer: 'USED', row: 1, col: 4 }
    ]
  },
  {
    // D1=DARE: D,A,R,E  A1[0]=D  A3[0]=R
    // A1=DUST: D,U,S,T  A1[2]=S  D2[0]=S
    // D2=SPORE: S,P,O,R,E  D2[2]=O  A3[2]=O  D2[4]=E  A5[1]=E
    // A3=R_O__: ROBIN: R,O... wait R_O means R,?,O,?,?
    // ROOST: R,O,O,S,T  A3[2]=O ✓  A3[4]=T  D4[1]=T
    // D4=_T__: ITEM: I,T,E,M  D4[3]=M  A5[3]=M
    // A5: _E_M: BEAM: B,E,A,M ✓ TEAM: T,E,A,M ✓ SEEM: S,E,E,M ✓ HELM: H,E,L,M ✓ TERM: T,E,R,M ✓
    // TEAM: T,E,A,M ✓
    // Grid:
    // D U S T #
    // A # P # I
    // R O O S T
    // E # R # E
    // # T E A M
    id: 'cross-010',
    title: 'Team Spirit',
    grid: [
      ['D', 'U', 'S', 'T', '#'],
      ['A', '#', 'P', '#', 'I'],
      ['R', 'O', 'O', 'S', 'T'],
      ['E', '#', 'R', '#', 'E'],
      ['#', 'T', 'E', 'A', 'M']
    ],
    across: [
      { number: 1, clue: 'What settles on shelves (4)', answer: 'DUST', row: 0, col: 0 },
      { number: 3, clue: 'Where birds rest (5)', answer: 'ROOST', row: 2, col: 0 },
      { number: 5, clue: 'Group working together (4)', answer: 'TEAM', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Challenge or be bold (4)', answer: 'DARE', row: 0, col: 0 },
      { number: 2, clue: 'Mushroom seeds (5)', answer: 'SPORE', row: 0, col: 2 },
      { number: 4, clue: 'Single thing (4)', answer: 'ITEM', row: 1, col: 4 }
    ]
  },
  {
    // D1=FOLK: F,O,L,K  A1[0]=F  A3[0]=L
    // A1=FERN: F,E,R,N  A1[2]=R  D2[0]=R
    // D2=ROUTE: R,O,U,T,E  D2[2]=U  A3[2]=U  D2[4]=E  A5[1]=E
    // A3=L_U__: LUNCH: L,U,N,C,H  wait A3[2]=U so L,?,U,?,?
    // LOUSE: L,O,U,S,E  A3[4]=E  D4[1]=E
    // D4=_E__: PERK: P,E,R,K  D4[3]=K  A5[3]=K
    // A5: _E_K: BEAK: B,E,A,K ✓ LEAK: L,E,A,K ✓ PEAK: P,E,A,K ✓ TEAK: T,E,A,K ✓ WEAK: W,E,A,K ✓ SEEK: S,E,E,K ✓ PEEK: P,E,E,K ✓ REEK: R,E,E,K ✓
    // PEAK: P,E,A,K ✓
    // Grid:
    // F E R N #
    // O # O # P
    // L O U S E
    // K # T # R
    // # P E A K
    id: 'cross-011',
    title: 'Mountain View',
    grid: [
      ['F', 'E', 'R', 'N', '#'],
      ['O', '#', 'O', '#', 'P'],
      ['L', 'O', 'U', 'S', 'E'],
      ['K', '#', 'T', '#', 'R'],
      ['#', 'P', 'E', 'A', 'K']
    ],
    across: [
      { number: 1, clue: 'Green woodland plant (4)', answer: 'FERN', row: 0, col: 0 },
      { number: 3, clue: 'Annoying little pest (5)', answer: 'LOUSE', row: 2, col: 0 },
      { number: 5, clue: 'Top of a mountain (4)', answer: 'PEAK', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Traditional people (4)', answer: 'FOLK', row: 0, col: 0 },
      { number: 2, clue: 'Path or journey (5)', answer: 'ROUTE', row: 0, col: 2 },
      { number: 4, clue: 'Benefit of the job (4)', answer: 'PERK', row: 1, col: 4 }
    ]
  },
  {
    // D1=DUSK: D,U,S,K  A1[0]=D  A3[0]=S
    // A1=DALE: D,A,L,E  A1[2]=L  D2[0]=L
    // D2=LATER: L,A,T,E,R  D2[2]=T  A3[2]=T  D2[4]=R  A5[1]=R
    // A3=S_T__: STOVE: S,T,O,V,E  wait A3[2]=T so S,?,T,?,?
    // STING: S,T,I,N,G  A3[2]=I not T.
    // Hmm. S,?,T,?,? : CATCH? no.
    // SATIN: S,A,T,I,N  A3[2]=T ✓ A3[4]=N  D4[1]=N
    // D4=_N__: INTO: I,N,T,O  D4[3]=O  A5[3]=O
    // A5: _R_O: row4 cols1-4  ZERO: Z,E,R,O ✓ but A5[1]=R not E. Wait A5[1]=D2[4]=R ✓, so col2=R.
    // Hmm. A5 = [col1, col2, col3, col4] = [?, R, ?, O]. So ?R?O.
    // Not many... TRIO? T,R,I,O ✓
    // Grid:
    // D A L E #
    // U # A # I
    // S A T I N
    // K # E # T
    // # T R I O
    id: 'cross-012',
    title: 'Evening Song',
    grid: [
      ['D', 'A', 'L', 'E', '#'],
      ['U', '#', 'A', '#', 'I'],
      ['S', 'A', 'T', 'I', 'N'],
      ['K', '#', 'E', '#', 'T'],
      ['#', 'T', 'R', 'I', 'O']
    ],
    across: [
      { number: 1, clue: 'Valley (4)', answer: 'DALE', row: 0, col: 0 },
      { number: 3, clue: 'Smooth shiny fabric (5)', answer: 'SATIN', row: 2, col: 0 },
      { number: 5, clue: 'Group of three musicians (4)', answer: 'TRIO', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Twilight time (4)', answer: 'DUSK', row: 0, col: 0 },
      { number: 2, clue: 'Not now, but soon (5)', answer: 'LATER', row: 0, col: 2 },
      { number: 4, clue: 'Going inside (4)', answer: 'INTO', row: 1, col: 4 }
    ]
  },
  {
    // D1=HAZE: H,A,Z,E  A1[0]=H  A3[0]=Z
    // Hmm Z is hard. Let me try different.
    // D1=HELP: H,E,L,P  A1[0]=H  A3[0]=L
    // A1=HOSE: H,O,S,E  A1[2]=S  D2[0]=S
    // D2=SWIRL: S,W,I,R,L  D2[2]=I  A3[2]=I  D2[4]=L  A5[1]=L
    // A3=L_I__: LIVEN: L,I,V,E,N  wait need A3[2]=I so L,?,I,?,?
    // LIMIT: L,I,M,I,T  A3[2]=M not I. No...
    // LIVED: L,I,V,E,D  A3[2]=V not I.
    // Hmm L,x,I,y,z: LYRIC: L,Y,R,I,C  A3[2]=R not I.
    // LOGIC: L,O,G,I,C  A3[2]=G not I.
    // This is hard. Let me try different D1.
    // D1=HIKE: H,I,K,E  A1[0]=H  A3[0]=K
    // K_I__: KNIFE: K,N,I,F,E  A3[2]=I ✓ A3[4]=E  D4[1]=E
    // A1=HOSE: still works. D2[0]=S
    // D2=SWINE: S,W,I,N,E  D2[2]=I  A3[2]=I ✓ D2[4]=E  A5[1]=E
    // KNIFE: K,N,I,F,E  A3[4]=E  D4[1]=E ✓
    // D4=_E__: DENY: D,E,N,Y  D4[3]=Y  A5[3]=Y
    // A5: _E_Y: LEVY: L,E,V,Y ✓ DENY: D,E,N,Y ✓ (but used already) VERY: V,E,R,Y ✓ RELY: R,E,L,Y ✓ SEXY? no.
    // LEVY: L,E,V,Y ✓
    // Grid:
    // H O S E #
    // I # W # D
    // K N I F E
    // E # N # N
    // # L E V Y
    id: 'cross-013',
    title: 'Sharp Edge',
    grid: [
      ['H', 'O', 'S', 'E', '#'],
      ['I', '#', 'W', '#', 'D'],
      ['K', 'N', 'I', 'F', 'E'],
      ['E', '#', 'N', '#', 'N'],
      ['#', 'L', 'E', 'V', 'Y']
    ],
    across: [
      { number: 1, clue: 'Garden water pipe (4)', answer: 'HOSE', row: 0, col: 0 },
      { number: 3, clue: 'Sharp kitchen tool (5)', answer: 'KNIFE', row: 2, col: 0 },
      { number: 5, clue: 'Tax or charge (4)', answer: 'LEVY', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Walk in the hills (4)', answer: 'HIKE', row: 0, col: 0 },
      { number: 2, clue: 'Pig family (5)', answer: 'SWINE', row: 0, col: 2 },
      { number: 4, clue: 'Refuse or reject (4)', answer: 'DENY', row: 1, col: 4 }
    ]
  },
  {
    // D1=CUBE: C,U,B,E  A1[0]=C  A3[0]=B
    // A1=CORK: C,O,R,K  A1[2]=R  D2[0]=R
    // D2=REIGN: R,E,I,G,N  D2[2]=I  A3[2]=I  D2[4]=N  A5[1]=N
    // A3=B_I__: BRIDE: B,R,I,D,E  A3[2]=I ✓ A3[4]=E  D4[1]=E
    // D4=_E__: FERN: F,E,R,N  D4[3]=N  A5[3]=N
    // A5: _N_N: row4 cols1-4 = ?,N,?,N. Not many... ANON? A,N,O,N ✓
    // Grid:
    // C O R K #
    // U # E # F
    // B R I D E
    // E # G # R
    // # A N O N
    id: 'cross-014',
    title: 'Mystery',
    grid: [
      ['C', 'O', 'R', 'K', '#'],
      ['U', '#', 'E', '#', 'F'],
      ['B', 'R', 'I', 'D', 'E'],
      ['E', '#', 'G', '#', 'R'],
      ['#', 'A', 'N', 'O', 'N']
    ],
    across: [
      { number: 1, clue: 'Bottle stopper (4)', answer: 'CORK', row: 0, col: 0 },
      { number: 3, clue: 'Wedding day woman (5)', answer: 'BRIDE', row: 2, col: 0 },
      { number: 5, clue: 'Soon or shortly (4)', answer: 'ANON', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Ice or sugar shape (4)', answer: 'CUBE', row: 0, col: 0 },
      { number: 2, clue: 'Rule as king or queen (5)', answer: 'REIGN', row: 0, col: 2 },
      { number: 4, clue: 'Green leafy plant (4)', answer: 'FERN', row: 1, col: 4 }
    ]
  },
  {
    // D1=VINE: V,I,N,E  A1[0]=V  A3[0]=N
    // A1=VASE: V,A,S,E  A1[2]=S  D2[0]=S
    // D2=SNORE: S,N,O,R,E  D2[2]=O  A3[2]=O  D2[4]=E  A5[1]=E
    // A3=N_O__: NOBLE: N,O,B,L,E  A3[2]=B not O. No.
    // N,?,O,?,? : NOOKY? no. NOISE: N,O,I,S,E  A3[2]=I not O.
    // Wait I need A3[0]=N and A3[2]=O. So N,_,O,_,_
    // NORTH: N,O,R,T,H  A3[2]=R not O.
    // Hmm not many. NODES: N,O,D,E,S  A3[2]=D not O.
    // Let me try D1=VIBE: V,I,B,E  A3[0]=B
    // A3=B,?,O,?,?: BORED: B,O,R,E,D  A3[2]=R not O.
    // BONES: B,O,N,E,S  A3[2]=N not O.
    // BOOZE: B,O,O,Z,E  A3[2]=O ✓ A3[4]=E  D4[1]=E
    // Grid would have BOOZE... let me try something else.
    // BROOK: B,R,O,O,K  A3[2]=O ✓ A3[4]=K  D4[1]=K
    // D4=_K__: SKIP? no _K__. SKIN: S,K,I,N  D4[3]=N  A5[3]=N
    // A5: _E_N: BEEN: B,E,E,N ✓ KEEN: K,E,E,N ✓ SEEN: S,E,E,N ✓ FERN: F,E,R,N ✓ JEAN: J,E,A,N ✓ BEAN: B,E,A,N ✓
    // KEEN: K,E,E,N ✓
    // Grid:
    // V A S E #
    // I # N # S
    // B R O O K
    // E # R # I
    // # K E E N
    id: 'cross-015',
    title: 'Babbling Brook',
    grid: [
      ['V', 'A', 'S', 'E', '#'],
      ['I', '#', 'N', '#', 'S'],
      ['B', 'R', 'O', 'O', 'K'],
      ['E', '#', 'R', '#', 'I'],
      ['#', 'K', 'E', 'E', 'N']
    ],
    across: [
      { number: 1, clue: 'Flower holder (4)', answer: 'VASE', row: 0, col: 0 },
      { number: 3, clue: 'Small stream (5)', answer: 'BROOK', row: 2, col: 0 },
      { number: 5, clue: 'Eager and enthusiastic (4)', answer: 'KEEN', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Feeling or atmosphere (4)', answer: 'VIBE', row: 0, col: 0 },
      { number: 2, clue: 'Loud sleep sounds (5)', answer: 'SNORE', row: 0, col: 2 },
      { number: 4, clue: 'Outer layer (4)', answer: 'SKIN', row: 1, col: 4 }
    ]
  },
  {
    // D1=MARK: M,A,R,K  A1[0]=M  A3[0]=R
    // A1=MARE: M,A,R,E  A1[2]=R  D2[0]=R
    // D2=RIDGE: R,I,D,G,E  D2[2]=D  A3[2]=D  D2[4]=E  A5[1]=E
    // A3=R_D__: RIDGE: already used. RADIO: R,A,D,I,O  A3[2]=D ✓ A3[4]=O  D4[1]=O
    // D4=_O__: PORT: P,O,R,T  D4[3]=T  A5[3]=T
    // A5: _E_T: BELT: B,E,L,T ✓ BEST: B,E,S,T ✓ DEFT: D,E,F,T ✓ FELT: F,E,L,T ✓ HEAT: H,E,A,T ✓ JEST: J,E,S,T ✓ LEFT: L,E,F,T ✓ MEET: M,E,E,T ✓ NEST: N,E,S,T ✓ REST: R,E,S,T ✓ SENT: S,E,N,T ✓ TEST: T,E,S,T ✓ VENT: V,E,N,T ✓ WEST: W,E,S,T ✓
    // NEST: N,E,S,T ✓
    // Grid:
    // M A R E #
    // A # I # P
    // R A D I O
    // K # G # R
    // # N E S T
    id: 'cross-016',
    title: 'Tune In',
    grid: [
      ['M', 'A', 'R', 'E', '#'],
      ['A', '#', 'I', '#', 'P'],
      ['R', 'A', 'D', 'I', 'O'],
      ['K', '#', 'G', '#', 'R'],
      ['#', 'N', 'E', 'S', 'T']
    ],
    across: [
      { number: 1, clue: 'Female horse (4)', answer: 'MARE', row: 0, col: 0 },
      { number: 3, clue: 'Wireless communication (5)', answer: 'RADIO', row: 2, col: 0 },
      { number: 5, clue: "Bird's home (4)", answer: 'NEST', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Sign or spot (4)', answer: 'MARK', row: 0, col: 0 },
      { number: 2, clue: 'Mountain top line (5)', answer: 'RIDGE', row: 0, col: 2 },
      { number: 4, clue: 'Harbour (4)', answer: 'PORT', row: 1, col: 4 }
    ]
  },
  {
    // D1=TOGA: T,O,G,A  A1[0]=T  A3[0]=G
    // A1=TRIM: T,R,I,M  A1[2]=I  D2[0]=I
    // D2=IVORY: I,V,O,R,Y  D2[2]=O  A3[2]=O  D2[4]=Y  A5[1]=Y
    // A3=G_O__: GROVE: G,R,O,V,E  A3[2]=O ✓ A3[4]=E  D4[1]=E
    // D4=_E__: LEVY: L,E,V,Y  D4[3]=Y  A5[3]=Y
    // A5: _Y_Y: not great. YYYY? no.
    // D4=MESH: M,E,S,H  D4[3]=H  A5[3]=H
    // A5: _Y_H: MYTH? M,Y,T,H ✓
    // Grid:
    // T R I M #
    // O # V # M
    // G R O V E
    // A # R # S
    // # M Y T H
    id: 'cross-017',
    title: 'Ancient Tales',
    grid: [
      ['T', 'R', 'I', 'M', '#'],
      ['O', '#', 'V', '#', 'M'],
      ['G', 'R', 'O', 'V', 'E'],
      ['A', '#', 'R', '#', 'S'],
      ['#', 'M', 'Y', 'T', 'H']
    ],
    across: [
      { number: 1, clue: 'Neat and tidy (4)', answer: 'TRIM', row: 0, col: 0 },
      { number: 3, clue: 'Small group of trees (5)', answer: 'GROVE', row: 2, col: 0 },
      { number: 5, clue: 'Legend or fairy tale (4)', answer: 'MYTH', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Roman garment (4)', answer: 'TOGA', row: 0, col: 0 },
      { number: 2, clue: 'Elephant tusk material (5)', answer: 'IVORY', row: 0, col: 2 },
      { number: 4, clue: 'Tangled or muddled (4)', answer: 'MESH', row: 1, col: 4 }
    ]
  },
  {
    // D1=LANE: L,A,N,E  A1[0]=L  A3[0]=N
    // A1=LOBE: L,O,B,E  A1[2]=B  D2[0]=B
    // D2=BASIC: B,A,S,I,C  D2[2]=S  A3[2]=S  D2[4]=C  A5[1]=C
    // A3=N_S__: NASTY: N,A,S,T,Y  A3[2]=S ✓ A3[4]=Y  D4[1]=Y
    // D4=_Y__: MYTH? no... Let me try. ?Y??: EYED? E,Y,E,D  D4[3]=D  A5[3]=D
    // A5: _C_D: ACID? A,C,I,D ✓
    // Grid:
    // L O B E #
    // A # A # E
    // N A S T Y
    // E # I # E
    // # A C I D
    id: 'cross-018',
    title: 'Science Lab',
    grid: [
      ['L', 'O', 'B', 'E', '#'],
      ['A', '#', 'A', '#', 'E'],
      ['N', 'A', 'S', 'T', 'Y'],
      ['E', '#', 'I', '#', 'E'],
      ['#', 'A', 'C', 'I', 'D']
    ],
    across: [
      { number: 1, clue: 'Ear part (4)', answer: 'LOBE', row: 0, col: 0 },
      { number: 3, clue: 'Unpleasant (5)', answer: 'NASTY', row: 2, col: 0 },
      { number: 5, clue: 'Sharp or sour substance (4)', answer: 'ACID', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Narrow road (4)', answer: 'LANE', row: 0, col: 0 },
      { number: 2, clue: 'Fundamental (5)', answer: 'BASIC', row: 0, col: 2 },
      { number: 4, clue: 'Watched closely (4)', answer: 'EYED', row: 1, col: 4 }
    ]
  },
  {
    // D1=JUMP: J,U,M,P  A1[0]=J  A3[0]=M
    // A1=JOKE: J,O,K,E  A1[2]=K  D2[0]=K
    // D2=KNELT: K,N,E,L,T  D2[2]=E  A3[2]=E  D2[4]=T  A5[1]=T
    // A3=M_E__: MEDAL: M,E,D,A,L  A3[2]=D not E.
    // M,?,E,?,?: MELON: M,E,L,O,N  A3[2]=L not E.
    // MEETS: M,E,E,T,S  A3[2]=E ✓ A3[4]=S  D4[1]=S
    // D4=_S__: USED? no U,S,E,D.  Actually _S__ at col4 rows1-4.
    // row1col4 = D4[0], row2col4 = D4[1] = S, etc.
    // D4: ASKS: A,S,K,S  D4[3]=S  A5[3]=S
    // A5: _T_S: ANTS? no, CATS? no. Hmm ?T?S.
    // EATS? no that's E,A,T,S. Wait A5 = row4 cols1-4.
    // A5[0]=col1, A5[1]=col2=T, A5[2]=col3, A5[3]=col4=S
    // So ?T?S: ATMS? no. ITEMS? too long.
    // OATS: O,A,T,S  wait that's col1=O col2=A col3=T col4=S. But A5[1]=T not A.
    // I need col2=T (=D2[4]=T). So A5 = [col1, T, col3, S]
    // ?T?S: STDS? no. Hmm. Let me try different D2.
    // D2=KNEEL: K,N,E,E,L  D2[2]=E  A3[2]=E ✓  D2[4]=L  A5[1]=L
    // A5: ?L?S: ALPS: A,L,P,S ✓  (if D4[3]=S)
    // D4=_S__: hmm need A3[4]=S so MEETS has S at end.  D4[1]=S
    // D4: ASKS: A,S,K,S  D4[3]=S  A5[3]=S ✓
    // A5: ALPS: A,L,P,S  A5[1]=L ✓ A5[3]=S ✓
    // Grid:
    // J O K E #
    // U # N # A
    // M E E T S
    // P # E # K
    // # A L P S
    id: 'cross-019',
    title: 'Mountain Walk',
    grid: [
      ['J', 'O', 'K', 'E', '#'],
      ['U', '#', 'N', '#', 'A'],
      ['M', 'E', 'E', 'T', 'S'],
      ['P', '#', 'E', '#', 'K'],
      ['#', 'A', 'L', 'P', 'S']
    ],
    across: [
      { number: 1, clue: 'Funny story (4)', answer: 'JOKE', row: 0, col: 0 },
      { number: 3, clue: 'Gathers together (5)', answer: 'MEETS', row: 2, col: 0 },
      { number: 5, clue: 'European mountain range (4)', answer: 'ALPS', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Leap in the air (4)', answer: 'JUMP', row: 0, col: 0 },
      { number: 2, clue: 'Got down on one knee (5)', answer: 'KNEEL', row: 0, col: 2 },
      { number: 4, clue: 'Inquiries (4)', answer: 'ASKS', row: 1, col: 4 }
    ]
  },
  {
    // D1=TOAD: T,O,A,D  A1[0]=T  A3[0]=A
    // A1=TAPE: T,A,P,E  A1[2]=P  D2[0]=P
    // D2=PRIZE: P,R,I,Z,E  D2[2]=I  A3[2]=I  D2[4]=E  A5[1]=E
    // A3=A_I__: ARISE: A,R,I,S,E  A3[2]=I ✓ A3[4]=E  D4[1]=E
    // D4=_E__: HELP: H,E,L,P  D4[3]=P  A5[3]=P
    // A5: _E_P: DEEP: D,E,E,P ✓ HELP: H,E,L,P ✓ KEEP: K,E,E,P ✓ JEEP: J,E,E,P ✓ PEEP? starts P. REAP: R,E,A,P ✓ SEEP: S,E,E,P ✓ WEEP: W,E,E,P ✓
    // DEEP: D,E,E,P ✓
    // Grid:
    // T A P E #
    // O # R # H
    // A R I S E
    // D # Z # L
    // # D E E P
    id: 'cross-020',
    title: 'Deep Down',
    grid: [
      ['T', 'A', 'P', 'E', '#'],
      ['O', '#', 'R', '#', 'H'],
      ['A', 'R', 'I', 'S', 'E'],
      ['D', '#', 'Z', '#', 'L'],
      ['#', 'D', 'E', 'E', 'P']
    ],
    across: [
      { number: 1, clue: 'Sticky strip (4)', answer: 'TAPE', row: 0, col: 0 },
      { number: 3, clue: 'Wake up and get up (5)', answer: 'ARISE', row: 2, col: 0 },
      { number: 5, clue: 'Very far down (4)', answer: 'DEEP', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Warty amphibian (4)', answer: 'TOAD', row: 0, col: 0 },
      { number: 2, clue: 'Award or reward (5)', answer: 'PRIZE', row: 0, col: 2 },
      { number: 4, clue: 'Assistance (4)', answer: 'HELP', row: 1, col: 4 }
    ]
  },
];

/**
 * Get a crossword that hasn't been completed recently
 */
export function getRandomCrossword(completedIds = []) {
  const available = MINI_CROSSWORDS.filter(c => !completedIds.includes(c.id));
  if (available.length === 0) {
    // All done - start over with a random one
    return MINI_CROSSWORDS[Math.floor(Math.random() * MINI_CROSSWORDS.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

/**
 * Check if a word answer is correct
 */
export function checkWord(crossword, direction, number, answer) {
  const clues = direction === 'across' ? crossword.across : crossword.down;
  const clue = clues.find(c => c.number === number);
  if (!clue) return false;
  return answer.toUpperCase() === clue.answer;
}

/**
 * Check if entire crossword is complete
 */
export function isCrosswordComplete(crossword, answers) {
  // answers is an object like { 'across-1': 'SOFA', 'down-2': 'FIRE', ... }
  for (const clue of crossword.across) {
    if (answers[`across-${clue.number}`]?.toUpperCase() !== clue.answer) {
      return false;
    }
  }
  for (const clue of crossword.down) {
    if (answers[`down-${clue.number}`]?.toUpperCase() !== clue.answer) {
      return false;
    }
  }
  return true;
}
