/**
 * Content Readability Analyzer
 * Provides content readability analysis, GPT search compatibility, and voice search optimization
 */

class ContentReadabilityAnalyzer {
  constructor() {
    this.readabilityMetrics = {};
    this.gptCompatibilityScores = {};
    this.voiceSearchOptimizations = {};
  }

  // Content Readability Analysis
  async analyzeReadability(content) {
    const text = this.extractText(content);
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);

    const metrics = {
      wordCount: words.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      averageWordsPerSentence: words.length / sentences.length,
      averageSentencesPerParagraph: sentences.length / paragraphs.length,
      fleschReadingEase: this.calculateFleschReadingEase(text),
      fleschKincaidGrade: this.calculateFleschKincaidGrade(text),
      gunningFogIndex: this.calculateGunningFogIndex(text),
      colemanLiauIndex: this.calculateColemanLiauIndex(text),
      smogIndex: this.calculateSmogIndex(text),
      automatedReadabilityIndex: this.calculateAutomatedReadabilityIndex(text),
      complexWordPercentage: this.calculateComplexWordPercentage(words),
      readabilityLevel: this.determineReadabilityLevel(text)
    };

    this.readabilityMetrics[content.id] = metrics;
    return metrics;
  }

  // GPT Search Compatibility Check
  async checkGPTCompatibility(content) {
    const text = this.extractText(content);
    const compatibilityScore = {
      semanticStructure: this.analyzeSemanticStructure(text),
      headingHierarchy: this.analyzeHeadingHierarchy(content),
      keywordDensity: this.analyzeKeywordDensity(text, content.keywords),
      contentLength: this.analyzeContentLength(text),
      internalLinking: this.analyzeInternalLinking(content),
      structuredData: this.analyzeStructuredData(content),
      overallScore: 0
    };

    // Calculate overall score
    const scores = Object.values(compatibilityScore).filter(score => typeof score === 'number');
    compatibilityScore.overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    this.gptCompatibilityScores[content.id] = compatibilityScore;
    return compatibilityScore;
  }

  // Voice Search Optimization
  async optimizeForVoiceSearch(content) {
    const text = this.extractText(content);
    const optimizations = {
      conversationalTone: this.analyzeConversationalTone(text),
      questionAnswerFormat: this.analyzeQuestionAnswerFormat(text),
      naturalLanguage: this.analyzeNaturalLanguage(text),
      featuredSnippetOptimization: this.analyzeFeaturedSnippetOptimization(text),
      localSearchOptimization: this.analyzeLocalSearchOptimization(content),
      mobileOptimization: this.analyzeMobileOptimization(content),
      speedOptimization: this.analyzeSpeedOptimization(content),
      suggestions: this.generateVoiceSearchSuggestions(text, content)
    };

    this.voiceSearchOptimizations[content.id] = optimizations;
    return optimizations;
  }

  // Utility Methods for Readability Analysis
  calculateFleschReadingEase(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const syllables = this.countSyllables(text);

    if (sentences.length === 0 || words.length === 0) return 0;

    const averageWordsPerSentence = words.length / sentences.length;
    const averageSyllablesPerWord = syllables / words.length;

    return 206.835 - (1.015 * averageWordsPerSentence) - (84.6 * averageSyllablesPerWord);
  }

  calculateFleschKincaidGrade(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const syllables = this.countSyllables(text);

    if (sentences.length === 0 || words.length === 0) return 0;

    const averageWordsPerSentence = words.length / sentences.length;
    const averageSyllablesPerWord = syllables / words.length;

    return (0.39 * averageWordsPerSentence) + (11.8 * averageSyllablesPerWord) - 15.59;
  }

  calculateGunningFogIndex(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const complexWords = this.countComplexWords(words);

    if (sentences.length === 0 || words.length === 0) return 0;

    const averageWordsPerSentence = words.length / sentences.length;
    const percentageComplexWords = (complexWords / words.length) * 100;

    return 0.4 * (averageWordsPerSentence + percentageComplexWords);
  }

  calculateColemanLiauIndex(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const letters = text.replace(/[^a-zA-Z]/g, '').length;

    if (sentences.length === 0 || words.length === 0) return 0;

    const averageWordsPerSentence = words.length / sentences.length;
    const averageLettersPerWord = letters / words.length;

    return (0.0588 * averageLettersPerWord * 100) - (0.296 * averageWordsPerSentence) - 15.8;
  }

  calculateSmogIndex(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const complexWords = this.countComplexWords(text.split(/\s+/));

    if (sentences.length === 0) return 0;

    return 1.043 * Math.sqrt(complexWords * (30 / sentences.length)) + 3.1291;
  }

  calculateAutomatedReadabilityIndex(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const characters = text.replace(/\s/g, '').length;

    if (sentences.length === 0 || words.length === 0) return 0;

    const averageWordsPerSentence = words.length / sentences.length;
    const averageCharactersPerWord = characters / words.length;

    return (4.71 * averageCharactersPerWord) + (0.5 * averageWordsPerSentence) - 21.43;
  }

  calculateComplexWordPercentage(words) {
    const complexWords = this.countComplexWords(words);
    return (complexWords / words.length) * 100;
  }

  determineReadabilityLevel(fleschScore) {
    if (fleschScore >= 90) return 'Very Easy';
    if (fleschScore >= 80) return 'Easy';
    if (fleschScore >= 70) return 'Fairly Easy';
    if (fleschScore >= 60) return 'Standard';
    if (fleschScore >= 50) return 'Fairly Difficult';
    if (fleschScore >= 30) return 'Difficult';
    return 'Very Difficult';
  }

  // Utility Methods for GPT Compatibility
  analyzeSemanticStructure(text) {
    const paragraphs = text.split(/\n\s*\n/);
    const hasIntroduction = text.toLowerCase().includes('introduction') || text.toLowerCase().includes('overview');
    const hasConclusion = text.toLowerCase().includes('conclusion') || text.toLowerCase().includes('summary');
    const hasSubheadings = (text.match(/^#{1,6}\s+/gm) || []).length > 0;

    let score = 0;
    if (hasIntroduction) score += 25;
    if (hasConclusion) score += 25;
    if (hasSubheadings) score += 25;
    if (paragraphs.length >= 3) score += 25;

    return score;
  }

  analyzeHeadingHierarchy(content) {
    const headings = content.headings || [];
    const h1Count = headings.filter(h => h.level === 1).length;
    const h2Count = headings.filter(h => h.level === 2).length;
    const h3Count = headings.filter(h => h.level === 3).length;

    let score = 0;
    if (h1Count === 1) score += 30; // Should have exactly one H1
    if (h2Count > 0) score += 25; // Should have H2s
    if (h3Count > 0) score += 25; // Should have H3s
    if (headings.length >= 3) score += 20; // Should have multiple headings

    return score;
  }

  analyzeKeywordDensity(text, keywords = []) {
    if (!keywords || keywords.length === 0) return 50;

    const textLower = text.toLowerCase();
    let totalDensity = 0;

    keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      const regex = new RegExp(keywordLower, 'gi');
      const matches = textLower.match(regex) || [];
      const density = (matches.length / textLower.split(/\s+/).length) * 100;
      totalDensity += Math.min(density * 10, 100); // Cap at 100
    });

    return Math.min(totalDensity / keywords.length, 100);
  }

  analyzeContentLength(text) {
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    
    if (wordCount >= 1500) return 100; // Comprehensive content
    if (wordCount >= 1000) return 80;  // Good length
    if (wordCount >= 500) return 60;   // Acceptable
    if (wordCount >= 300) return 40;   // Short
    return 20; // Too short
  }

  analyzeInternalLinking(content) {
    const internalLinks = content.internalLinks || [];
    const wordCount = this.extractText(content).split(/\s+/).length;
    const linkDensity = (internalLinks.length / wordCount) * 1000; // Links per 1000 words

    if (linkDensity >= 2) return 100;
    if (linkDensity >= 1) return 80;
    if (linkDensity >= 0.5) return 60;
    if (linkDensity >= 0.2) return 40;
    return 20;
  }

  analyzeStructuredData(content) {
    const structuredData = content.structuredData || {};
    let score = 0;

    if (structuredData.article) score += 25;
    if (structuredData.faq) score += 25;
    if (structuredData.howTo) score += 25;
    if (structuredData.review) score += 25;

    return score;
  }

  // Utility Methods for Voice Search Optimization
  analyzeConversationalTone(text) {
    const conversationalWords = ['you', 'your', 'we', 'our', 'let\'s', 'can', 'could', 'would', 'should'];
    const textLower = text.toLowerCase();
    let score = 0;

    conversationalWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = textLower.match(regex) || [];
      score += Math.min(matches.length * 10, 100);
    });

    return Math.min(score, 100);
  }

  analyzeQuestionAnswerFormat(text) {
    const questions = text.match(/\?/g) || [];
    const answers = text.match(/answer|solution|here's|this is/g) || [];
    
    let score = 0;
    if (questions.length > 0) score += 50;
    if (answers.length > 0) score += 50;
    
    return score;
  }

  analyzeNaturalLanguage(text) {
    const contractions = text.match(/['']/g) || [];
    const informalWords = ['great', 'awesome', 'amazing', 'perfect', 'excellent'];
    const textLower = text.toLowerCase();
    let score = 0;

    // Check for contractions
    score += Math.min(contractions.length * 10, 50);

    // Check for informal language
    informalWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = textLower.match(regex) || [];
      score += Math.min(matches.length * 10, 50);
    });

    return Math.min(score, 100);
  }

  analyzeFeaturedSnippetOptimization(text) {
    const hasBulletPoints = text.includes('•') || text.includes('-') || text.includes('*');
    const hasNumberedList = /\d+\./.test(text);
    const hasDefinition = text.includes('is a') || text.includes('refers to') || text.includes('means');
    
    let score = 0;
    if (hasBulletPoints) score += 33;
    if (hasNumberedList) score += 33;
    if (hasDefinition) score += 34;
    
    return score;
  }

  analyzeLocalSearchOptimization(content) {
    const localKeywords = ['near me', 'local', 'nearby', 'in my area', 'close to me'];
    const text = this.extractText(content).toLowerCase();
    let score = 0;

    localKeywords.forEach(keyword => {
      if (text.includes(keyword)) score += 20;
    });

    return Math.min(score, 100);
  }

  analyzeMobileOptimization(content) {
    const text = this.extractText(content);
    const wordCount = text.split(/\s+/).length;
    const paragraphCount = text.split(/\n\s*\n/).length;
    
    let score = 0;
    if (wordCount <= 300) score += 50; // Short content for mobile
    if (paragraphCount >= 3) score += 50; // Good paragraph structure
    
    return score;
  }

  analyzeSpeedOptimization(content) {
    const text = this.extractText(content);
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount <= 200) return 100; // Very fast to read
    if (wordCount <= 400) return 80;  // Fast
    if (wordCount <= 600) return 60;  // Moderate
    if (wordCount <= 800) return 40;  // Slow
    return 20; // Very slow
  }

  generateVoiceSearchSuggestions(text, content) {
    const suggestions = [];
    
    // Check for question-based content
    if (!text.includes('?')) {
      suggestions.push('Add FAQ-style questions to improve voice search compatibility');
    }
    
    // Check for conversational tone
    if (this.analyzeConversationalTone(text) < 50) {
      suggestions.push('Use more conversational language and direct address');
    }
    
    // Check for local optimization
    if (this.analyzeLocalSearchOptimization(content) < 50) {
      suggestions.push('Include location-based keywords for local voice searches');
    }
    
    // Check for mobile optimization
    if (this.analyzeMobileOptimization(content) < 70) {
      suggestions.push('Optimize content length and structure for mobile voice search');
    }
    
    return suggestions;
  }

  // Helper Methods
  extractText(content) {
    if (typeof content === 'string') return content;
    if (content.text) return content.text;
    if (content.content) return content.content;
    if (content.body) return content.body;
    return '';
  }

  countSyllables(text) {
    const words = text.toLowerCase().split(/\s+/);
    let syllableCount = 0;

    words.forEach(word => {
      syllableCount += this.countWordSyllables(word);
    });

    return syllableCount;
  }

  countWordSyllables(word) {
    word = word.toLowerCase();
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
  }

  countComplexWords(words) {
    return words.filter(word => this.countWordSyllables(word) >= 3).length;
  }
}

// Export the class
export default ContentReadabilityAnalyzer; 