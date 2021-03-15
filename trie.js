class Trie {
    constructor() {
        this.root = new Node();
    }
}

class Node {
    constructor() {
        this.chars = {};
        this.endOfWord = false;
    }
}