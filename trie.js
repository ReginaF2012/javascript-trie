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
        if (!prefix) return false;
        let words = [],
            currNode = start;

        for (const letter of prefix) {
            if (!currNode.children.has(letter)) return words;
            currNode = currNode.children.get(letter);
        }

        currNode.children.forEach((child) =>
            this.getWordsFrom(child, prefix, words)
        );

        return words;
    }

    getWordsFrom(node, string, array = []) {
        if (!node || !string) return;

        string += node.value;

        if (node.endOfWord) array.push(string);

        node.children.forEach((child) => {
            this.getWordsFrom(child, string, array);
        });
    }

    removeWord(word) {

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
trie.insert("cat");
trie.insert("bet");
trie.insert("be");
trie.insert("beaver");
trie.insert("car");
trie.insert("canoe");
trie.insert("cot");
trie.insert("cranberries");
// console.log(trie.hasWord('cat'));
// console.log(trie.hasWord('car'));
// console.log(trie.hasWord('be'));
// console.log(trie.hasWord('bet'));
// console.log(trie.hasWord('cap'));
console.log('all words that start with "c":', trie.findAllWithPrefix("c"));
console.log('all words that start with "ca":', trie.findAllWithPrefix("ca"));
console.log('all words that start with "be":', trie.findAllWithPrefix("be"));
console.log(
    'all words that start with: "cran":',
    trie.findAllWithPrefix("cran")
);
