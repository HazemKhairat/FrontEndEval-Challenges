export class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}


export class DoublyList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    push_front(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    push_back(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.size++;
    }

    pop_back() {
        if (!this.tail) {
            return;
        }

        if (this.tail === this.head) {
            this.tail = this.head = null;
        } else {
            const tmp = this.tail.prev;
            tmp.next = null;
            this.tail.prev = null;
            this.tail = tmp;
        }
        this.size--;
    }
}
