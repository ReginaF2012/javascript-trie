class Trie {
    constructor() {
        this.root = new Node();
    }

    insert(word) {
        let currNode = this.root;

        for (const letter of word) {
            if (!currNode.letters.has(letter)) {
                currNode.letters.set(letter) = new Node();
            }
            currNode = currNode.letters.get(letter);
        }

        currNode.endOfWord = true;
        return currNode;
    }

    search(word) {
        let currNode = this.root;
        for (const letter of word) {
            if (!currNode.letters.has(letter)) return false;

            currNode = currNode.letters.get(letter);
        }

        return currNode.endOfWord;
    }

    remove(word) {

    }
}

class Node {
    constructor() {
        this.letters = new Map();
        this.endOfWord = false;
    }
}
