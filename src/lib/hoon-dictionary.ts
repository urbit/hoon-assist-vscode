import dictionary from './hoon-dictionary.json';

interface DictionaryEntry {
  keys: string[];
  doc: string;
}

interface Dictionary { 
  [key: string]: string 
}

export default class HoonDictionary {
  dict: Dictionary;

  constructor() {
    this.dict = this.buildDict(dictionary);
  }

  destroy() {

  }

  htmlForWord(word: string) {
    return this.dict[word];
  }

  buildDict(entries: DictionaryEntry[]) {
    const res: Dictionary = {};
    for (const entry of entries) {
      for (const key of entry['keys']) {
        res[key] = entry['doc'];
      }
    }
    return res;
  }

}
