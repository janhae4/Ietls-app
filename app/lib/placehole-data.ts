import { ReadingTest } from "./type";

export const readingTests: ReadingTest[] = [
  {
    id: 'test-1',
    title: 'IELTS Academic Reading Test 1',
    description: 'Practice test focusing on environmental science and technology',
    timeLimit: 60,
    totalQuestions: 40,
    passages: [
      {
        id: 'passage-1',
        title: 'The Impact of Climate Change on Marine Ecosystems',
        difficulty: 'medium',
        category: 'academic',
        topic: 'Environment',
        readingTime: 20,
        wordCount: 850,
        content: `Climate change is having profound effects on marine ecosystems worldwide. Rising sea temperatures, ocean acidification, and changing weather patterns are disrupting the delicate balance that has existed for millennia.

The warming of ocean waters has led to coral bleaching events of unprecedented scale. The Great Barrier Reef, one of the world's most diverse marine ecosystems, has experienced multiple bleaching events in recent years. When water temperatures rise above normal levels, corals expel the symbiotic algae living in their tissues, causing them to turn white or "bleach." While corals can recover from mild bleaching, severe or repeated bleaching events can lead to coral death.

Ocean acidification, often called the "other CO2 problem," occurs when the ocean absorbs carbon dioxide from the atmosphere. This process makes seawater more acidic, which can dissolve the shells and skeletons of marine organisms such as shellfish, sea urchins, and corals. The increased acidity also affects the ability of these organisms to build and maintain their protective structures.

Marine species are responding to these changes by altering their distribution patterns. Many fish species are moving toward cooler waters at higher latitudes. This migration affects local fishing industries and can disrupt established food webs. Some species may not be able to adapt quickly enough to survive in their changing environment.

Scientists are working to develop strategies to help marine ecosystems adapt to climate change. These include creating marine protected areas, reducing other stressors such as pollution and overfishing, and developing coral restoration techniques. However, the most effective approach is to address the root cause by reducing greenhouse gas emissions globally.`,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What is the main cause of coral bleaching according to the passage?',
            options: [
              'Ocean acidification',
              'Rising sea temperatures',
              'Pollution',
              'Overfishing'
            ],
            correctAnswer: 'Rising sea temperatures',
            explanation: 'The passage states that "When water temperatures rise above normal levels, corals expel the symbiotic algae living in their tissues, causing them to turn white or bleach."',
            keywords: ['coral bleaching', 'sea temperatures', 'symbiotic algae']
          },
          {
            id: 'q2',
            type: 'true-false-not-given',
            question: 'Ocean acidification is caused by the ocean absorbing carbon dioxide from the atmosphere.',
            correctAnswer: 'True',
            explanation: 'The passage clearly states that "Ocean acidification... occurs when the ocean absorbs carbon dioxide from the atmosphere."',
            keywords: ['ocean acidification', 'carbon dioxide', 'atmosphere']
          },
          {
            id: 'q3',
            type: 'fill-in-blanks',
            question: 'Marine species are responding to climate change by altering their _______ patterns, with many fish species moving toward _______ waters.',
            correctAnswer: ['distribution', 'cooler'],
            explanation: 'The passage mentions that marine species are "altering their distribution patterns" and "many fish species are moving toward cooler waters."',
            keywords: ['distribution patterns', 'cooler waters', 'migration']
          }
        ]
      },
      {
        id: 'passage-2',
        title: 'The Evolution of Artificial Intelligence',
        difficulty: 'hard',
        category: 'academic',
        topic: 'Technology',
        readingTime: 20,
        wordCount: 920,
        content: `Artificial Intelligence (AI) has evolved from a theoretical concept to a transformative technology that influences virtually every aspect of modern life. The journey began in the 1950s when computer scientists first began exploring the possibility of creating machines that could simulate human intelligence.

The early pioneers of AI, including Alan Turing and John McCarthy, laid the groundwork for what would become one of the most significant technological developments of the 21st century. Turing's famous test, proposed in 1950, suggested that a machine could be considered intelligent if it could engage in conversations indistinguishable from those of a human.

The development of AI has occurred in waves, with periods of rapid advancement followed by "AI winters" when progress stagnated due to technological limitations and reduced funding. The first AI winter occurred in the 1970s when the initial optimism about AI capabilities proved premature. Researchers had underestimated the complexity of human intelligence and the computational power required to replicate it.

The resurgence of AI in the 1980s was driven by expert systems, which attempted to capture human expertise in specific domains. However, these systems were limited by their narrow focus and inability to learn from experience. The second AI winter began in the late 1980s and lasted until the mid-1990s.

The current AI renaissance began in the 2000s, fueled by three key factors: the availability of vast amounts of data, increased computational power, and advances in machine learning algorithms, particularly deep learning. Deep learning, based on artificial neural networks, has enabled machines to recognize patterns in data with unprecedented accuracy.

Today's AI systems can perform tasks that were once thought to be exclusively human, such as recognizing images, understanding natural language, and even creating art. Machine learning algorithms can analyze massive datasets to identify trends and make predictions, leading to applications in healthcare, finance, transportation, and entertainment.

However, the rapid advancement of AI also raises important ethical questions. Concerns about job displacement, privacy, bias in algorithmic decision-making, and the potential for autonomous weapons have sparked debates about the need for AI governance and regulation.

Looking forward, researchers are working on developing artificial general intelligence (AGI) - AI systems that can match or exceed human intelligence across all domains. While AGI remains a distant goal, the continued evolution of AI promises to bring both unprecedented opportunities and challenges for society.`,
        questions: [
          {
            id: 'q4',
            type: 'matching-headings',
            question: 'Match the following headings to the appropriate paragraphs:',
            options: [
              'The birth of AI concepts',
              'Modern AI capabilities',
              'Factors driving AI renaissance',
              'Ethical concerns about AI',
              'Periods of stagnation'
            ],
            correctAnswer: ['The birth of AI concepts', 'Periods of stagnation', 'Factors driving AI renaissance', 'Modern AI capabilities', 'Ethical concerns about AI'],
            explanation: 'Each heading corresponds to the main theme of its respective paragraph in the passage.'
          },
          {
            id: 'q5',
            type: 'short-answer',
            question: 'What are the three key factors that fueled the current AI renaissance? (Write NO MORE THAN FOUR WORDS for each factor)',
            correctAnswer: ['vast amounts data', 'increased computational power', 'machine learning advances'],
            explanation: 'The passage mentions "three key factors: the availability of vast amounts of data, increased computational power, and advances in machine learning algorithms."',
            keywords: ['three key factors', 'data', 'computational power', 'machine learning']
          }
        ]
      },
      {
        id: 'passage-3',
        title: 'The Psychology of Decision Making',
        difficulty: 'medium',
        category: 'academic',
        topic: 'Psychology',
        readingTime: 20,
        wordCount: 780,
        content: `Human decision-making is a complex process that involves both rational analysis and emotional influences. Understanding how people make decisions has become increasingly important in fields ranging from economics to marketing, and from public policy to personal development.

Traditional economic theory assumed that people make decisions rationally, weighing all available options and choosing the one that maximizes their benefit. This model, known as rational choice theory, suggests that individuals have perfect information and unlimited cognitive resources to process that information.

However, research in behavioral psychology has revealed that human decision-making often deviates from this rational model. Cognitive biases, mental shortcuts called heuristics, and emotional factors all play significant roles in how we make choices.

One of the most influential concepts in decision-making research is the idea of bounded rationality, proposed by Herbert Simon. This theory suggests that people make decisions within the constraints of limited information, time, and cognitive capacity. Instead of finding the optimal solution, people often settle for a solution that is "good enough" - a process Simon called "satisficing."

Cognitive biases are systematic errors in thinking that affect our decisions. For example, the availability heuristic leads people to overestimate the likelihood of events that are easily recalled, often because they are recent or emotionally significant. The confirmation bias causes people to seek information that confirms their existing beliefs while ignoring contradictory evidence.

Emotions also play a crucial role in decision-making. Research has shown that people with damage to emotional centers of the brain often struggle to make even simple decisions, despite having intact logical reasoning abilities. This suggests that emotions are not just obstacles to rational decision-making but are actually essential components of the decision-making process.

The framing effect demonstrates how the way information is presented can influence decisions. People may make different choices when the same information is presented as a potential gain versus a potential loss, even when the outcomes are mathematically equivalent.

Understanding these psychological factors has practical applications. Marketers use knowledge of cognitive biases to influence consumer behavior. Policymakers design "nudges" that guide people toward beneficial choices without restricting their freedom. Individuals can improve their decision-making by becoming aware of their own biases and developing strategies to counteract them.`,
        questions: [
          {
            id: 'q6',
            type: 'true-false-not-given',
            question: 'Herbert Simon believed that people always try to find the optimal solution to problems.',
            correctAnswer: 'False',
            explanation: 'The passage states that Simon\'s bounded rationality theory suggests people "often settle for a solution that is \'good enough\'" rather than finding the optimal solution.',
            keywords: ['Herbert Simon', 'bounded rationality', 'satisficing', 'optimal solution']
          },
          {
            id: 'q7',
            type: 'multiple-choice',
            question: 'According to the passage, what does research about people with brain damage to emotional centers suggest?',
            options: [
              'Emotions interfere with logical reasoning',
              'Logical reasoning is more important than emotions',
              'Emotions are essential for decision-making',
              'Brain damage improves decision-making abilities'
            ],
            correctAnswer: 'Emotions are essential for decision-making',
            explanation: 'The passage indicates that people with emotional brain damage "struggle to make even simple decisions" despite having "intact logical reasoning abilities," suggesting emotions are essential for decision-making.',
            keywords: ['emotional centers', 'brain damage', 'essential components', 'decision-making']
          }
        ]
      }
    ]
  },
  {
    id: 'test-2',
    title: 'IELTS General Reading Test 1',
    description: 'Practice test with everyday topics and workplace scenarios',
    timeLimit: 60,
    totalQuestions: 40,
    passages: [
      {
        id: 'passage-4',
        title: 'Community Garden Guidelines',
        difficulty: 'easy',
        category: 'general',
        topic: 'Community',
        readingTime: 15,
        wordCount: 450,
        content: `Welcome to Greenwood Community Garden! This shared space brings together neighbors who are passionate about growing their own food and creating a vibrant community environment. Please read these guidelines carefully to ensure everyone can enjoy this wonderful resource.

Plot Rental and Maintenance:
Garden plots are available for rent from March through October each year. The rental fee is $50 per season for a standard 4x8 foot plot, which includes water access and basic tools. Larger plots (8x8 feet) are available for $75 per season, subject to availability.

All gardeners must maintain their plots throughout the growing season. This includes regular weeding, watering, and harvesting. Plots that are not maintained for more than two weeks may be reassigned to other community members on the waiting list.

Garden Rules:
- Organic gardening methods only - no chemical pesticides or fertilizers
- Water conservation is essential - use drip irrigation or soaker hoses when possible
- Harvest only from your own plot unless given explicit permission by other gardeners
- Children must be supervised at all times
- No pets are allowed in the garden area
- Garden gates must be locked when leaving

Community Responsibilities:
All gardeners are expected to contribute 4 hours of community service each month. This may include maintaining common areas, organizing educational workshops, or helping with seasonal cleanup activities. Community workdays are held on the first Saturday of each month from 9 AM to 12 PM.

Tools and Storage:
Basic gardening tools are provided and stored in the locked shed near the entrance. Please clean and return tools after use. Personal tools may be stored in designated areas but must be clearly labeled with your name and contact information.

Contact Information:
For questions or concerns, contact the Garden Coordinator, Sarah Martinez, at (555) 123-4567 or email gardening@greenwood.org. Emergency contact information is posted on the bulletin board near the main entrance.`,
        questions: [
          {
            id: 'q8',
            type: 'multiple-choice',
            question: 'How much does it cost to rent a standard garden plot for one season?',
            options: ['$25', '$50', '$75', '$100'],
            correctAnswer: '$50',
            explanation: 'The passage clearly states "The rental fee is $50 per season for a standard 4x8 foot plot."',
            keywords: ['rental fee', 'standard plot', '4x8 foot', '$50']
          },
          {
            id: 'q9',
            type: 'true-false-not-given',
            question: 'Gardeners can use chemical fertilizers in their plots.',
            correctAnswer: 'False',
            explanation: 'The garden rules explicitly state "Organic gardening methods only - no chemical pesticides or fertilizers."',
            keywords: ['organic gardening', 'chemical pesticides', 'fertilizers']
          },
          {
            id: 'q10',
            type: 'fill-in-blanks',
            question: 'Community workdays are held on the _______ Saturday of each month from _______ to _______.',
            correctAnswer: ['first', '9 AM', '12 PM'],
            explanation: 'The passage states "Community workdays are held on the first Saturday of each month from 9 AM to 12 PM."',
            keywords: ['community workdays', 'first Saturday', '9 AM', '12 PM']
          }
        ]
      }
    ]
  }
];

export const readingSkills = [
  {
    id: 'skimming',
    title: 'Skimming',
    description: 'Quickly reading to get the general idea of a text',
    tips: [
      'Read the title and headings first',
      'Look at the first and last sentences of paragraphs',
      'Focus on key words and phrases',
      'Don\'t worry about understanding every detail'
    ]
  },
  {
    id: 'scanning',
    title: 'Scanning',
    description: 'Looking for specific information in a text',
    tips: [
      'Know what you\'re looking for before you start',
      'Use keywords from the question',
      'Move your eyes quickly across the text',
      'Stop when you find the relevant information'
    ]
  },
  {
    id: 'detailed-reading',
    title: 'Detailed Reading',
    description: 'Reading carefully to understand specific information',
    tips: [
      'Read the relevant section slowly and carefully',
      'Pay attention to connecting words and phrases',
      'Consider the context and meaning',
      'Re-read if necessary'
    ]
  }
];

// Question Types Information
export const questionTypes = [
  {
    type: 'multiple-choice',
    title: 'Multiple Choice',
    description: 'Choose the correct answer from several options',
    strategy: 'Eliminate obviously wrong answers first, then choose the best remaining option'
  },
  {
    type: 'true-false-not-given',
    title: 'True/False/Not Given',
    description: 'Decide if statements are true, false, or not mentioned',
    strategy: 'True = clearly stated, False = contradicted, Not Given = not mentioned or unclear'
  },
  {
    type: 'matching-headings',
    title: 'Matching Headings',
    description: 'Match headings to paragraphs or sections',
    strategy: 'Focus on the main idea of each paragraph, not specific details'
  },
  {
    type: 'fill-in-blanks',
    title: 'Fill in the Blanks',
    description: 'Complete sentences with words from the passage',
    strategy: 'Use the exact words from the passage, check grammar and spelling'
  },
  {
    type: 'short-answer',
    title: 'Short Answer',
    description: 'Answer questions with a few words or a short phrase',
    strategy: 'Follow word limits strictly, use words from the passage when possible'
  }
];

export default {
  readingTests,
  readingSkills,
  questionTypes
}