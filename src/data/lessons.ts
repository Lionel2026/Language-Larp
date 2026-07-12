import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // --- Spanish ---
  {
    id: "lesson-es-1-1",
    unitId: "unit-es-1",
    languageCode: "es",
    order: 1,
    title: "Greetings",
    description: "Say hello, introduce yourself, and be polite.",
    type: "vocabulary",
    xpReward: 10,
    goals: [
      "Greet someone in Spanish",
      "Introduce yourself",
      "Say please and thank you",
    ],
    vocabulary: [
      { id: "es-vocab-hola", term: "hola", translation: "hello" },
      {
        id: "es-vocab-buenos-dias",
        term: "buenos días",
        translation: "good morning",
      },
      { id: "es-vocab-adios", term: "adiós", translation: "goodbye" },
      {
        id: "es-vocab-por-favor",
        term: "por favor",
        translation: "please",
      },
      { id: "es-vocab-gracias", term: "gracias", translation: "thank you" },
    ],
    phrases: [
      {
        id: "es-phrase-name",
        phrase: "¿Cómo te llamas?",
        translation: "What is your name?",
        context: "Asking someone's name in a casual setting.",
      },
      {
        id: "es-phrase-my-name",
        phrase: "Me llamo Ana.",
        translation: "My name is Ana.",
        context: "Introducing yourself.",
      },
    ],
    activities: [
      {
        id: "es-1-1-a1",
        type: "multiple_choice",
        question: "What does 'hola' mean?",
        options: ["goodbye", "hello", "thank you", "please"],
        correctOptionIndex: 1,
      },
      {
        id: "es-1-1-a2",
        type: "translate",
        prompt: "Translate: thank you",
        correctAnswer: "gracias",
      },
      {
        id: "es-1-1-a3",
        type: "listen",
        audioText: "buenos días",
        correctAnswer: "good morning",
        options: ["good morning", "good night", "see you later"],
      },
      {
        id: "es-1-1-a4",
        type: "match",
        pairs: [
          { term: "hola", translation: "hello" },
          { term: "adiós", translation: "goodbye" },
          { term: "gracias", translation: "thank you" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Sofia, a warm and encouraging Spanish teacher for absolute beginners. Keep sentences short, speak slowly, and celebrate small wins. Focus this lesson on greetings and introductions.",
      openingLine: "¡Hola! Soy Sofia. ¿Cómo te llamas?",
      vocabularyFocus: ["hola", "buenos días", "adiós", "por favor", "gracias"],
      phraseFocus: ["¿Cómo te llamas?", "Me llamo Ana."],
      conversationGoals: [
        "Have the student greet you back",
        "Have the student say their name",
        "Have the student say thank you at least once",
      ],
    },
  },
  {
    id: "lesson-es-1-2",
    unitId: "unit-es-1",
    languageCode: "es",
    order: 2,
    title: "Numbers & Age",
    description: "Count from one to five and talk about age.",
    type: "vocabulary",
    xpReward: 10,
    goals: ["Count from 1 to 5", "Ask and answer about age"],
    vocabulary: [
      { id: "es-vocab-uno", term: "uno", translation: "one" },
      { id: "es-vocab-dos", term: "dos", translation: "two" },
      { id: "es-vocab-tres", term: "tres", translation: "three" },
      { id: "es-vocab-cuatro", term: "cuatro", translation: "four" },
      { id: "es-vocab-cinco", term: "cinco", translation: "five" },
    ],
    phrases: [
      {
        id: "es-phrase-age",
        phrase: "¿Cuántos años tienes?",
        translation: "How old are you?",
        context: "Asking someone's age.",
      },
      {
        id: "es-phrase-my-age",
        phrase: "Tengo veinte años.",
        translation: "I am twenty years old.",
        context: "Answering with your age.",
      },
    ],
    activities: [
      {
        id: "es-1-2-a1",
        type: "multiple_choice",
        question: "What does 'tres' mean?",
        options: ["two", "three", "four", "five"],
        correctOptionIndex: 1,
      },
      {
        id: "es-1-2-a2",
        type: "translate",
        prompt: "Translate: five",
        correctAnswer: "cinco",
      },
      {
        id: "es-1-2-a3",
        type: "listen",
        audioText: "¿Cuántos años tienes?",
        correctAnswer: "How old are you?",
        options: ["What is your name?", "How old are you?", "Where are you from?"],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Sofia, a warm and encouraging Spanish teacher. Focus this lesson on numbers one through five and asking about age. Keep the pace slow and repeat new words often.",
      openingLine: "¡Vamos a contar! Uno, dos, tres...",
      vocabularyFocus: ["uno", "dos", "tres", "cuatro", "cinco"],
      phraseFocus: ["¿Cuántos años tienes?", "Tengo veinte años."],
      conversationGoals: [
        "Have the student count to five out loud",
        "Have the student answer how old they are",
      ],
    },
  },

  // --- French ---
  {
    id: "lesson-fr-1-1",
    unitId: "unit-fr-1",
    languageCode: "fr",
    order: 1,
    title: "Greetings",
    description: "Say hello, introduce yourself, and be polite.",
    type: "vocabulary",
    xpReward: 10,
    goals: [
      "Greet someone in French",
      "Introduce yourself",
      "Say please and thank you",
    ],
    vocabulary: [
      { id: "fr-vocab-bonjour", term: "bonjour", translation: "hello" },
      {
        id: "fr-vocab-bonsoir",
        term: "bonsoir",
        translation: "good evening",
      },
      { id: "fr-vocab-au-revoir", term: "au revoir", translation: "goodbye" },
      {
        id: "fr-vocab-sil-vous-plait",
        term: "s'il vous plaît",
        translation: "please",
      },
      { id: "fr-vocab-merci", term: "merci", translation: "thank you" },
    ],
    phrases: [
      {
        id: "fr-phrase-name",
        phrase: "Comment tu t'appelles ?",
        translation: "What is your name?",
        context: "Asking someone's name in a casual setting.",
      },
      {
        id: "fr-phrase-my-name",
        phrase: "Je m'appelle Marie.",
        translation: "My name is Marie.",
        context: "Introducing yourself.",
      },
    ],
    activities: [
      {
        id: "fr-1-1-a1",
        type: "multiple_choice",
        question: "What does 'bonjour' mean?",
        options: ["goodbye", "hello", "thank you", "please"],
        correctOptionIndex: 1,
      },
      {
        id: "fr-1-1-a2",
        type: "translate",
        prompt: "Translate: thank you",
        correctAnswer: "merci",
      },
      {
        id: "fr-1-1-a3",
        type: "listen",
        audioText: "au revoir",
        correctAnswer: "goodbye",
        options: ["goodbye", "good evening", "please"],
      },
      {
        id: "fr-1-1-a4",
        type: "match",
        pairs: [
          { term: "bonjour", translation: "hello" },
          { term: "au revoir", translation: "goodbye" },
          { term: "merci", translation: "thank you" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Luc, a patient and playful French teacher for absolute beginners. Keep sentences short, speak clearly, and exaggerate pronunciation. Focus this lesson on greetings and introductions.",
      openingLine: "Bonjour ! Je m'appelle Luc. Comment tu t'appelles ?",
      vocabularyFocus: [
        "bonjour",
        "bonsoir",
        "au revoir",
        "s'il vous plaît",
        "merci",
      ],
      phraseFocus: ["Comment tu t'appelles ?", "Je m'appelle Marie."],
      conversationGoals: [
        "Have the student greet you back",
        "Have the student say their name",
        "Have the student say thank you at least once",
      ],
    },
  },
  {
    id: "lesson-fr-1-2",
    unitId: "unit-fr-1",
    languageCode: "fr",
    order: 2,
    title: "Numbers & Age",
    description: "Count from one to five and talk about age.",
    type: "vocabulary",
    xpReward: 10,
    goals: ["Count from 1 to 5", "Ask and answer about age"],
    vocabulary: [
      { id: "fr-vocab-un", term: "un", translation: "one" },
      { id: "fr-vocab-deux", term: "deux", translation: "two" },
      { id: "fr-vocab-trois", term: "trois", translation: "three" },
      { id: "fr-vocab-quatre", term: "quatre", translation: "four" },
      { id: "fr-vocab-cinq", term: "cinq", translation: "five" },
    ],
    phrases: [
      {
        id: "fr-phrase-age",
        phrase: "Quel âge as-tu ?",
        translation: "How old are you?",
        context: "Asking someone's age.",
      },
      {
        id: "fr-phrase-my-age",
        phrase: "J'ai vingt ans.",
        translation: "I am twenty years old.",
        context: "Answering with your age.",
      },
    ],
    activities: [
      {
        id: "fr-1-2-a1",
        type: "multiple_choice",
        question: "What does 'trois' mean?",
        options: ["two", "three", "four", "five"],
        correctOptionIndex: 1,
      },
      {
        id: "fr-1-2-a2",
        type: "translate",
        prompt: "Translate: five",
        correctAnswer: "cinq",
      },
      {
        id: "fr-1-2-a3",
        type: "listen",
        audioText: "Quel âge as-tu ?",
        correctAnswer: "How old are you?",
        options: ["What is your name?", "How old are you?", "Where are you from?"],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Luc, a patient and playful French teacher. Focus this lesson on numbers one through five and asking about age. Keep the pace slow and repeat new words often.",
      openingLine: "On compte ensemble ? Un, deux, trois...",
      vocabularyFocus: ["un", "deux", "trois", "quatre", "cinq"],
      phraseFocus: ["Quel âge as-tu ?", "J'ai vingt ans."],
      conversationGoals: [
        "Have the student count to five out loud",
        "Have the student answer how old they are",
      ],
    },
  },

  // --- Japanese ---
  {
    id: "lesson-ja-1-1",
    unitId: "unit-ja-1",
    languageCode: "ja",
    order: 1,
    title: "Greetings",
    description: "Say hello, introduce yourself, and be polite.",
    type: "vocabulary",
    xpReward: 10,
    goals: [
      "Greet someone in Japanese",
      "Introduce yourself",
      "Say please and thank you",
    ],
    vocabulary: [
      {
        id: "ja-vocab-konnichiwa",
        term: "こんにちは",
        translation: "hello",
        transliteration: "konnichiwa",
      },
      {
        id: "ja-vocab-ohayou",
        term: "おはよう",
        translation: "good morning",
        transliteration: "ohayou",
      },
      {
        id: "ja-vocab-sayounara",
        term: "さようなら",
        translation: "goodbye",
        transliteration: "sayounara",
      },
      {
        id: "ja-vocab-onegaishimasu",
        term: "お願いします",
        translation: "please",
        transliteration: "onegaishimasu",
      },
      {
        id: "ja-vocab-arigatou",
        term: "ありがとう",
        translation: "thank you",
        transliteration: "arigatou",
      },
    ],
    phrases: [
      {
        id: "ja-phrase-name",
        phrase: "お名前は何ですか？",
        translation: "What is your name?",
        transliteration: "Onamae wa nan desu ka?",
        context: "Asking someone's name politely.",
      },
      {
        id: "ja-phrase-my-name",
        phrase: "私の名前はアオイです。",
        translation: "My name is Aoi.",
        transliteration: "Watashi no namae wa Aoi desu.",
        context: "Introducing yourself.",
      },
    ],
    activities: [
      {
        id: "ja-1-1-a1",
        type: "multiple_choice",
        question: "What does 'こんにちは (konnichiwa)' mean?",
        options: ["goodbye", "hello", "thank you", "please"],
        correctOptionIndex: 1,
      },
      {
        id: "ja-1-1-a2",
        type: "translate",
        prompt: "Translate: thank you",
        correctAnswer: "ありがとう",
        acceptableAnswers: ["arigatou"],
      },
      {
        id: "ja-1-1-a3",
        type: "listen",
        audioText: "さようなら",
        correctAnswer: "goodbye",
        options: ["hello", "goodbye", "please"],
      },
      {
        id: "ja-1-1-a4",
        type: "match",
        pairs: [
          { term: "こんにちは", translation: "hello" },
          { term: "さようなら", translation: "goodbye" },
          { term: "ありがとう", translation: "thank you" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Aoi, a cheerful and precise Japanese teacher for absolute beginners. Speak softly, break new words into syllables, and give gentle corrections. Focus this lesson on greetings and introductions.",
      openingLine: "こんにちは！アオイです。お名前は何ですか？",
      vocabularyFocus: [
        "こんにちは",
        "おはよう",
        "さようなら",
        "お願いします",
        "ありがとう",
      ],
      phraseFocus: ["お名前は何ですか？", "私の名前はアオイです。"],
      conversationGoals: [
        "Have the student greet you back",
        "Have the student say their name",
        "Have the student say thank you at least once",
      ],
    },
  },
  {
    id: "lesson-ja-1-2",
    unitId: "unit-ja-1",
    languageCode: "ja",
    order: 2,
    title: "Numbers & Age",
    description: "Count from one to five and talk about age.",
    type: "vocabulary",
    xpReward: 10,
    goals: ["Count from 1 to 5", "Ask and answer about age"],
    vocabulary: [
      {
        id: "ja-vocab-ichi",
        term: "一",
        translation: "one",
        transliteration: "ichi",
      },
      {
        id: "ja-vocab-ni",
        term: "二",
        translation: "two",
        transliteration: "ni",
      },
      {
        id: "ja-vocab-san",
        term: "三",
        translation: "three",
        transliteration: "san",
      },
      {
        id: "ja-vocab-yon",
        term: "四",
        translation: "four",
        transliteration: "yon",
      },
      {
        id: "ja-vocab-go",
        term: "五",
        translation: "five",
        transliteration: "go",
      },
    ],
    phrases: [
      {
        id: "ja-phrase-age",
        phrase: "何歳ですか？",
        translation: "How old are you?",
        transliteration: "Nansai desu ka?",
        context: "Asking someone's age politely.",
      },
      {
        id: "ja-phrase-my-age",
        phrase: "二十歳です。",
        translation: "I am twenty years old.",
        transliteration: "Hatachi desu.",
        context: "Answering with your age.",
      },
    ],
    activities: [
      {
        id: "ja-1-2-a1",
        type: "multiple_choice",
        question: "What does '三 (san)' mean?",
        options: ["two", "three", "four", "five"],
        correctOptionIndex: 1,
      },
      {
        id: "ja-1-2-a2",
        type: "translate",
        prompt: "Translate: five",
        correctAnswer: "五",
        acceptableAnswers: ["go"],
      },
      {
        id: "ja-1-2-a3",
        type: "listen",
        audioText: "何歳ですか？",
        correctAnswer: "How old are you?",
        options: ["What is your name?", "How old are you?", "Where are you from?"],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Aoi, a cheerful and precise Japanese teacher. Focus this lesson on numbers one through five and asking about age. Break numbers into syllables and repeat often.",
      openingLine: "数えてみましょう！一、二、三...",
      vocabularyFocus: ["一", "二", "三", "四", "五"],
      phraseFocus: ["何歳ですか？", "二十歳です。"],
      conversationGoals: [
        "Have the student count to five out loud",
        "Have the student answer how old they are",
      ],
    },
  },
];

export function getLessonsForUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === lessonId);
}
