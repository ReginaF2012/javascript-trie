class Trie {
    constructor() {
        this.root = new Node();
    }

    insert(word) {
        let currNode = this.root;

        for (const letter of word) {
            if (!currNode.letters[letter]) {
                currNode.letters[letter] = new Node();
            }
            currNode = currNode.letters[letter];
        }

        currNode.endOfWord = true;
        return currNode;
    }

    search(word) {
        let currNode = this.root;
        for (const letter of word) {
            if (!currNode.letters[letter]) return false;

            currNode = currNode.letters[letter];
        }

        return currNode.endOfWord;
    }
}

class Node {
    constructor() {
        this.letters = {};
        this.endOfWord = false;
    }
}
