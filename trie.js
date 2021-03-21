class Trie {
    constructor() {
        this.root = new Node();
    }

    insert(word) {
        if (!word) return false;

        let currNode = this.root;

        for (const letter of word) {
            if (!currNode.children.has(letter)) {
                currNode.children.set(letter, new Node(letter));
            }
            currNode = currNode.children.get(letter);
        }

        currNode.endOfWord = true;
        return currNode;
    }

    hasWord(word, start = this.root) {
        if (!word) return false;

        let currNode = start;
        for (const letter of word) {
            if (!currNode.children.has(letter)) return false;

            currNode = currNode.children.get(letter);
        }

        return currNode.endOfWord;
    }

    findAllWithPrefix(prefix, start = this.root) {
        let words = [],
            currNode = start;

        for (const letter of prefix) {
            if (!currNode.children.has(letter)) return words;
            currNode = currNode.children.get(letter);
        }
        
        if (currNode.endOfWord) words.push(prefix);

        currNode.children.forEach((child) =>
            this.getWordsFrom(child, prefix, words)
        );

        return words;
    }

    getWordsFrom(node, string, array = []) {
        if (!node) return;

        string += node.value;

        if (node.endOfWord) array.push(string);

        node.children.forEach((child) => {
            this.getWordsFrom(child, string, array);
        });
    }

    removeWord(word) {
        if (!word) return false;

        let currNode = this.root, stack = [];
        for (const letter of word) {
            if (!currNode.children.has(letter)) return false;
            currNode = currNode.children.get(letter);
            if (word[word.length - 1] !== currNode.value) stack.push(currNode);
        }

        currNode.endOfWord = false;

        while (stack.length > 0 && !currNode.endOfWord) {
            let prevNode = currNode;
            currNode = stack.pop();
            if (prevNode.children.size === 0) currNode.children.delete(prevNode.value);
        }

        return true;
    }
}

class Node {
    constructor(value = "") {
        this.children = new Map();
        this.value = value;
        this.endOfWord = false;
    }
}

let trie = new Trie();
let words = ['am', 'ama', 'amaz', 'amaze', 'amazing']
words.forEach(word => trie.insert(word));
console.log(trie.findAllWithPrefix('am'));
trie.removeWord('amaze');
console.log(trie.findAllWithPrefix(''));

